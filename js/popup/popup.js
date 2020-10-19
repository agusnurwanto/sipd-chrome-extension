jQuery("#manajemen_ssh tbody .btn").on("click", function(){
	var id = jQuery(this).attr("id");
    var url = "";
    console.log('id',id);

    var data = {
        message:{
            type: "actions",
            content: {
                key: id
            },
        }
    };

    // set job in background
    chrome.runtime.sendMessage(data, function(response) {
        console.log('sendMessage', data);
    });
    
	// chrome.tabs.create({ url: config.sipd_url+"daerah/main/budget/komponen/2021/1/list/90/0" });
});