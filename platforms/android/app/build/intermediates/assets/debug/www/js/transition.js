var slideout;
var app = {
    initialize: function() {
		
        this.bindEvents();
        document.addEventListener('deviceready', this.onDeviceReady, false);
  
    },
    bindEvents: function() {

    },

    onDeviceReady: function() {
       
        
    },
    receivedEvent: function(id) {
        

    },
    toggleMenu: function() {
    },
	onLogout: function(){
		localStorage.setItem("remember","false");
	}
};
