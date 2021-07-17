window._token = jQuery('input[name="_tawon"]').val();
window.v1bnA1m = jQuery('.logos input[type="hidden"]').val();

if(typeof tokek == 'undefined'){
  tokek = jQuery('input[name="_tawon"]').val();
}
if(typeof v1bnA1m == 'undefined'){
  v1bnA1m = jQuery('.logos input[type="hidden"]').val();
}

window.formData = new FormData();
if(typeof tokek != 'undefined'){
  console.log('tokek', tokek);
  console.log('v1bnA1m', v1bnA1m);
  formData.append('_token', tokek);
  formData.append('v1bnA1m', v1bnA1m);
}

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

jQuery('#tambah-penerima-ex').on('click', function(){
    var rekening = jQuery('select[name=akun] option:selected').val();
    jQuery("input[name=filter-penerima]").val('');
    jQuery('#table_penerima').DataTable().destroy();
    jQuery('#table_penerima').DataTable({
        scrollY:'40vh',
        autoWidth: true,
        serverSide: true,
        responsive: true,
        processing: true,
        pagingType: "full_numbers",
        dom:'rltip',
        pageLength: 20,
        lengthMenu: [
            [20, 50, 100, -1],
            [20, 50, 100, "All"] // change per page values here
        ],
        ajax: {
            url: lru13,
            type: "POST",
            data: {
                _token: _token,
                v1bnA1m: v1bnA1m,
                DsK121m: C3rYDq("rekening=8681||bos")
            },
        },
        columns: [
        {data: 'id_profil', name: 'pr.id_profil',width:50},
        {data: 'nama_teks', name: 'pr.nama_teks',width:200},
        {data: 'alamat_teks', name: 'pr.alamat_teks',width:200},
        {data: 'jenis_penerima', name: 'jenis_penerima',width:50, searchable: false},
        ],
        order:[['1','asc']],
    });
    jQuery("#table_penerima").DataTable().columns().header().to$().css("text-align", "left");
    jQuery("#table_penerima").DataTable().columns().header().to$().css("padding-right", "10px");
    jQuery("#table_penerima").DataTable().columns().header().to$().css("vertical-align", "middle");
    jQuery('#mod-data-penerima').modal('show');
    jQuery('.dtpenerima-filter',this).on('keyup change',function(){
        if(jQuery('#table_penerima').DataTable().search() !== this.value){
            jQuery('#table_penerima').DataTable().search( this.value ).draw();
        }
    });
});

jQuery('select[name="prop_penerima"]').on('change', function(){
    var _parent = jQuery(this).parent();
    if(_parent.find('.id-info').length == 0){
        _parent.find('label').append(' <span class="id-info"></span>');
    }
    _parent.find('.id-info').html('ID : '+jQuery(this).val());
});
jQuery('select[name="kab_kota_penerima"]').on('change', function(){
    var _parent = jQuery(this).parent();
    if(_parent.find('.id-info').length == 0){
        _parent.find('label').append(' <span class="id-info"></span>');
    }
    _parent.find('.id-info').html('ID : '+jQuery(this).val());
});
jQuery('select[name="kecamatan_penerima"]').on('change', function(){
    var _parent = jQuery(this).parent();
    if(_parent.find('.id-info').length == 0){
        _parent.find('label').append(' <span class="id-info"></span>');
    }
    _parent.find('.id-info').html('ID : '+jQuery(this).val());
});
jQuery('select[name="kelurahan_penerima"]').on('change', function(){
    var _parent = jQuery(this).parent();
    if(_parent.find('.id-info').length == 0){
        _parent.find('label').append(' <span class="id-info"></span>');
    }
    _parent.find('.id-info').html('ID : '+jQuery(this).val());
});

var id_unit = window.location.href.split('?')[0].split(''+config.id_daerah+'/')[1];
window.url_ssh = jQuery('span.hide-menu:contains("SSH")').closest('a').attr('href');
window.url_sbu = jQuery('span.hide-menu:contains("SBU")').closest('a').attr('href');
window.url_hspk = jQuery('span.hide-menu:contains("HSPK")').closest('a').attr('href');
window.url_asb = jQuery('span.hide-menu:contains("ASB")').closest('a').attr('href');
var komponen = ''
	+'<label class="col-xs-12 font-bold" style="margin-top: 20px;">Cari Komponen dengan <a href="'+url_ssh+'" target="_blank">ID Encrypte Standar Harga</a></label>'
    +'<div class="col-xs-10">'
      	+'<input class="form-control" type="text" placeholder="ID Standar Harga" id="komponen-id-sipd">'
    +'</div>'
    +'<div class="col-xs-2">'
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

