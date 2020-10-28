function tableHtmlToExcel(tableID, filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20').replace(/#/g, '%23');
   
    filename = filename?filename+'.xls':'excel_data.xls';
   
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
   
        downloadLink.download = filename;
       
        downloadLink.click();
    }
}

// http://swwwitch.com/dl/Font-Awesome-Cheetsheet-4.5.0.pdf
jQuery(document).ready(function(){
	var loading = ''
		+'<div id="wrap-loading">'
	        +'<div class="lds-hourglass"></div>'
	    +'</div>';
	jQuery('body').prepend(loading);
	var current_url = window.location.href;

	 // halaman SSH
	if(
		current_url.indexOf('/komponen/'+config.tahun_anggaran+'/') != -1 
		&& document.getElementById('table_komponen')
	){
		console.log('halaman referensi SSH');
		var singkron_ssh = ''
			+'<button class="fcbtn btn btn-warning btn-outline btn-1b" id="singkron_ssh_ke_lokal">'
				+'<i class="fa fa-cloud-download m-r-5"></i> <span>Singkron SSH ke DB lokal</span>'
			+'</button>'
			+'<button class="fcbtn btn btn-danger btn-outline btn-1b" id="singkron_ssh_dari_lokal" style="display: none;">'
				+'<i class="fa fa-cloud-upload m-r-5"></i> <span>Singkron SSH dari DB lokal</span>'
			+'</button>';
		jQuery('button.arsip-komponen').parent().prepend(singkron_ssh);
		var _show_id_ssh = ''
			+'<button onclick="return false;" class="fcbtn btn btn-warning btn-outline btn-1b" id="show_id_ssh">'
				+'<i class="fa fa-eye m-r-5"></i> <span>Tampilkan ID Standar Harga</span>'
			+'</button>';
		jQuery('#table_komponen').closest('form').prepend(_show_id_ssh);
		jQuery('#show_id_ssh').on('click', function(){
			jQuery('#wrap-loading').show();
			show_id_ssh();
		});
		jQuery('#singkron_ssh_ke_lokal').on('click', function(){
			singkron_ssh_ke_lokal();
		});
		jQuery('#singkron_ssh_dari_lokal').on('click', function(){
			singkron_ssh_dari_lokal();
		});

		function show_id_ssh(){
			jQuery('#table_komponen tbody tr').map(function(i, b){
			 	var id = jQuery(b).find('td').eq(6).find('a').attr('onclick')
			 	if(id){
				 	id = id.split("'")[1];
				 	var nama = jQuery(b).find('td').eq(1);
				 	nama.html('( '+id+' ) '+nama.html());
				 }
			});
			jQuery('#wrap-loading').hide();
		}

		function singkron_ssh_ke_lokal(){
			var data = {
			    message:{
			        type: "get-actions"
			    }
			};
			if(confirm('Apakah anda yakin melakukan ini? data lama akan diupdate dengan data terbaru.')){
				jQuery('#wrap-loading').show();
				jQuery.ajax({
					url: config.sipd_url+'daerah/main/budget/komponen/'+config.tahun_anggaran+'/1/tampil-komponen/90/0',
					contentType: 'application/json',
					success: function(data){
						var data_ssh = { 
							action: 'singkron_ssh',
							api_key: config.api_key,
							ssh : {}
						};

						var i = -1;
						var last = data.data.length-1;
						data.data.reduce(function(sequence, nextData){
	                        return sequence.then(function(current_data){
	                            return new Promise(function(resolve, reject){
	                            	/*if(i >= 5){
	                            		console.log(i, last);
										i++;
										if(i == last){
	                            			console.log('sip');
											return resolve(data.data);
										}else{
											return resolve(nextData);
										}
	                            	}*/
	                            	jQuery.ajax({
										url: config.sipd_url+'daerah/main/budget/komponen/'+config.tahun_anggaran+'/1/tampil-komponen-akun/90/0/'+current_data.id_standar_harga,
										contentType: 'application/json',
										success: function(ret){
											if(i==-1){
												data.data[last].rek_belanja = ret.data;
											}else{
												data.data[i].rek_belanja = ret.data;
											}
											console.log(i);
											i++;
											if(i == last){
												return resolve(data.data);
											}else{
												return resolve(nextData);
											}
										},
										error: function(argument) {
											console.log(e);
											return resolve(nextData);
										}
									});
	                            })
	                            .catch(function(e){
	                                console.log(e, i);
	                                return Promise.resolve(nextData);
	                            });
	                        })
	                        .catch(function(e){
	                            console.log(e);
	                            return Promise.resolve(nextData);
	                        });
	                    }, Promise.resolve(data.data[last]))
	                    .then(function(data_last){
							data_last.map(function(b, i){
								// if(i<5){
									data_ssh.ssh[i] = {};
									data_ssh.ssh[i].kode_kel_standar_harga	= b.kode_kel_standar_harga;
									data_ssh.ssh[i].nama_kel_standar_harga	= b.nama_kel_standar_harga;
									data_ssh.ssh[i].id_standar_harga	= b.id_standar_harga;
									data_ssh.ssh[i].kode_standar_harga	= b.kode_standar_harga;
									data_ssh.ssh[i].nama_standar_harga	= b.nama_standar_harga;
									data_ssh.ssh[i].spek	= b.spek;
									data_ssh.ssh[i].satuan	= b.satuan;
									data_ssh.ssh[i].harga	= b.harga;
									data_ssh.ssh[i].harga_2	= b.harga_2;
									data_ssh.ssh[i].harga_3	= b.harga_3;
									data_ssh.ssh[i].is_locked	= b.is_locked;
									data_ssh.ssh[i].is_deleted	= b.is_deleted;
									data_ssh.ssh[i].created_user	= b.created_user;
									data_ssh.ssh[i].created_at	= b.created_at;
									data_ssh.ssh[i].updated_user	= b.updated_user;
									data_ssh.ssh[i].updated_at	= b.updated_at;
									data_ssh.ssh[i].kelompok	= b.kelompok;
									data_ssh.ssh[i].ket_teks	= b.ket_teks;
									data_ssh.ssh[i].kd_belanja	= {};
									b.rek_belanja.map(function(d, c){
										data_ssh.ssh[i].kd_belanja[c]	= {};
										data_ssh.ssh[i].kd_belanja[c].id_akun	= d.id_akun;
										data_ssh.ssh[i].kd_belanja[c].kode_akun	= d.kode_akun;
										data_ssh.ssh[i].kd_belanja[c].nama_akun	= d.nama_akun;
									});
								// }
							});
							var data = {
							    message:{
							        type: "get-url",
							        content: {
									    url: config.url_server_lokal,
									    type: 'post',
									    data: data_ssh
									}
							    }
							};
							chrome.runtime.sendMessage(data, function(response) {
							    console.log('responeMessage', response);
							});
	                    })
	                    .catch(function(e){
	                        console.log(e);
	                    });
					}
				});
			}
		}

		function singkron_ssh_dari_lokal(){
			if(confirm('Apakah anda yakin melakukan ini? data lama akan diupdate dengan data terbaru.')){
				
			}
		}
	}else if(current_url.indexOf('rka-bl-rinci/cetak') != -1){
		injectScript( chrome.extension.getURL('/js/jquery.min.js'), 'html');
		var download_excel = ''
			+'<div id="action-sipd" class="hide-print">'
				+'<a id="excel" onclick="return false;" href="#">DOWNLOAD EXCEL</a>'
			+'</div>';
		jQuery('body').prepend(download_excel);
		jQuery('.cetak > table').attr('id', 'rka');
		// jQuery('html').attr('id', 'rka');

		var style = '';

		style = jQuery('.cetak').attr('style');
		if (typeof style == 'undefined'){ style = ''; };
		jQuery('.cetak').attr('style', style+" font-family:'Open Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; padding:0; margin:0; font-size:13px;");
		
		jQuery('.bawah').map(function(i, b){
			style = jQuery(b).attr('style');
			if (typeof style == 'undefined'){ style = ''; };
			jQuery(b).attr('style', style+" border-bottom:1px solid #000;");
		});
		
		jQuery('.kiri').map(function(i, b){
			style = jQuery(b).attr('style');
			if (typeof style == 'undefined'){ style = ''; };
			jQuery(b).attr('style', style+" border-left:1px solid #000;");
		});

		jQuery('.kanan').map(function(i, b){
			style = jQuery(b).attr('style');
			if (typeof style == 'undefined'){ style = ''; };
			jQuery(b).attr('style', style+" border-right:1px solid #000;");
		});

		jQuery('.atas').map(function(i, b){
			style = jQuery(b).attr('style');
			if (typeof style == 'undefined'){ style = ''; };
			jQuery(b).attr('style', style+" border-top:1px solid #000;");
		});

		jQuery('.text_tengah').map(function(i, b){
			style = jQuery(b).attr('style');
			if (typeof style == 'undefined'){ style = ''; };
			jQuery(b).attr('style', style+" text-align: center;");
		});

		jQuery('.text_kiri').map(function(i, b){
			style = jQuery(b).attr('style');
			if (typeof style == 'undefined'){ style = ''; };
			jQuery(b).attr('style', style+" text-align: left;");
		});

		jQuery('.text_kanan').map(function(i, b){
			style = jQuery(b).attr('style');
			if (typeof style == 'undefined'){ style = ''; };
			jQuery(b).attr('style', style+" text-align: right;");
		});

		jQuery('.text_block').map(function(i, b){
			style = jQuery(b).attr('style');
			if (typeof style == 'undefined'){ style = ''; };
			jQuery(b).attr('style', style+" font-weight: bold;");
		});

		jQuery('.text_15').map(function(i, b){
			style = jQuery(b).attr('style');
			if (typeof style == 'undefined'){ style = ''; };
			jQuery(b).attr('style', style+" font-size: 15px;");
		});

		jQuery('.text_20').map(function(i, b){
			style = jQuery(b).attr('style');
			if (typeof style == 'undefined'){ style = ''; };
			jQuery(b).attr('style', style+" font-size: 20px;");
		});

		jQuery('#rka > tbody > tr > td > table').attr('style', 'min-width: 1000px;');

		jQuery('#excel').on('click', function(){
			var name = document.querySelectorAll('.cetak > table table')[1].querySelectorAll('tbody > tr')[7].querySelectorAll('td')[2].innerText;
			tableHtmlToExcel('rka', name);
		});
	}else if(current_url.indexOf('belanja/'+config.tahun_anggaran+'/rinci/list/90') != -1){
		// fitur mempercepat pencarian SSH di sipd
		// tampilkan ID ssh pada tabel referensi SSH
		// buat tombol search SSH by ID
		// koneksikan item ssh hasil search dengan form input SSH
		console.log('halaman input RKA');
		var modal = ''
			+'<div class="modal fade" id="mod-komponen-akun" tabindex="-1" role="dialog" data-backdrop="static" aria-hidden="true" style="z-index: 99999">'
		        +'<div class="modal-dialog modal-lg" role="document">'
		            +'<div class="modal-content">'
		                +'<div class="modal-header bgpanel-theme">'
		                    +'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"><i class="mdi mdi-close-circle"></i></span></button>'
		                    +'<h4 class="modal-title text-white" id="">Rekening Penyusun</h4>'
		                +'</div>'
		                +'<div class="modal-body">'
		                  	+'<div class="row">'
		                      	+'<div class="col-lg-12">'
		                          	+'<div class="well well-sm">'
		                              	+'<p class="font-medium">ID : <span id="idkomp"></span></p>'
		                              	+'<p class="font-medium">Nama : <span id="namakomp"></span></p>'
		                              	+'<p class="font-medium">Spesifikasi : <span id="spekkomp"></span></p>'
		                              	+'<p class="font-medium">Satuan : <span id="satkomp"></span></p>'
		                              	+'<p class="font-medium">Harga : <span id="hargakomp"></span></p>'
		                          	+'</div>'
		                      	+'</div>'
		                  	+'</div>'
		                  	+'<table class="table table-hover table-striped" id="table_komponen_akun">'
		                      	+'<thead>'
		                        	+'<tr class="bg-grey-600">'
		                          		+'<th class="text-white">ID Akun</th>'
		                          		+'<th class="text-white">Rekening</th>'
		                          		+'<th class="text-white"></th>'
		                        	+'</tr>'
		                        	+'<tr>'
		                          		+'<th colspan="3">'
		                            		+'<div class="dttable-search">'
		                                		+'<span class="icon"><i class="fa fa-search"></i></span>'
		                                		+'<input type="search" id="search" class="dttable2-filter" placeholder="Cari..." />'
		                            		+'</div>'
		                          		+'</th>'
		                        	+'</tr>'
		                      	+'</thead>'
		                  	+'</table>'
		                +'</div>'
		                +'<div class="modal-footer">'
		                    +'<button type="button" class="btn btn-success" id="set-ssh-sipd">Set SSH / KLIK pada salah satu rekening</button>'
		                    +'<button type="button" class="btn btn-default" data-dismiss="modal">Tutup</button>'
		                +'</div>'
		            +'</div>'
		        +'</div>'
		    +'</div>';
		jQuery('body').append(modal);

		// 4069518 contoh id ssh
		function tampilAkun(id){
			var id_unit = window.location.href.split('?')[0].split('90/')[1];
			jQuery('#idkomp').html('');
			jQuery('#hargakomp').html('');
			jQuery('#namakomp').html('');
          	jQuery('#spekkomp').html('');
          	jQuery('#satkomp').html('');
          	
	      	jQuery('#table_komponen_akun').DataTable().destroy();

	      	jQuery.ajax({
		        url: config.sipd_url+"daerah/main/budget/komponen/"+config.tahun_anggaran+"/1/detil-komp/90/"+id_unit,
		        type: "post",
		        data: "_token="+jQuery('meta[name=_token]').attr('content')+'&idkomponen='+id,
		        success: function(data){
		        	console.log('data', data);
		        	if(!data){
		        		jQuery('#mod-komponen-akun').modal('hide');
		        		jQuery('#wrap-loading').hide();
		        		alert('ID Standar Harga '+id+' tidak ditemukan!');
		        	}else{
			          	jQuery('#idkomp').html(data['id_standar_harga']);
			          	jQuery('#hargakomp').html(jQuery.fn.dataTable.render.number('.',',',0,'').display(data['harga']));
			          	jQuery('#namakomp').html(data['kode_standar_harga']+' '+data['nama_standar_harga']);
			          	jQuery('#spekkomp').html(data['spek']);
			          	jQuery('#satkomp').html(data['satuan']);
				      	jQuery('#table_komponen_akun').DataTable({
					        pagingType: "full_numbers",
					        dom:'tip',
					        displayLength:20,
					        ajax: {
					            url: config.sipd_url+'daerah/main/budget/komponen/'+config.tahun_anggaran+'/1/tampil-komponen-akun/90/'+id_unit+"/" + id +'?app=budget',
					            "dataSrc": function ( json ) {
					                jQuery('#wrap-loading').hide();
					                return json.data;
					            }       
					        },
					        columns: [
					          {data: 'id_akun', name: 'id_akun'},
					          {data: 'nama_akun', name: 'nama_akun'},
					          {data: 'action', name: 'action', orderable: false, searchable: false, className: 'text-right'},
					        ],
				      	});
				      	jQuery('#set-ssh-sipd').on('click', function(){
				      		var id_akun = jQuery('select[name="akun"]').val();
				      		var nama_akun = jQuery('select[name="akun"] option:selected').text();
				      		var cek = false;
				      		var cek_rek = false;
				      		jQuery('#table_komponen_akun').DataTable().rows().data().map(function(b, i){
				      			if(b.id_akun+'||' == id_akun){
				      				cek = true;
				      			}
				      		});
				      		if(!cek){
				      			return alert('Item SSH '+data['nama_standar_harga']+' tidak terlink dengan rekening belanja '+nama_akun);
				      		}
				      		jQuery('#mod-komponen-akun').modal('hide');
			        		jQuery('#wrap-loading').hide();

				            jQuery("input[name=idkomponen]").val(data['id_standar_harga']);
				            jQuery("input[name=komponen]").val(data['nama_standar_harga']);
				            jQuery("input[name=spek]").val(data['spek']);
				            jQuery("input[name=satuan]").val(data['satuan']);
				            jQuery("input[name=hargasatuan]").val(data['harga']);
				      	});
				      	jQuery('#table_komponen_akun tbody').on('click', 'tr', function () {
				            var id_akun = jQuery(this).find('td').eq(0).text();
				            var cek = jQuery('select[name="akun"]').find('option[value="'+id_akun+'||"]').text();
				            if(!cek){
				            	var jenis_bel = jQuery('select[name="jenisbl"] option:selected').text();
				            	return alert('Akun Rekening belanja ini tidak masuk dalam jenis belanja '+jenis_bel);
				            }
				            var current_rekbel = jQuery('select[name="akun"]').val();
			        		jQuery('#mod-komponen-akun').modal('hide');
			        		jQuery('#wrap-loading').hide();
				            
				            jQuery('select[name="akun"]').val(id_akun+'||').trigger('change');

				            jQuery("input[name=idkomponen]").val(data['id_standar_harga']);
				            jQuery("input[name=komponen]").val(data['nama_standar_harga']);
				            jQuery("input[name=spek]").val(data['spek']);
				            jQuery("input[name=satuan]").val(data['satuan']);
				            jQuery("input[name=hargasatuan]").val(data['harga']);
			          	});

				      	jQuery('.dttable2-filter').keyup(function(e){
				        	jQuery('#table_komponen_akun').DataTable().search(jQuery(this).val()).draw();
				      	});
				    }
		        },
		        error: function(e){
		        	console.log('data', e);
	        		jQuery('#mod-komponen-akun').modal('hide');
	        		jQuery('#wrap-loading').hide();
	        		return alert('ID Standar Harga '+id+' tidak ditemukan!');
		        }
	      	});
	    }

		var komponen = ''
			+'<label class="col-xs-12 font-bold" style="margin-top: 20px;">Cari Komponen dengan ID Standar Harga</label>'
            +'<div class="col-xs-11">'
              	+'<input class="form-control" type="text" placeholder="ID Standar Harga" id="komponen-id-sipd">'
            +'</div>'
            +'<div class="col-xs-1">'
              	+'<button class="fcbtn btn btn-danger btn-1b pull-right" id="cari-ssh-sipd" type="button" style="display: block;"><i class="fa fa-search"></i></button>'
            +'</div>';
        jQuery('.group-nama-komponen').append(komponen);
        jQuery('#cari-ssh-sipd').on('click', function(){
        	var id_ssh = jQuery('#komponen-id-sipd').val();
        	if(id_ssh){
        		var jenis_ssh = jQuery('select[name=komponenkel]').val();
        		if(!jenis_ssh){
        			alert('Jenis standar harga tidak boleh kosong!!');
        		}else{
	        		jQuery('#mod-komponen-akun').modal('show');
	        		jQuery('#wrap-loading').show();
	        		tampilAkun(id_ssh);
        		}
        	}else{
        		alert('ID Standar Harga tidak boleh kosong!');
        	}
        });
	}
});