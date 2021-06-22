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
            + '<button class="fcbtn btn btn-danger" id="singkron_data_rpjmd_lokal">'
            + '<i class="fa fa-cloud-download m-r-5"></i> <span>Singkron RPJMD ke DB lokal</span>'
            + '</button>';
        jQuery('#reset_program').parent().append(singkron_data_rpjmd);

        jQuery('#singkron_data_rpjmd_lokal').on('click', function () {
            singkron_data_rpjmd_lokal();
        });

        function singkron_data_rpjmd_lokal() {
            if (confirm('Apakah anda yakin melakukan ini? data lama akan diupdate dengan data terbaru.')) {
                jQuery('#wrap-loading').show();
                var id_unit = window.location.href.split('?')[0].split('' + config.id_daerah + '/')[1];

                jQuery.ajax({
                    url: config.sipd_url + 'daerah/main/'+get_type_jadwal()+'/rpjmd/' + config.tahun_anggaran + '/tampil-rpjmd/' + config.id_daerah + '/' + id_unit + '?filter_program=&filter_indi_prog=&filter_skpd=',
                    contentType: 'application/json',
                    success: function (data) {
                        var data_rpjmd = {
                            action: 'singkron_data_rpjmd',
                            tahun_anggaran: config.tahun_anggaran,
                            api_key: config.api_key,
                            rpjmd: {}
                        };
                        data.data.map(function (rpjmd, i) {
                            data_rpjmd.rpjmd[i] = {};
                            data_rpjmd.rpjmd[i].id_bidang_urusan = rpjmd.id_bidang_urusan
                            data_rpjmd.rpjmd[i].id_program = rpjmd.id_program
                            data_rpjmd.rpjmd[i].id_rpjmd = rpjmd.id_rpjmd
                            data_rpjmd.rpjmd[i].indikator = rpjmd.indikator
                            data_rpjmd.rpjmd[i].kebijakan_teks = rpjmd.kebijakan_teks
                            data_rpjmd.rpjmd[i].kode_bidang_urusan = rpjmd.kode_bidang_urusan
                            data_rpjmd.rpjmd[i].kode_program = rpjmd.kode_program
                            data_rpjmd.rpjmd[i].kode_skpd = rpjmd.kode_skpd
                            data_rpjmd.rpjmd[i].misi_teks = rpjmd.misi_teks
                            data_rpjmd.rpjmd[i].nama_bidang_urusan = rpjmd.nama_bidang_urusan
                            data_rpjmd.rpjmd[i].nama_program = rpjmd.nama_program
                            data_rpjmd.rpjmd[i].nama_skpd = rpjmd.nama_skpd
                            data_rpjmd.rpjmd[i].pagu_1 = rpjmd.pagu_1
                            data_rpjmd.rpjmd[i].pagu_2 = rpjmd.pagu_2
                            data_rpjmd.rpjmd[i].pagu_3 = rpjmd.pagu_3
                            data_rpjmd.rpjmd[i].pagu_4 = rpjmd.pagu_4
                            data_rpjmd.rpjmd[i].pagu_5 = rpjmd.pagu_5
                            data_rpjmd.rpjmd[i].sasaran_teks = rpjmd.sasaran_teks
                            data_rpjmd.rpjmd[i].satuan = rpjmd.satuan
                            data_rpjmd.rpjmd[i].strategi_teks = rpjmd.strategi_teks
                            data_rpjmd.rpjmd[i].target_1 = rpjmd.target_1
                            data_rpjmd.rpjmd[i].target_2 = rpjmd.target_2
                            data_rpjmd.rpjmd[i].target_3 = rpjmd.target_3
                            data_rpjmd.rpjmd[i].target_4 = rpjmd.target_4
                            data_rpjmd.rpjmd[i].target_5 = rpjmd.target_5
                            data_rpjmd.rpjmd[i].tujuan_teks = rpjmd.tujuan_teks
                            data_rpjmd.rpjmd[i].visi_teks = rpjmd.visi_teks
                            data_rpjmd.rpjmd[i].update_at = rpjmd.update_at
                        })
                        var data = {
                            message: {
                                type: "get-url",
                                content: {
                                    url: config.url_server_lokal,
                                    type: 'post',
                                    data: data_rpjmd,
                                    return: true
                                }
                            }
                        };
                        chrome.runtime.sendMessage(data, function (response) {
                            console.log('responeMessage', response);
                        });
                    }
                })
            }
        }
    }
});