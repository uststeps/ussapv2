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
 
        $("#sidenav"    ).load("inc.sidenav.html"    ); 
        $("#botnav_history").addClass("text-warning");
        app.bindEvents();
    },
    
    bindEvents: function() {
        app.onDeviceReady();
    },

    onDeviceReady: function() {
        $.ajax({
            url        : localStorage.getItem("server") + "account/wifihistory",
            type       : "POST",
            dataType   : "json",
            beforeSend : function(xhr){
			   xhr.setRequestHeader('ecode'     ,   localStorage.getItem("ecode") );
               xhr.setRequestHeader('empnumber' , localStorage.getItem("full_empnumber"));  
               xhr.setRequestHeader('ptype'     , 4);  
            },               
            success    : function(msg) { 
               var total = 0;
			   $.each(msg, function(index, element) {
					var isActive = "INACTIVE";
					var activeColor = "danger";
					
					if (msg[index]["status"] == 1) {
						activeColor = "success";
						isActive = "ACTIVE";
					} 
					
					$("#wifiHistoryHolder").append(
						'<tr>' + 
                            '<td class="small">' + 
                                'School Year : <span class="text-asphalt">' + msg[index]["schoolyear"].split(" ")[0] + '</span><br/>' + 
                                'Semester : <span class="text-asphalt">' + msg[index]["semester"] + '</span><br/>' + 
                                'Activation Date : <span class="text-asphalt">' + msg[index]["dateActivated"] + '</span><br/>' + 
                                'Reason : <span class="text-asphalt">' + msg[index]["reason"] + '</span>' + 
                            '</td>' + 
                            '<td class="text-' + activeColor + ' text-center">' + isActive + '</td>' + 
                        '</tr>'
					);
					
					total++;
				});
				
				if (total == 0) {
					$("#wifiHistoryHolder").html(
						'<tr>' + 
                            '<td class="small text-center text-danger" colspan="2">' + 
                                'No record found' +
                            '</td>' +
                        '</tr>'
					);
					
				}
			   
			   
            },             
            error      : function(jqXHR	, textStatus, errorThrown) {  
               //alert(JSON.stringify(jqXHR));
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
	onLogout: function(){
		window.location.replace("index.html");
	},
	onLogout: function(){
		localStorage.setItem("remember","false");
	}
};
=======
var _0x3bf4=['</td>','<td\x20class=\x22text-','\x20text-center\x22>','</tr>','<td\x20class=\x22small\x20text-center\x20text-danger\x22\x20colspan=\x222\x22>','No\x20record\x20found','toggle','isOpen','location','replace','index.html','setItem','remember','false','getElementById','sidenav','#botNav','fadeOut','beforeclose','fadeIn','#sidenav','load','inc.sidenav.html','#botnav_history','addClass','bindEvents','onDeviceReady','ajax','getItem','server','POST','setRequestHeader','ecode','empnumber','ptype','each','INACTIVE','status','success','#wifiHistoryHolder','append','<tr>','School\x20Year\x20:\x20<span\x20class=\x22text-asphalt\x22>','schoolyear','split','</span><br/>','Semester\x20:\x20<span\x20class=\x22text-asphalt\x22>','semester','Activation\x20Date\x20:\x20<span\x20class=\x22text-asphalt\x22>','dateActivated','reason','</span>'];(function(_0x1f1f43,_0x94d0a3){var _0x396e2d=function(_0x19f3d5){while(--_0x19f3d5){_0x1f1f43['push'](_0x1f1f43['shift']());}};_0x396e2d(++_0x94d0a3);}(_0x3bf4,0x1e2));var _0x1d97=function(_0x32f69b,_0x4250e7){_0x32f69b=_0x32f69b-0x0;var _0xad3794=_0x3bf4[_0x32f69b];return _0xad3794;};var slideout;var app={'initialize':function(){slideout=new Slideout({'panel':document[_0x1d97('0x0')]('panel'),'menu':document[_0x1d97('0x0')](_0x1d97('0x1')),'padding':0x100,'tolerance':0x46});slideout['on']('beforeopen',function(){$(_0x1d97('0x2'))[_0x1d97('0x3')]();});slideout['on'](_0x1d97('0x4'),function(){$(_0x1d97('0x2'))[_0x1d97('0x5')]();});$(_0x1d97('0x6'))[_0x1d97('0x7')](_0x1d97('0x8'));$(_0x1d97('0x9'))[_0x1d97('0xa')]('text-warning');app[_0x1d97('0xb')]();},'bindEvents':function(){app[_0x1d97('0xc')]();},'onDeviceReady':function(){$[_0x1d97('0xd')]({'url':localStorage[_0x1d97('0xe')](_0x1d97('0xf'))+'account/wifihistory','type':_0x1d97('0x10'),'dataType':'json','beforeSend':function(_0x7b52f5){_0x7b52f5[_0x1d97('0x11')](_0x1d97('0x12'),localStorage['getItem'](_0x1d97('0x12')));_0x7b52f5[_0x1d97('0x11')](_0x1d97('0x13'),localStorage[_0x1d97('0xe')]('full_empnumber'));_0x7b52f5[_0x1d97('0x11')](_0x1d97('0x14'),0x4);},'success':function(_0x51df0f){var _0x4c3e04=0x0;$[_0x1d97('0x15')](_0x51df0f,function(_0x4100c1,_0x39fb3d){var _0x45693f=_0x1d97('0x16');var _0x3f30a9='danger';if(_0x51df0f[_0x4100c1][_0x1d97('0x17')]==0x1){_0x3f30a9=_0x1d97('0x18');_0x45693f='ACTIVE';}$(_0x1d97('0x19'))[_0x1d97('0x1a')](_0x1d97('0x1b')+'<td\x20class=\x22small\x22>'+_0x1d97('0x1c')+_0x51df0f[_0x4100c1][_0x1d97('0x1d')][_0x1d97('0x1e')]('\x20')[0x0]+_0x1d97('0x1f')+_0x1d97('0x20')+_0x51df0f[_0x4100c1][_0x1d97('0x21')]+_0x1d97('0x1f')+_0x1d97('0x22')+_0x51df0f[_0x4100c1][_0x1d97('0x23')]+'</span><br/>'+'Reason\x20:\x20<span\x20class=\x22text-asphalt\x22>'+_0x51df0f[_0x4100c1][_0x1d97('0x24')]+_0x1d97('0x25')+_0x1d97('0x26')+_0x1d97('0x27')+_0x3f30a9+_0x1d97('0x28')+_0x45693f+_0x1d97('0x26')+_0x1d97('0x29'));_0x4c3e04++;});if(_0x4c3e04==0x0){$('#wifiHistoryHolder')['html'](_0x1d97('0x1b')+_0x1d97('0x2a')+_0x1d97('0x2b')+_0x1d97('0x26')+_0x1d97('0x29'));}},'error':function(_0x47c03b,_0x68b2e5,_0x458fe8){}});},'receivedEvent':function(_0x30f9b9){},'toggleMenu':function(){slideout[_0x1d97('0x2c')]();if(slideout[_0x1d97('0x2d')]()){$(_0x1d97('0x2'))[_0x1d97('0x3')]();}else{$('#botNav')['fadeIn']();}},'onLogout':function(){window[_0x1d97('0x2e')][_0x1d97('0x2f')](_0x1d97('0x30'));},'onLogout':function(){localStorage[_0x1d97('0x31')](_0x1d97('0x32'),_0x1d97('0x33'));}};
>>>>>>> f7b06d37a675843cbbc2208eec2030b36122c75d
