<<<<<<< HEAD
var slideout;
var app = {
    initialize: function() {
           slideout = new Slideout({
									'panel'	    : document.getElementById('panel'  ),
									'menu'      : document.getElementById('sidenav'),
									'padding'   : 256,
									'tolerance' : 70
                                   });
		
		slideout.on('beforeopen'  , function() { $("#botNav").fadeOut(); });
		slideout.on('beforeclose' , function() { $("#botNav").fadeIn();  });
		
        $("#sidenav").load("inc.sidenav.html");
		$("#botnav-attendance").addClass("text-warning");
        app.bindEvents();
  
    },
    bindEvents: function() {
		app.onDeviceReady();
    },

    onDeviceReady: function() {
       $("#topbarTitle").html("ATTENDANCE");
        
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
var _0x565e=['html','toggle','isOpen','setItem','remember','getElementById','panel','sidenav','beforeopen','#botNav','beforeclose','fadeIn','#sidenav','load','inc.sidenav.html','text-warning','onDeviceReady'];(function(_0x1e0fc2,_0x299fbb){var _0x8734c0=function(_0x5ee8b6){while(--_0x5ee8b6){_0x1e0fc2['push'](_0x1e0fc2['shift']());}};_0x8734c0(++_0x299fbb);}(_0x565e,0x104));var _0x2fd1=function(_0xfb0a72,_0x9d8757){_0xfb0a72=_0xfb0a72-0x0;var _0x36686a=_0x565e[_0xfb0a72];return _0x36686a;};var slideout;var app={'initialize':function(){slideout=new Slideout({'panel':document[_0x2fd1('0x0')](_0x2fd1('0x1')),'menu':document['getElementById'](_0x2fd1('0x2')),'padding':0x100,'tolerance':0x46});slideout['on'](_0x2fd1('0x3'),function(){$(_0x2fd1('0x4'))['fadeOut']();});slideout['on'](_0x2fd1('0x5'),function(){$('#botNav')[_0x2fd1('0x6')]();});$(_0x2fd1('0x7'))[_0x2fd1('0x8')](_0x2fd1('0x9'));$('#botnav-attendance')['addClass'](_0x2fd1('0xa'));app['bindEvents']();},'bindEvents':function(){app[_0x2fd1('0xb')]();},'onDeviceReady':function(){$('#topbarTitle')[_0x2fd1('0xc')]('ATTENDANCE');},'toggleMenu':function(){slideout[_0x2fd1('0xd')]();if(slideout[_0x2fd1('0xe')]()){$(_0x2fd1('0x4'))['fadeOut']();}else{$(_0x2fd1('0x4'))[_0x2fd1('0x6')]();}},'onLogout':function(){localStorage[_0x2fd1('0xf')](_0x2fd1('0x10'),'false');}};
>>>>>>> f7b06d37a675843cbbc2208eec2030b36122c75d
