// https://stackoverflow.com/questions/9697687/modify-document-html-before-load-with-chrome-extension-using-document-start

var code = "\
		function tblKomponen(){\
	      	alert('tes')\
		};\
";

var script = document.createElement('script');
script.appendChild(document.createTextNode(code));
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);