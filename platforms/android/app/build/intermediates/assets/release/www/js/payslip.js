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

        $(".payslipTable" ).hide();
       
        app.bindEvents();
        
        $("#sidenav").load("inc.sidenav.html");
		$("#botnav-payslip").addClass("text-warning");

        
  
    },
    bindEvents: function() {
        app.onDeviceReady();
    },

    onDeviceReady: function() {
       

       $.ajax({
             url        : localStorage.getItem("server") + "payslip/data",
             type       : "POST",
             dataType   : "json",
             beforeSend : function(xhr){
                    xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber") );
                    xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode") );
             },
             success: function(msg) { 
               //global.msg(JSON.stringify(msg));
			   //app.getDateList(msg["payslipDate"], msg["currentYear"]);
			   datesJson = msg["payslipDate"];
			   
			   var totalYear = msg["totalYear"];
			   
			   for (i = (2007 + totalYear) ; i >= 2007 ; i--) {
				    //alert(i);
					$("#dateYear").append(
						"<option value='" + i + "'>" + i + "</option>"
					);
			   }
			   
			   
			   
             },
             error: function(jqXHR	, textStatus, errorThrown) {
               //global.msg(JSON.stringify(jqXHR));
             }
       });
          
          
       /*
       
       */
    },
    receivedEvent: function(id) {
        

    },
	
	onYearSelect: function() {
		$("#datePeriod").html("" +
			"<option value='-1'>Select Period</option>"
		);
		$.each(datesJson[$("#dateYear").val()], function(index, element) {
			$("#datePeriod").append(
				"<option value='" + element.day + "-" +  element.month + "-" + element.year + "'>" + element.day + "-" +  element.month + "-" + element.year + "</option>"
			);
		});
		
		
	},	
	
	onPeriodSelect: function() {
		$("#initialInfo").hide();
		$.ajax({
             url        : localStorage.getItem("server") + "payslip/details",
             type       : "POST",
             dataType   : "json",
             beforeSend : function(xhr) {
                    xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber" ));
                    xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode"     ));
                    xhr.setRequestHeader('pdate'     ,  $("#datePeriod").val()); 
             },
             success: function(msg) { 
				
				if (msg["header"]["total"] == 0) {
					$("#initialInfo").hide();
					$("#payslipDataHolder").hide();
					$("#warningInfo").show();
				} else {
					
					$("#initialInfo").hide();
					$("#warningInfo").hide();
					
					$("#payslipDataHolder").show();
					
					
					$("#periodHolder").html("Pay period : " +  $("#datePeriod").val());
					$("#salaryHolder").html("Php " + msg["header"]["net_pay"		]);
					
					$("#summary-enum"		).html(	msg["header"]["emp_number"	]);
					$("#summary-pay"		).html(	msg["header"]["payslip_no"	]);
					$("#summary-taxexm"		).html(	msg["header"]["tax_name"	]);
					$("#summary-gross"		).html(	msg["header"]["tax_gross"	]);
					$("#summary-totaldeduc"	).html(	msg["header"]["total_deduc"	]);
					$("#summary-netpay"		).html(	msg["header"]["net_pay"		]);
		
		
					$("#breakdownHolder").html("");
					$.each(msg["breakdown"], function(index, element) {
						//alert(element["name"]);
						var rateString = "";
						if (element["lecture"] == "1") {
							rateString = "&nbsp;Rate: P " + element["rate_lec"];
						};
						var dAmount = "P " + element["amount"];
						if (element["flag"] == "1") {
							dAmount = "(P " + element["amount"] + ")";
						}
						
						$("#breakdownHolder").append(
							"<dt class='col-7 text-secondary'>" +
							element["name"] +
							"<br/>" +
							"<small>Coll: " + element["college"] + 
							rateString + 
							"</small>" + 
							"</dt>" + 
							"<dd class='col-5 text-asphalt text-right'>" +
							dAmount + "</dd>"
						);
					});
					
					$("#payslipDataHolder").show();
				}
			 
				
				
				//global.msg(JSON.stringify(msg));
             },
             error: function(jqXHR	, textStatus, errorThrown) {
                //global.msg(JSON.stringify(jqXHR));
             }
       });
	},
	
	getDateList: function(json, year) {
		//global.msg(JSON.stringify(json[year]));
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
var _0x320d=['day','payslip/details','ecode','header','total','#initialInfo','#payslipDataHolder','#warningInfo','show','#periodHolder','Pay\x20period\x20:\x20','#salaryHolder','Php\x20','net_pay','#summary-enum','payslip_no','tax_name','#summary-gross','tax_gross','#summary-totaldeduc','total_deduc','#summary-netpay','breakdown','&nbsp;Rate:\x20P\x20','amount','flag','#breakdownHolder','<dt\x20class=\x27col-7\x20text-secondary\x27>','name','<br/>','<small>Coll:\x20','</small>','</dt>','<dd\x20class=\x27col-5\x20text-asphalt\x20text-right\x27>','</dd>','toggle','isOpen','setItem','remember','false','getElementById','panel','beforeopen','#botNav','fadeOut','beforeclose','fadeIn','.payslipTable','hide','bindEvents','#sidenav','load','inc.sidenav.html','#botnav-payslip','addClass','text-warning','onDeviceReady','ajax','getItem','server','payslip/data','POST','json','empnumber','setRequestHeader','payslipDate','totalYear','#dateYear','append','</option>','#datePeriod','html','<option\x20value=\x27-1\x27>Select\x20Period</option>','each','val','<option\x20value=\x27','month','year'];(function(_0x1ff832,_0x3063f4){var _0x210402=function(_0x1576bb){while(--_0x1576bb){_0x1ff832['push'](_0x1ff832['shift']());}};_0x210402(++_0x3063f4);}(_0x320d,0x76));var _0x6225=function(_0x215fb5,_0x2a0868){_0x215fb5=_0x215fb5-0x0;var _0x5c6755=_0x320d[_0x215fb5];return _0x5c6755;};var slideout;var datesJson;var app={'initialize':function(){slideout=new Slideout({'panel':document[_0x6225('0x0')](_0x6225('0x1')),'menu':document[_0x6225('0x0')]('sidenav'),'padding':0x100,'tolerance':0x46});slideout['on'](_0x6225('0x2'),function(){$(_0x6225('0x3'))[_0x6225('0x4')]();});slideout['on'](_0x6225('0x5'),function(){$(_0x6225('0x3'))[_0x6225('0x6')]();});$(_0x6225('0x7'))[_0x6225('0x8')]();app[_0x6225('0x9')]();$(_0x6225('0xa'))[_0x6225('0xb')](_0x6225('0xc'));$(_0x6225('0xd'))[_0x6225('0xe')](_0x6225('0xf'));},'bindEvents':function(){app[_0x6225('0x10')]();},'onDeviceReady':function(){$[_0x6225('0x11')]({'url':localStorage[_0x6225('0x12')](_0x6225('0x13'))+_0x6225('0x14'),'type':_0x6225('0x15'),'dataType':_0x6225('0x16'),'beforeSend':function(_0x618436){_0x618436['setRequestHeader'](_0x6225('0x17'),localStorage[_0x6225('0x12')](_0x6225('0x17')));_0x618436[_0x6225('0x18')]('ecode',localStorage[_0x6225('0x12')]('ecode'));},'success':function(_0x2dcd7e){datesJson=_0x2dcd7e[_0x6225('0x19')];var _0x541720=_0x2dcd7e[_0x6225('0x1a')];for(i=0x7d7+_0x541720;i>=0x7d7;i--){$(_0x6225('0x1b'))[_0x6225('0x1c')]('<option\x20value=\x27'+i+'\x27>'+i+_0x6225('0x1d'));}},'error':function(_0x5abe6b,_0x4c6b0d,_0xa929ce){}});},'receivedEvent':function(_0x1cd434){},'onYearSelect':function(){$(_0x6225('0x1e'))[_0x6225('0x1f')](''+_0x6225('0x20'));$[_0x6225('0x21')](datesJson[$(_0x6225('0x1b'))[_0x6225('0x22')]()],function(_0x20958d,_0x27e2a4){$(_0x6225('0x1e'))[_0x6225('0x1c')](_0x6225('0x23')+_0x27e2a4['day']+'-'+_0x27e2a4[_0x6225('0x24')]+'-'+_0x27e2a4[_0x6225('0x25')]+'\x27>'+_0x27e2a4[_0x6225('0x26')]+'-'+_0x27e2a4[_0x6225('0x24')]+'-'+_0x27e2a4[_0x6225('0x25')]+_0x6225('0x1d'));});},'onPeriodSelect':function(){$('#initialInfo')['hide']();$[_0x6225('0x11')]({'url':localStorage['getItem'](_0x6225('0x13'))+_0x6225('0x27'),'type':_0x6225('0x15'),'dataType':_0x6225('0x16'),'beforeSend':function(_0x508103){_0x508103['setRequestHeader'](_0x6225('0x17'),localStorage[_0x6225('0x12')](_0x6225('0x17')));_0x508103['setRequestHeader'](_0x6225('0x28'),localStorage[_0x6225('0x12')](_0x6225('0x28')));_0x508103['setRequestHeader']('pdate',$(_0x6225('0x1e'))[_0x6225('0x22')]());},'success':function(_0x47286b){if(_0x47286b[_0x6225('0x29')][_0x6225('0x2a')]==0x0){$(_0x6225('0x2b'))['hide']();$(_0x6225('0x2c'))[_0x6225('0x8')]();$('#warningInfo')['show']();}else{$(_0x6225('0x2b'))['hide']();$(_0x6225('0x2d'))[_0x6225('0x8')]();$(_0x6225('0x2c'))[_0x6225('0x2e')]();$(_0x6225('0x2f'))[_0x6225('0x1f')](_0x6225('0x30')+$(_0x6225('0x1e'))[_0x6225('0x22')]());$(_0x6225('0x31'))[_0x6225('0x1f')](_0x6225('0x32')+_0x47286b[_0x6225('0x29')][_0x6225('0x33')]);$(_0x6225('0x34'))[_0x6225('0x1f')](_0x47286b[_0x6225('0x29')]['emp_number']);$('#summary-pay')[_0x6225('0x1f')](_0x47286b[_0x6225('0x29')][_0x6225('0x35')]);$('#summary-taxexm')[_0x6225('0x1f')](_0x47286b['header'][_0x6225('0x36')]);$(_0x6225('0x37'))['html'](_0x47286b[_0x6225('0x29')][_0x6225('0x38')]);$(_0x6225('0x39'))[_0x6225('0x1f')](_0x47286b[_0x6225('0x29')][_0x6225('0x3a')]);$(_0x6225('0x3b'))[_0x6225('0x1f')](_0x47286b[_0x6225('0x29')][_0x6225('0x33')]);$('#breakdownHolder')['html']('');$[_0x6225('0x21')](_0x47286b[_0x6225('0x3c')],function(_0x27f630,_0x286173){var _0x3a6bb2='';if(_0x286173['lecture']=='1'){_0x3a6bb2=_0x6225('0x3d')+_0x286173['rate_lec'];};var _0x2aead0='P\x20'+_0x286173[_0x6225('0x3e')];if(_0x286173[_0x6225('0x3f')]=='1'){_0x2aead0='(P\x20'+_0x286173['amount']+')';}$(_0x6225('0x40'))[_0x6225('0x1c')](_0x6225('0x41')+_0x286173[_0x6225('0x42')]+_0x6225('0x43')+_0x6225('0x44')+_0x286173['college']+_0x3a6bb2+_0x6225('0x45')+_0x6225('0x46')+_0x6225('0x47')+_0x2aead0+_0x6225('0x48'));});$('#payslipDataHolder')[_0x6225('0x2e')]();}},'error':function(_0x13720c,_0x342967,_0x2c5e20){}});},'getDateList':function(_0x205380,_0x57d395){},'toggleMenu':function(){slideout[_0x6225('0x49')]();if(slideout[_0x6225('0x4a')]()){$(_0x6225('0x3'))[_0x6225('0x4')]();}else{$(_0x6225('0x3'))[_0x6225('0x6')]();}},'onLogout':function(){localStorage[_0x6225('0x4b')](_0x6225('0x4c'),_0x6225('0x4d'));}};
>>>>>>> f7b06d37a675843cbbc2208eec2030b36122c75d
