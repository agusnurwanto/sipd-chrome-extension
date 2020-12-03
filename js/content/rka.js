var current_url = window.location.href;
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
		return alert('Item SSH '+data_ssh['nama_standar_harga']+' tidak terlink dengan rekening belanja '+nama_akun);
	}
	jQuery('#mod-komponen-akun').modal('hide');
	jQuery('#wrap-loading').hide();

	jQuery("input[name=idkomponen]").val(data_ssh['id_standar_harga']);
	jQuery("input[name=komponen]").val(data_ssh['nama_standar_harga']);
	jQuery("input[name=spek]").val(data_ssh['spek']);
	jQuery("input[name=satuan]").val(data_ssh['satuan']);
	jQuery("input[name=hargasatuan]").val(data_ssh['harga']);
});

// 4069518 contoh id ssh
function tampilAkun(id, jenis_ssh){
	var id_unit = window.location.href.split('?')[0].split(''+config.id_daerah+'/')[1];
	jQuery('#idkomp').html('');
	jQuery('#hargakomp').html('');
	jQuery('#namakomp').html('');
  	jQuery('#spekkomp').html('');
  	jQuery('#satkomp').html('');
  	
  	jQuery('#table_komponen_akun').DataTable().clear();
  	jQuery('#table_komponen_akun').DataTable().destroy();

  	jQuery.ajax({
        url: config.sipd_url+"daerah/main/budget/komponen/"+config.tahun_anggaran+"/"+jenis_ssh+"/detil-komp/"+config.id_daerah+"/"+id_unit,
        type: "post",
        data: "_token="+jQuery('meta[name=_token]').attr('content')+'&idkomponen='+id,
        success: function(data){
        	console.log('data', data);
        	window.data_ssh = data;
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
			            url: config.sipd_url+'daerah/main/budget/komponen/'+config.tahun_anggaran+'/'+jenis_ssh+'/tampil-komponen-akun/'+config.id_daerah+'/'+id_unit+"/" + id +'?app=budget',
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

var id_unit = window.location.href.split('?')[0].split(''+config.id_daerah+'/')[1];
var komponen = ''
	+'<label class="col-xs-12 font-bold" style="margin-top: 20px;">Cari Komponen dengan <a href="'+config.sipd_url+'daerah/main/budget/komponen/'+config.tahun_anggaran+'/1/list/'+config.id_daerah+'/'+id_unit+'" target="_blank">ID Standar Harga</a></label>'
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
    		var jenis_ssh_id = 1;
    		if(jenis_ssh == 'SSH'){
    			jenis_ssh_id = 1;
    		}else if(jenis_ssh == 'SBU'){
    			jenis_ssh_id = 4;
    		}else if(jenis_ssh == 'HSPK'){
    			jenis_ssh_id = 2;
    		}else if(jenis_ssh == 'ASB'){
    			jenis_ssh_id = 3;
    		}
    		tampilAkun(id_ssh, jenis_ssh_id);
		}
	}else{
		alert('ID Standar Harga tidak boleh kosong!');
	}
});


