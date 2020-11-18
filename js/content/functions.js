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
		var _default = "";
		if(config.tgl_rka == 'auto'){
			var tgl = new Date();
			var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
			_default = tgl.getDate()+' '+bulan[tgl.getMonth()-1]+' '+tgl.getFullYear();
		}else{
			_default = config.tgl_rka;
		}
		var tgl = prompt("Input tanggal tandatangan RKA", _default);
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
}