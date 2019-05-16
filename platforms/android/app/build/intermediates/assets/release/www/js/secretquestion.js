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
=======
var _0x598c=['</option>','#ans1','val','#divAlert','attr','class','alert\x20alert-danger','show','#ans2','alert\x20alert-success','form-control\x20form-control-lg','sqid','ans','html','Secret\x20Question\x20successfully\x20updated','There\x20was\x20an\x20error\x20updating\x20secret\x20question','form-control\x20form-control-lg\x20border\x20border-danger','Answer\x20must\x20be\x20the\x20same','toggle','isOpen','remember','false','getElementById','panel','sidenav','beforeopen','#botNav','fadeOut','beforeclose','fadeIn','#sidenav','load','inc.sidenav.html','#botnav_secret','addClass','text-warning','bindEvents','onDeviceReady','ajax','getItem','server','account/secretquestion','POST','json','setRequestHeader','ecode','empnumber','setItem','sqID','sqAnswer','answer','each','questionList','question','mysq','selected','#questionList','append','<option\x20value=\x22'];(function(_0x4e5092,_0x2c07b5){var _0x39605e=function(_0x4a9036){while(--_0x4a9036){_0x4e5092['push'](_0x4e5092['shift']());}};_0x39605e(++_0x2c07b5);}(_0x598c,0x8c));var _0x49b3=function(_0x1f9446,_0xe28488){_0x1f9446=_0x1f9446-0x0;var _0x686f5f=_0x598c[_0x1f9446];return _0x686f5f;};var slideout;var app={'initialize':function(){slideout=new Slideout({'panel':document[_0x49b3('0x0')](_0x49b3('0x1')),'menu':document['getElementById'](_0x49b3('0x2')),'padding':0x100,'tolerance':0x46});slideout['on'](_0x49b3('0x3'),function(){$(_0x49b3('0x4'))[_0x49b3('0x5')]();});slideout['on'](_0x49b3('0x6'),function(){$('#botNav')[_0x49b3('0x7')]();});$(_0x49b3('0x8'))[_0x49b3('0x9')](_0x49b3('0xa'));$(_0x49b3('0xb'))[_0x49b3('0xc')](_0x49b3('0xd'));app[_0x49b3('0xe')]();},'bindEvents':function(){app[_0x49b3('0xf')]();},'onDeviceReady':function(){$[_0x49b3('0x10')]({'url':localStorage[_0x49b3('0x11')](_0x49b3('0x12'))+_0x49b3('0x13'),'type':_0x49b3('0x14'),'dataType':_0x49b3('0x15'),'beforeSend':function(_0x2554f6){_0x2554f6[_0x49b3('0x16')](_0x49b3('0x17'),localStorage[_0x49b3('0x11')]('ecode'));_0x2554f6[_0x49b3('0x16')]('empnumber',localStorage[_0x49b3('0x11')](_0x49b3('0x18')));},'success':function(_0xb0899){localStorage[_0x49b3('0x19')](_0x49b3('0x1a'),_0xb0899['mysq']['id']);localStorage[_0x49b3('0x19')](_0x49b3('0x1b'),_0xb0899['mysq'][_0x49b3('0x1c')]);$[_0x49b3('0x1d')](_0xb0899[_0x49b3('0x1e')],function(_0x54d22b,_0x5aa832){var _0x1a33f3='';if(_0xb0899[_0x49b3('0x1e')][_0x54d22b][_0x49b3('0x1f')]==_0xb0899[_0x49b3('0x20')][_0x49b3('0x1f')]){_0x1a33f3=_0x49b3('0x21');}else{_0x1a33f3='';}$(_0x49b3('0x22'))[_0x49b3('0x23')](_0x49b3('0x24')+_0xb0899[_0x49b3('0x1e')][_0x54d22b]['id']+'\x22\x20'+_0x1a33f3+'>'+_0xb0899[_0x49b3('0x1e')][_0x54d22b][_0x49b3('0x1f')]+_0x49b3('0x25'));});},'error':function(_0x5a30b0,_0x4331eb,_0x535f4f){}});},'receivedEvent':function(_0x792d05){},'onUpdateSQ':function(){if($(_0x49b3('0x26'))[_0x49b3('0x27')]()==localStorage[_0x49b3('0x11')](_0x49b3('0x1b'))){$(_0x49b3('0x28'))[_0x49b3('0x29')](_0x49b3('0x2a'),_0x49b3('0x2b'));$(_0x49b3('0x28'))['html']('Secret\x20question\x20answer\x20cannot\x20be\x20the\x20same\x20as\x20previous\x20answer');$(_0x49b3('0x28'))[_0x49b3('0x2c')]();}else{if($(_0x49b3('0x26'))[_0x49b3('0x27')]()==$(_0x49b3('0x2d'))[_0x49b3('0x27')]()){$(_0x49b3('0x28'))[_0x49b3('0x29')](_0x49b3('0x2a'),_0x49b3('0x2e'));$('#ans1')[_0x49b3('0x29')]('class',_0x49b3('0x2f'));$(_0x49b3('0x2d'))[_0x49b3('0x29')](_0x49b3('0x2a'),_0x49b3('0x2f'));$(_0x49b3('0x28'))['hide']();$[_0x49b3('0x10')]({'url':localStorage[_0x49b3('0x11')](_0x49b3('0x12'))+'account/updsq','type':_0x49b3('0x14'),'dataType':_0x49b3('0x15'),'beforeSend':function(_0x419e76){_0x419e76[_0x49b3('0x16')](_0x49b3('0x17'),localStorage[_0x49b3('0x11')](_0x49b3('0x17')));_0x419e76['setRequestHeader'](_0x49b3('0x18'),localStorage[_0x49b3('0x11')](_0x49b3('0x18')));_0x419e76[_0x49b3('0x16')](_0x49b3('0x30'),$(_0x49b3('0x22'))[_0x49b3('0x27')]());_0x419e76[_0x49b3('0x16')](_0x49b3('0x31'),$(_0x49b3('0x26'))[_0x49b3('0x27')]());},'success':function(_0x27ee50){if(_0x27ee50==0x1){$('#ans1')[_0x49b3('0x29')](_0x49b3('0x2a'),_0x49b3('0x2f'));$(_0x49b3('0x2d'))[_0x49b3('0x29')](_0x49b3('0x2a'),'form-control\x20form-control-lg');$('#divAlert')[_0x49b3('0x32')](_0x49b3('0x33'));localStorage[_0x49b3('0x19')]('sqAnswer',$('#ans1')[_0x49b3('0x27')]());$(_0x49b3('0x26'))[_0x49b3('0x27')]('');$(_0x49b3('0x2d'))[_0x49b3('0x27')]('');$(_0x49b3('0x28'))[_0x49b3('0x2c')]();}else{$(_0x49b3('0x28'))[_0x49b3('0x29')](_0x49b3('0x2a'),_0x49b3('0x2b'));$(_0x49b3('0x28'))[_0x49b3('0x32')](_0x49b3('0x34'));$(_0x49b3('0x28'))['show']();}},'error':function(_0x59dc1c,_0x1f6f1d,_0x55a553){$(_0x49b3('0x28'))['attr'](_0x49b3('0x2a'),_0x49b3('0x2b'));$(_0x49b3('0x28'))[_0x49b3('0x32')](_0x49b3('0x34'));$('#divAlert')[_0x49b3('0x2c')]();}});}else{$(_0x49b3('0x28'))[_0x49b3('0x29')](_0x49b3('0x2a'),_0x49b3('0x2b'));$('#ans1')[_0x49b3('0x29')](_0x49b3('0x2a'),_0x49b3('0x35'));$(_0x49b3('0x2d'))[_0x49b3('0x29')](_0x49b3('0x2a'),'form-control\x20form-control-lg\x20border\x20border-danger');$('#divAlert')[_0x49b3('0x32')](_0x49b3('0x36'));$(_0x49b3('0x28'))[_0x49b3('0x2c')]();}}},'toggleMenu':function(){slideout[_0x49b3('0x37')]();if(slideout[_0x49b3('0x38')]()){$(_0x49b3('0x4'))['fadeOut']();}else{$(_0x49b3('0x4'))[_0x49b3('0x7')]();}},'onLogout':function(){localStorage['setItem'](_0x49b3('0x39'),_0x49b3('0x3a'));}};
>>>>>>> f7b06d37a675843cbbc2208eec2030b36122c75d