var modal = ''
	+'<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/jszip.js"></script>'
	+'<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/xlsx.js"></script>'
	+'<div class="modal fade" id="mod-import-excel" role="dialog" data-backdrop="static" aria-hidden="true" style="z-index: 9999">'
        +'<div class="modal-dialog modal-lg" role="document">'
            +'<div class="modal-content">'
                +'<div class="modal-header bgpanel-theme">'
                    +'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"><i class="mdi mdi-close-circle"></i></span></button>'
                    +'<h4 class="modal-title text-white" id="">Upload Data Excel</h4>'
                +'</div>'
                +'<div class="modal-body">'
                  	+'<form>'
                      	+'<div class="form-group">'
                      		+'<label class="control-label">Jenis Data Excel</label>'
                          	+'<select class="form-control" name="jenis_data" id="jenis_data">'
                                +'<option value="">Pilih Format Data Excel</option>'
                                +'<option value="dana-desa">Dana Desa / ADD (BANKEU)</option>'
                                +'<option value="bagi-hasil">Belanja Bagi Hasil</option>'
                                +'<option value="dana-bos">Dana BOS (BOS Pusat)</option>'
                                +'<option value="upload-rincian">Upload Rincian</option>'
                            +'</select>'
                      	+'</div>'
                      	+'<div class="form-group">'
                      		+'<label class="control-label">Contoh format excel <a id="label-excel" href="" target="_blank"></a> atau DOWNLOAD Excel dari Rincian belanja</label>'
                      		+'<input type="file" id="file_input" />'
                      	+'</div>'
                      	+'<div class="form-group">'
                      		+'<label class="control-label">Data JSON</label>'
							+'<textarea class="form-control" id="file_output" style="height: 150px;"></textarea>'
                      	+'</div>'
                      	+'<div class="form-group group-dana-desa excel-opsional" style="display:none;">'
	                        +'<label class="control-label">Jenis Belanja</label>'
	                        +'<select class="form-control" id="jenis-bel-excel"></select>'
	                    +'</div>'
	                    +'<div class="form-group group-dana-desa excel-opsional" style="display:none;">'
	                        +'<label class="control-label">Rekening / Akun</label>'
	                        +'<select class="form-control" id="rek-excel"></select>'
	                    +'</div>'
	                    +'<div class="form-group group-dana-desa excel-opsional" style="display:none;">'
	                        +'<label class="control-label">Pengelompokan Belanja / Paket Pekerjaan</label>'
	                        +'<select class="form-control" id="paket-excel"></select>'
	                    +'</div>'
	                    +'<div class="form-group group-dana-desa excel-opsional" style="display:none;">'
	                        +'<label class="control-label">Keterangan</label>'
			               	+'<select class="form-control" id="keterangan-excel"></select>'
			            +'</div>'
	                    +'<div class="form-group group-dana-desa excel-opsional" style="display:none;">'
	                        +'<label class="control-label">Koefisien (Perkalian)</label>'
	                        +'<div class="col-xs-12">'
	                        	+'<div class="row">'
	                        		+'<div class="col-xs-6">'
			               				+'<input class="form-control" type="number" placeholder="Volume" id="volum-excel">'
			            			+'</div>'
	                        		+'<div class="col-xs-6">'
			               				+'<select class="form-control" id="satuan-excel"></select>'
			            			+'</div>'
			            		+'</div>'
			            	+'</div>'
			            +'</div>'
                  	+'</form>'
                +'</div>'
                +'<div class="modal-footer">'
                    +'<button type="button" class="btn btn-success" id="simpan-excel">Simpan</button>'
                    +'<button type="button" class="btn btn-default" data-dismiss="modal">Tutup</button>'
                +'</div>'
            +'</div>'
        +'</div>'
    +'</div>'
    +'<div class="modal fade" id="mod-ganti-rek" role="dialog" data-backdrop="static" aria-hidden="true" style="z-index: 9999">'
        +'<div class="modal-dialog modal-lg" role="document">'
            +'<div class="modal-content">'
                +'<div class="modal-header bgpanel-theme">'
                    +'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"><i class="mdi mdi-close-circle"></i></span></button>'
                    +'<h4 class="modal-title text-white" id="">Pilih Rekening Sesuai Jenis Belanja</h4>'
                +'</div>'
                +'<div class="modal-body">'
                  	+'<form>'
                  		+'<input type="hidden" value="" id="ganti-selected"/>'
                      	+'<div class="form-group">'
                      		+'<label class="control-label">Jenis Belanja Asal</label>'
                          	+'<select class="form-control" name="ganti-jbl-asal" id="ganti-jbl-asal" disabled></select>'
                      	+'</div>'
                      	+'<div class="form-group ganti-rekening">'
                      		+'<label class="control-label">Rekening / Akun Asal</label>'
                          	+'<select class="form-control" name="ganti-rek-asal" id="ganti-rek-asal" disabled></select>'
                      	+'</div>'
                      	+'<div class="form-group ganti-rekening">'
                      		+'<label class="control-label">Pilih Rekening / Akun</label>'
                          	+'<select class="form-control" name="pilih-ganti-rek" id="pilih-ganti-rek">'
                            +'</select>'
                      	+'</div>'
                      	+'<div class="form-group ganti-kelompok">'
                      		+'<label class="control-label">Kelompok Asal</label>'
                          	+'<select class="form-control" name="ganti-kelompok-asal" id="ganti-kelompok-asal" disabled></select>'
                      	+'</div>'
                      	+'<div class="form-group ganti-kelompok">'
                      		+'<label class="control-label">Pilih Kelompok</label>'
                          	+'<select class="form-control" name="pilih-ganti-kelompok" id="pilih-ganti-kelompok">'
                            +'</select>'
                      	+'</div>'
                      	+'<div class="form-group ganti-keterangan">'
                      		+'<label class="control-label">Keterangan Asal</label>'
                          	+'<select class="form-control" name="ganti-keterangan-asal" id="ganti-keterangan-asal" disabled></select>'
                      	+'</div>'
                      	+'<div class="form-group ganti-keterangan">'
                      		+'<label class="control-label">Pilih Keterangan</label>'
                          	+'<select class="form-control" name="pilih-ganti-keterangan" id="pilih-ganti-keterangan">'
                            +'</select>'
                      	+'</div>'
                  	+'</form>'
                +'</div>'
                +'<div class="modal-footer">'
                    +'<button type="button" class="btn btn-success" id="simpan-ganti-rek">Simpan</button>'
                    +'<button type="button" class="btn btn-default" data-dismiss="modal">Tutup</button>'
                +'</div>'
            +'</div>'
        +'</div>'
    +'</div>';
