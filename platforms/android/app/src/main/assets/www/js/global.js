<<<<<<< HEAD


var global = {
	msg : function(msg, title) {
		
		if (title == null){ 
			navigator.notification.confirm(msg, function(index) {},"Notice", ["Ok"]);
		} else {
			navigator.notification.confirm(msg, function(index) {},title, ["Ok"]);
		}
		
	},
	
	sys: function(msg) {
		
		if (localStorage.getItem("showAlert")=="true") {
			navigator.notification.confirm(msg, function(index) {}, "Notice", ["Ok"]);
		} else if (localStorage.getItem("showAlert") == "console") {
			console.log("USSAP.CONSOLE:" + msg);
		} else if (localStorage.getItem("showAlert") == "both") {
			navigator.notification.confirm(msg, function(index) {}, "Notice", ["Ok"]);
			console.log("USSAP.CONSOLE:" + msg);
		}
	},
	onLogout: function(){
		window.location.replace("index.html");
	}
}
=======
var _0x151c=['notification','confirm','getItem','showAlert','true','Notice','log','USSAP.CONSOLE:','location','replace','index.html'];(function(_0x201595,_0x4396d9){var _0x5621ba=function(_0x3641db){while(--_0x3641db){_0x201595['push'](_0x201595['shift']());}};_0x5621ba(++_0x4396d9);}(_0x151c,0x13f));var _0x3224=function(_0x3f2edb,_0x5e31e3){_0x3f2edb=_0x3f2edb-0x0;var _0x598473=_0x151c[_0x3f2edb];return _0x598473;};var global={'msg':function(_0x3aa49b,_0x358861){if(_0x358861==null){navigator[_0x3224('0x0')][_0x3224('0x1')](_0x3aa49b,function(_0x31c2a4){},'Notice',['Ok']);}else{navigator[_0x3224('0x0')][_0x3224('0x1')](_0x3aa49b,function(_0x52a6fe){},_0x358861,['Ok']);}},'sys':function(_0x3bd9b8){if(localStorage[_0x3224('0x2')](_0x3224('0x3'))==_0x3224('0x4')){navigator[_0x3224('0x0')][_0x3224('0x1')](_0x3bd9b8,function(_0x5d29db){},_0x3224('0x5'),['Ok']);}else if(localStorage['getItem'](_0x3224('0x3'))=='console'){console[_0x3224('0x6')]('USSAP.CONSOLE:'+_0x3bd9b8);}else if(localStorage[_0x3224('0x2')](_0x3224('0x3'))=='both'){navigator[_0x3224('0x0')][_0x3224('0x1')](_0x3bd9b8,function(_0x251ee1){},_0x3224('0x5'),['Ok']);console[_0x3224('0x6')](_0x3224('0x7')+_0x3bd9b8);}},'onLogout':function(){window[_0x3224('0x8')][_0x3224('0x9')](_0x3224('0xa'));}};
>>>>>>> f7b06d37a675843cbbc2208eec2030b36122c75d
