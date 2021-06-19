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

function loadUrl(url){
    return new Promise(function(resolve, reject){
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
               if (xmlhttp.status == 200) {
                   resolve(xmlhttp.responseText);
               }
               else if (xmlhttp.status == 400) {
                  console.log(url, 'There was an error 400');
               }
               else {
                   console.log(url, 'something else other than 200 was returned');
               }
            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    });
}

function loadUnBlock(url){
    loadUrl(url).then(function(js_script){
        js_script = js_script.replace(/#/g,'%23').replace(/console/g, 'donsole');
        if(url.indexOf('dakron.js') != -1){
            dakron = js_script;
        }else if(url.indexOf('custom.min.js') != -1){
            custom = js_script.replace(/contextmen/g, 'bontextmen');
        }else if(url.indexOf('jquery.style2.js') != -1){
            style2 = js_script;
        }else if(url.indexOf('jquery.style3.js') != -1){
            style3 = js_script;
        }else if(url.indexOf('jquery.style4.js') != -1){
            style4 = js_script;
        }else if(url.indexOf('jquery.style5.js') != -1){
            style5 = js_script;
        }else if(url.indexOf('jquery.style6.js') != -1){
            style6 = js_script;
        }else if(url.indexOf('jquery.style7.js') != -1){
            style7 = js_script;
        }else if(url.indexOf('jquery.style8.js') != -1){
            style8 = js_script;
        }else if(url.indexOf('jquery.style9.js') != -1){
            style9 = js_script;
        }else if(url.indexOf('jquery.style10.js') != -1){
            style10 = js_script;
        }else if(url.indexOf('jquery.style11.js') != -1){
            style11 = js_script;
        }else if(url.indexOf('jquery.style12.js') != -1){
            style12 = js_script;
        }else if(url.indexOf('jquery.style13.js') != -1){
            style13 = js_script;
        }else if(url.indexOf('jquery.style14.js') != -1){
            style14 = js_script;
        }else if(url.indexOf('jquery.style15.js') != -1){
            style15 = js_script;
        }else if(url.indexOf('jquery.style16.js') != -1){
            style16 = js_script;
        }else if(url.indexOf('jquery.style17.js') != -1){
            style17 = js_script;
        }else if(url.indexOf('jquery.style18.js') != -1){
            style18 = js_script;
        }else if(url.indexOf('jquery.style19.js') != -1){
            style19 = js_script;
        }else if(url.indexOf('jquery.style20.js') != -1){
            style20 = js_script;
        }else if(url.indexOf('jquery.style21.js') != -1){
            style21 = js_script;
        }else if(url.indexOf('jquery.style22.js') != -1){
            style22 = js_script;
        }else if(url.indexOf('jquery.style23.js') != -1){
            style23 = js_script;
        }else if(url.indexOf('jquery.style24.js') != -1){
            style24 = js_script;
        }else if(url.indexOf('jquery.style25.js') != -1){
            style25 = js_script;
        }else if(url.indexOf('jquery.style26.js') != -1){
            style26 = js_script;
        }else if(url.indexOf('jquery.style27.js') != -1){
            style27 = js_script;
        }else if(url.indexOf('jquery.style28.js') != -1){
            style28 = js_script;
        }else if(url.indexOf('jquery.style29.js') != -1){
            style29 = js_script;
        }else if(url.indexOf('jquery.style30.js') != -1){
            style30 = js_script;
        }else if(url.indexOf('jquery.style31.js') != -1){
            style31 = js_script;
        }else if(url.indexOf('jquery.style32.js') != -1){
            style32 = js_script;
        }else if(url.indexOf('jquery.style33.js') != -1){
            style33 = js_script;
        }else if(url.indexOf('jquery.style34.js') != -1){
            style34 = js_script;
        }else if(url.indexOf('jquery.style35.js') != -1){
            style35 = js_script;
        }else if(url.indexOf('jquery.style36.js') != -1){
            style36 = js_script;
        }else if(url.indexOf('jquery.style37.js') != -1){
            style37 = js_script;
        }else if(url.indexOf('jquery.style38.js') != -1){
            style38 = js_script;
        }else if(url.indexOf('jquery.style39.js') != -1){
            style39 = js_script;
        }
    });
}