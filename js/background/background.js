console.log('Salam semangat!');

window.db = openDatabase('SIPD', '1.0', 'sipd database', 50 * 1024 * 1024);
db.transaction(function (tx) {
	tx.executeSql('CREATE TABLE IF NOT EXISTS sipd (key, data)', [], function(tx, success){
		// console.log('success', success);
	}, function(tx, error){
		console.log('error', error);
	});
});


chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
	console.log('request', request);
	var type = request.message.type;
	if(type == 'actions'){
		var actions = request.message.content.key;
		var proses = [];
		if(actions == 'get_ssh'){
			
			var url_ssh = config.sipd_url+"daerah/main/budget/komponen/2021/1/list/90/0";
			chrome.tabs.create({ url: url_ssh });

			proses = [
				{ login: 0 },
				{ get_ssh: 0 }
			];
		}
		setDB({
			key: actions,
			data: {
				status: 'active',
				proses: proses
			}
		})
		.then(function(){
			getDB({
				key: actions,
				debug: true
			});
		});
	}
	return "THANKS from background!";
});