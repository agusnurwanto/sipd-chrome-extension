function logo_rka(){
	jQuery('#action-sipd').append('<label><input type="radio" id="tampil-logo-rka"> Tampilkan LOGO daerah</label>');
	jQuery('#tampil-logo-rka').on('click', function(){
		if(jQuery('#logo-pemda').length == 0){
			set_logo_rka();
		}
	});
}
function set_logo_rka(){
	var logo = chrome.runtime.getURL("img/logo.png");
	var logo_daerah = '<td rowspan="2" align="center" width="100px" style="padding:10px; border: 1px solid #000; font-weight: bold;"><img id="logo-pemda" src="'+logo+'" width="75px"/></td>';
	jQuery('table[cellpadding="5"]').eq(0).find(' tbody tr').eq(0).prepend(logo_daerah);
}

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
		var ttd = '<br>'+capitalizeFirstLetter(daerah)+', '+tgl+'<br>'+jabatan+'<br><br><br><br><br>'+config.kepala_daerah;
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
			if(n < target.length-1){
				jQuery(j).closest('table').after('<div style="page-break-after:always;"></div>');
			}
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

function getAllUnit(id_unit){
	return new Promise(function(resolve, reject){
		if(typeof(allUnitSCE) == 'undefined'){
			if(!id_unit){
				id_unit = 0;
			};
			jQuery.ajax({
				url: config.sipd_url+'daerah/main/budget/belanja/'+config.tahun_anggaran+'/giat/tampil-unit/'+config.id_daerah+'/'+id_unit,
				type: 'get',
				success: function(unit){
					window.allUnitSCE = unit.data;
					return resolve(unit.data);
				}
			});
		}else{
			return resolve(allUnitSCE);
		}
	});
}

function getAllSubKeg(id_unit){
	return new Promise(function(resolve, reject){
		getAllUnit(id_unit).then(function(unit){
			unit.map(function(b, i){
				if(b.id_unit == id_unit){
					if(!b.data_sub){
						jQuery.ajax({
							url: config.sipd_url+'daerah/main/budget/belanja/'+config.tahun_anggaran+'/giat/tampil-giat/'+config.id_daerah+'/'+id_unit,
							type: 'get',
							success: function(allsub){
								allUnitSCE[i].data_sub = allsub.data; 
								return resolve(allUnitSCE[i].data_sub);
							}
						});
					}else{
						return resolve(b.data_sub);
					}
				}
			});
		})
	});
}

function getRincSubKeg(id_unit, kode_sbl){
	return new Promise(function(resolve, reject){
		getAllSubKeg(id_unit).then(function(allsub){
			allsub.map(function(b, i){
				if(b.kode_sbl == kode_sbl){
					if(!b.data_rinc){
						jQuery.ajax({
							url: config.sipd_url+'daerah/main/budget/belanja/'+config.tahun_anggaran+'/rinci/tampil-rincian/'+config.id_daerah+'/'+id_unit+'?kodesbl='+kode_sbl,
							type: 'get',
							success: function(allrinc){
								allUnitSCE.map(function(un, n){
									if(un.id_unit == id_unit){
										allUnitSCE[n].data_sub[i].data_rinc = allrinc.data;
										return resolve(allUnitSCE[n].data_sub[i].data_rinc);
									}
								})
							}
						});
					}else{
						return resolve(b.data_rinc);
					}
				}
			});
		})
	});
}

function getDetailPenerima(kode_sbl, rek, nomor_lampiran){
	return new Promise(function(resolve, reject){
		if(typeof(allPenerimaSCE) == 'undefined'){
			if(nomor_lampiran == 5){
				return resolve({});
			}else{
				getToken().then(function(_token){
					var _rek = rek;
					if(!_rek){
						_rek = '7168||lainnya';
					}
					jQuery.ajax({
						url: config.sipd_url+'daerah/main/budget/belanja/'+config.tahun_anggaran+'/rinci/tampil-penerima/'+config.id_daerah+'/0',
						type: 'post',
						data: "_token="+_token+'&kodesbl='+kode_sbl+'&rekening='+_rek,
						success: function(penerima){
							window.allPenerimaSCE = penerima.data;
							return resolve(penerima.data);
						}
					});
				});
			}
		}else{
			return resolve(allPenerimaSCE);
		}
	})
    .catch(function(e){
        console.log(e);
        return Promise.resolve({});
    });
}

function getDetailRin(id_unit, kode_sbl, idbelanjarinci, nomor_lampiran){
	return new Promise(function(resolve, reject){
		getToken().then(function(_token){
			jQuery.ajax({
				url: config.sipd_url+'daerah/main/budget/belanja/'+config.tahun_anggaran+'/rinci/cari-rincian/'+config.id_daerah+'/'+id_unit,
				type: 'post',
				data: "_token="+_token+'&kodesbl='+kode_sbl+'&idbelanjarinci='+idbelanjarinci,
				success: function(rinci){
					if(nomor_lampiran == 5){
						getProv(id_unit).then(function(prov){
							if(prov[rinci.id_prop_penerima]){
								rinci.nama_prop = prov[rinci.id_prop_penerima].nama;
								getKab(id_unit, rinci.id_prop_penerima).then(function(kab){
									if(kab[rinci.id_kokab_penerima]){
										rinci.nama_kab = kab[rinci.id_kokab_penerima].nama;
										getKec(id_unit, rinci.id_prop_penerima, rinci.id_kokab_penerima).then(function(kec){
											if(kec[rinci.id_camat_penerima]){
												rinci.nama_kec = kec[rinci.id_camat_penerima].nama;
												getKel(id_unit, rinci.id_prop_penerima, rinci.id_kokab_penerima, rinci.id_camat_penerima).then(function(kel){
													if(kel[rinci.id_lurah_penerima]){
														rinci.nama_kel = kel[rinci.id_lurah_penerima].nama;
														return resolve(rinci);
													}else{
														return resolve(rinci);
													}
												});
											}else{
												return resolve(rinci);
											}
										});
									}else{
										return resolve(rinci);
									}
								});
							}else{
								return resolve(rinci);
							}
						});
					}else{
						return resolve(rinci);
					}
				}
			});
		});
	});
}

