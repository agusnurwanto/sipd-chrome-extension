// https://stackoverflow.com/questions/9697687/modify-document-html-before-load-with-chrome-extension-using-document-start

var code = "\
		function tblKomponen(){\
	      	alert('tes')\
		};\
		window.print2 = print;\
		print = function(t){ if(!t){ return false; }else{ print2(); } };\
		chrome = false;\
		Object.defineProperty(navigator,'vendor', {\
			get: function () { return ''; },\
			set: function (a) {}\
		});\
		Object.defineProperty(navigator,'userAgent', {\
			get: function () { return 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36'; },\
			set: function (a) {}\
		});\
";

var script = document.createElement('script');
script.appendChild(document.createTextNode(code));
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);