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
     
            url        : localStorage.getItem("server") + "attendance/getOtherLeave",
            type       : "POST",
            dataType   : "json",
            beforeSend : function(xhr){
                 xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode"     ) );
                 xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber" ) );
            },  
            success: function(msg) { 
				var totalBday = 0;
				$.each(msg, function(index, element) {
					
										
					var reason = "";
					
					if (msg[index]["reason"] != null) {
						reason = msg[index]["reason"];
					}
					
					var remarks = "";
					
					if (msg[index]["description"] != null) {
						remarks = msg[index]["description"];
					}
					if (msg[index]["name"] == "BIRTHDAY LEAVE") {
					
						$("#bdayLeaveHolder").append(
							'<div class="line"></div>' +

								'<dl class="row p-3 mb-0">' + 
									'<dt class="col-5">Applied Date</dt>' + 
									'<dd class="col-7 text-asphalt">' + app.reformatDate(msg[index]["applicationDate"]) + '</dd>' + 

									'<dt class="col-5">Leave Date</dt>' + 
									'<dd class="col-7 text-asphalt">' +  app.reformatDate(msg[index]["dateFrom"])  + '</dd>' + 

									'<dt class="col-5">Days Leave</dt>' + 
									'<dd class="col-7 text-asphalt">' + msg[index]["daysLeave"] + '</dd>' + 

									'<dt class="col-5">Remarks</dt>' + 
									'<dd class="col-7 text-asphalt">' + remarks + '</dd>' + 
								'</dl>'
					
						);
						totalBday++;
					};
					
				});
				
				
					if (totalBday == 0) {
						$("#bdayLeaveHolder").append(
								'<div class="line"></div>' +

								'<dl class="row p-3 mb-0">' + 
									'<dt class="col-12 text-danger">No Record Found</dt>'  +
								'</dl>'
						);
					} 
				
				
				var totalEmg = 0;
				$.each(msg, function(index, element) {
					
					
					var reason = "";
					
					if (msg[index]["reason"] != null) {
						reason = msg[index]["reason"];
					}
					
					var remarks = "";
					
					if (msg[index]["description"] != null) {
						remarks = msg[index]["description"];
					}
					
					if (msg[index]["name"] != "BIRTHDAY LEAVE") {
					
						$("#emgLeaveHolder").append(
							'<div class="line"></div>' +

							'<dl class="row p-3 mb-0">' + 
									'<dt class="col-5">Applied Date</dt>' + 
									'<dd class="col-7 text-asphalt">' + app.reformatDate(msg[index]["applicationDate"]) + '</dd>' + 

									'<dt class="col-5">Leave Date</dt>' + 
									'<dd class="col-7 text-asphalt">' +  app.reformatDate(msg[index]["dateFrom"])  + ' to <br/>' +  app.reformatDate(msg[index]["dateTo"])  + '</dd>' + 

									'<dt class="col-5">Days Leave</dt>' + 
									'<dd class="col-7 text-asphalt">' + msg[index]["daysLeave"] + '</dd>' + 
									
									
									'<dt class="col-5">Reason</dt>' + 
									'<dd class="col-7 text-asphalt">' + reason + '</dd>' + 

									'<dt class="col-5">Remarks</dt>' + 
									'<dd class="col-7 text-asphalt">' + remarks + '</dd>' + 
							'</dl>'
					
						);
						totalEmg++;
					}
					
					
				});
				
				if (totalEmg == 0) {
						$("#emgLeaveHolder").append(
								'<div class="line"></div>' +

								'<dl class="row p-3 mb-0">' + 
									'<dt class="col-12 text-danger">No Record Found</dt>'  +
								'</dl>'
						);
					} 
				
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
var _0x400c=['OCT','NOV','DEC','split','setItem','remember','false','getElementById','panel','beforeopen','#botNav','fadeOut','beforeclose','fadeIn','#sidenav','load','inc.sidenav.html','bindEvents','onDeviceReady','getItem','server','attendance/getOtherLeave','json','setRequestHeader','ecode','empnumber','each','reason','description','name','BIRTHDAY\x20LEAVE','#bdayLeaveHolder','append','<dl\x20class=\x22row\x20p-3\x20mb-0\x22>','<dt\x20class=\x22col-5\x22>Applied\x20Date</dt>','<dd\x20class=\x22col-7\x20text-asphalt\x22>','applicationDate','</dd>','<dt\x20class=\x22col-5\x22>Leave\x20Date</dt>','reformatDate','dateFrom','<dt\x20class=\x22col-5\x22>Remarks</dt>','</dl>','<div\x20class=\x22line\x22></div>','#emgLeaveHolder','\x20to\x20<br/>','dateTo','<dt\x20class=\x22col-5\x22>Days\x20Leave</dt>','daysLeave','<dt\x20class=\x22col-5\x22>Reason</dt>','<dt\x20class=\x22col-12\x20text-danger\x22>No\x20Record\x20Found</dt>','toggle','JAN','FEB','MAY','JUN','JUL','AUG','SEP'];(function(_0x5ef9ce,_0x1d7d14){var _0x179cf9=function(_0x4dec51){while(--_0x4dec51){_0x5ef9ce['push'](_0x5ef9ce['shift']());}};_0x179cf9(++_0x1d7d14);}(_0x400c,0xb8));var _0x1517=function(_0x168e5d,_0x2b7f7e){_0x168e5d=_0x168e5d-0x0;var _0x4cc5e9=_0x400c[_0x168e5d];return _0x4cc5e9;};var slideout;var app={'initialize':function(){slideout=new Slideout({'panel':document[_0x1517('0x0')](_0x1517('0x1')),'menu':document[_0x1517('0x0')]('sidenav'),'padding':0x100,'tolerance':0x46});slideout['on'](_0x1517('0x2'),function(){$(_0x1517('0x3'))[_0x1517('0x4')]();});slideout['on'](_0x1517('0x5'),function(){$(_0x1517('0x3'))[_0x1517('0x6')]();});$(_0x1517('0x7'))[_0x1517('0x8')](_0x1517('0x9'));$('#botnav-attendance')['addClass']('text-warning');app[_0x1517('0xa')]();},'bindEvents':function(){app[_0x1517('0xb')]();},'onDeviceReady':function(){$['ajax']({'url':localStorage[_0x1517('0xc')](_0x1517('0xd'))+_0x1517('0xe'),'type':'POST','dataType':_0x1517('0xf'),'beforeSend':function(_0x43cbcf){_0x43cbcf[_0x1517('0x10')](_0x1517('0x11'),localStorage[_0x1517('0xc')]('ecode'));_0x43cbcf[_0x1517('0x10')]('empnumber',localStorage[_0x1517('0xc')](_0x1517('0x12')));},'success':function(_0x1e823e){var _0x4ee02f=0x0;$[_0x1517('0x13')](_0x1e823e,function(_0x4b4f1d,_0x27a9f3){var _0x3ce77a='';if(_0x1e823e[_0x4b4f1d][_0x1517('0x14')]!=null){_0x3ce77a=_0x1e823e[_0x4b4f1d][_0x1517('0x14')];}var _0x35e22d='';if(_0x1e823e[_0x4b4f1d][_0x1517('0x15')]!=null){_0x35e22d=_0x1e823e[_0x4b4f1d][_0x1517('0x15')];}if(_0x1e823e[_0x4b4f1d][_0x1517('0x16')]==_0x1517('0x17')){$(_0x1517('0x18'))[_0x1517('0x19')]('<div\x20class=\x22line\x22></div>'+_0x1517('0x1a')+_0x1517('0x1b')+_0x1517('0x1c')+app['reformatDate'](_0x1e823e[_0x4b4f1d][_0x1517('0x1d')])+_0x1517('0x1e')+_0x1517('0x1f')+_0x1517('0x1c')+app[_0x1517('0x20')](_0x1e823e[_0x4b4f1d][_0x1517('0x21')])+_0x1517('0x1e')+'<dt\x20class=\x22col-5\x22>Days\x20Leave</dt>'+_0x1517('0x1c')+_0x1e823e[_0x4b4f1d]['daysLeave']+_0x1517('0x1e')+_0x1517('0x22')+_0x1517('0x1c')+_0x35e22d+_0x1517('0x1e')+_0x1517('0x23'));_0x4ee02f++;};});if(_0x4ee02f==0x0){$(_0x1517('0x18'))[_0x1517('0x19')](_0x1517('0x24')+_0x1517('0x1a')+'<dt\x20class=\x22col-12\x20text-danger\x22>No\x20Record\x20Found</dt>'+_0x1517('0x23'));}var _0x3e8eac=0x0;$[_0x1517('0x13')](_0x1e823e,function(_0x36e611,_0x1454f1){var _0x29cc8d='';if(_0x1e823e[_0x36e611][_0x1517('0x14')]!=null){_0x29cc8d=_0x1e823e[_0x36e611][_0x1517('0x14')];}var _0x523a7d='';if(_0x1e823e[_0x36e611][_0x1517('0x15')]!=null){_0x523a7d=_0x1e823e[_0x36e611][_0x1517('0x15')];}if(_0x1e823e[_0x36e611][_0x1517('0x16')]!=_0x1517('0x17')){$(_0x1517('0x25'))[_0x1517('0x19')](_0x1517('0x24')+_0x1517('0x1a')+'<dt\x20class=\x22col-5\x22>Applied\x20Date</dt>'+_0x1517('0x1c')+app[_0x1517('0x20')](_0x1e823e[_0x36e611][_0x1517('0x1d')])+'</dd>'+_0x1517('0x1f')+_0x1517('0x1c')+app[_0x1517('0x20')](_0x1e823e[_0x36e611][_0x1517('0x21')])+_0x1517('0x26')+app[_0x1517('0x20')](_0x1e823e[_0x36e611][_0x1517('0x27')])+_0x1517('0x1e')+_0x1517('0x28')+_0x1517('0x1c')+_0x1e823e[_0x36e611][_0x1517('0x29')]+_0x1517('0x1e')+_0x1517('0x2a')+_0x1517('0x1c')+_0x29cc8d+'</dd>'+_0x1517('0x22')+_0x1517('0x1c')+_0x523a7d+_0x1517('0x1e')+_0x1517('0x23'));_0x3e8eac++;}});if(_0x3e8eac==0x0){$(_0x1517('0x25'))[_0x1517('0x19')](_0x1517('0x24')+_0x1517('0x1a')+_0x1517('0x2b')+_0x1517('0x23'));}},'error':function(_0x13cc5e,_0x4d64ce,_0x374e98){}});},'receivedEvent':function(_0x315568){},'toggleMenu':function(){slideout[_0x1517('0x2c')]();if(slideout['isOpen']()){$(_0x1517('0x3'))['fadeOut']();}else{$(_0x1517('0x3'))[_0x1517('0x6')]();}},'onCheckDtr':function(){},'reformatDate':function(_0x4aa4f2){var _0x50b748=[];_0x50b748['01']=_0x1517('0x2d');_0x50b748['02']=_0x1517('0x2e');_0x50b748['03']='MAR';_0x50b748['04']='APR';_0x50b748['05']=_0x1517('0x2f');_0x50b748['06']=_0x1517('0x30');_0x50b748['07']=_0x1517('0x31');_0x50b748['08']=_0x1517('0x32');_0x50b748['09']=_0x1517('0x33');_0x50b748['10']=_0x1517('0x34');_0x50b748['11']=_0x1517('0x35');_0x50b748['12']=_0x1517('0x36');var _0x3e6bc5=_0x4aa4f2[_0x1517('0x37')]('/')[0x0];var _0x6ffe30=_0x4aa4f2[_0x1517('0x37')]('/')[0x1];var _0xa5c90e=_0x4aa4f2[_0x1517('0x37')]('/')[0x2];return _0x6ffe30+'-'+_0x50b748[_0x3e6bc5]+'-'+_0xa5c90e;},'onLogout':function(){localStorage[_0x1517('0x38')](_0x1517('0x39'),_0x1517('0x3a'));}};
>>>>>>> f7b06d37a675843cbbc2208eec2030b36122c75d
