var slideout;
var app = {
    initialize: function() {
           slideout = new Slideout({
            'panel': document.getElementById('panel'),
            'menu': document.getElementById('sidenav'),
            'padding': 256,
            'tolerance': 70
        });
        $("#sidenav").load("inc.sidenav.html");
        $("#header").load("inc.topbar.html");
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
        slideout.toggle();
        
        if (slideout.isOpen()){
            $(".menubutton").prop("class", "menubutton menubutton-open");
        }
    },
	onLogout: function(){
		localStorage.setItem("remember","false");
	}
};
