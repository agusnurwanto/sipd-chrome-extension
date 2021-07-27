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
    }
});