jQuery('body').append(modal);
var import_excel = ''
	+'<button class="fcbtn btn btn-success btn-outline btn-1b" id="import_excel">'
		+'<i class="fa fa-cloud-upload m-r-5"></i> <span>Import Excel</span>'
	+'</button>'
	+'<button class="fcbtn btn btn-danger btn-outline btn-1b" id="hapus_multi_komponen">'
		+'<i class="fa fa-cloud-upload m-r-5"></i> <span>Hapus Multi komponen</span>'
	+'</button>';
jQuery('.tambah-detil').closest('.pull-right.p-t-20').prepend(import_excel);
jQuery('#hapus_multi_komponen').on('click', function(){
	var selected = [];
	jQuery('.hapus-multi-komponen').map(function(i, b){
		if(jQuery(b).is(':checked')){
			var val = jQuery(b).val();
			if(val){
				selected.push(val);
			}
		}
	});
	if(selected.length == 0){
		if(jQuery('#_select_all').length == 0){
			var _select_all = '<label style="margin-left: 30px;"><input type="checkbox" onclick="select_all({start: 0, type:\'all\', checked: this.checked});" id="_select_all" style="margin: 0;"> Select All</label>';
			jQuery('#table_rinci_length').append(_select_all);
		}
		var rekening = '';
		var kelompok = '';
		var keterangan = '';
		jQuery('#table_rinci tbody tr').map(function(i, b){
			var td = jQuery(b).find('td');
			var val = td.eq(7).find('.btn-danger').attr('onclick');
			if(val){
				val = val.split("'")[3];
			}
			if(td.eq(0).find('.hapus-multi-komponen').length == 0){
				var onclick = '';
				var _class = 'class="hapus-multi-komponen"';
				var edit_all = ''
				if(!val){
					val = '';
					// _class = '';
					var text = td.eq(0).text();
					var type = 'rekening';
					if(text.indexOf('[#]') != -1){
						type = 'kelompok';
						kelompok = text;
						keterangan = '';
						rekening = '';
					}else if(text.indexOf('[-]') != -1){
						type = 'keterangan';
						keterangan = text;
						rekening = '';
					}else{
						rekening = text;
					}
					onclick = 'onclick="select_all({start: '+i+', type:\''+type+'\', checked: this.checked});"'
					edit_all = ''
						+'<a href="javascript:;" onclick="ubahKomponenAll(\''+type+'\', this);" style="margin-left: 20px;" class="btn btn-info btn-outline btn-circle m-r-5">'
							+'<i class="ti-pencil-alt"></i>'
						+'</a>';
				}
				td.eq(0).html('<input kelompok="'+kelompok+'" keterangan="'+keterangan+'" rekening="'+rekening+'" type="checkbox" value="'+val+'" '+onclick+' '+_class+'> '+td.eq(0).html()+edit_all);
			}
		});
		alert('Pilih komponen dulu!');
	}else{
		if(confirm('Apakah anda yakin untuk menghapus data ini? ('+selected.join(', ')+')')){
			jQuery('#wrap-loading').show();
			var id_unit = window.location.href.split('?')[0].split(''+config.id_daerah+'/')[1];
			jQuery('.tambah-detil').click();
			jQuery('.tambah-detil').click();
			var kodesbl = jQuery('input[name="kodesbl"]').val();
			var last = selected.length-1;
			selected.reduce(function(sequence3, nextData3){
	            return sequence3.then(function(current_data3){
	        		return new Promise(function(resolve_reduce3, reject_reduce3){
						jQuery.ajax({
			              	url: '../../hapus-rincian/'+config.id_daerah+'/'+id_unit,
			              	type: "POST",
			              	data:{"_token": $('meta[name=_token]').attr('content'),"skrim":CR64('kodesbl='+kodesbl+'&idbelanjarinci='+current_data3+'&jeniskk=0')},
			              	success: function(data){
			              		resolve_reduce3(nextData3);
			              	}
			            });
	        		})
	                .catch(function(e){
	                    console.log(e);
	                    return Promise.resolve(nextData3);
	                });
	            })
	            .catch(function(e){
	                console.log(e);
	                return Promise.resolve(nextData3);
	            });
	        }, Promise.resolve(selected[last]))
	        .then(function(){
				jQuery.ajax({
                    url: "../../refresh-belanja/"+config.id_daerah+'/'+id_unit,
                    type: "post",
                    data:{"_token":jQuery('meta[name=_token]').attr('content'),"kodesbl":kodesbl},
                    success: function(hasil){
                      	var res=hasil.split("||");
                      	var pagu, rinci;
                      	if(res[0]==0){ pagu=0; } else if(res[0]!=0){ pagu = jQuery.number(res[0],0,',','.'); }
                      	if(res[1]==0){ rinci=0; } else if(res[1]!=0){ rinci = jQuery.number(res[1],0,',','.'); }
                      	jQuery(".statustotalpagu").html(pagu);
                      	jQuery(".statustotalrincian").html(rinci);
						jQuery('#wrap-loading').hide();
						alert('Berhasil hapus multi komponen!');
                    }
              	});
              	if(thpStatus=="murni"){
                	jQuery('#table_rinci').DataTable().ajax.reload();
              	}else if(thpStatus=="perubahan" || thpStatus=="pergeseran"){
                	jQuery('#table_rinci_perubahan').DataTable().ajax.reload();
              	}
	        });
		}
	}
});
jQuery('#import_excel').on('click', function(){
	jQuery('#mod-import-excel').modal('show');
});
jQuery('#simpan-excel').on('click', function(){
	jQuery('#wrap-loading').show();
	if(confirm('Apakah anda yakin untuk menyimpan data!')){
		insertRKA();
	}
});
jQuery('#jenis_data').on('change', function(){
	var jenis = jQuery(this).val();
	jQuery('.excel-opsional').hide();
	jQuery('.excel-opsional select').html('');
	jQuery('#label-excel').attr('href', '#');
	jQuery('#label-excel').text('');
	if(jenis != ''){
		jQuery('#label-excel').text('DOWNLOAD DI SINI');
	}
	if(jenis == 'dana-desa'){
		jQuery('#label-excel').attr('href', ext_url+'excel/ADD-2021.xlsx');
		jQuery('#jenis-bel-excel').html(jQuery('select[name="jenisbl"]').html());
		jQuery('#jenis-bel-excel').val('BANKEU').trigger('change');
		jQuery('#jenis-bel-excel').attr('disabled', true);
		// jQuery('#rek-excel').html();
		jQuery('#paket-excel').html(jQuery('select[name="subtitle"]').html());
		jQuery('#keterangan-excel').html(jQuery('select[name="keterangan"]').html());
		jQuery('#satuan-excel').html(jQuery('select[name="satuan1"]').html());
		jQuery('#satuan-excel').select2();
		jQuery('.group-dana-desa').show();
	}else if(jenis == 'bagi-hasil'){
		jQuery('#label-excel').attr('href', ext_url+'excel/ADD-2021.xlsx');
		jQuery('#jenis-bel-excel').html(jQuery('select[name="jenisbl"]').html());
		jQuery('#jenis-bel-excel').val('BAGI-HASIL').trigger('change');
		jQuery('#jenis-bel-excel').attr('disabled', true);
		// jQuery('#rek-excel').html();
		jQuery('#paket-excel').html(jQuery('select[name="subtitle"]').html());
		jQuery('#keterangan-excel').html(jQuery('select[name="keterangan"]').html());
		jQuery('#satuan-excel').html(jQuery('select[name="satuan1"]').html());
		jQuery('#satuan-excel').select2();
		jQuery('.group-dana-desa').show();
	}else if(jenis == 'dana-bos'){
		jQuery('#label-excel').attr('href', ext_url+'excel/ADD-2021.xlsx');
		jQuery('#jenis-bel-excel').html(jQuery('select[name="jenisbl"]').html());
		jQuery('#jenis-bel-excel').val('BOS').trigger('change');
		jQuery('#jenis-bel-excel').attr('disabled', true);
		// jQuery('#rek-excel').html();
		jQuery('#paket-excel').html(jQuery('select[name="subtitle"]').html());
		jQuery('#keterangan-excel').html(jQuery('select[name="keterangan"]').html());
		jQuery('#satuan-excel').html(jQuery('select[name="satuan1"]').html());
		jQuery('#satuan-excel').select2();
		jQuery('.group-dana-desa').show();
	}
});
jQuery('#jenis-bel-excel').on('change', function(){
	jQuery('#wrap-loading').show();
	jQuery('#rek-excel').html('');
	var jenisbl = jQuery(this).val();
	if(jenisbl != ''){
		jQuery.ajax({
		    url: "../../cari-rekening/"+config.id_daerah+"/"+id_unit,
		    type: "post",
		    data: "_token="+jQuery('meta[name=_token]').attr('content')+'&idbl=0&idsubbl=0'+'&komponenkel='+jenisbl,
		    success: function(data){
		      	jQuery("#rek-excel").html(data);
				jQuery('#wrap-loading').hide();
		    },
		    error: function(jqXHR, textStatus, error){
				jQuery('#wrap-loading').hide();
		      	swal({
			        title: "Error",
			        text: "Kesalahan sistem, Silahkan melapor ke Pusdatin Sekretariat Jenderal Kementerian dalam Negeri dengan menyertakan foto atau video saat melakukan proses ini",
			        confirmButtonColor: "#EF5350",
			        type: "error"
		      	});
		    }
		});
	}
});

