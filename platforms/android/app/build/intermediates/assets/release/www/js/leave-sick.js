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
			
			
                //global.msg(JSON.stringify(msg));
				$("#overallTotal").html(msg["totalSickLeave"]);
				$.each(msg["sickLeaves"], function(index, element) {
					var textcolor = "success";
					
					if (element["available"] == "0") {
						textcolor = "danger";
					}
					
					$("#slDataHolder").append(
						'<tr class="text-asphalt">'
                        + '<td>' + app.reformatDate(element["date_accumulated"].split("-")[0]) + "-" + app.reformatDate(element["date_accumulated"].split("-")[1]) + '<br/>' 
                        + '<small>'
                        + '<span class="text-secondary">Allowable :</span>' + element["allowable"]
                        + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                        + '<span class="text-secondary">Consumed :</span>' + element["consumed"]
                        + '</small>'
                        + '</td>'
                        + '<td class="text-center">'
                        + '<span class="h4 text-' + textcolor + '">' + element["available"] + '</span><br/>'
                        + '<button onclick="app.onViewDetails(\'' +  app.reformatDate(element["date_accumulated"].split("-")[0]) + "\',\'" + app.reformatDate(element["date_accumulated"].split("-")[1])  + '\',\'' + element["allowable"] + '\',\'' + element["consumed"] + '\',\'' + 'SL' + '\')" class="btn btn-link small">View Details</button>'
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
        
    
    onCheckDtr: function() {
        
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
var _0x38f3=['\x27,\x27','\x27)\x22\x20class=\x22btn\x20btn-link\x20small\x22>View\x20Details</button>','</tr>','toggle','isOpen','setItem','LeaveDetailsDateFrom','LeaveDetailsDateTo','LeaveDetailsAllowable','location','JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','OCT','NOV','DEC','remember','false','panel','beforeopen','#botNav','fadeOut','beforeclose','fadeIn','load','inc.sidenav.html','addClass','text-warning','bindEvents','onDeviceReady','ajax','getItem','server','attendance/leaveData','POST','json','setRequestHeader','ecode','empnumber','#overallTotal','html','totalSickLeave','each','sickLeaves','success','available','#slDataHolder','append','<tr\x20class=\x22text-asphalt\x22>','<td>','date_accumulated','split','<br/>','<span\x20class=\x22text-secondary\x22>Allowable\x20:</span>','allowable','consumed','</td>','<td\x20class=\x22text-center\x22>','<span\x20class=\x22h4\x20text-','</span><br/>','<button\x20onclick=\x22app.onViewDetails(\x27','reformatDate'];(function(_0x468341,_0x28956e){var _0x4fa6f8=function(_0x1d91bc){while(--_0x1d91bc){_0x468341['push'](_0x468341['shift']());}};_0x4fa6f8(++_0x28956e);}(_0x38f3,0x1a9));var _0x1198=function(_0x91f127,_0x13ad04){_0x91f127=_0x91f127-0x0;var _0xda95b8=_0x38f3[_0x91f127];return _0xda95b8;};var slideout;var app={'initialize':function(){slideout=new Slideout({'panel':document['getElementById'](_0x1198('0x0')),'menu':document['getElementById']('sidenav'),'padding':0x100,'tolerance':0x46});slideout['on'](_0x1198('0x1'),function(){$(_0x1198('0x2'))[_0x1198('0x3')]();});slideout['on'](_0x1198('0x4'),function(){$(_0x1198('0x2'))[_0x1198('0x5')]();});$('#sidenav')[_0x1198('0x6')](_0x1198('0x7'));$('#botnav-attendance')[_0x1198('0x8')](_0x1198('0x9'));app[_0x1198('0xa')]();},'bindEvents':function(){app[_0x1198('0xb')]();},'onDeviceReady':function(){$[_0x1198('0xc')]({'url':localStorage[_0x1198('0xd')](_0x1198('0xe'))+_0x1198('0xf'),'type':_0x1198('0x10'),'dataType':_0x1198('0x11'),'beforeSend':function(_0x4cd87b){_0x4cd87b[_0x1198('0x12')](_0x1198('0x13'),localStorage[_0x1198('0xd')](_0x1198('0x13')));_0x4cd87b[_0x1198('0x12')](_0x1198('0x14'),localStorage[_0x1198('0xd')](_0x1198('0x14')));},'success':function(_0x2ae2a7){$(_0x1198('0x15'))[_0x1198('0x16')](_0x2ae2a7[_0x1198('0x17')]);$[_0x1198('0x18')](_0x2ae2a7[_0x1198('0x19')],function(_0x55e6ea,_0x204434){var _0x89693e=_0x1198('0x1a');if(_0x204434[_0x1198('0x1b')]=='0'){_0x89693e='danger';}$(_0x1198('0x1c'))[_0x1198('0x1d')](_0x1198('0x1e')+_0x1198('0x1f')+app['reformatDate'](_0x204434['date_accumulated']['split']('-')[0x0])+'-'+app['reformatDate'](_0x204434[_0x1198('0x20')][_0x1198('0x21')]('-')[0x1])+_0x1198('0x22')+'<small>'+_0x1198('0x23')+_0x204434[_0x1198('0x24')]+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+'<span\x20class=\x22text-secondary\x22>Consumed\x20:</span>'+_0x204434[_0x1198('0x25')]+'</small>'+_0x1198('0x26')+_0x1198('0x27')+_0x1198('0x28')+_0x89693e+'\x22>'+_0x204434[_0x1198('0x1b')]+_0x1198('0x29')+_0x1198('0x2a')+app[_0x1198('0x2b')](_0x204434[_0x1198('0x20')]['split']('-')[0x0])+'\x27,\x27'+app[_0x1198('0x2b')](_0x204434[_0x1198('0x20')][_0x1198('0x21')]('-')[0x1])+_0x1198('0x2c')+_0x204434[_0x1198('0x24')]+_0x1198('0x2c')+_0x204434[_0x1198('0x25')]+_0x1198('0x2c')+'SL'+_0x1198('0x2d')+_0x1198('0x26')+_0x1198('0x2e'));});},'error':function(_0x5360b6,_0x3b3bca,_0x8af54c){}});},'receivedEvent':function(_0x290aca){},'toggleMenu':function(){slideout[_0x1198('0x2f')]();if(slideout[_0x1198('0x30')]()){$(_0x1198('0x2'))[_0x1198('0x3')]();}else{$(_0x1198('0x2'))[_0x1198('0x5')]();}},'onCheckDtr':function(){},'onViewDetails':function(_0x33aa71,_0x879183,_0x464a66,_0x1eddb6,_0x2375d2){localStorage[_0x1198('0x31')](_0x1198('0x32'),_0x33aa71);localStorage[_0x1198('0x31')](_0x1198('0x33'),_0x879183);localStorage[_0x1198('0x31')](_0x1198('0x34'),_0x464a66);localStorage['setItem']('LeaveDetailsConsumed',_0x1eddb6);localStorage[_0x1198('0x31')]('LeaveDetailsType',_0x2375d2);window[_0x1198('0x35')]='leavedetails.html';},'reformatDate':function(_0x1cfa14){var _0x3ba53f=[];_0x3ba53f['01']=_0x1198('0x36');_0x3ba53f['02']=_0x1198('0x37');_0x3ba53f['03']=_0x1198('0x38');_0x3ba53f['04']=_0x1198('0x39');_0x3ba53f['05']=_0x1198('0x3a');_0x3ba53f['06']=_0x1198('0x3b');_0x3ba53f['07']=_0x1198('0x3c');_0x3ba53f['08']=_0x1198('0x3d');_0x3ba53f['09']='SEP';_0x3ba53f['10']=_0x1198('0x3e');_0x3ba53f['11']=_0x1198('0x3f');_0x3ba53f['12']=_0x1198('0x40');var _0x5a0583=_0x1cfa14['split']('/')[0x0];var _0x2c809d=_0x1cfa14[_0x1198('0x21')]('/')[0x1];var _0x187103=_0x1cfa14[_0x1198('0x21')]('/')[0x2];return _0x2c809d+'-'+_0x3ba53f[_0x5a0583]+'-'+_0x187103;},'onLogout':function(){localStorage[_0x1198('0x31')](_0x1198('0x41'),_0x1198('0x42'));}};
>>>>>>> f7b06d37a675843cbbc2208eec2030b36122c75d
