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
			var url_ssh = config.sipd_url+"daerah/main/budget/dashboard-komponen/"+config.tahun_anggaran+"/unit/90/0";
			chrome.tabs.create({ url: url_ssh });
			proses = [
				{ login: 0 },
				{ get_ssh: 0 }
			];
		}else if(actions == 'login_operator'){
			var url_ssh = config.sipd_url+"daerah/main/budget/dashboard/"+config.tahun_anggaran+"/unit/90/2234";
			chrome.tabs.create({ url: url_ssh });
			proses = [
				{ login: 0 }
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
			// getDB({
			// 	key: actions,
			// 	debug: true
			// });
		});
	}else if(type == 'get-actions'){
		getDB({
			// debug: true
		})
		.then(function(ret){
			console.log(type, ret);
			var options = {
				type: 'response-actions',
				data: ret
			};
			sendMessageTabActive(options);
		});
	}else if(type == 'run-actions'){
		var actions = request.message.content.key;
		var data = request.message.content.data;
		var options = {
			key: actions,
			data: data
		};
		console.log('run-actions', options)
		setDB(options)
		.then(function(){
			// getDB({
			// 	key: actions,
			// 	debug: true
			// });
		});
	}else if(type == 'get-url'){
		jQuery.ajax({
		    url: request.message.content.url,
		    type: request.message.content.type,
		    data: request.message.content.data,
		    dataType: 'json',
		    success:function(ret){
		    	if(request.message.content.return){
			     	var options = {
			     		type: 'response-fecth-url',
			     		data: ret
			     	}
			     	sendMessageTabActive(options);
			    }
		        // console.log(ret, request.message.content);
		        console.log(ret);
		    },
		    error:function(){
		        alert("Error");
		    }      
		});
	}
	return sendResponse("THANKS from background!");
});