function getKel(id_unit, id_prov, id_kab, id_kec){
	return new Promise(function(resolve, reject){
		if(typeof(alamat.kab[id_prov].kec[id_kab].kel[id_kec]) == 'undefined'){
			getToken().then(function(_token){
				jQuery.ajax({
					url: config.sipd_url+'daerah/main/budget/belanja/'+config.tahun_anggaran+'/rinci/tampil-lurah/'+config.id_daerah+'/'+id_unit,
					type: 'post',
					data: "_token="+_token+'&idprop='+id_prov+'&idkokab='+id_kab+'&idcamat='+id_kec,
					success: function(ret){
						if(!alamat.kab[id_prov].kec[id_kab].kel[id_kec]){
							alamat.kab[id_prov].kec[id_kab].kel[id_kec] = {};
						};
						jQuery('<select>'+ret+'</select>').find('option').map(function(i, b){
							var id_kel = jQuery(b).attr('value');
							var nama = jQuery(b).text();
							if(id_kel != 0){
								alamat.kab[id_prov].kec[id_kab].kel[id_kec][id_kel] = { 
									nama: nama,
									id_kel: id_kel
								};
							}
						});
						return resolve(alamat.kab[id_prov].kec[id_kab].kel[id_kec]);
					}
				});
			});
		}else{
			return resolve(alamat.kab[id_prov].kec[id_kab].kel[id_kec]);
		}
	});
}

function getKec(id_unit, id_prov, id_kab){
	return new Promise(function(resolve, reject){
		if(typeof(alamat.kab[id_prov].kec[id_kab]) == 'undefined'){
			getToken().then(function(_token){
				jQuery.ajax({
					url: config.sipd_url+'daerah/main/budget/belanja/'+config.tahun_anggaran+'/rinci/tampil-camat/'+config.id_daerah+'/'+id_unit,
					type: 'post',
					data: "_token="+_token+'&idprop='+id_prov+'&idkokab='+id_kab,
					success: function(ret){
						if(!alamat.kab[id_prov].kec[id_kab]){
							alamat.kab[id_prov].kec[id_kab] = {
								kel: {}
							};
						};
						jQuery('<select>'+ret+'</select>').find('option').map(function(i, b){
							var id_kec = jQuery(b).attr('value');
							var nama = jQuery(b).text();
							if(id_kec != 0){
								alamat.kab[id_prov].kec[id_kab][id_kec] = { 
									nama: nama,
									id_kec: id_kec
								};
							}
						});
						return resolve(alamat.kab[id_prov].kec[id_kab]);
					}
				});
			});
		}else{
			return resolve(alamat.kab[id_prov].kec[id_kab]);
		}
	});
}

function getKab(id_unit, id_prov){
	return new Promise(function(resolve, reject){
		if(typeof(alamat.kab[id_prov]) == 'undefined'){
			getToken().then(function(_token){
				jQuery.ajax({
					url: config.sipd_url+'daerah/main/budget/belanja/'+config.tahun_anggaran+'/rinci/tampil-kab-kota/'+config.id_daerah+'/'+id_unit,
					type: 'post',
					data: "_token="+_token+'&idprop='+id_prov,
					success: function(ret){
						if(!alamat.kab[id_prov]){
							alamat.kab[id_prov] = {
								kec: {}
							};
						};
						jQuery('<select>'+ret+'</select>').find('option').map(function(i, b){
							var id_kab = jQuery(b).attr('value');
							var nama = jQuery(b).text();
							if(id_kab!=0){
								alamat.kab[id_prov][id_kab] = { 
									nama: nama,
									id_kab: id_kab
								};
							}
						});
						return resolve(alamat.kab[id_prov]);
					}
				});
			});
		}else{
			return resolve(alamat.kab[id_prov]);
		}
	});
}

function getProv(id_unit){
	return new Promise(function(resolve, reject){
		if(typeof(alamat) == 'undefined'){
			getToken().then(function(_token){
				jQuery.ajax({
					url: config.sipd_url+'daerah/main/budget/belanja/'+config.tahun_anggaran+'/rinci/tampil-provinsi/'+config.id_daerah+'/'+id_unit,
					type: 'post',
					data: "_token="+_token+'&idunit='+id_unit,
					success: function(ret){
						alamat = {
							kab: {}
						};
						jQuery('<select>'+ret+'</select>').find('option').map(function(i, b){
							var val = jQuery(b).attr('value');
							var nama = jQuery(b).text();
							if(val!=0){
								alamat[val] = { 
									nama: nama,
									val: val
								};
							}
						});
						return resolve(alamat);
					}
				});
			});
		}else{
			return resolve(alamat);
		}
	});
}

