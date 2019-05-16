<<<<<<< HEAD
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
=======
var _0x215c=['text-warning','bindEvents','addEventListener','setNav','isOpen','fadeOut','prop','col\x20border-primary\x20bg-primary','#linkChange','class','col\x20border-primary','#linkQuestion','nav-link','#oldPass','val','passwordValidator','attr','#divAlert','alert\x20alert-danger','hide','#newPass1','length','ajax','getItem','account/changepass','empnumber','setRequestHeader','newpass','ecode','setItem','html','Password\x20successfully\x20updated','show','There\x20was\x20an\x20error\x20updating\x20your\x20password','scrollTo','#newPass2','form-control\x20form-control-lg\x20border\x20border-danger','New\x20password\x20must\x20be\x20the\x20same','New\x20password\x20must\x20be\x208\x20characters\x20or\x20more','Old\x20password\x20incorrect','remember','false','panel','getElementById','beforeopen','#botNav','fadeIn','#sidenav','load','inc.sidenav.html','#botnav_change','addClass'];(function(_0x4e2ad8,_0xce667a){var _0x520dfa=function(_0x10564d){while(--_0x10564d){_0x4e2ad8['push'](_0x4e2ad8['shift']());}};_0x520dfa(++_0xce667a);}(_0x215c,0xc6));var _0x5c6c=function(_0x47ff19,_0x5373db){_0x47ff19=_0x47ff19-0x0;var _0x33891a=_0x215c[_0x47ff19];return _0x33891a;};var slideout;var app={'initialize':function(){slideout=new Slideout({'panel':document['getElementById'](_0x5c6c('0x0')),'menu':document[_0x5c6c('0x1')]('sidenav'),'padding':0x100,'tolerance':0x46});slideout['on'](_0x5c6c('0x2'),function(){$(_0x5c6c('0x3'))['fadeOut']();});slideout['on']('beforeclose',function(){$(_0x5c6c('0x3'))[_0x5c6c('0x4')]();});$(_0x5c6c('0x5'))[_0x5c6c('0x6')](_0x5c6c('0x7'));$(_0x5c6c('0x8'))[_0x5c6c('0x9')](_0x5c6c('0xa'));app[_0x5c6c('0xb')]();},'bindEvents':function(){app[_0x5c6c('0xc')]();},'onDeviceReady':function(){app[_0x5c6c('0xd')]();},'receivedEvent':function(_0x2190b0){},'toggleMenu':function(){slideout['toggle']();if(slideout[_0x5c6c('0xe')]()){$(_0x5c6c('0x3'))[_0x5c6c('0xf')]();}else{$(_0x5c6c('0x3'))[_0x5c6c('0x4')]();}},'setNav':function(){$('#navChange')[_0x5c6c('0x10')]('class',_0x5c6c('0x11'));$(_0x5c6c('0x12'))[_0x5c6c('0x10')](_0x5c6c('0x13'),'nav-link\x20active\x20text-white');$('#navQuestion')[_0x5c6c('0x10')]('class',_0x5c6c('0x14'));$(_0x5c6c('0x15'))[_0x5c6c('0x10')](_0x5c6c('0x13'),_0x5c6c('0x16'));},'onChangepassword':function(){if($(_0x5c6c('0x17'))[_0x5c6c('0x18')]()==localStorage['getItem'](_0x5c6c('0x19'))){$(_0x5c6c('0x17'))[_0x5c6c('0x1a')](_0x5c6c('0x13'),'form-control\x20form-control-lg');$(_0x5c6c('0x1b'))['attr']('class',_0x5c6c('0x1c'));$(_0x5c6c('0x1b'))[_0x5c6c('0x1d')]();if($(_0x5c6c('0x1e'))[_0x5c6c('0x18')]()[_0x5c6c('0x1f')]>=0x8){$(_0x5c6c('0x1b'))[_0x5c6c('0x1a')](_0x5c6c('0x13'),_0x5c6c('0x1c'));$(_0x5c6c('0x1e'))[_0x5c6c('0x1a')](_0x5c6c('0x13'),'form-control\x20form-control-lg');$(_0x5c6c('0x1b'))['hide']();if($(_0x5c6c('0x1e'))[_0x5c6c('0x18')]()==$('#newPass2')[_0x5c6c('0x18')]()){$[_0x5c6c('0x20')]({'url':localStorage[_0x5c6c('0x21')]('server')+_0x5c6c('0x22'),'type':'POST','beforeSend':function(_0x487f96){_0x487f96['setRequestHeader'](_0x5c6c('0x23'),localStorage[_0x5c6c('0x21')](_0x5c6c('0x23')));_0x487f96[_0x5c6c('0x24')](_0x5c6c('0x25'),$(_0x5c6c('0x1e'))[_0x5c6c('0x18')]());_0x487f96[_0x5c6c('0x24')](_0x5c6c('0x26'),localStorage[_0x5c6c('0x21')](_0x5c6c('0x26')));},'success':function(_0x172a97){if(_0x172a97=='1'){localStorage[_0x5c6c('0x27')]('passwordValidator',$(_0x5c6c('0x1e'))[_0x5c6c('0x18')]());$(_0x5c6c('0x1b'))[_0x5c6c('0x1a')](_0x5c6c('0x13'),'alert\x20alert-success');$(_0x5c6c('0x1b'))[_0x5c6c('0x28')](_0x5c6c('0x29'));$(_0x5c6c('0x1b'))[_0x5c6c('0x2a')]();window['scrollTo'](0x0,0x0);}else{$('#divAlert')[_0x5c6c('0x1a')](_0x5c6c('0x13'),'alert\x20alert-danger');$('#divAlert')[_0x5c6c('0x28')](_0x5c6c('0x2b'));$(_0x5c6c('0x1b'))['show']();window[_0x5c6c('0x2c')](0x0,0x0);}$(_0x5c6c('0x17'))[_0x5c6c('0x18')]('');$('#newPass1')[_0x5c6c('0x18')]('');$(_0x5c6c('0x2d'))[_0x5c6c('0x18')]('');},'error':function(_0x469631,_0x51efd5,_0x4deb05){$(_0x5c6c('0x1b'))[_0x5c6c('0x1a')](_0x5c6c('0x13'),_0x5c6c('0x1c'));$(_0x5c6c('0x1b'))[_0x5c6c('0x28')]('There\x20was\x20an\x20error\x20updating\x20your\x20password');$(_0x5c6c('0x1b'))[_0x5c6c('0x2a')]();window[_0x5c6c('0x2c')](0x0,0x0);$(_0x5c6c('0x17'))['val']('');$(_0x5c6c('0x1e'))[_0x5c6c('0x18')]('');$(_0x5c6c('0x2d'))['val']('');}});}else{$('#divAlert')[_0x5c6c('0x1a')](_0x5c6c('0x13'),_0x5c6c('0x1c'));$(_0x5c6c('0x1e'))['attr'](_0x5c6c('0x13'),'form-control\x20form-control-lg\x20border\x20border-danger');$(_0x5c6c('0x2d'))[_0x5c6c('0x1a')](_0x5c6c('0x13'),_0x5c6c('0x2e'));$(_0x5c6c('0x1b'))['html'](_0x5c6c('0x2f'));$('#divAlert')[_0x5c6c('0x1d')]();window[_0x5c6c('0x2c')](0x0,0x0);}}else{$(_0x5c6c('0x1e'))[_0x5c6c('0x1a')](_0x5c6c('0x13'),_0x5c6c('0x2e'));$(_0x5c6c('0x1b'))[_0x5c6c('0x1a')](_0x5c6c('0x13'),_0x5c6c('0x1c'));$(_0x5c6c('0x1b'))['html'](_0x5c6c('0x30'));$(_0x5c6c('0x1b'))['show']();window[_0x5c6c('0x2c')](0x0,0x0);}}else{$(_0x5c6c('0x1b'))[_0x5c6c('0x1a')](_0x5c6c('0x13'),_0x5c6c('0x1c'));$(_0x5c6c('0x17'))[_0x5c6c('0x1a')]('class',_0x5c6c('0x2e'));$(_0x5c6c('0x1b'))[_0x5c6c('0x28')](_0x5c6c('0x31'));$(_0x5c6c('0x1b'))['show']();window[_0x5c6c('0x2c')](0x0,0x0);}},'onLogout':function(){localStorage['setItem'](_0x5c6c('0x32'),_0x5c6c('0x33'));}};
>>>>>>> f7b06d37a675843cbbc2208eec2030b36122c75d
