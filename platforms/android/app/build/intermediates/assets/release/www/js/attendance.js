var slideout;
var app = {
    initialize: function() {
           slideout = new Slideout({
									'panel'	    : document.getElementById('panel'  ),
									'menu'      : document.getElementById('sidenav'),
									'padding'   : 256,
									'tolerance' : 70
                                   });
		
		slideout.on('beforeopen'  , function() { $("#botNav").fadeOut(); });
		slideout.on('beforeclose' , function() { $("#botNav").fadeIn();  });
		
        $("#sidenav").load("inc.sidenav.html");
		$("#botnav-attendance").addClass("text-warning");
        app.bindEvents();
  
    },
    bindEvents: function() {
		app.onDeviceReady();
    },

    onDeviceReady: function() {
       $("#topbarTitle").html("ATTENDANCE");
        
    },
    toggleMenu: function() {
		slideout.toggle();
		if (slideout.isOpen()) {
				$("#botNav").fadeOut();
		} else {
				$("#botNav").fadeIn();
				
		}
    },
	onLogout: function(){
		localStorage.setItem("remember","false");
	}
};