var oFileIn;
jQuery(function() {
    oFileIn = document.getElementById('file_input');
    if(oFileIn.addEventListener) {
        oFileIn.addEventListener('change', filePicked, false);
    }
});

function insertRKA(){
	var type_data = jQuery('#jenis_data').val();
    if(type_data == ''){
    	return alert('Jenis Data Excel tidak boleh kosong!');
    }
	var excel = jQuery('#file_output').val();
	if(excel ==''){
    	return alert('Data Excel tidak boleh kosong!');
	}
	excel = JSON.parse(excel);
	var id_unit = window.location.href.split('?')[0].split(''+config.id_daerah+'/')[1];
	var id_kel = jQuery('select[name="kelurahan"] option').filter(function () { return jQuery(this).html() == "Poncol"; }).val();
	var jenis_belanja = jQuery('#jenis-bel-excel').val();
	var id_rek_akun = jQuery('#rek-excel').val();
	var id_pengelompokan = jQuery('#paket-excel').val();
	var id_keterangan = jQuery('#keterangan-excel').val();
	var vol = jQuery('#volum-excel').val();
	var satuantext = jQuery('#satuan-excel option:selected').text();
	var satuan = jQuery('#satuan-excel').val();
	jQuery('.tambah-detil').click();
	jQuery.ajax({
      	url: '../../tampil-provinsi/'+config.id_daerah+'/'+id_unit,
      	type: "post",
      	data: "_token="+$('meta[name=_token]').attr('content')+'&id_unit='+id_unit,
      	success: function(data_prov){
			var sendData = excel.map(function(b, i){
				return new Promise(function(resolve, reject){
		      		var id_prov = jQuery('<select>'+data_prov+'</select>').find('option').filter(function(){
		      			return jQuery(this).html().toLocaleLowerCase() == b[5].toLocaleLowerCase();
		      		}).val();
		      		if(id_prov == ''){
		      			b[6] = 'Provinsi tidak ditemukan';
		      			resolve(b);
		      		}else{
			      		jQuery.ajax({
				        	url: "../../tampil-kab-kota/"+config.id_daerah+"/"+id_unit,
				        	type: "post",
				        	data: "_token="+jQuery('meta[name=_token]').attr('content')+'&idprop='+id_prov,
				            success: function(data_kab){
					      		var id_kab = jQuery('<select>'+data_kab+'</select>').find('option').filter(function(){
					      			return jQuery(this).html().toLocaleLowerCase() == b[4].replace(/Kabupaten/g, 'Kab.').toLocaleLowerCase();
					      		}).val();
					      		if(id_kab == ''){
					      			b[6] = 'Kabupaten / Kota tidak ditemukan';
					      			resolve(b);
					      		}else{
						      		jQuery.ajax({
							          	url: "../../tampil-camat/"+config.id_daerah+"/"+id_unit,
							          	type: "post",
							          	data: "_token="+jQuery('meta[name=_token]').attr('content')+'&idprop='+id_prov+'&idkokab='+id_kab,
							          	success: function(data_kec){
							            	var id_kec = jQuery('<select>'+data_kec+'</select>').find('option').filter(function(){
								      			return jQuery(this).html().toLocaleLowerCase() == b[3].replace(/Kecamatan /g, '').toLocaleLowerCase();
								      		}).val();
								      		if(id_kec == ''){
								      			b[6] = 'Kecamatan tidak ditemukan';
								      			resolve(b);
								      		}else{
									      		jQuery.ajax({
										          	url: "../../tampil-lurah/"+config.id_daerah+"/"+id_unit,
										          	type: "post",
										          	data: "_token="+jQuery('meta[name=_token]').attr('content')+'&idprop='+id_prov+'&idkokab='+id_kab+'&idcamat='+id_kec,
										          	success: function(data_kel){
										            	var id_kel = jQuery('<select>'+data_kel+'</select>').find('option').filter(function(){
											      			return jQuery(this).html().toLocaleLowerCase() == b[1].toLocaleLowerCase();
											      		}).val();
											      		if(id_kel == ''){
											      			b[6] = 'Desa / Kelurahan tidak ditemukan';
											      			resolve(b);
											      		}else{
											      			var id_lokasi = {
											      				id_prov: id_prov,
											      				id_kab: id_kab,
											      				id_kec: id_kec,
											      				id_kel: id_kel
											      			};
											      			b[6] = id_lokasi;
											      			b[7] = {
											      				jenis_belanja: jenis_belanja,
											      				id_rek_akun: id_rek_akun,
											      				id_pengelompokan: id_pengelompokan,
											      				id_keterangan: id_keterangan
											      			};
											      			var skrim = ''
											      				+'kodesbl='+jQuery('input[name="kodesbl"]').val()
											      				+'&idbelanjarinci='
											      				+'&idakunrinci='
											      				+'&jenisbl='+jenis_belanja
												      			+'&akun='+encodeURIComponent(id_rek_akun)
												      			+'&subtitle='+id_pengelompokan
												      			+'&uraian_penerima='
												      			+'&id_penerima='
												      			+'&prop='+id_prov
												      			+'&kab_kota='+id_kab
												      			+'&kecamatan='+id_kec
												      			+'&kelurahan='+id_kel
												      			+'&komponenkel='
												      			+'&komponen='
												      			+'&idkomponen='
												      			+'&spek='
												      			+'&satuan='+encodeURIComponent(satuantext)
												      			+'&hargasatuan='+b[2]
												      			+'&keterangan='+id_keterangan
												      			+'&volum1='+vol
												      			+'&satuan1='+satuan
												      			+'&volum2='
												      			+'&satuan2='
												      			+'&volum3='
												      			+'&satuan3='
												      			+'&volum4='
												      			+'&satuan4=';
													        b[8] = skrim;
											      			jQuery.ajax({
													          	url: config.sipd_url+"daerah/main/budget/belanja/"+config.tahun_anggaran+"/rinci/simpan-belanjarinci/"+config.id_daerah+"/"+id_unit,
													          	type: "post",
													          	data: "_token="+jQuery('meta[name=_token]').attr('content')+'&skrim='+CR64(skrim),
													          	success: function(data_kel){
											      					resolve(b);
													          	},
													          	error: function(jqXHR, textStatus, error){
													      			b[9] = 'Error ajax simpan rincian';
													      			resolve(b);
													          	}
													       	});
											      		}
										          	},
										          	error: function(jqXHR, textStatus, error){
										      			b[6] = 'Error ajax kelurahan';
										      			resolve(b);
										          	}
										        });
									      	}
							          	},
							          	error: function(jqXHR, textStatus, error){
							      			b[6] = 'Error ajax kecamatan';
							      			resolve(b);
							          	}
							        });
						      	}
				            },
				            error: function(jqXHR, textStatus, error){
				      			b[6] = 'Error ajax kabupaten';
				      			resolve(b);
				            }
				        });
			      	}
				})
			    .catch(function(e){
			        console.log(e);
			        return Promise.resolve({});
			    });
			});
			Promise.all(sendData)
			.then(function(all_status){
				console.log(all_status);
				jQuery('.close-form').click();
				jQuery.ajax({
	                url: "../../refresh-belanja/"+config.id_daerah+"/"+id_unit,
	                type: "post",
	                data:{"_token":jQuery('meta[name=_token]').attr('content'),"kodesbl":jQuery('input[name="kodesbl"]').val()},
	                success: function(hasil){
	                  	var res=hasil.split("||");
	                 	var pagu, rinci;
	                  	if(res[0]==0){ pagu=0; } else if(res[0]!=0){ pagu = jQuery.number(res[0],0,',','.'); }
	                  	if(res[1]==0){ rinci=0; } else if(res[1]!=0){ rinci = jQuery.number(res[1],0,',','.'); }
	                  	jQuery(".statustotalpagu").html(pagu);
	                  	jQuery(".statustotalrincian").html(rinci);
						jQuery('#wrap-loading').hide();
						alert('Berhasil simpan data!');
	                }
              	});

              	if(thpStatus=="murni"){
	                jQuery('#table_rinci').DataTable().ajax.reload();
              	}else if(thpStatus=="perubahan" || thpStatus=="pergeseran"){
	                jQuery('#table_rinci_perubahan').DataTable().ajax.reload();
              	}
			})
		    .catch(function(err){
		        console.log('err', err);
				alert('Ada kesalahan sistem!');
				jQuery('#wrap-loading').hide();
		    });
      	},
      	error: function(jqXHR, textStatus, error) {
	        alert('Error ajax get data provinsi');
	  	}
    });
}

