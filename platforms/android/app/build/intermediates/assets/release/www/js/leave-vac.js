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
                 xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber") );
            },  
            success: function(msg) { 
			
			
                //global.msg(JSON.stringify(msg));
				//$("#overallTotal").html(msg["totalSickLeave"]);
				$.each(msg["vacationLeave"], function(index, element) {
					var textcolor = "success";
					
					if (element["available"] == "0") {
						textcolor = "danger";
					}
					
					var buttonString = '<button onclick="app.onViewDetails(\'' +  element["date_from2"] + "\',\'" +  element["date2"] + '\',\'' + element["allowable"] + '\',\'' + element["consumed"] + '\',\'' + 'VL' + '\')" class="btn btn-link small">View Details</button>';
					
					if ( element["consumed"] == 0 ) {
						buttonString = "";
					}
					
					$("#vlDataHolder").append(
						 '<tr class="text-asphalt">' 
                         + '<td>' + element["date_from2"] + ' - ' + element["date2"] + '<br/>'
                         + '<small>'
                         + '<span class="text-secondary">Allowable :</span> ' + element["allowable"] 
                         + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                         + '<span class="text-secondary">Consumed :</span> ' + element["consumed"]
                         + '</small>'
                         + '</td>'
                         + '<td class="text-center">'
                         + '<span class="h4 text-success">' + element["available"] + '</span><br/>'
                         + buttonString
                         + '</td>'
                         + '</tr>'
					);
				});
				
				
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
	
	onViewDetails: function(sDateFrom,sDateTo, sAllowable, sConsumed, sType) {
		localStorage.setItem("LeaveDetailsDateFrom"		, sDateFrom		 );
		localStorage.setItem("LeaveDetailsDateTo"		, sDateTo		 );
		localStorage.setItem("LeaveDetailsAllowable", sAllowable );
		localStorage.setItem("LeaveDetailsConsumed"	, sConsumed	 );
		localStorage.setItem("LeaveDetailsType" , sType);
		
		window.location = "leavedetails.html";
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
var _0x4ffa=['fadeOut','beforeclose','fadeIn','#sidenav','load','addClass','text-warning','bindEvents','onDeviceReady','ajax','getItem','server','attendance/leaveData','POST','json','setRequestHeader','ecode','empnumber','vacationLeave','success','danger','<button\x20onclick=\x22app.onViewDetails(\x27','date_from2','\x27,\x27','allowable','\x27)\x22\x20class=\x22btn\x20btn-link\x20small\x22>View\x20Details</button>','consumed','#vlDataHolder','append','<tr\x20class=\x22text-asphalt\x22>','<td>','\x20-\x20','date2','<br/>','<small>','<span\x20class=\x22text-secondary\x22>Allowable\x20:</span>\x20','&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;','<span\x20class=\x22text-secondary\x22>Consumed\x20:</span>\x20','</small>','</td>','<td\x20class=\x22text-center\x22>','<span\x20class=\x22h4\x20text-success\x22>','available','</span><br/>','</tr>','toggle','isOpen','setItem','LeaveDetailsDateFrom','LeaveDetailsDateTo','LeaveDetailsAllowable','LeaveDetailsConsumed','LeaveDetailsType','location','leavedetails.html','JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC','split','remember','false','panel','getElementById','sidenav','beforeopen','#botNav'];(function(_0x49b1ff,_0x3f3dff){var _0x226d55=function(_0x35aabc){while(--_0x35aabc){_0x49b1ff['push'](_0x49b1ff['shift']());}};_0x226d55(++_0x3f3dff);}(_0x4ffa,0xdc));var _0x124c=function(_0x3248e7,_0x350bc7){_0x3248e7=_0x3248e7-0x0;var _0x11d0c1=_0x4ffa[_0x3248e7];return _0x11d0c1;};var slideout;var app={'initialize':function(){slideout=new Slideout({'panel':document['getElementById'](_0x124c('0x0')),'menu':document[_0x124c('0x1')](_0x124c('0x2')),'padding':0x100,'tolerance':0x46});slideout['on'](_0x124c('0x3'),function(){$(_0x124c('0x4'))[_0x124c('0x5')]();});slideout['on'](_0x124c('0x6'),function(){$(_0x124c('0x4'))[_0x124c('0x7')]();});$(_0x124c('0x8'))[_0x124c('0x9')]('inc.sidenav.html');$('#botnav-attendance')[_0x124c('0xa')](_0x124c('0xb'));app[_0x124c('0xc')]();},'bindEvents':function(){app[_0x124c('0xd')]();},'onDeviceReady':function(){$[_0x124c('0xe')]({'url':localStorage[_0x124c('0xf')](_0x124c('0x10'))+_0x124c('0x11'),'type':_0x124c('0x12'),'dataType':_0x124c('0x13'),'beforeSend':function(_0x172131){_0x172131[_0x124c('0x14')](_0x124c('0x15'),localStorage[_0x124c('0xf')](_0x124c('0x15')));_0x172131[_0x124c('0x14')](_0x124c('0x16'),localStorage[_0x124c('0xf')](_0x124c('0x16')));},'success':function(_0x2fec2c){$['each'](_0x2fec2c[_0x124c('0x17')],function(_0xc74986,_0xaca722){var _0x15f086=_0x124c('0x18');if(_0xaca722['available']=='0'){_0x15f086=_0x124c('0x19');}var _0x4268fa=_0x124c('0x1a')+_0xaca722[_0x124c('0x1b')]+_0x124c('0x1c')+_0xaca722['date2']+_0x124c('0x1c')+_0xaca722[_0x124c('0x1d')]+_0x124c('0x1c')+_0xaca722['consumed']+_0x124c('0x1c')+'VL'+_0x124c('0x1e');if(_0xaca722[_0x124c('0x1f')]==0x0){_0x4268fa='';}$(_0x124c('0x20'))[_0x124c('0x21')](_0x124c('0x22')+_0x124c('0x23')+_0xaca722[_0x124c('0x1b')]+_0x124c('0x24')+_0xaca722[_0x124c('0x25')]+_0x124c('0x26')+_0x124c('0x27')+_0x124c('0x28')+_0xaca722[_0x124c('0x1d')]+_0x124c('0x29')+_0x124c('0x2a')+_0xaca722[_0x124c('0x1f')]+_0x124c('0x2b')+_0x124c('0x2c')+_0x124c('0x2d')+_0x124c('0x2e')+_0xaca722[_0x124c('0x2f')]+_0x124c('0x30')+_0x4268fa+_0x124c('0x2c')+_0x124c('0x31'));});},'error':function(_0x1b94e1,_0x4fe76b,_0x2b243f){}});},'receivedEvent':function(_0x402e47){},'toggleMenu':function(){slideout[_0x124c('0x32')]();if(slideout[_0x124c('0x33')]()){$(_0x124c('0x4'))[_0x124c('0x5')]();}else{$(_0x124c('0x4'))['fadeIn']();}},'onViewDetails':function(_0xc120b2,_0x49c135,_0x32565b,_0x98a46,_0x4ed54c){localStorage[_0x124c('0x34')](_0x124c('0x35'),_0xc120b2);localStorage[_0x124c('0x34')](_0x124c('0x36'),_0x49c135);localStorage[_0x124c('0x34')](_0x124c('0x37'),_0x32565b);localStorage[_0x124c('0x34')](_0x124c('0x38'),_0x98a46);localStorage['setItem'](_0x124c('0x39'),_0x4ed54c);window[_0x124c('0x3a')]=_0x124c('0x3b');},'reformatDate':function(_0x11253d){var _0x124301=[];_0x124301['01']=_0x124c('0x3c');_0x124301['02']=_0x124c('0x3d');_0x124301['03']=_0x124c('0x3e');_0x124301['04']=_0x124c('0x3f');_0x124301['05']=_0x124c('0x40');_0x124301['06']=_0x124c('0x41');_0x124301['07']=_0x124c('0x42');_0x124301['08']=_0x124c('0x43');_0x124301['09']=_0x124c('0x44');_0x124301['10']=_0x124c('0x45');_0x124301['11']=_0x124c('0x46');_0x124301['12']=_0x124c('0x47');var _0x45a308=_0x11253d[_0x124c('0x48')]('/')[0x0];var _0x503642=_0x11253d[_0x124c('0x48')]('/')[0x1];var _0x326773=_0x11253d[_0x124c('0x48')]('/')[0x2];return _0x503642+'-'+_0x124301[_0x45a308]+'-'+_0x326773;},'onLogout':function(){localStorage[_0x124c('0x34')](_0x124c('0x49'),_0x124c('0x4a'));}};
>>>>>>> f7b06d37a675843cbbc2208eec2030b36122c75d
