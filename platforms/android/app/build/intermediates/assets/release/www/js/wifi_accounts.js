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
 
        $("#sidenav"    ).load("inc.sidenav.html"    ); 
        $("#botnav_history").addClass("text-warning");
        app.bindEvents();
    },
    
    bindEvents: function() {
        app.onDeviceReady();
    },

    onDeviceReady: function() {
        $.ajax({
            url        : localStorage.getItem("server") + "account/wifihistory",
            type       : "POST",
            dataType   : "json",
            beforeSend : function(xhr){
			   xhr.setRequestHeader('ecode'     ,   localStorage.getItem("ecode") );
               xhr.setRequestHeader('empnumber' , localStorage.getItem("full_empnumber"));  
               xhr.setRequestHeader('ptype'     , 4);  
            },               
            success    : function(msg) { 
               var total = 0;
			   $.each(msg, function(index, element) {
					var isActive = "INACTIVE";
					var activeColor = "danger";
					
					if (msg[index]["status"] == 1) {
						activeColor = "success";
						isActive = "ACTIVE";
					} 
					
					$("#wifiHistoryHolder").append(
						'<tr>' + 
                            '<td class="small">' + 
                                'School Year : <span class="text-asphalt">' + msg[index]["schoolyear"].split(" ")[0] + '</span><br/>' + 
                                'Semester : <span class="text-asphalt">' + msg[index]["semester"] + '</span><br/>' + 
                                'Activation Date : <span class="text-asphalt">' + msg[index]["dateActivated"] + '</span><br/>' + 
                                'Reason : <span class="text-asphalt">' + msg[index]["reason"] + '</span>' + 
                            '</td>' + 
                            '<td class="text-' + activeColor + ' text-center">' + isActive + '</td>' + 
                        '</tr>'
					);
					
					total++;
				});
				
				if (total == 0) {
					$("#wifiHistoryHolder").html(
						'<tr>' + 
                            '<td class="small text-center text-danger" colspan="2">' + 
                                'No record found' +
                            '</td>' +
                        '</tr>'
					);
					
				}
			   
			   
            },             
            error      : function(jqXHR	, textStatus, errorThrown) {  
               //alert(JSON.stringify(jqXHR));
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
	onLogout: function(){
		window.location.replace("index.html");
	},
	onLogout: function(){
		localStorage.setItem("remember","false");
	}
};
