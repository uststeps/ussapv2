

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