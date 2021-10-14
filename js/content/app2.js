jQuery(document).ready(function () {
    var current_url = window.location.href;

    if (
        jQuery('h3.page-title').text().indexOf('Sub Kegiatan') != -1
    ) {
        console.log('Halaman referensi sub kegiatan')
        var singkron_data_giat = ''
            + '<a class="fcbtn btn btn-danger" id="singkron_data_giat_lokal">'
                + '<i class="fa fa-cloud-download m-r-5"></i> <span>Singkron Program Kegiatan ke DB lokal</span>'
            + '</a>';
        jQuery('#reset_submit').parent().append(singkron_data_giat);
        jQuery('#singkron_data_giat_lokal').on('click', function () {
            singkron_data_giat_lokal();
        });
    } else if (
        jQuery('h3.page-title').text().indexOf('Sumber Pendanaan') != -1
    ) {
        console.log('Halaman referensi Sumber Dana')
        var singkron_sumber_dana = ''
            + '<button class="fcbtn btn btn-danger" id="singkron_sumber_dana_lokal">'
                + '<i class="fa fa-cloud-download m-r-5"></i> <span>Singkron Sumber Dana ke DB lokal</span>'
            + '</button>';
        jQuery('#table_dana').closest('.white-box').find('.pull-right').prepend(singkron_sumber_dana);
        jQuery('#singkron_sumber_dana_lokal').on('click', function () {
            singkron_sumber_dana_lokal();
        });
    } else if (
        jQuery('h3.page-title').text().indexOf('Penyusunan RPJMD') != -1
    ) {
        console.log('Halaman Penyusunan RPJMD');
        var singkron_data_rpjmd = ''
            +'<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">'
                + '<button class="fcbtn btn btn-danger pull-right" id="singkron_data_rpjmd_lokal">'
                    + '<i class="fa fa-cloud-download m-r-5"></i> <span>Singkron RPJMD ke DB lokal</span>'
                + '</button>'
            +'</div>';
        jQuery('.bg-title').append(singkron_data_rpjmd);

        jQuery('#singkron_data_rpjmd_lokal').on('click', function () {
            singkron_data_rpjmd_lokal();
        });
    } else if (
        jQuery('h3.page-title').text().indexOf('Penyusunan RENSTRA') != -1
    ) {
        console.log('halaman RENSTRA');
        var jadwal_kunci = cekJadwal();
        console.log('jadwal_kunci', jadwal_kunci);
        if(jadwal_kunci > 0){
            var cek_koneksi_rpjm = ''
                + '<button class="fcbtn btn btn-success" id="cek-koneksi-rpjm" style="margin-right: 10px;">'
                    + '<i class="fa fa-eye m-r-5"></i> <span>Cek Status Koneksi Tujuan RENSTRA Dengan Sasaran RPJM</span>'
                + '</button>';
            jQuery('.tambah-tujuan').before(cek_koneksi_rpjm);
        }
        var singkron_data_renstra = ''
            +'<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">'
                + '<button class="fcbtn btn btn-danger pull-right" id="singkron-renstra-lokal">'
                    + '<i class="fa fa-cloud-download m-r-5"></i> <span>Singkron RENSTRA ke DB lokal</span>'
                + '</button>'
            +'</div>';
        jQuery('.bg-title').append(singkron_data_renstra);
        jQuery('#singkron-renstra-lokal').on('click', function(){
            jQuery('#wrap-loading').show();
            singkron_renstra_lokal();
        });
        jQuery('#cek-koneksi-rpjm').on('click', function(){
            jQuery('#wrap-loading').show();
            var jml_tujuan = 0;
            var sendData = [];
            jQuery('#table_kamus_tujuan td[align="right"] a.btn-primary.btn-circle').map(function(n, m){
                sendData.push(new Promise(function(resolve, reject){
                    var ids = jQuery(m).attr('onclick').split('"');
                    var tr = jQuery(m).closest('tr');
                    tr.find('td').map(function(i, b){ jQuery(b).removeClass('tujuan_tak_konek'); });
                    var formDataCustom = new FormData();
                    formDataCustom.append('_token', tokek);
                    formDataCustom.append('v1bnA1m', v1bnA1m);
                    formDataCustom.append('DsK121m', Curut('kamus=tujuan&kodekamus='+ids[1]+'&idopd='+ids[3]+'&aksi=ubah_kamus'));
                    relayAjax({
                        url: lru11,
                        type: 'post',
                        data: formDataCustom,
                        processData: false,
                        contentType: false,
                        success: function (kamus) {
                            var formDataCustom = new FormData();
                            formDataCustom.append('_token', tokek);
                            formDataCustom.append('v1bnA1m', v1bnA1m);
                            formDataCustom.append('DsK121m', Curut('idskpd='+kamus.id_skpd+'&idbidur='+kamus.id_bidur));
                            relayAjax({
                                url: lru14,
                                type: 'post',
                                data: formDataCustom,
                                processData: false,
                                contentType: false,
                                success: function (sasaran_rpjm) {
                                    // cek jika kode sasaran RPJM tidak ditemukan
                                    if(sasaran_rpjm.indexOf("value='"+kamus.kode_sasaran_rpjm+"'") == -1){
                                        tr.find('td').map(function(i, b){ jQuery(b).addClass('tujuan_tak_konek'); });
                                        jml_tujuan++;
                                    }
                                    resolve(true);
                                }
                            });
                        }
                    });
                }));
            });
            Promise.all(sendData)
            .then(function(all_data){
                jQuery('#wrap-loading').hide();
                if(jml_tujuan == 0){
                    alert('Selamat! Semua tujuan RENSTRA sudah terkoneksi dengan sasaran RPJM.');
                }else{
                    alert('Ada '+jml_tujuan+' tujuan RENSTRA yang tidak terkoneksi dengan sasaran RPJM! Ditandai dengan baris berwarna merah.');
                }
            });
        });
    }
});