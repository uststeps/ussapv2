var slideout ;
var app = {
    initialize: function() {
       
        
        slideout = new Slideout({
								  'panel'    : document.getElementById('panel'  ),
								  'menu'     : document.getElementById('sidenav'),
								  'padding'  : 256,
								  'tolerance': 70
								});
        slideout.on('beforeopen' , function() { $("#botNav").fadeOut(); });
		slideout.on('beforeclose', function() { $("#botNav").fadeIn();  });
		
		
        $("#sidenav"      ).load("inc.sidenav.html");
		$("#botnav_change").addClass("text-warning");

        app.bindEvents();
    },
    bindEvents: function() {
        app.addEventListener();
    },

    onDeviceReady: function() {
        app.setNav();
       
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
    
    setNav: function() {
        $("#navChange"    ).prop("class", "col border-primary bg-primary");
        $("#linkChange"   ).prop("class", "nav-link active text-white");
        
        $("#navQuestion"  ).prop("class", "col border-primary");
        $("#linkQuestion" ).prop("class", "nav-link");

    },
	
	onChangepassword: function() {
		if ($("#oldPass").val() == localStorage.getItem("passwordValidator")) {
			$("#oldPass").attr("class", "form-control form-control-lg");
			$("#divAlert").attr("class" , "alert alert-danger");
			$("#divAlert").hide();
			
			if ($("#newPass1").val().length >= 8) {
				
				$("#divAlert").attr("class" , "alert alert-danger");
				$("#newPass1").attr("class", "form-control form-control-lg");
				$("#divAlert").hide();
				
				if ($("#newPass1").val() == $("#newPass2").val()) {
					
					$.ajax(
					{
						url        : localStorage.getItem("server") + "account/changepass",
						type       : "POST",
						beforeSend : function(xhr){
							xhr.setRequestHeader('empnumber' ,   localStorage.getItem("empnumber" ) );
							xhr.setRequestHeader('newpass'   ,   $("#newPass1").val() );
							xhr.setRequestHeader('ecode'     ,   localStorage.getItem("ecode") );
					},
					success    : function(msg) { 
						//alert("RESPONSE " + msg);
						if (msg == "1") {
							localStorage.setItem("passwordValidator", $("#newPass1").val());
							$("#divAlert").attr("class" , "alert alert-success");
							$("#divAlert").html(
								"Password successfully updated"
							);
							$("#divAlert").show();
							window.scrollTo(0,0);
						} else {
							$("#divAlert").attr("class" , "alert alert-danger");
							$("#divAlert").html(
								"There was an error updating your password"
							);
							$("#divAlert").show();
							window.scrollTo(0,0);
							
						}
						
						$("#oldPass" ).val("");
						$("#newPass1").val("");
						$("#newPass2").val("");
					},
					error     : function(jqXHR	, textStatus, errorThrown) {
						//alert(JSON.stringify(jqXHR));
						$("#divAlert").attr("class" , "alert alert-danger");
						$("#divAlert").html(
							"There was an error updating your password"
						);
						$("#divAlert").show();
						window.scrollTo(0,0);
						
						$("#oldPass" ).val("");
						$("#newPass1").val("");
						$("#newPass2").val("");
						
					}
				});
					
					
					
					
				} else {
					$("#divAlert").attr("class" , "alert alert-danger");
					$("#newPass1").attr("class", "form-control form-control-lg border border-danger");
					$("#newPass2").attr("class", "form-control form-control-lg border border-danger");
					$("#divAlert").html(
						"New password must be the same"
					);
					$("#divAlert").hide();
					window.scrollTo(0,0);
				}
				
				
				
				
				
			} else {
				
				$("#newPass1").attr("class", "form-control form-control-lg border border-danger");
				$("#divAlert").attr("class" , "alert alert-danger");
				$("#divAlert").html(
					"New password must be 8 characters or more"
				);
				$("#divAlert").show();
				window.scrollTo(0,0);
			}


		} else {
			//alert(localStorage.getItem("passwordValidator"));
			$("#divAlert").attr("class" , "alert alert-danger");
			$("#oldPass").attr("class", "form-control form-control-lg border border-danger");
			$("#divAlert").html(
				"Old password incorrect"
			);
			$("#divAlert").show();
			window.scrollTo(0,0);
		}
		
	},
	onLogout: function(){
		localStorage.setItem("remember","false");
	}
    
};
