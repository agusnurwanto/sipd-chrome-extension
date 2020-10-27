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

	 // halaman SSH
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
	}else if(window.location.href.indexOf('rka-bl-rinci/cetak') != -1){
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
	}
});