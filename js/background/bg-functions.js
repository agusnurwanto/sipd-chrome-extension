function setDB(options){
    return new Promise(function(resolve, reject){
        db.transaction(function (tx) {
            var where = 'key="'+options.key+'"';
            if(options.post_id){
                where += ' AND post_id="'+options.post_id+'"';
            }
            if(options.active){
                where += ' AND active="'+options.active+'"';
            }
            tx.executeSql('SELECT data FROM sipd where '+where, [], function (tx, results) {
                try{
                    var data = results.rows.item(0).data;

                    tx.executeSql('UPDATE sipd SET data="'+encodeURIComponent(JSON.stringify(options.data))+'" WHERE '+where);
                }catch(e){
                    var column = ['key', 'data'];
                    if(data){
                        data = encodeURIComponent(JSON.stringify(options.data));
                    }else{
                        data = false;
                    }
                    var value = [options.key, data];
                    tx.executeSql('INSERT INTO sipd ('+column.join(', ')+') VALUES ("'+value.join('", "')+'")');
                }
                return resolve(true);
            });
        });
    })
    .catch(function(e){
        console.log('error', e);
        return Promise.resolve(false);
    })
}

function getDB(options){
    return new Promise(function(resolve, reject){
        db.transaction(function (tx) {
            var where = '';
            if(options.key){
                where = ' where key="'+options.key+'"';
            }
            var data = false;
            tx.executeSql('SELECT * FROM sipd'+where, [], function (tx, results) {
                try{
                    if(options.key){
                        data = decodeURIComponent(results.rows.item(0).data);
                        try{
                            data = JSON.parse(data);
                        }catch(e){
                            console.log(e);
                        }
                    }else{
                        data = results.rows;
                    }
                }catch(e){
                    console.log(e);
                }
                if(options.debug){
                    console.log('data', data);
                }
                return resolve(data);
            }, function(transaction, error) {
                console.log("Error : " + error.message, error);
                return resolve(data);
            });
        });
    })
    .catch(function(e){
        console.log('error', e);
        return Promise.resolve([]);
    })
}

function rmDB(options){
    return new Promise(function(resolve, reject){
        db.transaction(function (tx) {
            if(options.keys){
                var where = 'key IN ("'+options.keys.join('","')+'")';
            }else{
                var where = 'key="'+options.key+'"';
            }
            tx.executeSql('DELETE FROM sipd where '+where);
            return resolve(true);
        });
    })
    .catch(function(e){
        console.log('error', e);
        return Promise.resolve(false);
    })
}

function sendMessageAll(data, cb){
    console.log('data', data);
    chrome.runtime.sendMessage(data, function(response) {
        if(typeof cb == 'function'){
            cb(response);
        }
    });
}

function sendMessageTabActive(data, cb){
    console.log('data', data);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, data, function(response) {
            if(typeof cb == 'function'){
                cb(response);
            }
        });
    });
}