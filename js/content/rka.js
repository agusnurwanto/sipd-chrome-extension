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