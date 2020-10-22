// http://swwwitch.com/dl/Font-Awesome-Cheetsheet-4.5.0.pdf
jQuery(document).ready(function(){
	var loading = ''
		+'<div id="wrap-loading">'
	        +'<div class="lds-hourglass"></div>'
	    +'</div>';
	jQuery('body').prepend(loading);

	if(document.getElementById('table_komponen')){ 
		var singkron_ssh = ''
			+'<button class="fcbtn btn btn-warning btn-outline btn-1b" id="singkron_ssh_ke_lokal">'
				+'<i class="fa fa-cloud-download m-r-5"></i> <span>Singkron SSH ke DB lokal</span>'
			+'</button>'
			+'<button class="fcbtn btn btn-danger btn-outline btn-1b" id="singkron_ssh_dari_lokal" style="display: none;">'
				+'<i class="fa fa-cloud-upload m-r-5"></i> <span>Singkron SSH dari DB lokal</span>'
			+'</button>';
		jQuery('button.arsip-komponen').parent().prepend(singkron_ssh);
		jQuery('#singkron_ssh_ke_lokal').on('click', function(){
			singkron_ssh_ke_lokal();
		});
		jQuery('#singkron_ssh_dari_lokal').on('click', function(){
			singkron_ssh_dari_lokal();
		});

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
						data.data.map(function(b, i){
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
					}
				});
			}
		}

		function singkron_ssh_dari_lokal(){
			if(confirm('Apakah anda yakin melakukan ini? data lama akan diupdate dengan data terbaru.')){
				
			}
		}
	}
});