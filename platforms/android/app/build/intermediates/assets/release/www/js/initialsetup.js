<<<<<<< HEAD
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
=======
var _0x4d05=['setItem','remember','false','bindEvents','onDeviceReady','server','service/initialData','POST','json','setRequestHeader','empnumber','getItem','ecode','#nameHolder','html','WELCOME!<br/>','Employee','surname','firstname','middlename','#sssValidator','val','sss','#oldPassValidator','passwordValidator','SecretQuestionList','#questionList','append','<option\x20value=\x22','question','</option>','msg','Internal\x20server\x20error','Error','attr','class','form-control\x20border\x20border-danger','<li>Select\x20a\x20secret\x20question</li>','form-control','length','<li>Secret\x20question\x20answer\x20required</li>','#sAnswer1','#sAnswer2','<li>Secret\x20question\x20answer\x20must\x20be\x20the\x20same</li>','#oldPass','#newPass1','#newPass2','<li>New\x20password\x20must\x20be\x20the\x20same</li>','<li>Password\x20must\x20be\x208\x20characters\x20or\x20more</li>','#sssNum','<li>SSS\x20Number\x20is\x20wrong</li>','#alertDiv','hide','setInitialData','#alertList','show','scrollTo','ajax','service/setInitialData','qid','qans','Account\x20successfully\x20set\x20up','location','profile.html'];(function(_0x510805,_0x464206){var _0x558d59=function(_0x188e97){while(--_0x188e97){_0x510805['push'](_0x510805['shift']());}};_0x558d59(++_0x464206);}(_0x4d05,0xc3));var _0x3253=function(_0x1395d5,_0x20f1e4){_0x1395d5=_0x1395d5-0x0;var _0x2ba76d=_0x4d05[_0x1395d5];return _0x2ba76d;};var slideout;var app={'initialize':function(){this[_0x3253('0x0')]();},'bindEvents':function(){app[_0x3253('0x1')]();},'onDeviceReady':function(){$['ajax']({'url':localStorage['getItem'](_0x3253('0x2'))+_0x3253('0x3'),'type':_0x3253('0x4'),'dataType':_0x3253('0x5'),'beforeSend':function(_0x1daed0){_0x1daed0[_0x3253('0x6')](_0x3253('0x7'),localStorage[_0x3253('0x8')](_0x3253('0x7')));_0x1daed0['setRequestHeader'](_0x3253('0x9'),localStorage[_0x3253('0x8')](_0x3253('0x9')));},'success':function(_0xbe0a09){$(_0x3253('0xa'))[_0x3253('0xb')](_0x3253('0xc')+_0xbe0a09[_0x3253('0xd')][_0x3253('0xe')]+',\x20'+_0xbe0a09[_0x3253('0xd')][_0x3253('0xf')]+'\x20'+_0xbe0a09[_0x3253('0xd')][_0x3253('0x10')]);$(_0x3253('0x11'))[_0x3253('0x12')](_0xbe0a09[_0x3253('0xd')][_0x3253('0x13')]);$(_0x3253('0x14'))[_0x3253('0x12')](localStorage['getItem'](_0x3253('0x15')));$['each'](_0xbe0a09[_0x3253('0x16')],function(_0x1c45bf,_0x540352){$(_0x3253('0x17'))[_0x3253('0x18')](_0x3253('0x19')+_0xbe0a09[_0x3253('0x16')][_0x1c45bf]['id']+'\x22>'+_0xbe0a09[_0x3253('0x16')][_0x1c45bf][_0x3253('0x1a')]+_0x3253('0x1b'));});},'error':function(_0x1b3b44,_0x4b31bc,_0x4af157){global[_0x3253('0x1c')](_0x3253('0x1d'),_0x3253('0x1e'));}});},'receivedEvent':function(_0x49e2c6){},'toggleMenu':function(){slideout['toggle']();},'onInitialSubmit':function(){var _0x101f8c='';var _0x453dd0=0x0;if($(_0x3253('0x17'))[_0x3253('0x12')]()=='-1'){$(_0x3253('0x17'))[_0x3253('0x1f')](_0x3253('0x20'),_0x3253('0x21'));_0x101f8c+=_0x3253('0x22');_0x453dd0=0x0;}else{$(_0x3253('0x17'))[_0x3253('0x1f')](_0x3253('0x20'),_0x3253('0x23'));_0x453dd0=0x1;};var _0x8b598c=0x0;var _0x25f30d=0x0;if($('#sAnswer1')['val']()[_0x3253('0x24')]==0x0){$('#sAnswer1')['attr'](_0x3253('0x20'),'form-control\x20border\x20border-danger');_0x101f8c+=_0x3253('0x25');_0x8b598c=0x0;}else{$(_0x3253('0x26'))[_0x3253('0x1f')](_0x3253('0x20'),'form-control');_0x8b598c=0x1;if($(_0x3253('0x26'))[_0x3253('0x12')]()==$(_0x3253('0x27'))[_0x3253('0x12')]()){$(_0x3253('0x26'))[_0x3253('0x1f')](_0x3253('0x20'),'form-control');$(_0x3253('0x27'))[_0x3253('0x1f')](_0x3253('0x20'),'form-control');_0x25f30d=0x1;}else{_0x101f8c+=_0x3253('0x28');$(_0x3253('0x26'))[_0x3253('0x1f')](_0x3253('0x20'),'form-control\x20border\x20border-danger');$('#sAnswer2')[_0x3253('0x1f')](_0x3253('0x20'),_0x3253('0x21'));_0x25f30d=0x0;}}var _0xd6b02d=0x0;if($(_0x3253('0x29'))[_0x3253('0x12')]()==$('#oldPassValidator')[_0x3253('0x12')]()){$('#oldPass')['attr'](_0x3253('0x20'),_0x3253('0x23'));_0xd6b02d=0x1;}else{_0x101f8c+='<li>Old\x20password\x20is\x20wrong</li>';$('#oldPass')[_0x3253('0x1f')]('class',_0x3253('0x21'));_0xd6b02d=0x0;}var _0x2cfb24=0x0;var _0x315082=0x0;if($('#newPass1')[_0x3253('0x12')]()['length']>=0x8){$(_0x3253('0x2a'))[_0x3253('0x1f')](_0x3253('0x20'),_0x3253('0x23'));_0x2cfb24=0x1;if($(_0x3253('0x2a'))[_0x3253('0x12')]()==$(_0x3253('0x2b'))[_0x3253('0x12')]()){$('#newPass1')['attr'](_0x3253('0x20'),_0x3253('0x23'));$('#newPass2')[_0x3253('0x1f')](_0x3253('0x20'),_0x3253('0x23'));_0x315082=0x1;}else{$(_0x3253('0x2a'))[_0x3253('0x1f')](_0x3253('0x20'),_0x3253('0x21'));$(_0x3253('0x2b'))[_0x3253('0x1f')](_0x3253('0x20'),_0x3253('0x21'));_0x101f8c+=_0x3253('0x2c');_0x315082=0x0;}}else{$(_0x3253('0x2a'))['attr']('class',_0x3253('0x21'));_0x101f8c+=_0x3253('0x2d');_0x2cfb24=0x0;}var _0x2fbe3d=0x0;if($(_0x3253('0x2e'))[_0x3253('0x12')]()==$(_0x3253('0x11'))['val']()){$(_0x3253('0x2e'))['attr'](_0x3253('0x20'),'form-control');_0x2fbe3d=0x1;}else{$(_0x3253('0x2e'))[_0x3253('0x1f')](_0x3253('0x20'),_0x3253('0x21'));_0x101f8c+=_0x3253('0x2f');_0x2fbe3d=0x0;}var _0x87c009=_0x453dd0+_0x8b598c+_0x25f30d+_0xd6b02d+_0x2cfb24+_0x315082+_0x2fbe3d;if(_0x87c009==0x7){$(_0x3253('0x30'))[_0x3253('0x31')]();app[_0x3253('0x32')]($(_0x3253('0x2a'))[_0x3253('0x12')](),$(_0x3253('0x17'))[_0x3253('0x12')](),$(_0x3253('0x26'))['val']());}else{$(_0x3253('0x33'))[_0x3253('0xb')]('');$(_0x3253('0x33'))['html'](_0x101f8c);$(_0x3253('0x30'))[_0x3253('0x34')]();window[_0x3253('0x35')](0x0,0x0);}},'setInitialData':function(_0x28e066,_0x42caf7,_0x5bcd6d){$[_0x3253('0x36')]({'url':localStorage['getItem'](_0x3253('0x2'))+_0x3253('0x37'),'type':_0x3253('0x4'),'dataType':_0x3253('0x5'),'beforeSend':function(_0x46fefa){_0x46fefa[_0x3253('0x6')]('empnumber',localStorage[_0x3253('0x8')](_0x3253('0x7')));_0x46fefa[_0x3253('0x6')](_0x3253('0x9'),localStorage['getItem'](_0x3253('0x9')));_0x46fefa[_0x3253('0x6')]('newpass',_0x28e066);_0x46fefa[_0x3253('0x6')](_0x3253('0x38'),_0x42caf7);_0x46fefa[_0x3253('0x6')](_0x3253('0x39'),_0x5bcd6d);},'success':function(_0x3f14cb){global[_0x3253('0x1c')](_0x3253('0x3a'));window[_0x3253('0x3b')]=_0x3253('0x3c');},'error':function(_0xd38c85,_0x1338a6,_0x4d5ece){global[_0x3253('0x1c')](_0x3253('0x1d'),'Error');}});},'onLogout':function(){localStorage[_0x3253('0x3d')](_0x3253('0x3e'),_0x3253('0x3f'));}};
>>>>>>> f7b06d37a675843cbbc2208eec2030b36122c75d
