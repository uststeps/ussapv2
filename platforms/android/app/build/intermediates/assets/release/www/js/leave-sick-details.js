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
		//Menu on open  handler
		slideout.on('beforeopen'  , function() { $("#botNav").fadeOut(); });
		//Menu on close handler
		slideout.on('beforeclose' , function() { $("#botNav").fadeIn();  });
    
        $("#sidenav"      ).load("inc.sidenav.html"      );
        $("#botnav-attendance").addClass("text-warning");
        app.bindEvents();
        
    
    },
	
    bindEvents: function() {
       app.onDeviceReady();
    },

    onDeviceReady: function() {

		if ( localStorage.getItem("LeaveDetailsType") == "VL") {
				$("#detailsLabel").html("Vacation Leave Detail");
				$("#backLink").attr("href", "vacationleavesummary.html");
			
		} else {
				$("#detailsLabel").html("Sick Leave Detail");
				$("#backLink").attr("href", "sickleavesummary.html");
		};
	
  
        $("#detailsDate").html(localStorage.getItem("LeaveDetailsDateFrom") + " - " + localStorage.getItem("LeaveDetailsDateTo"));
		$("#detailsSummary").html(
			"Allowable : " + 
			localStorage.getItem("LeaveDetailsAllowable") + 
			" &nbsp;&nbsp;&nbsp; Consumed : " + 
			localStorage.getItem("LeaveDetailsConsumed")
		);
		
		
		$("#detailsHolder").html();
		
		var sURL = "getSickLeaveDetails";
		
		if ( localStorage.getItem("LeaveDetailsType") == "VL") {
			sURL = "getVacLeaveDetails";
		}
		
		$.ajax({
			url        : localStorage.getItem("server") + "attendance/" + sURL,
            type       : "POST",
            dataType   : "json",
            beforeSend : function(xhr){
                 xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode"     ) );
				 xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber" ) );
				 xhr.setRequestHeader('dateFrom'  ,  localStorage.getItem("LeaveDetailsDateFrom" ) );
				 xhr.setRequestHeader('dateTo'    ,  localStorage.getItem("LeaveDetailsDateTo"   ) );
            },  
            success: function(msg) { 
			
                //global.msg(JSON.stringify(msg));
				
				//alert(JSON.stringify(msg));
				var total = 0;
				$.each(msg, function(index, element) {
					
					var payFlagString = "Not Entitled";
					
					if (msg[index]["paymentFlag"] == "1") {
						payFlagString = "Entitled";
					}
					
					if (msg[index]["name"] == localStorage.getItem("LeaveDetailsType")) {
					
						$("#detailsHolder").append(
							'<tr class="text-asphalt">' +
								'<td class="small">' +
									'<span class="text-secondary">Leave Date :</span> ' + app.reformatDate(msg[index]["dateFrom"]) + ' to ' +  app.reformatDate(msg[index]["dateTo"]) + ' <br/>'+
									'<span class="text-secondary">Application Date :</span> ' + app.reformatDate(msg[index]["applicationDate"]) + '<br/>' + 
									'<span class="text-secondary">Days Leave :</span>' + msg[index]["daysLeave"] + '<br/>' + 
									'<span class="text-secondary">Reason :</span>' + msg[index]["reason"] + '<br/>' + 
									'<span class="text-secondary">HR Remarks :</span>' + msg[index]["description"] + '<br/>' + 
								'</td>' + 
							'</tr>'
						);
						
						total++;
					};
				});
				
				
				if (total > 0) {
					
					'<tr class="text-danger">' +
                            '<center>' + 'No Record Found' +  '</center>' +
                      '</tr>'
				};
				
            },
            error: function(jqXHR	, textStatus, errorThrown) {  
                //alert(JSON.stringify(jqXHR       ));
                //alert(JSON.stringify(textStatus  ));
                //alert(JSON.stringify(errorThrown ));
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
	
	reformatDate: function(rawDate){
		var months = [];
			months["01"] = "JAN";
			months["02"] = "FEB";
			months["03"] = "MAR";
			months["04"] = "APR";
			months["05"] = "MAY";
			months["06"] = "JUN";
			months["07"] = "JUL";
			months["08"] = "AUG";
			months["09"] = "SEP";
			months["10"] = "OCT";
			months["11"] = "NOV";
			months["12"] = "DEC";
		
		var rMonth = rawDate.split("/")[0];
		var rDay   = rawDate.split("/")[1];
		var rYear  = rawDate.split("/")[2];
		
		return rDay + "-" + months[rMonth] + "-" + rYear;
	},
	onLogout: function(){
		localStorage.setItem("remember","false");
	}
 
};
=======
var _0x3432=['#botnav-attendance','text-warning','bindEvents','onDeviceReady','getItem','LeaveDetailsType','#detailsLabel','html','Vacation\x20Leave\x20Detail','#backLink','attr','href','vacationleavesummary.html','Sick\x20Leave\x20Detail','#detailsDate','\x20-\x20','LeaveDetailsDateTo','#detailsSummary','Allowable\x20:\x20','LeaveDetailsAllowable','\x20&nbsp;&nbsp;&nbsp;\x20Consumed\x20:\x20','LeaveDetailsConsumed','#detailsHolder','getSickLeaveDetails','getVacLeaveDetails','ajax','server','POST','setRequestHeader','ecode','empnumber','dateFrom','LeaveDetailsDateFrom','dateTo','each','Not\x20Entitled','paymentFlag','Entitled','name','<tr\x20class=\x22text-asphalt\x22>','<td\x20class=\x22small\x22>','reformatDate','\x20to\x20','\x20<br/>','<span\x20class=\x22text-secondary\x22>Application\x20Date\x20:</span>\x20','applicationDate','<br/>','<span\x20class=\x22text-secondary\x22>Days\x20Leave\x20:</span>','daysLeave','<span\x20class=\x22text-secondary\x22>Reason\x20:</span>','reason','<span\x20class=\x22text-secondary\x22>HR\x20Remarks\x20:</span>','</td>','</tr>','<tr\x20class=\x22text-danger\x22>','<center>','No\x20Record\x20Found','</center>','toggle','isOpen','fadeIn','JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','OCT','NOV','DEC','split','setItem','remember','false','getElementById','panel','beforeopen','#botNav','fadeOut','beforeclose','#sidenav','load'];(function(_0x80da27,_0x50bb4f){var _0x457790=function(_0x3545f5){while(--_0x3545f5){_0x80da27['push'](_0x80da27['shift']());}};_0x457790(++_0x50bb4f);}(_0x3432,0xa0));var _0x14f5=function(_0x306d57,_0x336308){_0x306d57=_0x306d57-0x0;var _0x3208c7=_0x3432[_0x306d57];return _0x3208c7;};var slideout;var app={'initialize':function(){slideout=new Slideout({'panel':document[_0x14f5('0x0')](_0x14f5('0x1')),'menu':document[_0x14f5('0x0')]('sidenav'),'padding':0x100,'tolerance':0x46});slideout['on'](_0x14f5('0x2'),function(){$(_0x14f5('0x3'))[_0x14f5('0x4')]();});slideout['on'](_0x14f5('0x5'),function(){$(_0x14f5('0x3'))['fadeIn']();});$(_0x14f5('0x6'))[_0x14f5('0x7')]('inc.sidenav.html');$(_0x14f5('0x8'))['addClass'](_0x14f5('0x9'));app[_0x14f5('0xa')]();},'bindEvents':function(){app[_0x14f5('0xb')]();},'onDeviceReady':function(){if(localStorage[_0x14f5('0xc')](_0x14f5('0xd'))=='VL'){$(_0x14f5('0xe'))[_0x14f5('0xf')](_0x14f5('0x10'));$(_0x14f5('0x11'))[_0x14f5('0x12')](_0x14f5('0x13'),_0x14f5('0x14'));}else{$(_0x14f5('0xe'))[_0x14f5('0xf')](_0x14f5('0x15'));$(_0x14f5('0x11'))[_0x14f5('0x12')]('href','sickleavesummary.html');};$(_0x14f5('0x16'))[_0x14f5('0xf')](localStorage['getItem']('LeaveDetailsDateFrom')+_0x14f5('0x17')+localStorage['getItem'](_0x14f5('0x18')));$(_0x14f5('0x19'))[_0x14f5('0xf')](_0x14f5('0x1a')+localStorage[_0x14f5('0xc')](_0x14f5('0x1b'))+_0x14f5('0x1c')+localStorage[_0x14f5('0xc')](_0x14f5('0x1d')));$(_0x14f5('0x1e'))['html']();var _0x5beca5=_0x14f5('0x1f');if(localStorage[_0x14f5('0xc')](_0x14f5('0xd'))=='VL'){_0x5beca5=_0x14f5('0x20');}$[_0x14f5('0x21')]({'url':localStorage[_0x14f5('0xc')](_0x14f5('0x22'))+'attendance/'+_0x5beca5,'type':_0x14f5('0x23'),'dataType':'json','beforeSend':function(_0x4ecb51){_0x4ecb51[_0x14f5('0x24')](_0x14f5('0x25'),localStorage[_0x14f5('0xc')]('ecode'));_0x4ecb51[_0x14f5('0x24')](_0x14f5('0x26'),localStorage[_0x14f5('0xc')](_0x14f5('0x26')));_0x4ecb51['setRequestHeader'](_0x14f5('0x27'),localStorage['getItem'](_0x14f5('0x28')));_0x4ecb51[_0x14f5('0x24')](_0x14f5('0x29'),localStorage['getItem'](_0x14f5('0x18')));},'success':function(_0x26e00c){var _0x1adee5=0x0;$[_0x14f5('0x2a')](_0x26e00c,function(_0x5e6b09,_0x5079e5){var _0x27a670=_0x14f5('0x2b');if(_0x26e00c[_0x5e6b09][_0x14f5('0x2c')]=='1'){_0x27a670=_0x14f5('0x2d');}if(_0x26e00c[_0x5e6b09][_0x14f5('0x2e')]==localStorage[_0x14f5('0xc')](_0x14f5('0xd'))){$(_0x14f5('0x1e'))['append'](_0x14f5('0x2f')+_0x14f5('0x30')+'<span\x20class=\x22text-secondary\x22>Leave\x20Date\x20:</span>\x20'+app[_0x14f5('0x31')](_0x26e00c[_0x5e6b09][_0x14f5('0x27')])+_0x14f5('0x32')+app['reformatDate'](_0x26e00c[_0x5e6b09][_0x14f5('0x29')])+_0x14f5('0x33')+_0x14f5('0x34')+app['reformatDate'](_0x26e00c[_0x5e6b09][_0x14f5('0x35')])+_0x14f5('0x36')+_0x14f5('0x37')+_0x26e00c[_0x5e6b09][_0x14f5('0x38')]+_0x14f5('0x36')+_0x14f5('0x39')+_0x26e00c[_0x5e6b09][_0x14f5('0x3a')]+'<br/>'+_0x14f5('0x3b')+_0x26e00c[_0x5e6b09]['description']+_0x14f5('0x36')+_0x14f5('0x3c')+_0x14f5('0x3d'));_0x1adee5++;};});if(_0x1adee5>0x0){_0x14f5('0x3e')+_0x14f5('0x3f')+_0x14f5('0x40')+_0x14f5('0x41')+_0x14f5('0x3d');};},'error':function(_0x40c6cc,_0x13d67e,_0x18c6ae){}});},'receivedEvent':function(_0x55c04b){},'toggleMenu':function(){slideout[_0x14f5('0x42')]();if(slideout[_0x14f5('0x43')]()){$(_0x14f5('0x3'))[_0x14f5('0x4')]();}else{$(_0x14f5('0x3'))[_0x14f5('0x44')]();}},'onCheckDtr':function(){},'reformatDate':function(_0xfec33d){var _0x131d64=[];_0x131d64['01']=_0x14f5('0x45');_0x131d64['02']=_0x14f5('0x46');_0x131d64['03']=_0x14f5('0x47');_0x131d64['04']=_0x14f5('0x48');_0x131d64['05']=_0x14f5('0x49');_0x131d64['06']=_0x14f5('0x4a');_0x131d64['07']=_0x14f5('0x4b');_0x131d64['08']=_0x14f5('0x4c');_0x131d64['09']='SEP';_0x131d64['10']=_0x14f5('0x4d');_0x131d64['11']=_0x14f5('0x4e');_0x131d64['12']=_0x14f5('0x4f');var _0x376565=_0xfec33d[_0x14f5('0x50')]('/')[0x0];var _0x2f22cc=_0xfec33d[_0x14f5('0x50')]('/')[0x1];var _0x5105f3=_0xfec33d[_0x14f5('0x50')]('/')[0x2];return _0x2f22cc+'-'+_0x131d64[_0x376565]+'-'+_0x5105f3;},'onLogout':function(){localStorage[_0x14f5('0x51')](_0x14f5('0x52'),_0x14f5('0x53'));}};
>>>>>>> f7b06d37a675843cbbc2208eec2030b36122c75d
