<<<<<<< HEAD
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
		

        $("#sidenav"      ).load("inc.sidenav.html"      );
		$("#botnav-attendance").addClass("text-warning");
        app.bindEvents();
        
    
    },
    bindEvents: function() {
       app.onDeviceReady();
    },

    onDeviceReady: function() {

         $.ajax({
     
            url        : localStorage.getItem("server") + "attendance/leaveData",
            type       : "POST",
            dataType   : "json",
            beforeSend : function(xhr){
                 xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode"     ) );
                 xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber" ) );
            },  
            success: function(msg) { 
                global.msg(JSON.stringify(msg));
            },
            error: function(jqXHR	, textStatus, errorThrown) {  
                alert(JSON.stringify(jqXHR       ));
                alert(JSON.stringify(textStatus  ));
                alert(JSON.stringify(errorThrown ));
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
        
    
    onCheckDtr: function() {
        
    },
	onLogout: function(){
		localStorage.setItem("remember","false");
	}
 
};
=======
var _0x4211=['server','attendance/leaveData','POST','json','setRequestHeader','ecode','empnumber','msg','stringify','toggle','isOpen','setItem','remember','false','panel','sidenav','beforeopen','#botNav','fadeOut','beforeclose','fadeIn','#sidenav','load','inc.sidenav.html','#botnav-attendance','bindEvents','onDeviceReady','ajax','getItem'];(function(_0xb67384,_0x27295a){var _0x156d7c=function(_0x52a1f8){while(--_0x52a1f8){_0xb67384['push'](_0xb67384['shift']());}};_0x156d7c(++_0x27295a);}(_0x4211,0xbc));var _0x445d=function(_0x4a77be,_0x101051){_0x4a77be=_0x4a77be-0x0;var _0x5dae3a=_0x4211[_0x4a77be];return _0x5dae3a;};var slideout;var app={'initialize':function(){slideout=new Slideout({'panel':document['getElementById'](_0x445d('0x0')),'menu':document['getElementById'](_0x445d('0x1')),'padding':0x100,'tolerance':0x46});slideout['on'](_0x445d('0x2'),function(){$(_0x445d('0x3'))[_0x445d('0x4')]();});slideout['on'](_0x445d('0x5'),function(){$(_0x445d('0x3'))[_0x445d('0x6')]();});$(_0x445d('0x7'))[_0x445d('0x8')](_0x445d('0x9'));$(_0x445d('0xa'))['addClass']('text-warning');app[_0x445d('0xb')]();},'bindEvents':function(){app[_0x445d('0xc')]();},'onDeviceReady':function(){$[_0x445d('0xd')]({'url':localStorage[_0x445d('0xe')](_0x445d('0xf'))+_0x445d('0x10'),'type':_0x445d('0x11'),'dataType':_0x445d('0x12'),'beforeSend':function(_0x115542){_0x115542[_0x445d('0x13')](_0x445d('0x14'),localStorage[_0x445d('0xe')](_0x445d('0x14')));_0x115542['setRequestHeader'](_0x445d('0x15'),localStorage[_0x445d('0xe')](_0x445d('0x15')));},'success':function(_0x532152){global[_0x445d('0x16')](JSON[_0x445d('0x17')](_0x532152));},'error':function(_0x418439,_0x502831,_0x186ba3){alert(JSON[_0x445d('0x17')](_0x418439));alert(JSON[_0x445d('0x17')](_0x502831));alert(JSON[_0x445d('0x17')](_0x186ba3));}});},'receivedEvent':function(_0x33f8cc){},'toggleMenu':function(){slideout[_0x445d('0x18')]();if(slideout[_0x445d('0x19')]()){$(_0x445d('0x3'))['fadeOut']();}else{$(_0x445d('0x3'))[_0x445d('0x6')]();}},'onCheckDtr':function(){},'onLogout':function(){localStorage[_0x445d('0x1a')](_0x445d('0x1b'),_0x445d('0x1c'));}};
>>>>>>> f7b06d37a675843cbbc2208eec2030b36122c75d