function getToken(){
	return new Promise(function(resolve, reject){
		if(typeof(tokenSCE) == 'undefined'){
			var token = jQuery('meta[name=_token]').attr('content');
			if(!token){
				jQuery.ajax({
					url: config.sipd_url+'daerah/main/budget/dashboard/'+config.tahun_anggaran+'/unit/'+config.id_daerah+'/0',
					type: 'get',
					success: function(html){
						html = html.split('<meta name="_token" content="');
						html = html[1].split('"');
						window.tokenSCE = html[0];
						return resolve(tokenSCE);
					}
				});
			}else{
				window.tokenSCE = token;
				return resolve(tokenSCE);
			}
		}else{
			return resolve(tokenSCE);
		}
	})
    .catch(function(e){
        console.log(e);
        return Promise.resolve('');
    });
}

function formatRupiah(angka, prefix){
	var number_string = angka.replace(/[^,\d]/g, '').toString(),
	split   		= number_string.split(','),
	sisa     		= split[0].length % 3,
	rupiah     		= split[0].substr(0, sisa),
	ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);

	// tambahkan titik jika yang di input sudah menjadi angka ribuan
	if(ribuan){
		separator = sisa ? '.' : '';
		rupiah += separator + ribuan.join('.');
	}

	rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
	return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
}

function getNomorLampiran(){
	var current_url = window.location.href;
	return current_url.split('apbd/')[1].split('/')[0];
}

function getMultiAkunByJenisBl(jenis_bls, id_unit, kode_sbl, jenis_akun){
	return new Promise(function(resolve, reject){
		var jenis_bl = jenis_bls.split(',');
		var sendData = jenis_bl.map(function(b, i){
			return new Promise(function(resolve2, reject2){
				getAkunByJenisBl(b, id_unit, kode_sbl).then(function(akun){
					resolve2(akun);
				});
			})
	        .catch(function(e){
	            console.log(e);
	            return Promise.resolve({});
	        });
	    });
	    Promise.all(sendData)
		.then(function(all_akun){
			var ret = {};
			all_akun.map(function(b, i){
				for(var n in b){
					ret[n] = b[n];
				}
			});
			new Promise(function(resolve2, reject2){
				if(!akunBl['all-akun']){
					jQuery.ajax({
						url: config.sipd_url+'daerah/main/budget/akun/'+config.tahun_anggaran+'/tampil-akun/'+config.id_daerah+'/0',
						type: 'get',
						success: function(ret){
							akunBl['all-akun'] = ret.data;
							return resolve2(akunBl['all-akun']);
						}
					});
				}else{
					return resolve2(akunBl['all-akun']);
				}
			}).then(function(all_akun){
				jenis_akun = jenis_akun.split(',');
				for(var i in all_akun){
					jenis_akun.map(function(d, n){
						if(all_akun[i][d]==1){
							ret[all_akun[i].kode_akun] = {
								nama: all_akun[i].nama_akun,
								kode: all_akun[i].kode_akun,
								val: all_akun[i].id_akun
							}
						}
					});
				}
				return resolve(ret);
			})
		});
	});
}

function getAkunByJenisBl(jenis_bl, id_unit, kode_sbl){
	return new Promise(function(resolve, reject){
		if(typeof(akunBl) == 'undefined' || !akunBl[jenis_bl]){
			getToken().then(function(_token){
				jQuery.ajax({
					url: config.sipd_url+'daerah/main/budget/belanja/'+config.tahun_anggaran+'/rinci/cari-rekening/'+config.id_daerah+'/'+id_unit,
					type: 'post',
					data: "_token="+_token+'&kodesbl='+kode_sbl+'&komponenkel='+jenis_bl,
					success: function(ret){
						if(typeof(akunBl) == 'undefined'){
							window.akunBl = {};
						}
						var akun = {};
						jQuery('<select>'+ret+'</select>').find('option').map(function(i, b){
							var val = jQuery(b).attr('value');
							var nama = jQuery(b).text();
							var kode = nama.split(' ')[0];
							akun[kode] = { 
								nama: nama,
								kode: kode,
								val: val
							};
						});
						akunBl[jenis_bl] = akun;
						return resolve(akunBl[jenis_bl]);
					}
				});
			});
		}else{
			return resolve(akunBl[jenis_bl]);
		}
	});
}

