var slideout;


var app = {
    initialize: function() {

    
        this.bindEvents();
        
    
    },
    bindEvents: function() {
        app.onDeviceReady();
    },

    onDeviceReady: function() {
		
		
		$.ajax({
            url        : localStorage.getItem("server") + "service/initialData", 
            type       : "POST",
            dataType   : "json",            
            beforeSend : function(xhr){
                xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber" ));
                xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode"     ));	
             },
             success: function(msg) { 
				$("#nameHolder").html(
					'WELCOME!<br/>' + msg["Employee"]["surname"] + ', ' + msg["Employee"]["firstname"] + ' ' + msg["Employee"]["middlename"]
				);
				
				$("#sssValidator").val(msg["Employee"]["sss"]);
				$("#oldPassValidator").val(localStorage.getItem("passwordValidator"));
		
		
				$.each(msg["SecretQuestionList"], function(index, element) {
							$("#questionList").append(
								'<option value="' + msg["SecretQuestionList"][index]["id"] + '">' +  msg["SecretQuestionList"][index]["question"] + '</option>'
							);
				});
						
			
				
             },
             error: function(jqXHR	, textStatus, errorThrown) {
                global.msg("Internal server error", "Error");
             }
        });     
		
		
      

    },
    receivedEvent: function(id) {
		
		
    },
    
    toggleMenu: function() {
        slideout.toggle();
    },
	
	onInitialSubmit: function() {
		var alertList = "";
		var flag1 = 0;
		if ($("#questionList").val() == "-1") {
			//global.msg("Please select a secret question");
			$("#questionList").attr("class", "form-control border border-danger");
			alertList += "<li>Select a secret question</li>";
			flag1 = 0;
		} else {
			$("#questionList").attr("class", "form-control");
			flag1 = 1;
		};
		
		var flag2 = 0;
		var flag3 = 0;
		if ($("#sAnswer1").val().length == 0 ) {
			//global.msg("Secret question answer required");
			$("#sAnswer1").attr("class", "form-control border border-danger");
			alertList += "<li>Secret question answer required</li>";
			flag2 = 0;
		} else {
			$("#sAnswer1").attr("class", "form-control");
			flag2 = 1;
			
			if ($("#sAnswer1").val() == $("#sAnswer2").val()) {
			
				$("#sAnswer1").attr("class", "form-control");
				$("#sAnswer2").attr("class", "form-control");
				flag3 = 1;
			} else {
				//global.msg("Secret question must be the same");
				alertList += "<li>Secret question answer must be the same</li>";
				$("#sAnswer1").attr("class", "form-control border border-danger");
				$("#sAnswer2").attr("class", "form-control border border-danger");
				flag3 = 0;
			}
		}
		
		
	
		
		
		var flag4 = 0;
		if ($("#oldPass").val() == $("#oldPassValidator").val() ) {
			$("#oldPass").attr("class", "form-control");
			flag4 = 1;
		} else {
			//global.msg("Old password is wrong");
			alertList += "<li>Old password is wrong</li>";
			$("#oldPass").attr("class", "form-control border border-danger");
			flag4 = 0;
		}
		
		var flag5 = 0;
		var flag6 = 0;
		if ($("#newPass1").val().length >= 8) {
			$("#newPass1").attr("class", "form-control");
			flag5 = 1;
			
				if ($("#newPass1").val() == $("#newPass2").val()) {
					$("#newPass1").attr("class", "form-control");
					$("#newPass2").attr("class", "form-control");
					flag6 = 1;
				} else {
					$("#newPass1").attr("class", "form-control border border-danger");
					$("#newPass2").attr("class", "form-control border border-danger");
					//global.msg("New password must be the same");
					alertList += "<li>New password must be the same</li>";
					flag6 = 0;
				}
		} else {
			$("#newPass1").attr("class", "form-control border border-danger");
			alertList += "<li>Password must be 8 characters or more</li>";
			//global.msg("Password must be 8 characters or more");
			flag5 = 0;
		}
		
		
	
		
		var flag7 = 0;
		if ($("#sssNum").val() == $("#sssValidator").val()){
			$("#sssNum").attr("class", "form-control");
			flag7 = 1;
		} else {
			$("#sssNum").attr("class", "form-control border border-danger");
			alertList += "<li>SSS Number is wrong</li>";
			//global.msg("SSS Number is wrong");
			flag7 = 0;
		}
		
		
		var flagValidator = flag1 + flag2 + flag3 + flag4 + flag5 + flag6 + flag7;
		/* 
		alert( 
			"Flag1 : " + flag1 + "\n" +
			"Flag2 : " + flag2 + "\n" +
			"Flag3 : " + flag3 + "\n" +
			"Flag4 : " + flag4 + "\n" +
			"Flag5 : " + flag5 + "\n" +
			"Flag6 : " + flag6 + "\n" +
			"Flag7 : " + flag7 + "\n"
		); 
		alert(flagValidator);
		*/
		if ( flagValidator == 7) {
			//global.msg("SUCCESS");
			$("#alertDiv").hide();
			app.setInitialData($("#newPass1").val() ,  $("#questionList").val() , $("#sAnswer1").val()  );
		} else {
			//global.msg("FLAGS NOT PASSED");
			$("#alertList").html("");
			$("#alertList").html(alertList);
			$("#alertDiv").show();
			window.scrollTo(0,0);
		}
	},
	
	setInitialData : function (npass, qid, qans) {
		
		$.ajax({
            url        : localStorage.getItem("server") + "service/setInitialData", 
            type       : "POST",
            dataType   : "json",            
            beforeSend : function(xhr){
                xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber" ));
                xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode"     ));	
				xhr.setRequestHeader('newpass'   ,  npass);
				xhr.setRequestHeader('qid', qid);
				xhr.setRequestHeader('qans' , qans)
             },
             success: function(msg) { 
				global.msg('Account successfully set up');
				window.location = "profile.html";
				
             },
             error: function(jqXHR	, textStatus, errorThrown) {
                global.msg("Internal server error", "Error");
             }
        });     
	
	},
	onLogout: function(){
		localStorage.setItem("remember","false");
	}
};
