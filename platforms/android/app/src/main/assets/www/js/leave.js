var slideout;
var app = {
    initialize: function() {

        slideout = new Slideout({
            'panel'    : document.getElementById('panel'  ),
            'menu'     : document.getElementById('sidenav'),
            'padding'  : 256,
            'tolerance': 70
        });
       slideout.on('beforeopen', function() {

				$("#botNav").fadeOut();
		});

		slideout.on('beforeclose', function() {
				$("#botNav").fadeIn();

		});
		

        $("#sidenav"      ).load("inc.sidenav.html"      );
		$("#botnav-attendance").addClass("text-warning");
        app.bindEvents();
        
    
    },
    bindEvents: function() {
       app.onDeviceReady();
    },

    onDeviceReady: function() {

         $.ajax({
     
            url        : localStorage.getItem("server") + "attendance/leaveData",
            type       : "POST",
            dataType   : "json",
            beforeSend : function(xhr){
                 xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode"     ) );
                 xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber" ) );
            },  
            success: function(msg) { 
                global.msg(JSON.stringify(msg));
            },
            error: function(jqXHR	, textStatus, errorThrown) {  
                alert(JSON.stringify(jqXHR       ));
                alert(JSON.stringify(textStatus  ));
                alert(JSON.stringify(errorThrown ));
            }
        });

    },
    receivedEvent: function(id) {
  

    },
    
    toggleMenu: function() {
		slideout.toggle();
		if (slideout.isOpen()) {
				$("#botNav").fadeOut();
		} else {
				$("#botNav").fadeIn();
				
		}
    },
        
    
    onCheckDtr: function() {
        
    },
	onLogout: function(){
		localStorage.setItem("remember","false");
	}
 
};