function singkron_master_cse(val){
	jQuery('#wrap-loading').show();
	console.log('val', val);
	if(val == 'penerima_bantuan'){
		getDetailPenerima('0', false, 0).then(function(_data){
			var data_profile = { 
				action: 'singkron_penerima_bantuan',
				tahun_anggaran: config.tahun_anggaran,
				api_key: config.api_key,
				profile : {}
			};
			_data.map(function(profile, i){
				data_profile.profile[i] = {};
				data_profile.profile[i].alamat_teks = profile.alamat_teks;
				data_profile.profile[i].id_profil = profile.id_profil;
				data_profile.profile[i].jenis_penerima = profile.jenis_penerima;
				data_profile.profile[i].nama_teks = profile.nama_teks;
			});
			var data = {
			    message:{
			        type: "get-url",
			        content: {
					    url: config.url_server_lokal,
					    type: 'post',
					    data: data_profile,
		    			return: true
					}
			    }
			};
			chrome.runtime.sendMessage(data, function(response) {
			    console.log('responeMessage', response);
			});
		});
	}else if(val == 'alamat'){
		var id_unit = 0;
		getProv(id_unit).then(function(prov){
			var data_alamat = { 
				action: 'singkron_alamat',
				tahun_anggaran: config.tahun_anggaran,
				api_key: config.api_key,
				alamat : {}
			};
			var data_prov_map = [];
			for(var i in prov){
				if(i != 'kab'){
					data_alamat.alamat[i] = {};
					data_alamat.alamat[i].nama = prov[i].nama;
					data_alamat.alamat[i].id_alamat = prov[i].val;
					data_alamat.alamat[i].id_prov = '';
					data_alamat.alamat[i].id_kab = '';
					data_alamat.alamat[i].id_kec = '';
					data_alamat.alamat[i].is_prov = 1;
					data_alamat.alamat[i].is_kab = '';
					data_alamat.alamat[i].is_kec = '';
					data_alamat.alamat[i].is_kel = '';
					data_prov_map.push(data_alamat.alamat[i]);
				}
			}
			var data_prov = {
			    message:{
			        type: "get-url",
			        content: {
					    url: config.url_server_lokal,
					    type: 'post',
					    data: data_alamat,
		    			return: false
					}
			    }
			};
			chrome.runtime.sendMessage(data_prov, function(response) {
			    console.log('responeMessage', response);
			});
			var last = data_prov_map.length-1;
			data_prov_map.reduce(function(sequence, nextData){
                return sequence.then(function(current_data){
                	return new Promise(function(resolve_reduce, reject_reduce){
                		console.log('current_data', current_data);
						getKab(id_unit, current_data.id_alamat).then(function(kab){
							var data_alamat_kab = { 
								action: 'singkron_alamat',
								tahun_anggaran: config.tahun_anggaran,
								api_key: config.api_key,
								alamat : {}
							};
							var data_kab_map = [];
							for(var j in kab){
								if(j != 'kec' && j != 0){
									data_alamat_kab.alamat[j] = {};
									data_alamat_kab.alamat[j].nama = kab[j].nama;
									data_alamat_kab.alamat[j].id_alamat = kab[j].id_kab;
									data_alamat_kab.alamat[j].id_prov = current_data.id_alamat;
									data_alamat_kab.alamat[j].id_kab = '';
									data_alamat_kab.alamat[j].id_kec = '';
									data_alamat_kab.alamat[j].is_prov = '';
									data_alamat_kab.alamat[j].is_kab = 1;
									data_alamat_kab.alamat[j].is_kec = '';
									data_alamat_kab.alamat[j].is_kel = '';
									data_kab_map.push(data_alamat_kab.alamat[j]);
								}
							}
							var data_kab = {
							    message:{
							        type: "get-url",
							        content: {
									    url: config.url_server_lokal,
									    type: 'post',
									    data: data_alamat_kab,
						    			return: false
									}
							    }
							};
							chrome.runtime.sendMessage(data_kab, function(response) {
							    console.log('responeMessage', response);
							});
							var last2 = data_kab_map.length-1;
							data_kab_map.reduce(function(sequence2, nextData2){
	                			return sequence2.then(function(current_data2){
                					return new Promise(function(resolve_reduce2, reject_reduce2){
                						console.log('current_data2', current_data2);
										getKec(id_unit, current_data2.id_prov, current_data2.id_alamat).then(function(kec){
											var data_alamat_kec = { 
												action: 'singkron_alamat',
												tahun_anggaran: config.tahun_anggaran,
												api_key: config.api_key,
												alamat : {}
											};
											var data_kec_map = [];
											for(var k in kec){
												if(k != 'kel' && k != 0){
													data_alamat_kec.alamat[k] = {};
													data_alamat_kec.alamat[k].nama = kec[k].nama;
													data_alamat_kec.alamat[k].id_alamat = kec[k].id_kec;
													data_alamat_kec.alamat[k].id_prov = current_data2.id_prov;
													data_alamat_kec.alamat[k].id_kab = current_data2.id_alamat;
													data_alamat_kec.alamat[k].id_kec = '';
													data_alamat_kec.alamat[k].is_prov = '';
													data_alamat_kec.alamat[k].is_kab = '';
													data_alamat_kec.alamat[k].is_kec = 1;
													data_alamat_kec.alamat[k].is_kel = '';
													data_kec_map.push(data_alamat_kec.alamat[k]);
												}
											}
											var data_kec = {
											    message:{
											        type: "get-url",
											        content: {
													    url: config.url_server_lokal,
													    type: 'post',
													    data: data_alamat_kec,
										    			return: false
													}
											    }
											};
											chrome.runtime.sendMessage(data_kec, function(response) {
											    console.log('responeMessage', response);
											});
											var last3 = data_kec_map.length-1;
											data_kec_map.reduce(function(sequence3, nextData3){
					                			return sequence3.then(function(current_data3){
				                					return new Promise(function(resolve_reduce3, reject_reduce3){
                										console.log('current_data3', current_data3);
														getKel(id_unit, current_data3.id_prov, current_data3.id_kab, current_data3.id_alamat).then(function(kel){
															var data_alamat_kel = { 
																action: 'singkron_alamat',
																tahun_anggaran: config.tahun_anggaran,
																api_key: config.api_key,
																alamat : {}
															};
															for(var l in kel){
																if(l != 0){
																	data_alamat_kel.alamat[l] = {};
																	data_alamat_kel.alamat[l].nama = kel[l].nama;
																	data_alamat_kel.alamat[l].id_alamat = kel[l].id_kel;
																	data_alamat_kel.alamat[l].id_prov = current_data3.id_prov;
																	data_alamat_kel.alamat[l].id_kab = current_data3.id_kab;
																	data_alamat_kel.alamat[l].id_kec = current_data3.id_alamat;
																	data_alamat_kel.alamat[l].is_prov = '';
																	data_alamat_kel.alamat[l].is_kab = '';
																	data_alamat_kel.alamat[l].is_kec = '';
																	data_alamat_kel.alamat[l].is_kel = 1;
																}
															}
															var data_kel = {
															    message:{
															        type: "get-url",
															        content: {
																	    url: config.url_server_lokal,
																	    type: 'post',
																	    data: data_alamat_kel,
														    			return: false
																	}
															    }
															};
															chrome.runtime.sendMessage(data_kel, function(response) {
															    console.log('responeMessage', response);
															});
															resolve_reduce3(nextData3);
														});
													});
												})
								                .catch(function(e){
								                    console.log(e);
								                    return Promise.resolve(nextData3);
								                });
							                }, Promise.resolve(data_kec_map[last3]))
								            .then(function(data_last){
								            	return resolve_reduce2(nextData2);
								            });
										});
									})
					                .catch(function(e){
					                    console.log(e);
					                    return Promise.resolve(nextData2);
					                });
								})
				                .catch(function(e){
				                    console.log(e);
				                    return Promise.resolve(nextData2);
				                });
				            }, Promise.resolve(data_kab_map[last2]))
				            .then(function(data_last){
				            	return resolve_reduce(nextData);
				            });
						});
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
            }, Promise.resolve(data_prov_map[last]))
            .then(function(data_last){
            	alert('Berhasil simpan data master Alamat!');
				jQuery('#wrap-loading').hide();
            });
		});
	}else{
		jQuery('#wrap-loading').hide();
	}
}

function tampil_alamat_rka(kode_sub, tr_all, callback){
	if(!callback){
		jQuery('#wrap-loading').show();
	}
	var id_unit = window.location.href.split('?')[0].split(''+config.id_daerah+'/')[1];
	if(!kode_sub){
		kode_sub = jQuery('table[cellpadding="2"]').eq(0).find('tr').eq(5).find('td').eq(2).html().split('&nbsp;')[0];
	}
	jQuery.ajax({
		url: config.sipd_url+'daerah/main/budget/belanja/'+config.tahun_anggaran+'/giat/tampil-giat/'+config.id_daerah+'/'+id_unit,
		type: 'get',
		success: function(subkeg){
			var kode_sbl = '';
			subkeg.data.map(function(b, i){
				if(b.kode_sub_giat == kode_sub && b.nama_sub_giat.mst_lock != 3){
					kode_sbl = b.nama_sub_giat.kode_sbl;
				}
			});
			if(kode_sbl == ''){
				return alert('kode_sbl tidak ditemukan!');
			}
			getRincSubKeg(id_unit, kode_sbl).then(function(all_rinc){
				var akun = {
					kode: '',
					nama: '',
					data: {}
				};
				var kelompok = '';
				var keterangan = '';
				var all_data = [];
				jQuery('table[cellpadding="5"]').eq(4).find('>tbody>tr').map(function(i, b){
					if(tr_all && !tr_all[i]){
						return;
					}else{
						var td = jQuery(b).find('td');
						if(td.length == 3){
							var kode = td.eq(0).text().trim();
							var nama = td.eq(1).text().trim();
							if(kode && kode.split('.').length==6){
								akun.kode = kode; 
								akun.nama = nama;
							}else if(kode == ''){
								if(nama.indexOf('[#]') != -1){
									kelompok = nama;
									akun.data[kelompok] = {};	
								}else if(nama.indexOf('[-]') != -1){
									keterangan = nama;
									akun.data[kelompok][keterangan] = [];
								}
							}
						}else if(td.length == 7){
							var item = {
								nama : td.eq(1).find('div').eq(0).text().trim(),
								spek : td.eq(1).find('div').eq(1).text().trim(),
								koef : td.eq(2).text().trim(),
								jumlah : +(td.eq(6).text().trim().replace(/\./g,'').replace('Rp ','')),
								tr_id : i,
								kode_akun : akun.kode,
								nama_akun : akun.nama,
								kelompok : kelompok,
								keterangan : keterangan
							};
							all_data.push(item);
							akun.data[kelompok][keterangan].push(item);
						}
					}
				});
				// console.log('all_data', all_data);

				var last = all_data.length-1;
				all_data.reduce(function(sequence, nextData){
			        return sequence.then(function(current_data){
			    		return new Promise(function(resolve_reduce, reject_reduce){
			    			var idbelanjarinci = '';
			    			var nama_sh = [];
			    			all_rinc.map(function(b, i){
			    				if(
			    					b.kode_akun == current_data.kode_akun
			    					&& b.subs_bl_teks.trim() == current_data.kelompok
			    					&& b.ket_bl_teks.trim() == current_data.keterangan
			    					&& b.nama_standar_harga.nama_komponen.trim() == current_data.nama
			    					&& b.koefisien == current_data.koef
			    					&& b.rincian == current_data.jumlah
			    				){
			    					idbelanjarinci = b.id_rinci_sub_bl;
			    					var nama = '';
			    					if(b.nama_standar_harga.nama_komponen){
			    						nama = b.nama_standar_harga.nama_komponen;
			    					}
			    					var spek = '';
			    					if(b.nama_standar_harga.spek_komponen){
			    						spek = b.nama_standar_harga.spek_komponen;
			    					}
			    					nama_sh = ''
			    						+'<div>'+nama+'</div>'
			    						+'<div style="margin-left: 20px">'+spek+'</div>';
			    					current_data.lokus_akun_teks = b.lokus_akun_teks;
			    				}
			    			});
			    			if(idbelanjarinci != ''){
				    			getDetailPenerima(kode_sbl).then(function(all_penerima){
					    			getDetailRin(id_unit, kode_sbl, idbelanjarinci, 5).then(function(rinci_penerima){
					    				if(rinci_penerima.id_penerima && rinci_penerima.id_penerima != 0){
					    					var cek =  false;
						    				all_penerima.map(function(p, o){
												if(p.id_profil == rinci_penerima.id_penerima){
													cek = true;
													nama_sh += ''
								    					+'<div style="margin-left: 40px">'
								    						+current_data.lokus_akun_teks+' ('+p.alamat_teks+' - '+p.jenis_penerima+')'
						    							+'</div>';
												}
											});
											if(!cek){
			    								console.log('current_data skip (bukan penerima bantuan)', current_data, rinci_penerima);
											}
						    			}else if(rinci_penerima.nama_prop){
						    				nama_sh += ''
						    					+'<div style="margin-left: 40px">'
						    						+'Provinsi '+rinci_penerima.nama_prop
													+', '+rinci_penerima.nama_kab
													+', Kecamatan '+rinci_penerima.nama_kec
													+', '+rinci_penerima.nama_kel;
						    					+'</div>';
						    			}else if(current_data.lokus_akun_teks){
						    				nama_sh += ''
						    					+'<div style="margin-left: 40px">'
						    						+current_data.lokus_akun_teks
				    							+'</div>';
						    			}else{
			    							console.log('current_data skip (bukan penerima bantuan)', current_data);
						    			}
					    				jQuery('table[cellpadding="5"]').eq(4).find('>tbody>tr').eq(current_data.tr_id).find('td').eq(1).html(nama_sh);
					    				resolve_reduce(nextData);
					    			});
					    		});
				    		}else{
			    				console.log('current_data skip (idbelanjarinci tidak ditemukan)', current_data);
					    		resolve_reduce(nextData);
				    		}
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
			    }, Promise.resolve(all_data[last]))
			    .then(function(data_last){
			    	if(callback){
			    		callback();
			    	}else{
			    		jQuery('#wrap-loading').hide();
			    	}
			    })
			    .catch(function(e){
			        console.log(e);
			    	if(callback){
			    		callback();
			    	}else{
			    		jQuery('#wrap-loading').hide();
			    	}
			    });
			});
		}
	});
}

function hapusKomponen(kodesbl,idblrinci){
	var id_unit = window.location.href.split('?')[0].split(''+config.id_daerah+'/')[1];
    jQuery.ajax({
      	url: '../../hapus-rincian/'+config.id_daerah+'/'+id_unit,
      	type: "POST",
      	data:{
      		"_token": jQuery('meta[name=_token]').attr('content'),
      		"skrim":CR64('kodesbl='+kodesbl+'&idbelanjarinci='+idblrinci+'&jeniskk=0')
      	},
      	success: function(data){
          	jQuery.ajax({
	            url: "../../refresh-belanja/"+config.id_daerah+"/"+id_unit,
	            type: "post",
	            data:{"_token":jQuery('meta[name=_token]').attr('content'),"kodesbl":kodesbl},
	            success: function(hasil){
	              	var res=hasil.split("||");
	              	var pagu, rinci;
	              	if(res[0]==0){ pagu=0; } else if(res[0]!=0){ pagu = jQuery.number(res[0],0,',','.'); }
	              	if(res[1]==0){ rinci=0; } else if(res[1]!=0){ rinci = jQuery.number(res[1],0,',','.'); }
	              	jQuery(".statustotalpagu").html(pagu);
	              	jQuery(".statustotalrincian").html(rinci);
	            }
          	});
          	if(thpStatus=="murni"){
            	jQuery('#table_rinci').DataTable().ajax.reload();
          	}else if(thpStatus=="perubahan" || thpStatus=="pergeseran"){
            	jQuery('#table_rinci_perubahan').DataTable().ajax.reload();
          	}
      }
    });
}

function singkron_user_deskel_lokal(){
	jQuery.ajax({
      	url: config.sipd_url+'daerah/main/plan/setup-user/'+config.tahun_anggaran+'/kel-desa/tampil/'+config.id_daerah+'/0',
      	type: "GET",
      	success: function(desa){
      		var last = desa.data.length-1;
      		desa.data.reduce(function(sequence, nextData){
                return sequence.then(function(current_data){
            		return new Promise(function(resolve_reduce, reject_reduce){
            			var data_deskel = { 
							action: 'singkron_user_deskel',
							tahun_anggaran: config.tahun_anggaran,
							api_key: config.api_key,
							data: {}
						};
        				data_deskel.data.camat_teks = current_data.camat_teks;
						data_deskel.data.id_camat = current_data.id_camat;
						data_deskel.data.id_daerah = current_data.id_daerah;
						data_deskel.data.id_level = current_data.id_level;
						data_deskel.data.id_lurah = current_data.id_lurah;
						data_deskel.data.id_profil = current_data.id_profil;
						data_deskel.data.id_user = current_data.id_user;
						data_deskel.data.is_desa = current_data.is_desa;
						data_deskel.data.is_locked = current_data.is_locked;
						data_deskel.data.jabatan = current_data.jabatan;
						data_deskel.data.jenis = current_data.jenis;
						data_deskel.data.kab_kota = current_data.kab_kota;
						data_deskel.data.kode_lurah = current_data.kode_lurah;
						data_deskel.data.login_name = current_data.login_name;
						data_deskel.data.lurah_teks = current_data.lurah_teks;
						data_deskel.data.nama_daerah = current_data.nama_daerah;
						data_deskel.data.nama_user = current_data.nama_user;
						data_deskel.data.accasmas = '';
						data_deskel.data.accbankeu = '';
						data_deskel.data.accdisposisi = '';
						data_deskel.data.accgiat = '';
						data_deskel.data.acchibah = '';
						data_deskel.data.accinput = '';
						data_deskel.data.accjadwal = '';
						data_deskel.data.acckunci = '';
						data_deskel.data.accmaster = '';
						data_deskel.data.accspv = '';
						data_deskel.data.accunit = '';
						data_deskel.data.accusulan = '';
						data_deskel.data.alamatteks = '';
						data_deskel.data.camatteks = '';
						data_deskel.data.daerahpengusul = '';
						data_deskel.data.dapil = '';
						data_deskel.data.emailteks = '';
						data_deskel.data.fraksi = '';
						data_deskel.data.idcamat = '';
						data_deskel.data.iddaerahpengusul = '';
						data_deskel.data.idkabkota = '';
						data_deskel.data.idlevel = '';
						data_deskel.data.idlokasidesa = '';
						data_deskel.data.idlurah = '';
						data_deskel.data.idlurahpengusul = '';
						data_deskel.data.idprofil = '';
						data_deskel.data.iduser = '';
						data_deskel.data.loginname = '';
						data_deskel.data.lokasidesateks = '';
						data_deskel.data.lurahteks = '';
						data_deskel.data.nama = '';
						data_deskel.data.namapengusul = '';
						data_deskel.data.nik = '';
						data_deskel.data.nip = '';
						data_deskel.data.notelp = '';
						data_deskel.data.npwp = '';
            			if(!current_data.id_user){
            				var data = {
							    message:{
							        type: "get-url",
							        content: {
									    url: config.url_server_lokal,
									    type: 'post',
									    data: data_deskel,
						    			return: false
									}
							    }
							};
							chrome.runtime.sendMessage(data, function(response) {
							    console.log('responeMessage', response);
							    resolve_reduce(nextData);
							});
            			}else{
            				jQuery.ajax({
						      	url: config.sipd_url+'daerah/main/plan/setup-user/'+config.tahun_anggaran+'/kel-desa/detil/'+config.id_daerah+'/0',
						      	type: "POST",
	            				data:{"_token":jQuery('meta[name=_token]').attr('content'),"idxuser":current_data.id_user},
						      	success: function(detil){
						      		data_deskel.data.accasmas = detil.accasmas;
									data_deskel.data.accbankeu = detil.accbankeu;
									data_deskel.data.accdisposisi = detil.accdisposisi;
									data_deskel.data.accgiat = detil.accgiat;
									data_deskel.data.acchibah = detil.acchibah;
									data_deskel.data.accinput = detil.accinput;
									data_deskel.data.accjadwal = detil.accjadwal;
									data_deskel.data.acckunci = detil.acckunci;
									data_deskel.data.accmaster = detil.accmaster;
									data_deskel.data.accspv = detil.accspv;
									data_deskel.data.accunit = detil.accunit;
									data_deskel.data.accusulan = detil.accusulan;
									data_deskel.data.alamatteks = detil.alamatteks;
									data_deskel.data.camatteks = detil.camatteks;
									data_deskel.data.daerahpengusul = detil.daerahpengusul;
									data_deskel.data.dapil = detil.dapil;
									data_deskel.data.emailteks = detil.emailteks;
									data_deskel.data.fraksi = detil.fraksi;
									data_deskel.data.idcamat = detil.idcamat;
									data_deskel.data.iddaerahpengusul = detil.iddaerahpengusul;
									data_deskel.data.idkabkota = detil.idkabkota;
									data_deskel.data.idlevel = detil.idlevel;
									data_deskel.data.idlokasidesa = detil.idlokasidesa;
									data_deskel.data.idlurah = detil.idlurah;
									data_deskel.data.idlurahpengusul = detil.idlurahpengusul;
									data_deskel.data.idprofil = detil.idprofil;
									data_deskel.data.iduser = detil.iduser;
									data_deskel.data.jabatan = detil.jabatan;
									data_deskel.data.loginname = detil.loginname;
									data_deskel.data.lokasidesateks = detil.lokasidesateks;
									data_deskel.data.lurahteks = detil.lurahteks;
									data_deskel.data.nama = detil.nama;
									data_deskel.data.namapengusul = detil.namapengusul;
									data_deskel.data.nik = detil.nik;
									data_deskel.data.nip = detil.nip;
									data_deskel.data.notelp = detil.notelp;
									data_deskel.data.npwp = detil.npwp;
									var data = {
									    message:{
									        type: "get-url",
									        content: {
											    url: config.url_server_lokal,
											    type: 'post',
											    data: data_deskel,
								    			return: false
											}
									    }
									};
									chrome.runtime.sendMessage(data, function(response) {
									    console.log('responeMessage', response);
							    		resolve_reduce(nextData);
									});
						      	}
						    });
            			}
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
            }, Promise.resolve(desa.data[last]))
            .then(function(data_last){
            	alert('Berhasil singkron data User Pengusul Kelurahan/Desa!');
            	jQuery('#wrap-loading').hide();
            });
      	}
    });
}

function singkron_user_dewan_lokal(){
	jQuery.ajax({
      	url: config.sipd_url+'daerah/main/plan/setup-user/'+config.tahun_anggaran+'/anggota-dewan/tampil/'+config.id_daerah+'/0',
      	type: "GET",
      	success: function(dewan){
      		var last = dewan.data.length-1;
      		dewan.data.reduce(function(sequence, nextData){
                return sequence.then(function(current_data){
            		return new Promise(function(resolve_reduce, reject_reduce){
            			jQuery.ajax({
					      	url: config.sipd_url+'daerah/main/plan/setup-user/'+config.tahun_anggaran+'/kel-desa/detil/'+config.id_daerah+'/0',
					      	type: "POST",
            				data:{"_token":jQuery('meta[name=_token]').attr('content'),"idxuser":current_data.id_user},
					      	success: function(detil){
		            			var data_dewan = { 
									action: 'singkron_user_dewan',
									tahun_anggaran: config.tahun_anggaran,
									api_key: config.api_key,
									data: {}
								};
								data_dewan.data.accasmas = detil.accasmas;
								data_dewan.data.accbankeu = detil.accbankeu;
								data_dewan.data.accdisposisi = detil.accdisposisi;
								data_dewan.data.accgiat = detil.accgiat;
								data_dewan.data.acchibah = detil.acchibah;
								data_dewan.data.accinput = detil.accinput;
								data_dewan.data.accjadwal = detil.accjadwal;
								data_dewan.data.acckunci = detil.acckunci;
								data_dewan.data.accmaster = detil.accmaster;
								data_dewan.data.accspv = detil.accspv;
								data_dewan.data.accunit = detil.accunit;
								data_dewan.data.accusulan = detil.accusulan;
								data_dewan.data.alamatteks = detil.alamatteks;
								data_dewan.data.camatteks = detil.camatteks;
								data_dewan.data.daerahpengusul = detil.daerahpengusul;
								data_dewan.data.dapil = detil.dapil;
								data_dewan.data.emailteks = detil.emailteks;
								data_dewan.data.fraksi = detil.fraksi;
								data_dewan.data.idcamat = detil.idcamat;
								data_dewan.data.iddaerahpengusul = detil.iddaerahpengusul;
								data_dewan.data.idkabkota = detil.idkabkota;
								data_dewan.data.idlevel = detil.idlevel;
								data_dewan.data.idlokasidesa = detil.idlokasidesa;
								data_dewan.data.idlurah = detil.idlurah;
								data_dewan.data.idlurahpengusul = detil.idlurahpengusul;
								data_dewan.data.idprofil = detil.idprofil;
								data_dewan.data.iduser = detil.iduser;
								data_dewan.data.jabatan = detil.jabatan;
								data_dewan.data.loginname = detil.loginname;
								data_dewan.data.lokasidesateks = detil.lokasidesateks;
								data_dewan.data.lurahteks = detil.lurahteks;
								data_dewan.data.nama = detil.nama;
								data_dewan.data.namapengusul = detil.namapengusul;
								data_dewan.data.nik = detil.nik;
								data_dewan.data.nip = detil.nip;
								data_dewan.data.notelp = detil.notelp;
								data_dewan.data.npwp = detil.npwp;
					      		var data = {
								    message:{
								        type: "get-url",
								        content: {
										    url: config.url_server_lokal,
										    type: 'post',
										    data: data_dewan,
							    			return: false
										}
								    }
								};
								chrome.runtime.sendMessage(data, function(response) {
								    console.log('responeMessage', response);
						    		resolve_reduce(nextData);
								});
					      	}
					    });
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
            }, Promise.resolve(dewan.data[last]))
            .then(function(data_last){
            	alert('Berhasil singkron data User Anggota Dewan!');
            	jQuery('#wrap-loading').hide();
            });
      	}
    });

}

function detil_analisis_belanja(){
	var data_link_akun = [];
	jQuery('#table_standar_harga tbody tr').map(function(i, b){
		var td = jQuery(b).find('td');
		if(td.eq(6).find('.detil_akun').length <= 0){
			var link = td.eq(6).html().split('href="')[1].split('"')[0];
			var no = +td.eq(0).text();
			data_link_akun.push({
				url: link,
				tr: i,
				no: no-1
			});
		}
	});
	var last = data_link_akun.length-1;
	data_link_akun.reduce(function(sequence, nextData){
        return sequence.then(function(current_data){
    		return new Promise(function(resolve_reduce, reject_reduce){
				jQuery.ajax({
			      	url: current_data.url,
			      	type: "GET",
			      	success: function(html){
			      		var link = html.split("budget/analisis/"+config.tahun_anggaran+"/bl/tampil-akun/"+config.id_daerah+"/0")[1].split("'");
			      		jQuery.ajax({
					      	url: config.sipd_url+'daerah/main/budget/analisis/'+config.tahun_anggaran+'/bl/tampil-akun/'+config.id_daerah+'/0'+link,
					      	type: "GET",
					      	success: function(akun){
					      		var rek = [];
					      		akun.data.map(function(b, i){
					      			rek.push(b.kode_akun+' '+b.nama_akun);
					      		});
					      		var ket = ', <br><span class="detil_akun">'+rek.join(', <br>')+'</span>';
					      		jQuery('#table_standar_harga tbody tr').eq(current_data.tr).find('td').eq(6).append(ket);
					      		run_script("jQuery('#table_standar_harga').DataTable().rows().data()["+current_data.no+"].totalakun.nilai += '"+ket+"';");
					      		resolve_reduce(nextData);
					      	}
					    });
			      	}
			    });
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
    }, Promise.resolve(data_link_akun[last]))
    .then(function(data_last){
    	run_script("jQuery('#table_standar_harga').DataTable().row().invalidate();");
    	run_script("jQuery('#table_standar_harga').DataTable().draw();");
    	jQuery('#wrap-loading').hide();
    });
}