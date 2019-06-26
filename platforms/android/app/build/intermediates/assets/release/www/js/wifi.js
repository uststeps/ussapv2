var slideout;
var wifiActive = -1;

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
        $("#botnav_setting").addClass("text-warning");
		
		$.ajax(
			{
				url        : localStorage.getItem("server") + "account/wifiData",
				dataType   : "json",
				type       : "POST",
				beforeSend : function(xhr){
					xhr.setRequestHeader('empnumber' ,   localStorage.getItem("full_empnumber" ) );
					xhr.setRequestHeader('ptype'     ,   4 );
					xhr.setRequestHeader('ecode'     ,   localStorage.getItem("ecode") );
			},
			success    : function(msg) { 
				if (msg["offlineTag"] == 1) {
						$("#wifiOfflineDiv").show();
				} else {
					
					
					//
					//$("#activateWifiDiv").show();
					
					/* */
					if (msg["wifiactive"] == 1  && (msg["accountName"] != null) ) {
						$("#usernameHolder").html(msg["accountName"]);
						$("#activateWifiDiv").show();
					} else if (msg["wifiactive"] == 0) {
						//alert("UPDATE");
						$("#updateWifiDiv").show();
					} 
					
				}
			},
			error     : function(jqXHR	, textStatus, errorThrown) {
						
						
			}
		});
				
		
		
        app.bindEvents();
    },
    bindEvents: function() {
       app.onDeviceReady();
    },

    onDeviceReady: function() {
    
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
	
	onUpdateWifi: function() {
	
		
		var flag1 = 0;
		var flag2 = 0;
		
		if ($("#newpass1").val().length >= 8) {
			$("#newpass1").attr("class", "form-control form-control-lg");
			flag1 = 1;
			if ( $("#newpass1").val() == $("#newpass2").val() ) {
				$("#newpass1").attr("class", "form-control form-control-lg");
				$("#newpass2").attr("class", "form-control form-control-lg");

				//alert($("#oldpass").val());
				
				$.ajax(
					{
						url        : localStorage.getItem("server") + "account/updateWifi",
						dataType   : "json",
						type       : "POST",
						beforeSend : function(xhr){
							xhr.setRequestHeader('empnumber' ,   localStorage.getItem("full_empnumber" ) );
							xhr.setRequestHeader('curpass'   ,   $("#oldpass").val() );
							xhr.setRequestHeader('npass'	 , 	$("#newpass1").val() );
							xhr.setRequestHeader('ecode'     ,   localStorage.getItem("ecode") );
					},
					success    : function(msg) { 
						//alert(JSON.stringify(msg));
						
						if (msg["response"] == "OK") {
							$("#divAlert").attr("class", "alert alert-success");
							$("#divAlert").html(
								"Wifi password successfully changed."
							);
							$("#divAlert").show();
							window.scrollTo(0,0);
						} else {
							$("#divAlert").attr("class", "alert alert-danger");
							$("#divAlert").html(
								msg["response"]
							);
							$("#divAlert").show();
							window.scrollTo(0,0);
						}
						
						$("#newpass1").val("");
						$("#newpass2").val("");
						$("#oldpass").val("");
					},
					error     : function(jqXHR	, textStatus, errorThrown) {
							//alert(JSON.stringify(jqXHR));
							$("#divAlert").attr("class", "alert alert-danger");
							$("#divAlert").html(
								"Internal Server Error"
							);
							$("#divAlert").show();
							window.scrollTo(0,0);
						$("#newpass1").val("");
						$("#newpass2").val("");
						$("#oldpass").val("");
						
					}
				});
				
				
				
				flag2 = 1;
			} else {
				$("#divAlert").attr("class", "alert alert-danger");
				$("#divAlert").html(
					"New password must be the same"
				);
				$("#newpass1").attr("class", "form-control form-control-lg border border-danger");
				$("#newpass2").attr("class", "form-control form-control-lg border border-danger");
				$("#divAlert").show();
				window.scrollTo(0,0);
				flag2 = 0;
			}
		} else {
			$("#divAlert").attr("class", "alert alert-danger");
			$("#divAlert").html(
				"New password must be 8 character long"
			);
			$("#newpass1").attr("class", "form-control form-control-lg border border-danger");
			$("#divAlert").show();
			window.scrollTo(0,0);
			flag1 = 0;
		}
		
	},
	onActivateWifi: function() {
	
		
		var flag1 = 0;
		
		if ($("#Actnewpass1").val().length >= 8) {
			$("#Actnewpass1").attr("class", "form-control form-control-lg");
			flag1 = 1;
			if ( $("#Actnewpass1").val() == $("#Actnewpass2").val() ) {
				$("#Actnewpass1").attr("class", "form-control form-control-lg");
				$("#Actnewpass2").attr("class", "form-control form-control-lg");
				
				
				$.ajax(
					{
						url        : localStorage.getItem("server") + "account/activateWifi",
						dataType   : "json",
						type       : "POST",
						beforeSend : function(xhr){
							xhr.setRequestHeader('empnumber' ,   localStorage.getItem("full_empnumber" ) );
							xhr.setRequestHeader('ecode'     ,   localStorage.getItem("ecode") );
							
							xhr.setRequestHeader('fname'   	 ,   localStorage.getItem("firstname") 	);
							xhr.setRequestHeader('sname'	 , 	 localStorage.getItem("surname")  );
							xhr.setRequestHeader('mname'	 , 	 localStorage.getItem("middlename")  );
							
							xhr.setRequestHeader('ptype'	 , 	 4 );
							xhr.setRequestHeader('newpass'	 , 	 $("#Actnewpass1").val() );
					},
					success    : function(msg) { 
						//alert("SUCCESS");
						if (msg == "OK") {
							$("#ActivateDivAlert").attr("class", "alert alert-success");
							$("#ActivateDivAlert").html(
								"Wifi Successfully Activated"
							);
							$("#ActivateDivAlert").show();
							
							$("#activateWifiDiv").hide();
							$("#updateWifiDiv").show();
							
							window.scrollTo(0,0);
						} else {
							$("#ActivateDivAlert").attr("class", "alert alert-danger");
							$("#ActivateDivAlert").html(
								msg
							);
							$("#ActivateDivAlert").show();
							window.scrollTo(0,0);
						}
					},
					error     : function(jqXHR	, textStatus, errorThrown) {
						//alert(JSON.stringify(jqXHR));
						if (jqXHR["responseText"] == "OK") {
							$("#ActivateDivAlert").attr("class", "alert alert-success");
							$("#ActivateDivAlert").html(
								"Wifi password successfully changed."
							);
							$("#divAlert").show();
							window.scrollTo(0,0);
						} else {
							$("#ActivateDivAlert").attr("class", "alert alert-danger");
							$("#ActivateDivAlert").html(
								"Internal Error"
							);
							$("#divAlert").show();
							window.scrollTo(0,0);
						}
						
					}
				});
			
			} else {
				$("#divAlert").attr("class", "alert alert-danger");
				$("#divAlert").html(
					"New password must be the same"
				);
				$("#newpass1").attr("class", "form-control form-control-lg border border-danger");
				$("#newpass2").attr("class", "form-control form-control-lg border border-danger");
				$("#divAlert").show();
				window.scrollTo(0,0);
				flag2 = 0;
			}
		} else {
			$("#divAlert").attr("class", "alert alert-danger");
			$("#divAlert").html(
				"New password must be 8 character long"
			);
			$("#newpass1").attr("class", "form-control form-control-lg border border-danger");
			$("#divAlert").show();
			window.scrollTo(0,0);
			flag1 = 0;
		}
		
	},
	onLogout: function(){
		window.location.replace("index.html");
	},
	onLogout: function(){
		localStorage.setItem("remember","false");
	}
};
