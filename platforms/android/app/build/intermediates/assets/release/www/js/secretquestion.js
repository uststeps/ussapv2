var slideout ;
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
        $("#botnav_secret").addClass("text-warning");
        app.bindEvents();
    },
    bindEvents: function() {
       app.onDeviceReady();
    },

    onDeviceReady: function() {

        $.ajax({
     
            url        : localStorage.getItem("server") + "account/secretquestion",
            type       : "POST",
            dataType   : "json",
            beforeSend : function(xhr){
                 xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode"     ) );
                 xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber" ) );
            },  
            success: function(msg) { 
				//alert(JSON.stringify(msg));
				
				localStorage.setItem("sqID", msg["mysq"]["id"]);
				localStorage.setItem("sqAnswer", msg["mysq"]["answer"]);
				
				$.each(msg["questionList"], function(index, element) {
					
					var isSelected = "";
					
					if (msg["questionList"][index]["question"] == msg["mysq"]["question"]) {
						isSelected = "selected";
					} else {
						isSelected = "";
					}
					
					$("#questionList").append(
						'<option value="' + msg["questionList"][index]["id"] + '" ' + isSelected + '>' + msg["questionList"][index]["question"] + '</option>'
					);
					
					
				});
				
				
            },
            error: function(jqXHR	, textStatus, errorThrown) {  
              //alert(JSON.stringify(jqXHR));
            }
        });
    },
    
    receivedEvent: function(id) {
    },
	
	onUpdateSQ: function() {
		
		if ($("#ans1").val() == localStorage.getItem("sqAnswer")) {
			$("#divAlert").attr("class", "alert alert-danger");
			$("#divAlert").html(
				"Secret question answer cannot be the same as previous answer"
			);
			$("#divAlert").show();
		} else {
			if ($("#ans1").val() == $("#ans2").val()){
				$("#divAlert").attr("class", "alert alert-success");
				$("#ans1").attr("class", "form-control form-control-lg");
				$("#ans2").attr("class", "form-control form-control-lg");
				$("#divAlert").hide();
				
				$.ajax({
			 
					url        : localStorage.getItem("server") + "account/updsq",
					type       : "POST",
					dataType   : "json",
					beforeSend : function(xhr){
						 xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode"     ) );
						 xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber" ) );
						 xhr.setRequestHeader('sqid' 	  ,  $("#questionList").val() );
						 xhr.setRequestHeader('ans' 	  ,  $("#ans1").val() );
					},  
					success: function(msg) { 
						if (msg == 1){
							
							$("#ans1").attr("class", "form-control form-control-lg");
							$("#ans2").attr("class", "form-control form-control-lg");
							$("#divAlert").html(
								"Secret Question successfully updated"
							);
							
							localStorage.setItem("sqAnswer", $("#ans1").val());
							
							$("#ans1").val("");
							$("#ans2").val("");
							$("#divAlert").show();
						} else {
							$("#divAlert").attr("class", "alert alert-danger");
							$("#divAlert").html(
								"There was an error updating secret question"
							);
							$("#divAlert").show();
						}
						
					},
					error: function(jqXHR	, textStatus, errorThrown) {  
						$("#divAlert").attr("class", "alert alert-danger");
						$("#divAlert").html(
							"There was an error updating secret question"
						);
						$("#divAlert").show();
					}
				});
				
				
			} else {
				$("#divAlert").attr("class", "alert alert-danger");
				$("#ans1").attr("class", "form-control form-control-lg border border-danger");
				$("#ans2").attr("class", "form-control form-control-lg border border-danger");
				$("#divAlert").html(
					"Answer must be the same"
				);
				$("#divAlert").show();
				
			}
		}
		
		
		
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
