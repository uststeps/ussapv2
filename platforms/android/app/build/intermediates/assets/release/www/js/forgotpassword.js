
var app = {
    initialize: function() {
		
		
		
        app.bindEvents();
    },
    
    bindEvents: function() {
        app.onDeviceReady();
    }, 

    onDeviceReady: function() {
		$("#forgotQuestion").html(localStorage.getItem("forgotQuestion"));
       
		
    }, 
    
    receivedEvent: function(id) {
		
    },
	
	submitReset: function() {
		if ($("#validationSSS").val() == localStorage.getItem("forgotSSS")){
			$("#divAlert2").hide();
			$("#validationSSS").attr("class", "form-control form-control-lg");
			
			if ($("#validationAnswer").val() == localStorage.getItem("forgotAnswer")){
				$("#divAlert2").hide();
				$("#validationAnswer").attr("class", "form-control form-control-lg border");
				
				$.ajax({
				url      : localStorage.getItem("server") + "account/resetpassword",
				type     : "POST",
				dataType : "json",
				beforeSend: function(xhr){ 
				   xhr.setRequestHeader('ecode'		, localStorage.getItem("ecode"));
				   xhr.setRequestHeader('empnumber'	,  localStorage.getItem("forgotEmpnum"));
				},
				success: function(msg) { 
			
				
					if (msg["response"] == "1") {
						
						localStorage.setItem("forgotQuestion", null);
						localStorage.setItem("forgotAnswer", null);
						localStorage.setItem("forgotSSS",null);
						localStorage.setItem("forgotEmpnum",null);
						window.location = "forgotpassword_result.html";
					} else {
						
						
						$("#divAlert2").html("There was an error processing request, please try again");
						$("#divAlert2").show();
					}
					  
				},
				error: function(jqXHR	, textStatus, errorThrown) {  
				 
				}
			});
				
			} else {
				$("#divAlert2").html("Secret question answer incorrect");
				$("#divAlert2").show();
				$("#validationAnswer").attr("class", "form-control form-control-lg border border-danger");
			}
		} else {
			$("#divAlert2").html("SSS Number is incorrect");
			$("#divAlert2").show();
			$("#validationSSS").attr("class", "form-control form-control-lg border border-danger");
		}
		
	},
	
	checkEmployeeNumber: function(){
		if ($("#searchEmpInput").val().length <= 0) {
			$("#divAlertHolder").show();
			$("#searchEmpInput").attr("class", "form-control text-center border border-danger");
		} else {
			$("#divAlertHolder").hide();
			$("#searchEmpInput").attr("class", "form-control text-center");
			$.ajax({
				url      : localStorage.getItem("server") + "account/secretquestion",
				type     : "POST",
				dataType : "json",
				beforeSend: function(xhr){ 
				   xhr.setRequestHeader('ecode'		,localStorage.getItem("ecode"));
				   xhr.setRequestHeader('empnumber'	,$("#searchEmpInput").val());
				},
				success: function(msg) { 
					if (msg["mysq"]["id"] == 0) {
						  $("#divAlert1").html("Invalid employee number");
						  $("#divAlertHolder").show();
						  $("#searchEmpInput").attr("class", "form-control text-center border border-danger");
					} else {
						  $("#divAlertHolder").hide();
						  $("#searchEmpInput").attr("class", "form-control text-center");
							
						  localStorage.setItem("forgotQuestion", msg["mysq"]["question"]);
						  localStorage.setItem("forgotAnswer", msg["mysq"]["answer"]);
						  localStorage.setItem("forgotSSS", msg["sss"]);
						  localStorage.setItem("forgotEmpnum", $("#searchEmpInput").val());
						  window.location = "forgotpassword2.html";
						
					}
					  
				},
				error: function(jqXHR	, textStatus, errorThrown) {  
				  $("#divAlert1").html("There was an error processing your request, please try again");
				  $("#divAlertHolder").show();
				 
				}
			});
			
			
		} 
		
		
	},
	onLogout: function(){
		localStorage.setItem("remember","false");
	}
};
