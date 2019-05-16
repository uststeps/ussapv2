<<<<<<< HEAD
var months = {
	d01 : "JAN",
	d02 : "FEB",
	d03 : "MAR", 
	d04 : "APR", 
	d05 : "MAY", 
	d06 : "JUN", 
	d07 : "JUL", 
	d08 : "AUG", 
	d09 : "SEP", 
	d10 : "OCT", 
	d11 : "NOV", 
	d12 : "DEC" 
};

var months2 = {
	JAN : "01",
	FEB : "02",
	MAR : "03",
	APR : "04",
	MAY : "05",
	JUN : "06",
	JUL : "07",
	AUG : "08",
	SEP : "09",
	OCT : "10",
	NOV : "11",
	DEC : "12"
};
var slideout ;
var app = {
    initialize: function() {

        slideout = new Slideout({
            'panel'    : document.getElementById('panel'  ),
            'menu'     : document.getElementById('sidenav'),
            'padding'  : 256,
            'tolerance': 70
        });
		slideout.on('beforeopen', function() { $("#botNav").fadeOut();
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
	
	openDatePicker: function() {
		$("#botNav").fadeOut();
		
	},

    onDeviceReady: function() {
        $("#dtrDate"    ).datepicker({
		  onSelect: function(dateText) {
			$("#botNav").fadeIn();
			app.getDTRRecord(dateText);  

			var year 	= dateText.split("/")[2];
			var month 	= dateText.split("/")[0];
			var day 	= dateText.split("/")[1];
			$("#dtrDate").val(day + "-" + months["d" + month] + "-" + year);
				
		  }
		}
		);
		
		
        $("#topbarTitle").html("ATTENDANCE");
   
        // populate dtr table
        $.ajax({
     
            url        : localStorage.getItem("server") + "service/serverdt",
            type       : "POST",
            dataType   : "json",
            beforeSend : function(xhr){
                xhr.setRequestHeader('ecode'  ,  localStorage.getItem("ecode") ); 
            },  
            success: function(msg) { 
			   //global.msg(msg["date"]);
			   
			   var year 	= msg["date"].split("/")[2];
			   var month 	= msg["date"].split("/")[0];
			   var day 		= msg["date"].split("/")[1];
			   
			   var formatted = year + "-" + month + "-" + day;
			   
			   var formatted_v2 = day + "-" + months["d" + month] + "-" + year;
			   
			   // USE THE FORMATTED DATE
			  
			   $("#dtrDate").val(formatted_v2);
			   
               app.getDTRRecord(msg["date"]);
            },
            error: function(jqXHR	, textStatus, errorThrown) {  
               //alert(JSON.stringify(jqXHR));
               //alert(JSON.stringify(textStatus));
               //alert(JSON.stringify(errorThrown));
            }
        });
    },
    
    receivedEvent: function(id) {
    },
    
    onDateSelect: function() {
		//global.msg();
		//global.msg($("#dtrDate").val());

		var year 	= $("#dtrDate").val().split("-")[2];
		var month 	= $("#dtrDate").val().split("-")[1];
		var day 	= $("#dtrDate").val().split("-")[0];
		//console.log("############ ::::::::" + month);
		app.getDTRRecord(months2[month]+"/"+day+"/"+year);  
		$("#dtrDate").val(day + "-" + month + "-" + year);
		

    },
    onDateChange: function() {
		//alert($("#dtrDate").val());
		app.getDTRRecord($("#dtrDate").val());
	},
    getDTRRecord: function(pdate){
		//alert("TRYING TO FETCH DTR");
		var year 	= pdate.split("/")[2];
		var month 	= pdate.split("/")[0];
		var day 	= pdate.split("/")[1];
		$("#curdate-holder").html(day + "-" + months["d" + month] + "-" + year);
        $.ajax({
            url      : localStorage.getItem("server") + "attendance/dtr",
            type     : "POST",
            dataType : "json",
            beforeSend: function(xhr){
                 xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode"     ) );
                 
				 xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber" ) );
                 //xhr.setRequestHeader('empnumber' ,  5128 );
				 xhr.setRequestHeader('pdate'     ,  pdate ); 
            },  
            success: function(msg) { 
				//alert("SUCCESS");
				var str = "";
				//global.msg("DATA: " + JSON.stringify(msg));
                var total = Object.keys(msg).length;
				$("#dtrHolder").html(
					"<dt class='col-5'>Time</dt>" + 
                    "<dt class='col-7'>Check Type</dt>"
				);
                for (i=0; i < total; i++) {
                    var color = "success";
					
					if (msg[i].type == "IN") {color = "success";} else {color="danger"};
			
					$("#dtrHolder").append(
						"<dt class='col-5 text-asphalt'>" + msg[i].time + "</dt>" + 
                        "<dd class='col-7 text-" + color + "'>" + msg[i].type + "</dd>"
					);
					/*
						if (msg[i].type =="OUT") { color = "danger";};
						$("#tbody").append(
							"<tr><td>" + msg[i].time + "</td><td class='text-" + color + "'>" + msg[i].type + "</td></tr>"
						);
					*/
					
					
                }
				
				
                if (total==0){
                    $("#dtrHolder").html(
						"<dt class='col-12'>" + 
						"<div class='alert alert-danger'>" +
                            "<i class='far fa-frown-open'></i> Sorry. No Record Found" + 
                        "</div>" +
						"</dt>"
                    );
                }
                
				//global.msg(str);
                //alert(JSON.stringify(msg));  
            },
            error: function(jqXHR	, textStatus, errorThrown) {  
				//global.msg("jqXHR: " + JSON.stringify(jqXHR));
             	//global.msg("STATUS: " + JSON.stringify(textStatus));
				//global.msg("ERROR THROWN: " + JSON.stringify(errorThrown));
            }
        });  
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
var _0x4bda=['<dt\x20class=\x27col-5\x20text-asphalt\x27>','time','</dt>','<dd\x20class=\x27col-7\x20text-','</dd>','<dt\x20class=\x27col-12\x27>','<div\x20class=\x27alert\x20alert-danger\x27>','<i\x20class=\x27far\x20fa-frown-open\x27></i>\x20Sorry.\x20No\x20Record\x20Found','</div>','toggle','isOpen','setItem','remember','false','JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC','panel','getElementById','sidenav','beforeopen','#botNav','beforeclose','fadeIn','#sidenav','load','inc.sidenav.html','#botnav-attendance','addClass','text-warning','bindEvents','onDeviceReady','fadeOut','#dtrDate','datepicker','split','val','#topbarTitle','html','ATTENDANCE','ajax','getItem','server','service/serverdt','POST','setRequestHeader','ecode','date','getDTRRecord','#curdate-holder','attendance/dtr','json','empnumber','pdate','keys','length','#dtrHolder','<dt\x20class=\x27col-5\x27>Time</dt>','<dt\x20class=\x27col-7\x27>Check\x20Type</dt>','type','success','danger','append'];(function(_0x1d432a,_0x3b1686){var _0x152e58=function(_0x455083){while(--_0x455083){_0x1d432a['push'](_0x1d432a['shift']());}};_0x152e58(++_0x3b1686);}(_0x4bda,0x9e));var _0x3882=function(_0x5f4e21,_0x50b757){_0x5f4e21=_0x5f4e21-0x0;var _0x40640a=_0x4bda[_0x5f4e21];return _0x40640a;};var months={'d01':_0x3882('0x0'),'d02':_0x3882('0x1'),'d03':_0x3882('0x2'),'d04':_0x3882('0x3'),'d05':_0x3882('0x4'),'d06':_0x3882('0x5'),'d07':_0x3882('0x6'),'d08':_0x3882('0x7'),'d09':_0x3882('0x8'),'d10':_0x3882('0x9'),'d11':_0x3882('0xa'),'d12':_0x3882('0xb')};var months2={'JAN':'01','FEB':'02','MAR':'03','APR':'04','MAY':'05','JUN':'06','JUL':'07','AUG':'08','SEP':'09','OCT':'10','NOV':'11','DEC':'12'};var slideout;var app={'initialize':function(){slideout=new Slideout({'panel':document['getElementById'](_0x3882('0xc')),'menu':document[_0x3882('0xd')](_0x3882('0xe')),'padding':0x100,'tolerance':0x46});slideout['on'](_0x3882('0xf'),function(){$(_0x3882('0x10'))['fadeOut']();});slideout['on'](_0x3882('0x11'),function(){$(_0x3882('0x10'))[_0x3882('0x12')]();});$(_0x3882('0x13'))[_0x3882('0x14')](_0x3882('0x15'));$(_0x3882('0x16'))[_0x3882('0x17')](_0x3882('0x18'));app[_0x3882('0x19')]();},'bindEvents':function(){app[_0x3882('0x1a')]();},'openDatePicker':function(){$('#botNav')[_0x3882('0x1b')]();},'onDeviceReady':function(){$(_0x3882('0x1c'))[_0x3882('0x1d')]({'onSelect':function(_0xdb99cb){$(_0x3882('0x10'))[_0x3882('0x12')]();app['getDTRRecord'](_0xdb99cb);var _0x3f1297=_0xdb99cb[_0x3882('0x1e')]('/')[0x2];var _0x5196e0=_0xdb99cb[_0x3882('0x1e')]('/')[0x0];var _0x22a2ee=_0xdb99cb[_0x3882('0x1e')]('/')[0x1];$(_0x3882('0x1c'))[_0x3882('0x1f')](_0x22a2ee+'-'+months['d'+_0x5196e0]+'-'+_0x3f1297);}});$(_0x3882('0x20'))[_0x3882('0x21')](_0x3882('0x22'));$[_0x3882('0x23')]({'url':localStorage[_0x3882('0x24')](_0x3882('0x25'))+_0x3882('0x26'),'type':_0x3882('0x27'),'dataType':'json','beforeSend':function(_0x2c1e44){_0x2c1e44[_0x3882('0x28')](_0x3882('0x29'),localStorage[_0x3882('0x24')]('ecode'));},'success':function(_0x3b4a5b){var _0x53a4ad=_0x3b4a5b[_0x3882('0x2a')]['split']('/')[0x2];var _0xef4f28=_0x3b4a5b[_0x3882('0x2a')][_0x3882('0x1e')]('/')[0x0];var _0x3f97fe=_0x3b4a5b[_0x3882('0x2a')][_0x3882('0x1e')]('/')[0x1];var _0x425d85=_0x53a4ad+'-'+_0xef4f28+'-'+_0x3f97fe;var _0x41c569=_0x3f97fe+'-'+months['d'+_0xef4f28]+'-'+_0x53a4ad;$(_0x3882('0x1c'))[_0x3882('0x1f')](_0x41c569);app[_0x3882('0x2b')](_0x3b4a5b[_0x3882('0x2a')]);},'error':function(_0xb6fce0,_0x3ce1dc,_0x3dc23f){}});},'receivedEvent':function(_0x22812d){},'onDateSelect':function(){var _0x33a38a=$(_0x3882('0x1c'))[_0x3882('0x1f')]()[_0x3882('0x1e')]('-')[0x2];var _0x2d6204=$(_0x3882('0x1c'))[_0x3882('0x1f')]()[_0x3882('0x1e')]('-')[0x1];var _0x2308fb=$(_0x3882('0x1c'))[_0x3882('0x1f')]()[_0x3882('0x1e')]('-')[0x0];app[_0x3882('0x2b')](months2[_0x2d6204]+'/'+_0x2308fb+'/'+_0x33a38a);$(_0x3882('0x1c'))[_0x3882('0x1f')](_0x2308fb+'-'+_0x2d6204+'-'+_0x33a38a);},'onDateChange':function(){app[_0x3882('0x2b')]($(_0x3882('0x1c'))[_0x3882('0x1f')]());},'getDTRRecord':function(_0x332018){var _0x2d66a5=_0x332018[_0x3882('0x1e')]('/')[0x2];var _0x11239e=_0x332018[_0x3882('0x1e')]('/')[0x0];var _0x13bc14=_0x332018[_0x3882('0x1e')]('/')[0x1];$(_0x3882('0x2c'))[_0x3882('0x21')](_0x13bc14+'-'+months['d'+_0x11239e]+'-'+_0x2d66a5);$[_0x3882('0x23')]({'url':localStorage[_0x3882('0x24')]('server')+_0x3882('0x2d'),'type':'POST','dataType':_0x3882('0x2e'),'beforeSend':function(_0x4fb5c4){_0x4fb5c4[_0x3882('0x28')](_0x3882('0x29'),localStorage[_0x3882('0x24')](_0x3882('0x29')));_0x4fb5c4['setRequestHeader']('empnumber',localStorage['getItem'](_0x3882('0x2f')));_0x4fb5c4['setRequestHeader'](_0x3882('0x30'),_0x332018);},'success':function(_0x1ecba9){var _0xcc47a='';var _0x450577=Object[_0x3882('0x31')](_0x1ecba9)[_0x3882('0x32')];$(_0x3882('0x33'))[_0x3882('0x21')](_0x3882('0x34')+_0x3882('0x35'));for(i=0x0;i<_0x450577;i++){var _0x5f37c8='success';if(_0x1ecba9[i][_0x3882('0x36')]=='IN'){_0x5f37c8=_0x3882('0x37');}else{_0x5f37c8=_0x3882('0x38');};$(_0x3882('0x33'))[_0x3882('0x39')](_0x3882('0x3a')+_0x1ecba9[i][_0x3882('0x3b')]+_0x3882('0x3c')+_0x3882('0x3d')+_0x5f37c8+'\x27>'+_0x1ecba9[i][_0x3882('0x36')]+_0x3882('0x3e'));}if(_0x450577==0x0){$(_0x3882('0x33'))[_0x3882('0x21')](_0x3882('0x3f')+_0x3882('0x40')+_0x3882('0x41')+_0x3882('0x42')+_0x3882('0x3c'));}},'error':function(_0x5a8156,_0x21c21a,_0x556f1b){}});},'toggleMenu':function(){slideout[_0x3882('0x43')]();if(slideout[_0x3882('0x44')]()){$(_0x3882('0x10'))[_0x3882('0x1b')]();}else{$(_0x3882('0x10'))[_0x3882('0x12')]();}},'onLogout':function(){localStorage[_0x3882('0x45')](_0x3882('0x46'),_0x3882('0x47'));}};
>>>>>>> f7b06d37a675843cbbc2208eec2030b36122c75d