function filePicked(oEvent) {
    // Get The File From The Input
    var oFile = oEvent.target.files[0];
    var sFilename = oFile.name;
    // Create A File Reader HTML5
    var reader = new FileReader();

    reader.onload = function(e) {
      	var data = e.target.result;
      	var workbook = XLSX.read(data, {
        	type: 'binary'
      	});

      	workbook.SheetNames.forEach(function(sheetName) {
	        // Here is your object
	        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
	        var type_data = jQuery('#jenis_data').val();
	        if(type_data == ''){
	        	return alert('Jenis Data Excel tidak boleh kosong!');
	        }else if(
	        	type_data == 'dana-desa'
	        	|| type_data == 'bagi-hasil'
	        ){
	        	var data = [];
	        	var kec = '';
	        	var kab = '';
	        	var prov = '';
	        	XL_row_object.map(function(b, i){
	        		var isnan = [];
	        		var data_pasti = [];
	        		for(var n in b){
	        			var val = +b[n].trim().replace(/,/g,'');
	        			if(isNaN(val)){ 
	        				isnan.push(b[n]);
	        				data_pasti.push(b[n]);
	        			}else{
	        				data_pasti.push(val);
	        			}
	        		}
	        		if(data_pasti.length < 3){
	        			return;
	        		}
	        		if(isnan.length >= 2 && kec != data_pasti[1] && data_pasti[1].indexOf('Kecamatan') != -1){
	        			kec = data_pasti[1];
	        		}
	        		if(isnan.length >= 2 && kab != data_pasti[1] && (data_pasti[1].indexOf('Kabupaten') != -1 || data_pasti[1].indexOf('Kota') != -1)){
	        			kab = data_pasti[1];
	        		}
	        		if(isnan.length >= 2 && prov != data_pasti[1] && data_pasti[1].indexOf('Provinsi') != -1){
	        			prov = data_pasti[1];
	        		}
	        		data_pasti.push(kec);
	        		data_pasti.push(kab);
	        		data_pasti.push(prov);
	        		if(isnan.length <= 1){
	        			data.push(data_pasti);
	        		}
	        	});
		        var json_object = JSON.stringify(data);
		        console.log(data);
		        jQuery("#file_output").html(json_object);
	        }else if(
	        	type_data == 'dana-bos'
	        ){
	        	var data = [];
	        	var kec = '';
	        	var kab = '';
	        	var prov = '';
	        	XL_row_object.map(function(b, i){
	        		console.log('b', b);
	        	});
		        var json_object = JSON.stringify(data);
		        console.log(data);
		        jQuery("#file_output").html(json_object);
	        }
      	});
	};

    reader.onerror = function(ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(oFile);
}

function select_all(opsi){
	var tr_id = opsi.start;
	var type = opsi.type;
	var checked = opsi.checked;
	if(type == 'all'){
		jQuery('.hapus-multi-komponen').prop('checked', checked);
	}else{
		var cek = false;
		jQuery('#table_rinci tbody tr').map(function(i, b){
			if(i > tr_id && !cek){
				var td = jQuery(b).find('td');
				if(td.length == 1){
					var text = td.eq(0).text();
					if(type == 'kelompok' && text.indexOf('[#]') != -1){
						cek = true;
					}else if(
						type == 'keterangan' 
						&& (text.indexOf('[#]') != -1 || text.indexOf('[-]') != -1)
					){
						cek = true;
					}else if(
						type == 'rekening'
					){
						cek = true;
					}
				}
				if(!cek){
					td.eq(0).find('.hapus-multi-komponen').prop('checked', checked);
				}
			}
		});
	}
}

function gantiRekKomponen(type, selected){
	jQuery('#wrap-loading').show();
	jQuery('#mod-ganti-rek').modal('show');
	var id_unit = window.location.href.split('?')[0].split(''+config.id_daerah+'/')[1];
	var jenisbl = jQuery('select[name="jenisbl"]').val();
	jQuery('#ganti-jbl-asal').html(jQuery('select[name="jenisbl"]').html());
	jQuery('#ganti-jbl-asal').val(jenisbl);
	jQuery('#simpan-ganti-rek').attr('data-type', type);
	if(selected){
		jQuery('#ganti-selected').val(selected.join(','));
	}else{
		jQuery('#ganti-selected').val('');
	}
	if(!type || type == 'rekening'){
		var rek_asal = jQuery('select[name="akun"]').val();
		jQuery('.ganti-kelompok').hide();
		jQuery('.ganti-keterangan').hide();
		jQuery('#ganti-rek-asal').html(jQuery('select[name="akun"]').html());
		jQuery('#ganti-rek-asal').val(rek_asal);
		jQuery.ajax({
		    url: "../../cari-rekening/"+config.id_daerah+"/"+id_unit,
		    type: "post",
		    data: "_token="+jQuery('meta[name=_token]').attr('content')+'&idbl=0&idsubbl=0'+'&komponenkel='+jenisbl,
		    success: function(data){
		      	jQuery("#pilih-ganti-rek").html(data);
		      	jQuery("#pilih-ganti-rek").val(rek_asal);
				jQuery('#wrap-loading').hide();
		    }
		});
	} else if(type == 'kelompok'){
		var kelompok_asal = jQuery('select[name="subtitle"]').val();
		jQuery('.ganti-rekening').hide();
		jQuery('.ganti-keterangan').hide();
		jQuery('#ganti-kelompok-asal').html(jQuery('select[name="subtitle"]').html());
		jQuery('#ganti-kelompok-asal').val(kelompok_asal);
      	jQuery("#pilih-ganti-kelompok").html(jQuery('select[name="subtitle"]').html());
      	jQuery("#pilih-ganti-kelompok").val(kelompok_asal);
		jQuery('#wrap-loading').hide();
	} else if(type == 'keterangan'){
		var keterangan_asal = jQuery('select[name="keterangan"]').val();
		jQuery('.ganti-rekening').hide();
		jQuery('.ganti-kelompok').hide();
		jQuery('#ganti-keterangan-asal').html(jQuery('select[name="keterangan"]').html());
		jQuery('#ganti-keterangan-asal').val(keterangan_asal);
      	jQuery("#pilih-ganti-keterangan").html(jQuery('select[name="keterangan"]').html());
      	jQuery("#pilih-ganti-keterangan").val(keterangan_asal);
	}
}

function ubahKomponenAll(type, that){
	var selected = [];
	var checkbox = jQuery(that).parent().find('input');
	var kelompok = checkbox.attr('kelompok');
	var keterangan = checkbox.attr('keterangan');
	var rekening = checkbox.attr('rekening');
	jQuery('.hapus-multi-komponen').map(function(i, b){
		if(jQuery(b).is(':checked')){
			var _kelompok = jQuery(b).attr('kelompok');
			var _keterangan = jQuery(b).attr('keterangan');
			var _rekening = jQuery(b).attr('rekening');
			var val = jQuery(b).val();
			if(
				val
				&& (
					(
						type == 'rekening'
						&& _kelompok == kelompok
						&& _keterangan == keterangan
						&& _rekening == rekening
					)
					|| (
						type == 'keterangan'
						&& _keterangan == keterangan
						&& _rekening == rekening
					)
					|| (
						type == 'kelompok'
						&& _kelompok == kelompok
					)
				)
			){
				selected.push(val);
			}
		}
	});
	if(selected.length == 0){
		alert('Pilih komponen dulu!');
	}else{
		jQuery('.close-form').click();
		jQuery('.tambah-detil').click();
		jQuery('.tambah-detil').click();
		var kodesbl = jQuery('input[name="kodesbl"]').val();
		ubahKomponen(kodesbl, selected[0]);
		setTimeout(function(){
			gantiRekKomponen(type, selected);
		}, 1000);
	}
}

var f_ubah = ubahKomponen.toString();
var ganti_rek = '<button class="btn btn-danger btn-sm pull-right" style="margin: 0px 0px 5px 0px" id="ganti-rek-sce" onclick="gantiRekKomponen(); return false;" type="button">Ganti Rekening</button>';
eval(f_ubah.replace(/.$/," jQuery('.group-kodrek-komponen label').eq(0).append('"+ganti_rek+"') }"));

jQuery(".windowtoggle").on("click",function(){
	jQuery('#ganti-rek-sce').remove();
});

jQuery('#simpan-ganti-rek').on("click", function(){
	var type = jQuery('#simpan-ganti-rek').attr('data-type');
	if(!type || type == 'rekening'){
		if(confirm('Apakah anda yakin untuk merubah rekening dari komponen ini? Data komponen akan dihapus dan diinput dengan rekening yang baru!')){
			jQuery('select[name="akun"]').attr('disabled', false);
			jQuery('select[name="akun"]').html(jQuery('#pilih-ganti-rek').html());
			jQuery('select[name="akun"]').val(jQuery('#pilih-ganti-rek').val()).trigger('change');
			var kodesbl = jQuery('input[name="kodesbl"]').val();
			var idblrinci = jQuery('input[name="idbelanjarinci"]').val();
			if(kodesbl && idblrinci){
				hapusKomponen(kodesbl,idblrinci);
			}
			jQuery('input[name="idbelanjarinci"]').val('');
			jQuery('input[name="idakunrinci"]').val('');
			jQuery('#mod-ganti-rek').modal('hide');
			jQuery('#ganti-rek-asal').html('');
			jQuery('#pilih-ganti-rek').html('');
			jQuery('#ganti-jbl-asal').html('');
		}
	}else if(type == 'kelompok'){

	}else if(type == 'keterangan'){

	}
});