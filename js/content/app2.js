jQuery(document).ready(function () {
    var current_url = window.location.href;

    if (current_url.indexOf('main/budget/subgiat/' + config.tahun_anggaran) != -1) {	//sub_data_program_kegiatan
        var singkron_data_giat = ''
            + '<button class="fcbtn btn btn-primary btn-outline btn-1b" id="singkron_data_giat_lokal">'
            + '<i class="fa fa-cloud-download m-r-5"></i> <span>Singkron Program Kegiatan ke DB lokal</span>'
            + '</button>';
        jQuery('#reset_submit').parent().append(singkron_data_giat);


        jQuery('#singkron_data_giat_lokal').on('click', function () {
            singkron_data_giat_lokal();
        });

        function singkron_data_giat_lokal() {
            if (confirm('Apakah anda yakin melakukan ini? data lama akan diupdate dengan data terbaru.')) {
                jQuery('#wrap-loading').show();
                var id_unit = window.location.href.split('?')[0].split('' + config.id_daerah + '/')[1];

                jQuery.ajax({
                    url: config.sipd_url + 'daerah/main/budget/subgiat/' + config.tahun_anggaran + '/tampil-sub-giat/' + config.id_daerah + '/' + id_unit + '?filter_program=&filter_giat=&filter_sub_giat=',
                    contentType: 'application/json',
                    success: function (data) {
                        var data_prog_keg = {
                            action: 'singkron_data_giat',
                            tahun_anggaran: config.tahun_anggaran,
                            api_key: config.api_key,
                            subgiat: {}
                        };
                        data.data.map(function (subgiat, i) {
                            data_prog_keg.subgiat[i] = {};
                            data_prog_keg.subgiat[i].id_bidang_urusan = subgiat.id_bidang_urusan;
                            data_prog_keg.subgiat[i].id_program = subgiat.id_program;
                            data_prog_keg.subgiat[i].id_sub_giat = subgiat.id_sub_giat
                            data_prog_keg.subgiat[i].id_urusan = subgiat.id_urusan
                            data_prog_keg.subgiat[i].is_locked = subgiat.is_locked
                            data_prog_keg.subgiat[i].kode_bidang_urusan = subgiat.kode_bidang_urusan
                            data_prog_keg.subgiat[i].kode_giat = subgiat.kode_giat
                            data_prog_keg.subgiat[i].kode_program = subgiat.kode_program
                            data_prog_keg.subgiat[i].kode_sub_giat = subgiat.kode_sub_giat
                            data_prog_keg.subgiat[i].kode_urusan = subgiat.kode_urusan
                            data_prog_keg.subgiat[i].nama_bidang_urusan = subgiat.nama_bidang_urusan
                            data_prog_keg.subgiat[i].nama_giat = subgiat.nama_giat
                            data_prog_keg.subgiat[i].nama_program = subgiat.nama_program
                            data_prog_keg.subgiat[i].nama_sub_giat = subgiat.nama_sub_giat
                            data_prog_keg.subgiat[i].nama_urusan = subgiat.nama_urusan
                            data_prog_keg.subgiat[i].status = subgiat.status

                        })
                        var data = {
                            message: {
                                type: "get-url",
                                content: {
                                    url: config.url_server_lokal,
                                    type: 'post',
                                    data: data_prog_keg,
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
    } else if (current_url.indexOf('main/budget/dana/' + config.tahun_anggaran) != -1) {

        var singkron_sumber_dana = ''
            + '<button class="fcbtn btn btn-warning btn-outline btn-1b" id="singkron_sumber_dana_lokal">'
            + '<i class="fa fa-cloud-download m-r-5"></i> <span>Singkron Sumber Dana ke DB lokal</span>'
            + '</button>';
        jQuery('#table_dana').closest('.white-box').find('.pull-right').prepend(singkron_sumber_dana);

        jQuery('#singkron_sumber_dana_lokal').on('click', function () {
            singkron_sumber_dana_lokal();
        });

        function singkron_sumber_dana_lokal() {
            if (confirm('Apakah anda yakin melakukan ini? data lama akan diupdate dengan data terbaru.')) {
                jQuery('#wrap-loading').show();
                var id_unit = window.location.href.split('?')[0].split('' + config.id_daerah + '/')[1];

                jQuery.ajax({
                    url: config.sipd_url + 'daerah/main/budget/dana/' + config.tahun_anggaran + '/tampil-dana/' + config.id_daerah + '/' + id_unit,
                    contentType: 'application/json',
                    success: function (data) {
                        var data_sumber_dana = {
                            action: 'singkron_sumber_dana',
                            tahun_anggaran: config.tahun_anggaran,
                            api_key: config.api_key,
                            dana: {}
                        };
                        data.data.map(function (dana, i) {
                            data_sumber_dana.dana[i] = {};
                            data_sumber_dana.dana[i].created_at = dana.created_at
                            data_sumber_dana.dana[i].created_user = dana.created_user
                            data_sumber_dana.dana[i].id_daerah = dana.id_daerah
                            data_sumber_dana.dana[i].id_dana = dana.id_dana
                            data_sumber_dana.dana[i].id_unik = dana.id_unik
                            data_sumber_dana.dana[i].is_locked = dana.is_locked
                            data_sumber_dana.dana[i].kode_dana = dana.kode_dana
                            data_sumber_dana.dana[i].nama_dana = dana.nama_dana
                            data_sumber_dana.dana[i].set_input = dana.set_input
                            data_sumber_dana.dana[i].status = dana.status
                            data_sumber_dana.dana[i].tahun = dana.tahun
                            data_sumber_dana.dana[i].updated_at = dana.updated_at
                            data_sumber_dana.dana[i].updated_user = dana.updated_user
                        })
                        var data = {
                            message: {
                                type: "get-url",
                                content: {
                                    url: config.url_server_lokal,
                                    type: 'post',
                                    data: data_sumber_dana,
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
    } else if (current_url.indexOf('main/budget/rpjmd/' + config.tahun_anggaran) != -1) {      //rpjmd
        var singkron_data_rpjmd = ''
            + '<button class="fcbtn btn btn-danger btn-outline btn-1b" id="singkron_data_rpjmd_lokal">'
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
                    url: config.sipd_url + 'daerah/main/budget/rpjmd/' + config.tahun_anggaran + '/tampil-rpjmd/' + config.id_daerah + '/' + id_unit + '?filter_program=&filter_indi_prog=&filter_skpd=',
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
})