var tombol_tambahan = ''
    +'<button class="fcbtn btn btn-success btn-outline btn-1b" id="tampil-profil">'
        +'<i class="fa fa-eyes m-r-5"></i> <span>Tampil Profil</span>'
    +'</button>';
jQuery('.button-box').prepend(tombol_tambahan);
jQuery('#tampil-profil').on('click', function(){
    tampil_profil();
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
	                        +'<label style="margin-left: 30px;"><input type="checkbox" id="keterangan-otomatis"> (Otomatis dari Excel)</label>'
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
                      	+'<div class="form-group ganti-jbl">'
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
if(jQuery('button.tambah-detil').length >= 1 && config.tampil_edit_hapus_rinci){
    import_excel += ''
        +'<button class="fcbtn btn btn-warning btn-outline btn-1b" id="tampil_edit_del">'
            +'<i class="fa fa-eye m-r-5"></i> <span>Tampil Ubah & Hapus</span>'
        +'</button>';
}
jQuery('.tambah-detil').closest('.pull-right.p-t-20').prepend(import_excel);
jQuery('#tampil_edit_del').on('click', function(){
    tampil_edit_del();
});
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
    var table_rinci = 'table_rinci';
    var td_action = 7;
    if(jQuery('#table_rinci').length == 0){
      table_rinci = 'table_rinci_perubahan';
      var td_action = 11;
    }
		jQuery('#'+table_rinci+' tbody tr').map(function(i, b){
			var td = jQuery(b).find('td');
			var val = td.eq(td_action).find('.btn-danger').attr('onclick');
			if(val){
				val = val.split("'")[1];
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
						relayAjax({
			              	url: config.sipd_url+'daerah/main/?'+current_data3,
			              	type: "POST",
			              	data:{
                                _token: _token,
                                v1bnA1m: v1bnA1m,
                                DsK121m: C3rYDq('jeniskk=0')
                            },
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
                relayAjax({
                    url: lru10,
                    type: "post",
                    data: formData,
                    processData: false,
                    contentType: false,
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
		jQuery('#label-excel').attr('href', ext_url+'excel/BOS-HIBAH.xlsx');
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
        var customFormData = new FormData();
        customFormData.append('_token', tokek);
        customFormData.append('v1bnA1m', v1bnA1m);
        customFormData.append('DsK121m', C3rYDq("komponenkel="+jenisbl));
		relayAjax({
    		url: lru3,
            type: "post",
            data: customFormData,
            processData: false,
            contentType: false,
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

/* untuk memastikan kode_sbl berhasil tersetting */
jQuery('.tambah-detil').click();
jQuery('.tambah-detil').click();

// tambahkan callback
var f_ubah = ubahKomponen.toString().replace('function ubahKomponen(_0x5e0d9a){', 'function ubahKomponen(_0x5e0d9a, callback){');

// jalankan callback setelah rincian berhasil diload (fungsi ini perlu sealalu diupdate ketika ada encrypt JS)
f_ubah = f_ubah.replace('$("select[name=satuan4]")', 'if(callback){ callback() }; $("select[name=satuan4]")');

// run function baru dan tambahkan tombol ganti rekening
var ganti_rek = '<button class="btn btn-danger btn-sm pull-right" style="margin: 0px 0px 5px 0px" id="ganti-rek-sce" onclick="gantiRekKomponen(); return false;" type="button" id="open_ganti_rek">Ganti Rekening</button>';
eval(f_ubah.replace(/.$/," if(jQuery('#open_ganti_rek').length==0){ jQuery('.group-kodrek-komponen label').eq(0).append('"+ganti_rek+"') } }"));

jQuery(".windowtoggle").on("click",function(){
	jQuery('#ganti-rek-sce').remove();
});

jQuery('#simpan-ganti-rek').on("click", function(){
	var type = jQuery('#simpan-ganti-rek').attr('data-type');
	var selected = jQuery('#ganti-selected').val();
	if(confirm('Apakah anda yakin untuk merubah data dari komponen ini idbelanjarinci="'+selected+'"? Data komponen lama akan dihapus dan diinput dengan data yang baru!')){
        jQuery('#wrap-loading').show();
		var kodesbl = jQuery('input[name="kodesbl"]').val();
		selected = selected.split(',');
		var last = selected.length-1;
		selected.reduce(function(sequence, nextData){
            return sequence.then(function(current_data){
        		return new Promise(function(resolve_redurce, reject_redurce){
                    jQuery('.close-form').click();
                    setTimeout(function(){
                        ubahKomponen(kodesbl, current_data, function(){
        					var idblrinci = jQuery('input[name="idbelanjarinci"]').val();
    						jQuery('select[name="subtitle"]').html(jQuery('#pilih-ganti-kelompok').html());
    						jQuery('select[name="subtitle"]').val(jQuery('#pilih-ganti-kelompok').val()).trigger('change');
    						jQuery('select[name="keterangan"]').html(jQuery('#pilih-ganti-keterangan').html());
    						jQuery('select[name="keterangan"]').val(jQuery('#pilih-ganti-keterangan').val()).trigger('change');
        					if(!type || type == 'rekening'){
        						jQuery('select[name="akun"]').attr('disabled', false);
        						jQuery('select[name="akun"]').html(jQuery('#pilih-ganti-rek').html());
        						jQuery('select[name="akun"]').val(jQuery('#pilih-ganti-rek').val()).trigger('change');
        						jQuery('input[name="idbelanjarinci"]').val('');
        						jQuery('input[name="idakunrinci"]').val('');
        					}
        					if(kodesbl && idblrinci && idblrinci==current_data){
                                return new Promise(function(resolve_redurce2, reject_redurce2){
                                    if(!type || type == 'rekening'){
                                        relayAjax({
                			              	// url: "../../hapus-rincian/"+config.id_daerah+"/"+id_unit,
                			              	// data:{"_token": jQuery('meta[name=_token]').attr('content'),"skrim":CR64('kodesbl='+kodesbl+'&idbelanjarinci='+idblrinci+'&jeniskk=0')},
                                            url: config.sipd_url+'daerah/main/?'+current_data,
                                            type: "POST",
                                            data:{
                                                _token: _token,
                                                v1bnA1m: v1bnA1m,
                                                DsK121m: C3rYDq('jeniskk=0')
                                            },
                                            success: function(data){
                                                resolve_redurce2();
                                            }
                                        });
                                    }else{
                                        resolve_redurce2();
                                    }
        			          	}).then(function(){
                                    var customFormData = new FormData();
                                    customFormData.append('_token', tokek);
                                    customFormData.append('v1bnA1m', v1bnA1m);
                                    customFormData.append('DsK121m', C3rYDq(jQuery('#formdetilrincian').serialize()));
                                    // resolve(raw2); console.log(raw2);
                                    relayAjax({
                                        url: lru9,
                                        type: "post",
                                        data: customFormData,
                                        processData: false,
                                        contentType: false,
    						          	success: function(data){
    			              				resolve_redurce(nextData);
    						          	}
    						        });
                                });
        					}else{
        						console.log('skip karena idbelanjarinci salah!', 'kodesbl, idblrinci, current_data', kodesbl, idblrinci, current_data)
        					}
                        });
                    }, 1000);
        		 })
                .catch(function(e){
                    console.log(e);
                    return Promise.resolve(nextData);
                });
            })
            .catch(function(e){
                console.log(e);
                return Promise.resolve(nextData);
            });
        }, Promise.resolve(selected[last]))
        .then(function(data_last){
            jQuery('.close-form').click();
			jQuery('#mod-ganti-rek').modal('hide');
			jQuery('#ganti-jbl-asal').html('');
			jQuery('#ganti-rek-asal').html('');
			jQuery('#pilih-ganti-rek').html('');
			jQuery('#ganti-kelompok-asal').html('');
			jQuery('#pilih-ganti-kelompok').html('');
			jQuery('#ganti-keterangan-asal').html('');
			jQuery('#pilih-ganti-keterangan').html('');
			relayAjax({
                url: "../../refresh-belanja/"+config.id_daerah+"/"+id_unit,
                type: "post",
                data:{"_token":jQuery('meta[name=_token]').attr('content'),"kodesbl": kodesbl},
                success: function(hasil){
                  	var res=hasil.split("||");
                  	var pagu, rinci;
                  	if(res[0]==0){ pagu=0; } else if(res[0]!=0){ pagu = jQuery.number(res[0],0,',','.'); }
                  	if(res[1]==0){ rinci=0; } else if(res[1]!=0){ rinci = jQuery.number(res[1],0,',','.'); }
                  	jQuery(".statustotalpagu").html(pagu);
                  	jQuery(".statustotalrincian").html(rinci);
                    jQuery('#wrap-loading').hide();
                }
          	});

          	if(thpStatus=="murni"){
            	jQuery('#table_rinci').DataTable().ajax.reload();
          	}else if(thpStatus=="perubahan" || thpStatus=="pergeseran"){
            	jQuery('#table_rinci_perubahan').DataTable().ajax.reload();
          	}
        });
	}
});