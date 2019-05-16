<<<<<<< HEAD
var slideout;
var empnumber;
var dateData;
var app = {
    initialize: function() {
        
        slideout = new Slideout({
            'panel'    : document.getElementById('panel'  ),
            'menu'     : document.getElementById('sidenav'),
            'padding'  : 256,
            'tolerance': 70
        });
		
        //Menu open handler
		slideout.on('beforeopen'  , function() { $("#botNav").fadeOut(); });
		//Menu close handler
		slideout.on('beforeclose' , function() { $("#botNav").fadeIn();  });

		
        $("#sidenav"      	   ).load("inc.sidenav.html");
		$("#botnav-attendance" ).addClass("text-warning");
	
        app.bindEvents();
        
    },
    bindEvents: function() {
       app.onDeviceReady();
    },

    onDeviceReady: function() {
      
	   $.ajax({
            url        : localStorage.getItem("server") + "attendance/absencesData",
            type       : "POST",
            dataType   : "json",
            beforeSend : function(xhr){
                   xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber") );
                   xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode"    ) );
            },
            success: function(msg) { 
				dateData = msg["monthyear"];
				$.each(msg["yearlist"], function(index, element) {
					$("#listYear").append("<option value='" + element + "'>" + element + "</option>");
				});	
            },	
            error: function(jqXHR	, textStatus, errorThrown) {
				global.msg("Error connecting to server, please restart the app", "Connectivity issue");
            }
       });
	   
    },
    receivedEvent: function(id) {
    },
	
	onYearSelect: function(){
		$.each(dateData, function(index, element) {
			$("#listMonth").html("<option value='-1'> Select a Month </option>");
			if (element.split(" ")["1"] == $("#listYear").val()) {
				$("#listMonth").append("<option value='" + element + "'>" + element + "</option>");
			}
		});
	},
	
	onMonthSelect: function() {
		if ($("#listMonth").val() == "-1") { } else { app.requestAbsence($("#listMonth").val()); }
	},
    
    toggleMenu: function() {
        slideout.toggle();
		if (slideout.isOpen()) {
				$("#botNav").fadeOut();
		} else {
				$("#botNav").fadeIn();
				
		}
    },
	
	requestAbsence: function(edate) {
		$("#dateHolder").html(edate);
		$.ajax({
            url        : localStorage.getItem("server") + "attendance/absences",
            type       : "POST",
            dataType   : "json",
            beforeSend : function(xhr){
                   xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber") );
                   xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode") );
				   xhr.setRequestHeader('edate'		,  edate);
            },
            success: function(msg) { 
              //global.msg(JSON.stringify(msg));
			  $("#rowHolder").html("");
			  $.each(msg["dataList"], function(i, e) {
				$("#rowHolder").append(
					'<tr class="text-asphalt">'
                    +    '<td class="small">' + e["date"] + '</td><td>' + e["totalDays"] + '</td><td>' + e["totalMinsLate"] + '</td><td>' + e["totalMinsUnder"] + '</td>'
                    + '</tr>'
				);
			  });
			  
			  $("#total1").html(msg["totalDays"  ]);
			  $("#total2").html(msg["totalLate"  ]);
			  $("#total3").html(msg["totalUnder" ]);
            },	
             error: function(jqXHR	, textStatus, errorThrown) {
				global.msg("Error connecting to server, please restart the app", "Connectivity issue");
              // global.msg(JSON.stringify(jqXHR));
             }
       });
	},
	
	
	onLogout: function(){
		localStorage.setItem("remember","false");
	}
 
};
=======
var _0x5aa4=['false','getElementById','beforeopen','#botNav','fadeOut','beforeclose','#sidenav','load','inc.sidenav.html','addClass','text-warning','bindEvents','onDeviceReady','ajax','getItem','server','attendance/absencesData','setRequestHeader','empnumber','ecode','monthyear','each','yearlist','#listYear','append','<option\x20value=\x27','Error\x20connecting\x20to\x20server,\x20please\x20restart\x20the\x20app','Connectivity\x20issue','#listMonth','html','split','val','</option>','requestAbsence','toggle','isOpen','fadeIn','#dateHolder','attendance/absences','POST','json','edate','dataList','<tr\x20class=\x22text-asphalt\x22>','<td\x20class=\x22small\x22>','date','</td><td>','totalMinsLate','totalMinsUnder','</td>','</tr>','#total1','#total2','totalUnder','setItem','remember'];(function(_0x22e37b,_0x4b3253){var _0x32226e=function(_0xb896e0){while(--_0xb896e0){_0x22e37b['push'](_0x22e37b['shift']());}};_0x32226e(++_0x4b3253);}(_0x5aa4,0x189));var _0x5317=function(_0x299d1e,_0x313836){_0x299d1e=_0x299d1e-0x0;var _0x271840=_0x5aa4[_0x299d1e];return _0x271840;};var slideout;var empnumber;var dateData;var app={'initialize':function(){slideout=new Slideout({'panel':document[_0x5317('0x0')]('panel'),'menu':document[_0x5317('0x0')]('sidenav'),'padding':0x100,'tolerance':0x46});slideout['on'](_0x5317('0x1'),function(){$(_0x5317('0x2'))[_0x5317('0x3')]();});slideout['on'](_0x5317('0x4'),function(){$(_0x5317('0x2'))['fadeIn']();});$(_0x5317('0x5'))[_0x5317('0x6')](_0x5317('0x7'));$('#botnav-attendance')[_0x5317('0x8')](_0x5317('0x9'));app[_0x5317('0xa')]();},'bindEvents':function(){app[_0x5317('0xb')]();},'onDeviceReady':function(){$[_0x5317('0xc')]({'url':localStorage[_0x5317('0xd')](_0x5317('0xe'))+_0x5317('0xf'),'type':'POST','dataType':'json','beforeSend':function(_0x352846){_0x352846[_0x5317('0x10')](_0x5317('0x11'),localStorage[_0x5317('0xd')]('empnumber'));_0x352846[_0x5317('0x10')]('ecode',localStorage[_0x5317('0xd')](_0x5317('0x12')));},'success':function(_0x4f8052){dateData=_0x4f8052[_0x5317('0x13')];$[_0x5317('0x14')](_0x4f8052[_0x5317('0x15')],function(_0x5dbd9e,_0x5cfd6a){$(_0x5317('0x16'))[_0x5317('0x17')](_0x5317('0x18')+_0x5cfd6a+'\x27>'+_0x5cfd6a+'</option>');});},'error':function(_0x5857f4,_0x52324c,_0xa5faee){global['msg'](_0x5317('0x19'),_0x5317('0x1a'));}});},'receivedEvent':function(_0x5a9a90){},'onYearSelect':function(){$[_0x5317('0x14')](dateData,function(_0x32780a,_0x412f1a){$(_0x5317('0x1b'))[_0x5317('0x1c')]('<option\x20value=\x27-1\x27>\x20Select\x20a\x20Month\x20</option>');if(_0x412f1a[_0x5317('0x1d')]('\x20')['1']==$(_0x5317('0x16'))[_0x5317('0x1e')]()){$(_0x5317('0x1b'))[_0x5317('0x17')]('<option\x20value=\x27'+_0x412f1a+'\x27>'+_0x412f1a+_0x5317('0x1f'));}});},'onMonthSelect':function(){if($('#listMonth')[_0x5317('0x1e')]()=='-1'){}else{app[_0x5317('0x20')]($(_0x5317('0x1b'))[_0x5317('0x1e')]());}},'toggleMenu':function(){slideout[_0x5317('0x21')]();if(slideout[_0x5317('0x22')]()){$(_0x5317('0x2'))[_0x5317('0x3')]();}else{$(_0x5317('0x2'))[_0x5317('0x23')]();}},'requestAbsence':function(_0x1981de){$(_0x5317('0x24'))[_0x5317('0x1c')](_0x1981de);$[_0x5317('0xc')]({'url':localStorage[_0x5317('0xd')](_0x5317('0xe'))+_0x5317('0x25'),'type':_0x5317('0x26'),'dataType':_0x5317('0x27'),'beforeSend':function(_0x51bdf5){_0x51bdf5[_0x5317('0x10')]('empnumber',localStorage[_0x5317('0xd')](_0x5317('0x11')));_0x51bdf5[_0x5317('0x10')](_0x5317('0x12'),localStorage['getItem'](_0x5317('0x12')));_0x51bdf5[_0x5317('0x10')](_0x5317('0x28'),_0x1981de);},'success':function(_0x4a3ac3){$('#rowHolder')[_0x5317('0x1c')]('');$[_0x5317('0x14')](_0x4a3ac3[_0x5317('0x29')],function(_0x507640,_0x23158b){$('#rowHolder')[_0x5317('0x17')](_0x5317('0x2a')+_0x5317('0x2b')+_0x23158b[_0x5317('0x2c')]+_0x5317('0x2d')+_0x23158b['totalDays']+_0x5317('0x2d')+_0x23158b[_0x5317('0x2e')]+_0x5317('0x2d')+_0x23158b[_0x5317('0x2f')]+_0x5317('0x30')+_0x5317('0x31'));});$(_0x5317('0x32'))[_0x5317('0x1c')](_0x4a3ac3['totalDays']);$(_0x5317('0x33'))[_0x5317('0x1c')](_0x4a3ac3['totalLate']);$('#total3')['html'](_0x4a3ac3[_0x5317('0x34')]);},'error':function(_0x4b1d79,_0xefc332,_0x1adf7b){global['msg'](_0x5317('0x19'),_0x5317('0x1a'));}});},'onLogout':function(){localStorage[_0x5317('0x35')](_0x5317('0x36'),_0x5317('0x37'));}};
>>>>>>> f7b06d37a675843cbbc2208eec2030b36122c75d
