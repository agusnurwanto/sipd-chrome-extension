jQuery("#manajemen_ssh tbody .btn").on("click", function(){
	var id = jQuery(this).attr("id");
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
});