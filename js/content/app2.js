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
    }
})