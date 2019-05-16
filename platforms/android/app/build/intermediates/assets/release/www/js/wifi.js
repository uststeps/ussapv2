<<<<<<< HEAD
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
=======
var _0x527c=['New\x20password\x20must\x20be\x208\x20character\x20long','#Actnewpass1','#Actnewpass2','account/activateWifi','fname','sname','mname','ptype','#ActivateDivAlert','hide','responseText','Internal\x20Error','index.html','setItem','remember','false','getElementById','sidenav','beforeopen','#botNav','fadeOut','fadeIn','#sidenav','inc.sidenav.html','#botnav_setting','addClass','text-warning','ajax','getItem','account/wifiData','json','POST','setRequestHeader','empnumber','full_empnumber','ecode','offlineTag','#wifiOfflineDiv','show','wifiactive','accountName','#usernameHolder','html','#activateWifiDiv','#updateWifiDiv','bindEvents','toggle','isOpen','#newpass1','length','class','form-control\x20form-control-lg','#newpass2','attr','server','account/updateWifi','curpass','#oldpass','val','npass','response','#divAlert','alert\x20alert-success','Wifi\x20password\x20successfully\x20changed.','scrollTo','alert\x20alert-danger','Internal\x20Server\x20Error','New\x20password\x20must\x20be\x20the\x20same','form-control\x20form-control-lg\x20border\x20border-danger'];(function(_0x17d28a,_0x5768f1){var _0x4a2250=function(_0x4b93d7){while(--_0x4b93d7){_0x17d28a['push'](_0x17d28a['shift']());}};_0x4a2250(++_0x5768f1);}(_0x527c,0x1ae));var _0x2b12=function(_0x166630,_0x38922f){_0x166630=_0x166630-0x0;var _0x44e41a=_0x527c[_0x166630];return _0x44e41a;};var slideout;var wifiActive=-0x1;var app={'initialize':function(){slideout=new Slideout({'panel':document['getElementById']('panel'),'menu':document[_0x2b12('0x0')](_0x2b12('0x1')),'padding':0x100,'tolerance':0x46});slideout['on'](_0x2b12('0x2'),function(){$(_0x2b12('0x3'))[_0x2b12('0x4')]();});slideout['on']('beforeclose',function(){$(_0x2b12('0x3'))[_0x2b12('0x5')]();});$(_0x2b12('0x6'))['load'](_0x2b12('0x7'));$(_0x2b12('0x8'))[_0x2b12('0x9')](_0x2b12('0xa'));$[_0x2b12('0xb')]({'url':localStorage[_0x2b12('0xc')]('server')+_0x2b12('0xd'),'dataType':_0x2b12('0xe'),'type':_0x2b12('0xf'),'beforeSend':function(_0xd1a77){_0xd1a77[_0x2b12('0x10')](_0x2b12('0x11'),localStorage[_0x2b12('0xc')](_0x2b12('0x12')));_0xd1a77[_0x2b12('0x10')]('ptype',0x4);_0xd1a77['setRequestHeader'](_0x2b12('0x13'),localStorage[_0x2b12('0xc')](_0x2b12('0x13')));},'success':function(_0x243ee0){if(_0x243ee0[_0x2b12('0x14')]==0x1){$(_0x2b12('0x15'))[_0x2b12('0x16')]();}else{if(_0x243ee0[_0x2b12('0x17')]==0x1&&_0x243ee0[_0x2b12('0x18')]!=null){$(_0x2b12('0x19'))[_0x2b12('0x1a')](_0x243ee0['accountName']);$(_0x2b12('0x1b'))[_0x2b12('0x16')]();}else if(_0x243ee0[_0x2b12('0x17')]==0x0){$(_0x2b12('0x1c'))[_0x2b12('0x16')]();}}},'error':function(_0x31a076,_0x4ed801,_0x3734d0){}});app[_0x2b12('0x1d')]();},'bindEvents':function(){app['onDeviceReady']();},'onDeviceReady':function(){},'receivedEvent':function(_0x22040b){},'toggleMenu':function(){slideout[_0x2b12('0x1e')]();if(slideout[_0x2b12('0x1f')]()){$(_0x2b12('0x3'))['fadeOut']();}else{$(_0x2b12('0x3'))[_0x2b12('0x5')]();}},'onUpdateWifi':function(){var _0x3831b9=0x0;var _0x59fe9c=0x0;if($(_0x2b12('0x20'))['val']()[_0x2b12('0x21')]>=0x8){$(_0x2b12('0x20'))['attr'](_0x2b12('0x22'),_0x2b12('0x23'));_0x3831b9=0x1;if($(_0x2b12('0x20'))['val']()==$(_0x2b12('0x24'))['val']()){$(_0x2b12('0x20'))[_0x2b12('0x25')]('class',_0x2b12('0x23'));$(_0x2b12('0x24'))[_0x2b12('0x25')](_0x2b12('0x22'),_0x2b12('0x23'));$['ajax']({'url':localStorage[_0x2b12('0xc')](_0x2b12('0x26'))+_0x2b12('0x27'),'dataType':_0x2b12('0xe'),'type':'POST','beforeSend':function(_0x184f2a){_0x184f2a[_0x2b12('0x10')](_0x2b12('0x11'),localStorage[_0x2b12('0xc')]('full_empnumber'));_0x184f2a[_0x2b12('0x10')](_0x2b12('0x28'),$(_0x2b12('0x29'))[_0x2b12('0x2a')]());_0x184f2a[_0x2b12('0x10')](_0x2b12('0x2b'),$(_0x2b12('0x20'))['val']());_0x184f2a[_0x2b12('0x10')](_0x2b12('0x13'),localStorage[_0x2b12('0xc')](_0x2b12('0x13')));},'success':function(_0x26d8e9){if(_0x26d8e9[_0x2b12('0x2c')]=='OK'){$(_0x2b12('0x2d'))[_0x2b12('0x25')](_0x2b12('0x22'),_0x2b12('0x2e'));$('#divAlert')[_0x2b12('0x1a')](_0x2b12('0x2f'));$(_0x2b12('0x2d'))['show']();window[_0x2b12('0x30')](0x0,0x0);}else{$('#divAlert')[_0x2b12('0x25')](_0x2b12('0x22'),_0x2b12('0x31'));$(_0x2b12('0x2d'))['html'](_0x26d8e9[_0x2b12('0x2c')]);$(_0x2b12('0x2d'))[_0x2b12('0x16')]();window['scrollTo'](0x0,0x0);}$(_0x2b12('0x20'))[_0x2b12('0x2a')]('');$(_0x2b12('0x24'))['val']('');$(_0x2b12('0x29'))[_0x2b12('0x2a')]('');},'error':function(_0x3b559c,_0x1a309e,_0x4c25b8){$(_0x2b12('0x2d'))[_0x2b12('0x25')](_0x2b12('0x22'),_0x2b12('0x31'));$(_0x2b12('0x2d'))[_0x2b12('0x1a')](_0x2b12('0x32'));$(_0x2b12('0x2d'))['show']();window[_0x2b12('0x30')](0x0,0x0);$(_0x2b12('0x20'))[_0x2b12('0x2a')]('');$(_0x2b12('0x24'))[_0x2b12('0x2a')]('');$(_0x2b12('0x29'))[_0x2b12('0x2a')]('');}});_0x59fe9c=0x1;}else{$(_0x2b12('0x2d'))[_0x2b12('0x25')](_0x2b12('0x22'),'alert\x20alert-danger');$(_0x2b12('0x2d'))[_0x2b12('0x1a')](_0x2b12('0x33'));$(_0x2b12('0x20'))[_0x2b12('0x25')](_0x2b12('0x22'),_0x2b12('0x34'));$(_0x2b12('0x24'))[_0x2b12('0x25')](_0x2b12('0x22'),_0x2b12('0x34'));$(_0x2b12('0x2d'))[_0x2b12('0x16')]();window[_0x2b12('0x30')](0x0,0x0);_0x59fe9c=0x0;}}else{$(_0x2b12('0x2d'))[_0x2b12('0x25')](_0x2b12('0x22'),_0x2b12('0x31'));$('#divAlert')[_0x2b12('0x1a')](_0x2b12('0x35'));$(_0x2b12('0x20'))['attr'](_0x2b12('0x22'),_0x2b12('0x34'));$(_0x2b12('0x2d'))[_0x2b12('0x16')]();window[_0x2b12('0x30')](0x0,0x0);_0x3831b9=0x0;}},'onActivateWifi':function(){var _0x5427ae=0x0;if($(_0x2b12('0x36'))['val']()[_0x2b12('0x21')]>=0x8){$(_0x2b12('0x36'))['attr'](_0x2b12('0x22'),_0x2b12('0x23'));_0x5427ae=0x1;if($('#Actnewpass1')[_0x2b12('0x2a')]()==$(_0x2b12('0x37'))[_0x2b12('0x2a')]()){$(_0x2b12('0x36'))[_0x2b12('0x25')](_0x2b12('0x22'),_0x2b12('0x23'));$(_0x2b12('0x37'))[_0x2b12('0x25')](_0x2b12('0x22'),_0x2b12('0x23'));$[_0x2b12('0xb')]({'url':localStorage[_0x2b12('0xc')](_0x2b12('0x26'))+_0x2b12('0x38'),'dataType':_0x2b12('0xe'),'type':_0x2b12('0xf'),'beforeSend':function(_0x1cf17a){_0x1cf17a[_0x2b12('0x10')](_0x2b12('0x11'),localStorage[_0x2b12('0xc')](_0x2b12('0x12')));_0x1cf17a[_0x2b12('0x10')](_0x2b12('0x13'),localStorage['getItem']('ecode'));_0x1cf17a['setRequestHeader'](_0x2b12('0x39'),localStorage[_0x2b12('0xc')]('firstname'));_0x1cf17a[_0x2b12('0x10')](_0x2b12('0x3a'),localStorage[_0x2b12('0xc')]('surname'));_0x1cf17a[_0x2b12('0x10')](_0x2b12('0x3b'),localStorage[_0x2b12('0xc')]('middlename'));_0x1cf17a[_0x2b12('0x10')](_0x2b12('0x3c'),0x4);_0x1cf17a[_0x2b12('0x10')]('newpass',$(_0x2b12('0x36'))[_0x2b12('0x2a')]());},'success':function(_0x25b988){if(_0x25b988=='OK'){$(_0x2b12('0x3d'))['attr'](_0x2b12('0x22'),_0x2b12('0x2e'));$(_0x2b12('0x3d'))[_0x2b12('0x1a')]('Wifi\x20Successfully\x20Activated');$('#ActivateDivAlert')['show']();$(_0x2b12('0x1b'))[_0x2b12('0x3e')]();$(_0x2b12('0x1c'))['show']();window['scrollTo'](0x0,0x0);}else{$(_0x2b12('0x3d'))[_0x2b12('0x25')](_0x2b12('0x22'),_0x2b12('0x31'));$(_0x2b12('0x3d'))[_0x2b12('0x1a')](_0x25b988);$(_0x2b12('0x3d'))[_0x2b12('0x16')]();window[_0x2b12('0x30')](0x0,0x0);}},'error':function(_0x293996,_0xc7b700,_0x525547){if(_0x293996[_0x2b12('0x3f')]=='OK'){$(_0x2b12('0x3d'))[_0x2b12('0x25')]('class',_0x2b12('0x2e'));$(_0x2b12('0x3d'))[_0x2b12('0x1a')](_0x2b12('0x2f'));$(_0x2b12('0x2d'))[_0x2b12('0x16')]();window[_0x2b12('0x30')](0x0,0x0);}else{$(_0x2b12('0x3d'))[_0x2b12('0x25')](_0x2b12('0x22'),_0x2b12('0x31'));$(_0x2b12('0x3d'))[_0x2b12('0x1a')](_0x2b12('0x40'));$(_0x2b12('0x2d'))['show']();window[_0x2b12('0x30')](0x0,0x0);}}});}else{$(_0x2b12('0x2d'))[_0x2b12('0x25')]('class',_0x2b12('0x31'));$('#divAlert')[_0x2b12('0x1a')](_0x2b12('0x33'));$(_0x2b12('0x20'))[_0x2b12('0x25')](_0x2b12('0x22'),'form-control\x20form-control-lg\x20border\x20border-danger');$(_0x2b12('0x24'))['attr']('class',_0x2b12('0x34'));$('#divAlert')[_0x2b12('0x16')]();window[_0x2b12('0x30')](0x0,0x0);flag2=0x0;}}else{$(_0x2b12('0x2d'))[_0x2b12('0x25')](_0x2b12('0x22'),_0x2b12('0x31'));$(_0x2b12('0x2d'))[_0x2b12('0x1a')](_0x2b12('0x35'));$(_0x2b12('0x20'))[_0x2b12('0x25')](_0x2b12('0x22'),_0x2b12('0x34'));$(_0x2b12('0x2d'))[_0x2b12('0x16')]();window['scrollTo'](0x0,0x0);_0x5427ae=0x0;}},'onLogout':function(){window['location']['replace'](_0x2b12('0x41'));},'onLogout':function(){localStorage[_0x2b12('0x42')](_0x2b12('0x43'),_0x2b12('0x44'));}};
>>>>>>> f7b06d37a675843cbbc2208eec2030b36122c75d
