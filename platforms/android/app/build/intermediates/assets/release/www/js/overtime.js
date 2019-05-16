<<<<<<< HEAD
var slideout;
var datesJson;
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
     
        app.bindEvents(); 
    },
    
    bindEvents: function() {
        app.onDeviceReady();
    },

    onDeviceReady: function() {

       $.ajax({
             url        : localStorage.getItem("server") + "attendance/overtimeData",
             type       : "POST",
             dataType   : "json",
             beforeSend : function(xhr){
					//
                    xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber") );
                    xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode") );
             },
             success: function(msg) { 
               //global.msg(JSON.stringify(msg));
			   datesJson = msg["datesv3"];
			   
	
			   /*
			   $.each(datesJson, function (i,e){
					$("#listDates").append(
						"<option value='" + e.day + "-" +  e.month + "-" + e.year + "'>" + e.day + "-" +  e.month + "-" + e.year + "</option>"
					);
				});
				*/
			
			   var totalYear = msg["totalYear"];
			   
			    $.each(datesJson, function (i,e){
					if(JSON.stringify(datesJson[i]) == "{}") {
						
					} else {
						$("#listYear").prepend(
							"<option value='" + i + "'>" + i + "</option>"
						);
					}
				});
				$("#listYear").prepend(
					'<option value="-1" selected>Select Year</option>'
				);
				//alert(msg["endYear"]);
				   /*
				   for (i = msg["endYear"] ; i >= 2007 ; i--) {
						//alert(i);
						$("#listDates").append(
							"<option value='" + i + "'>" + i + "</option>"
						);
				   }
				   */
			 
				$("#loading_holder"	).hide();
				$("#the_content"	).show();
			
             },
             error: function(jqXHR	, textStatus, errorThrown) {
               //global.msg(JSON.stringify(jqXHR));
             }
       });
          
    },
	
	onYearSelect: function() {
		$("#listDates").html("<option value='-1'>Select Period</option> ");
		$.each(datesJson[$("#listYear").val()], function (i,e){
			$("#listDates").append(
				"<option value='" + e.day + "-" +  e.month + "-" + e.year + "'>" + e.day + "-" +  e.month + "-" + e.year + "</option>"
			);
		});
		
		
	},
	
	onDateSelect: function() {
		$("#dateHolder").html($("#listDates").val());
		$.ajax({
             url        : localStorage.getItem("server") + "attendance/overtime",
             type       : "POST",
             dataType   : "json",
             beforeSend : function(xhr){
					//xhr.setRequestHeader('empnumber' ,  5128 );
                    xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber") );
                    xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode") );
					xhr.setRequestHeader('pdate'     ,  $("#listDates").val());
             },
             success: function(msg) { 
				//global.msg(JSON.stringify(msg));
				//alert(JSON.stringify(msg));
				var total = 0;
				$("#otHolder").html(
					'<dt class="col-5 text-secondary">Overtime date</dt>'
                    + '<dt class="col-7 text-secondary">Minutes</dt>'
				);
				
				$.each(msg, function(i,e) {
					$("#otHolder").append(
						'<dt class="col-5">' + e["date"] + '</dt>' +
                        '<dd class="col-7 ">' + e["mins"] + '</dd>'
					);
					total++;
				});
				
				if (total == 0) {
					$("#infoInitial").hide();
					$("#infoMain").hide();
					$("#infoWarning").show();
				} else {
					$("#infoInitial").hide();
					$("#infoMain").show();
					$("#infoWarning").hide();
				};
				
             },
             error: function(jqXHR	, textStatus, errorThrown) {
				//alert(JSON.stringify(jqXHR));
               //global.msg(JSON.stringify(jqXHR));
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
		localStorage.setItem("remember","false");
	}
  
};
=======
var _0x1245=['fadeOut','remember','false','panel','sidenav','beforeopen','#botNav','fadeIn','load','bindEvents','onDeviceReady','ajax','getItem','attendance/overtimeData','POST','json','empnumber','setRequestHeader','ecode','datesv3','totalYear','each','stringify','#listYear','prepend','<option\x20value=\x27','</option>','#loading_holder','#the_content','html','<option\x20value=\x27-1\x27>Select\x20Period</option>\x20','val','#listDates','append','day','month','year','#dateHolder','server','attendance/overtime','pdate','#otHolder','<dt\x20class=\x22col-5\x20text-secondary\x22>Overtime\x20date</dt>','<dt\x20class=\x22col-7\x20text-secondary\x22>Minutes</dt>','<dt\x20class=\x22col-5\x22>','date','mins','</dd>','#infoInitial','#infoMain','hide','#infoWarning','show','toggle','isOpen'];(function(_0x1b4d44,_0x435ed5){var _0x139d48=function(_0x41facf){while(--_0x41facf){_0x1b4d44['push'](_0x1b4d44['shift']());}};_0x139d48(++_0x435ed5);}(_0x1245,0x71));var _0x303e=function(_0x1d7e82,_0x483860){_0x1d7e82=_0x1d7e82-0x0;var _0x5d969a=_0x1245[_0x1d7e82];return _0x5d969a;};var slideout;var datesJson;var app={'initialize':function(){slideout=new Slideout({'panel':document['getElementById'](_0x303e('0x0')),'menu':document['getElementById'](_0x303e('0x1')),'padding':0x100,'tolerance':0x46});slideout['on'](_0x303e('0x2'),function(){$(_0x303e('0x3'))['fadeOut']();});slideout['on']('beforeclose',function(){$(_0x303e('0x3'))[_0x303e('0x4')]();});$('#sidenav')[_0x303e('0x5')]('inc.sidenav.html');app[_0x303e('0x6')]();},'bindEvents':function(){app[_0x303e('0x7')]();},'onDeviceReady':function(){$[_0x303e('0x8')]({'url':localStorage[_0x303e('0x9')]('server')+_0x303e('0xa'),'type':_0x303e('0xb'),'dataType':_0x303e('0xc'),'beforeSend':function(_0xfdddff){_0xfdddff['setRequestHeader'](_0x303e('0xd'),localStorage[_0x303e('0x9')](_0x303e('0xd')));_0xfdddff[_0x303e('0xe')](_0x303e('0xf'),localStorage[_0x303e('0x9')](_0x303e('0xf')));},'success':function(_0x2c8c15){datesJson=_0x2c8c15[_0x303e('0x10')];var _0x3feee0=_0x2c8c15[_0x303e('0x11')];$[_0x303e('0x12')](datesJson,function(_0xb1c192,_0x558820){if(JSON[_0x303e('0x13')](datesJson[_0xb1c192])=='{}'){}else{$(_0x303e('0x14'))[_0x303e('0x15')](_0x303e('0x16')+_0xb1c192+'\x27>'+_0xb1c192+_0x303e('0x17'));}});$('#listYear')[_0x303e('0x15')]('<option\x20value=\x22-1\x22\x20selected>Select\x20Year</option>');$(_0x303e('0x18'))['hide']();$(_0x303e('0x19'))['show']();},'error':function(_0x3ce30e,_0x1fff5a,_0x24aaca){}});},'onYearSelect':function(){$('#listDates')[_0x303e('0x1a')](_0x303e('0x1b'));$[_0x303e('0x12')](datesJson[$(_0x303e('0x14'))[_0x303e('0x1c')]()],function(_0x2df73a,_0x528cfc){$(_0x303e('0x1d'))[_0x303e('0x1e')]('<option\x20value=\x27'+_0x528cfc[_0x303e('0x1f')]+'-'+_0x528cfc['month']+'-'+_0x528cfc['year']+'\x27>'+_0x528cfc[_0x303e('0x1f')]+'-'+_0x528cfc[_0x303e('0x20')]+'-'+_0x528cfc[_0x303e('0x21')]+'</option>');});},'onDateSelect':function(){$(_0x303e('0x22'))[_0x303e('0x1a')]($(_0x303e('0x1d'))[_0x303e('0x1c')]());$[_0x303e('0x8')]({'url':localStorage[_0x303e('0x9')](_0x303e('0x23'))+_0x303e('0x24'),'type':'POST','dataType':_0x303e('0xc'),'beforeSend':function(_0x354caf){_0x354caf[_0x303e('0xe')]('empnumber',localStorage[_0x303e('0x9')]('empnumber'));_0x354caf[_0x303e('0xe')](_0x303e('0xf'),localStorage[_0x303e('0x9')](_0x303e('0xf')));_0x354caf[_0x303e('0xe')](_0x303e('0x25'),$(_0x303e('0x1d'))['val']());},'success':function(_0x474524){var _0x22c51d=0x0;$(_0x303e('0x26'))[_0x303e('0x1a')](_0x303e('0x27')+_0x303e('0x28'));$[_0x303e('0x12')](_0x474524,function(_0x3c7613,_0x19b42b){$(_0x303e('0x26'))[_0x303e('0x1e')](_0x303e('0x29')+_0x19b42b[_0x303e('0x2a')]+'</dt>'+'<dd\x20class=\x22col-7\x20\x22>'+_0x19b42b[_0x303e('0x2b')]+_0x303e('0x2c'));_0x22c51d++;});if(_0x22c51d==0x0){$(_0x303e('0x2d'))['hide']();$(_0x303e('0x2e'))[_0x303e('0x2f')]();$(_0x303e('0x30'))['show']();}else{$(_0x303e('0x2d'))[_0x303e('0x2f')]();$(_0x303e('0x2e'))[_0x303e('0x31')]();$(_0x303e('0x30'))['hide']();};},'error':function(_0x2e50a6,_0x1f4740,_0x52869b){}});},'receivedEvent':function(_0x196050){},'toggleMenu':function(){slideout[_0x303e('0x32')]();if(slideout[_0x303e('0x33')]()){$(_0x303e('0x3'))[_0x303e('0x34')]();}else{$(_0x303e('0x3'))[_0x303e('0x4')]();}},'onLogout':function(){localStorage['setItem'](_0x303e('0x35'),_0x303e('0x36'));}};
>>>>>>> f7b06d37a675843cbbc2208eec2030b36122c75d
