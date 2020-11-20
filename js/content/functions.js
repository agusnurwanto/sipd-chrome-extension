function ttd_kepala_daerah(target){
	var jabatan = "";
	var daerah = window.location.href.split('.')[0].split('//')[1];
	if(window.location.href.split('.')[0].indexOf('kab')){
		jabatan = 'Bupati';
		daerah = daerah.replace('kab', '');
	}else if(window.location.href.split('.')[0].indexOf('prov')){
		jabatan = 'Gubernur';
		daerah = daerah.replace('prov', '');
	}else{
		jabatan = 'Walikota';
	}
	if(config.tgl_rka){
		var tgl = get_tanggal();
		var ttd = '<br>'+capitalizeFirstLetter(daerah)+', Tanggal '+tgl+'<br>'+jabatan+'<br><br><br><br><br>'+config.kepala_daerah;
		var length = 0;
		target.map(function(n, j){
			jQuery(j).find('tr').eq(0).find('td').map(function(i, b){
				var colspan = jQuery(b).attr('colspan');
				if(!colspan){
					colspan = 1;
				}
				length += +colspan;
			});
			jQuery(j).append('<tr><td colspan="'+length+'"><div style="width: 400px; float: right; font-weight: bold; line-height: 1.5; text-align: center">'+ttd+'</div></td></tr>');
		});
	}
	run_download_excel();
}

function get_tanggal(){
	var _default = "";
	if(config.tgl_rka == 'auto'){
		var tgl = new Date();
		var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
		_default = tgl.getDate()+' '+bulan[tgl.getMonth()-1]+' '+tgl.getFullYear();
	}else{
		_default = config.tgl_rka;
	}
	return prompt("Input tanggal tanda tangan", _default);
}

function run_download_excel(){
	var current_url = window.location.href;
	var download_excel = ''
		+'<div id="action-sipd" class="hide-print">'
			+'<a id="excel" onclick="return false;" href="#">DOWNLOAD EXCEL</a>'
		+'</div>';
	// jQuery('td.kiri.kanan.bawah[colspan="13"]').parent().attr('style', 'page-break-inside:avoid; page-break-after:auto');
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

	jQuery('td').map(function(i, b){
		style = jQuery(b).attr('style');
		if (typeof style == 'undefined'){ style = ''; };
		jQuery(b).attr('style', style+' mso-number-format:\\@;');
	});

	jQuery('#excel').on('click', function(){
		var name = "Laporan";
		if(current_url.indexOf('lampiran/'+config.tahun_anggaran+'/kua/41/'+config.id_daerah+'/setunit') != -1){
			name = 'KUA dan PPAS Lampiran 4.1 '+document.querySelectorAll('td[colspan="10"]')[0].innerText;
		}else if(current_url.indexOf('lampiran/'+config.tahun_anggaran+'/kua/42/'+config.id_daerah+'/setunit') != -1){
			name = 'KUA dan PPAS Lampiran 4.2 '+document.querySelectorAll('td[colspan="10"]')[0].innerText;
		}else if(current_url.indexOf('rka-bl-rinci/cetak') != -1){
			name = document.querySelectorAll('.cetak > table table')[1].querySelectorAll('tbody > tr')[7].querySelectorAll('td')[2].innerText;
		}else if(current_url.indexOf('lampiran/'+config.tahun_anggaran+'/apbd') != -1){
			name = jQuery('table[cellpadding="3"]>thead>tr').eq(1).text().trim();
		}
		tableHtmlToExcel('rka', name);
	});
}