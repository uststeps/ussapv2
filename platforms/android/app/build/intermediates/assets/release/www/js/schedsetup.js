<<<<<<< HEAD
var slideout;
var jsn;


var timedata = {
	"06:00" : "6:00 am",
	"06:30" : "6:30 am",
	"07:00" : "7:00 am",
	"07:30" : "7:30 am",
	"08:00" : "8:00 am",
	"08:30" : "8:30 am",
	"09:00" : "9:00 am",
	"09:30" : "9:30 am",
	"10:00" : "10:00 am",
	"10:30" : "10:30 am",
	"11:00" : "11:00 am",
	"11:30" : "11:30 am",
	"12:00" : "12:00 pm",
	"12:30" : "12:30 pm",
	"13:00" : "1:00 pm",
	"13:30" : "1:30 pm",
	"14:00" : "2:00 pm",
	"14:30" : "2:30 pm",
	"15:00" : "3:00 pm",
	"15:30" : "3:30 pm",
	"16:00" : "4:00 pm",
	"16:30" : "4:30 pm",
	"17:00" : "5:00 pm",
	"17:30" : "5:30 pm",
	"18:00" : "6:00 pm",
	"18:30" : "6:30 pm",
	"19:00" : "7:00 pm",
	"19:30" : "7:30 pm",
	"20:00" : "8:00 pm",
	"20:30" : "8:30 pm",
	"21:00" : "9:00 pm",
	"21:30" : "9:30 pm",
	"22:00" : "10:00 pm",
	"22:30" : "10:30 pm"
}
var days =  {
	"1" : "Monday",
	"2" : "Tuesday",
	"3" : "Wednesday",
	"4" : "Thursday",
	"5" : "Friday",
	"6" : "Satruday",
	"7" : "Sunday"
}
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
var longpress;
var deleteOpened;
var lastId = "0";

var app = {
    initialize: function() {
        /*
			slide out config
        */
		empnumber = localStorage.getItem("empnumber");
        slideout = new Slideout({
            'panel'    : document.getElementById('panel'   ),
            'menu'     : document.getElementById('sidenav' ),
            'padding'  : 256, /* TODO: Change to screen width/2 on production  for menu slide */
            'tolerance': 70
        });
		slideout.on('beforeopen' , function() { 
				$("#botNav").fadeOut();
		});

		slideout.on('beforeclose', function() {
				$("#botNav").fadeIn();

		});
		
        
        $("#sidenav").load("inc.sidenav.html");

		if (localStorage.getItem("notification-" + localStorage.getItem("empnumber")) == "true") {
			$("#notifSwitch").prop('checked', true);
		} else {
			$("#notifSwitch").prop('checked', false);
		}
		
        app.bindEvents();
		 
    },
    
    bindEvents: function() {
        app.onDeviceReady();

			   
    },
	
	
	
	reformatTime: function(timeStr){
		// CHECK IF TIME IS PM OR AM
		// AND IF 1 DIGIT , ADD ZERO
		// AS PREFIX
		var timeReturn = "";
		if ( parseInt(timeStr.split(":")[0]) > 12 ){
			timeReturn = (parseInt(timeStr.split(":")[0]) - 12).toString();
			if (timeReturn.length == 1) {
				timeReturn = "0" + timeReturn + ":" + timeStr.split(":")[1];
			} else {
				timeReturn = timeReturn + ":" + timeStr.split(":")[1];
			}
		} else {
			timeReturn = timeStr;
		}
		
		return timeReturn;
	},

    onDeviceReady: function() {
		//alert(localStorage.getItem("schedule-" + localStorage.getItem("empnumber")));
		jsn = JSON.parse(localStorage.getItem("schedule-" + localStorage.getItem("empnumber")));
	
		//alert(JSON.stringify(jsn));
	
		//alert(localStorage.getItem("schedule-" + localStorage.getItem("empnumber")));
		$.each(timedata, function(i,e){
			$(".timepicker").append( 
				'<option value="' + i + '">' + e + '</option>'
			);
		});
		
		//alert("GOT PAST: " + localStorage.getItem("notification-" + localStorage.getItem("empnumber")));
		
		if (localStorage.getItem("notification-" + localStorage.getItem("empnumber")) == "true") {	
			
			cordova.plugins.notification.local.clearAll(function(notification) {
				console.log("notifications cancelled : BEFORE RE SCHEDULED");
			}, this);
			
			app.toggleSwitch();
		} 
		
		
		
		var counter = 0;
		$.each(jsn, function(i,e){
			
			var amS = app.reformatTime(e["amS"]);
			var amE = app.reformatTime(e["amE"]);
			var pmS = app.reformatTime(e["pmS"]);
			var pmE = app.reformatTime(e["pmE"]);
			
			
			// DISPLAY 
			$("#schedList").append( 
				'<div class="schedule-links bg-white" id="box' + i + '">' +
					'<a herf="#" class="sched-button btn-block h5 text-asphalt" ontouchstart="app.onTouchS(\'' + i + '\')" ontouchend="app.onTouchE(\'' + i + '\')"  > ' + days[e["day"]] +
						'<br/><small class="text-muted">AM: ' + amS + 'am - ' + amE + 'pm</small>' +
						'<br/><small class="text-muted">PM: ' + pmS + 'pm - ' + pmE + 'pm</small>' +
					'</a>' +
				'</div>'
			);
			
			lastId = i;
		});
					
		
		//alert("last ID" + lastId);
	
	
    },
	
	onTouchE: function(id) {
		longpress=false;   
		if (deleteOpened) {
			
		} else {
			//alert("Edit start");
		};
		
		$("#box" + id).prop("class","schedule-links bg-white");
		
	}, 

	onTouchS: function(id) {
		
		
		
		$("#box" + id).prop("class","schedule-links bg-light");
		longpress=true;    
		setTimeout(function() {    
				if(longpress){
						deleteOpened = true;
						navigator.notification.confirm(
							"Delete schedule?",        	 	// Alert Message
							function(buttonIndex) {				// Callback on message
								if (buttonIndex == 2) {		
									//alert(id);
									delete jsn[id];
									//alert(JSON.stringify(jsn));
									
									localStorage.setItem("schedule-" + localStorage.getItem("empnumber"), JSON.stringify(jsn));
									window.location = "schedsetup.html";
									//navigator.app.exitApp();
								};
								
								$("#box" + id).prop("class","schedule-links bg-white");
							},                 					// callback
							"",           						// title
							['Cancel', 'Delete']                // Buttons
						);	
				} else {
					deleteOpened = false;
				}

     
		}, 500);
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
	
	validate: function() {
		if ($("#sched_day").val() == "-1"){
			$("#sched_day").attr("class","form-control border border-danger");
			return false;
		} else {
			$("#sched_day").attr("class","form-control border");
		}
		
		return true;
	},
	
	onSubmit: function() {
		
		if (app.validate()){
				var newEntry = "";
		
		// BUG : Sometimes scheduling is delayed
		//alert(JSON.stringify(jsn));
		if (jsn == null || JSON.stringify(jsn) == "{}"){
			
			if ($("#sched_day" ).val()=="8") {
				newEntry = '{';
				for(n=1;n<=7;n++){
					newEntry += '\"' + n.toString() + '\" : {' +
						'"day" : \"' + n.toString() + '\",' +
						'"amS" : \"' + $("#am_start"  ).val() + '\",' +
						'"amE" : \"' + $("#am_end"	  ).val() + '\",' + 
						'"pmS" : \"' + $("#pm_start"  ).val() + '\",' +
						'"pmE" : \"' + $("#pm_end"    ).val() + '\"'  +
					'},';
				}
				newEntry = newEntry.slice(0,-1);
				newEntry += '}';
				
			}else if ($("#sched_day" ).val()=="9") {
				newEntry = '{';
				for(n=1;n<=5;n++){
					newEntry += '\"' + n.toString() + '\" : {' +
						'"day" : \"' + n.toString() + '\",' +
						'"amS" : \"' + $("#am_start"  ).val() + '\",' +
						'"amE" : \"' + $("#am_end"	  ).val() + '\",' + 
						'"pmS" : \"' + $("#pm_start"  ).val() + '\",' +
						'"pmE" : \"' + $("#pm_end"    ).val() + '\"'  +
					'},';
				}
				newEntry = newEntry.slice(0,-1);
				newEntry += '}';
				
			} else {
				newEntry = '{' +
					'\"' + lastId + '\" : {' +
						'"day" : \"' + $("#sched_day" ).val() + '\",' +
						'"amS" : \"' + $("#am_start"  ).val() + '\",' +
						'"amE" : \"' + $("#am_end"	  ).val() + '\",' + 
						'"pmS" : \"' + $("#pm_start"  ).val() + '\",' +
						'"pmE" : \"' + $("#pm_end"    ).val() + '\"'  +
					'}' +		
				'}';
			
			}
			localStorage.setItem("schedule-" + localStorage.getItem("empnumber"), newEntry);
		} else {
			//alert("BEFORE INCRE: " + lastId);
			//alert((parseInt(lastId) + 1).toString());
			if ($("#sched_day" ).val()=="8") {
				for(n=1;n<=7;n++){
					jsn[(parseInt(lastId) + n).toString()] = {
						"day" : n.toString(),
						"amS" : $("#am_start"  ).val(),
						"amE" : $("#am_end"    ).val(),
						"pmS" : $("#pm_start"  ).val(),
						"pmE" : $("#pm_end"    ).val()
					};
				}
				
			
			}else if ($("#sched_day" ).val()=="9") {
				for(n=1;n<=5;n++){
					jsn[(parseInt(lastId) + n).toString()] = {
						"day" : n.toString(),
						"amS" : $("#am_start"  ).val(),
						"amE" : $("#am_end"    ).val(),
						"pmS" : $("#pm_start"  ).val(),
						"pmE" : $("#pm_end"    ).val()
					};
				}
				
				
			} else {
				jsn[(parseInt(lastId) + 1).toString()] = {
					"day" : $("#sched_day" ).val(),
					"amS" : $("#am_start"  ).val(),
					"amE" : $("#am_end"    ).val(),
					"pmS" : $("#pm_start"  ).val(),
					"pmE" : $("#pm_end"    ).val()
				};
			
			}
			
			
			localStorage.setItem("schedule-" + localStorage.getItem("empnumber"), JSON.stringify(jsn));
		}
		
		
		/* /
		if (localStorage.getItem("notification-"+ localStorage.getItem("empnumber")) == "true"){
			cordova.plugins.notification.local.cancelAll(function(notification) {
				console.log("notifications cancelled : BEFORE RE SCHEDULED");
			}, this);
			app.toggleSwitch();
			
		};
		*/
		console.log("DONE SUBMIT");
		window.location = "schedsetup.html";
			
		};
		
	
	},
	
	
	checkSchedule: function(sched) {
		if (sched == "mon") {
			
		} else {
			
		}
	},
	
	
	toggleSwitch: function(){
		var check = 1;
		var data = [];
		var dtrFlag = 0;
		if  ($("#notifSwitch").prop('checked')) {
			var index = 0;

			var defaultTitle = "Daily Time Record Alert";
			$.each(jsn, function(i,e){
					
					
				var r_amS_H = 0;
				var r_amS_M = 0;
				if (e["amS"].split(":")[1] == 0){
					r_amS_H = parseInt(e["amS"].split(":")[0]) - 1;
					r_amS_M = 50;
				} else {
					r_amS_H = parseInt(e["amS"].split(":")[0]);
					r_amS_M = parseInt(e["amS"].split(":")[1]) - 10;
				}
			
				data[index++] = {
					id   	: index,
					title	: defaultTitle, 
					text : "AM TIME IN",
					trigger : { 
								count: 1440,
								every: { 
									weekday	: parseInt(e["day"]), 
									hour	: r_amS_H,
									minute	: r_amS_M,
									second  : 0
								}
							 },
					
					data: { processor: true,sort: 1 }
				};

		
				data[index++] = {
					id   	: index,
					title	: defaultTitle, 
					text : "AM TIME OUT",
					trigger : { 
								count: 1440,
								every: { 
									weekday	: parseInt(e["day"]), 
									hour	: parseInt(e["amE"].split(":")[0]), 
									minute	: parseInt(e["amE"].split(":")[1]),
									second  : 1
								}
							  },
					
					data: { processor: true,sort: 2 }
				};
				
					
				
				var r_pmS_H = 0;
				var r_pmS_M = 0;
				if (e["pmS"].split(":")[1] == 0){
					r_pmS_H = parseInt(e["pmS"].split(":")[0]) - 1;
					r_pmS_M = 50;
				} else {
					r_pmS_H = parseInt(e["pmS"].split(":")[0]);
					r_pmS_M = parseInt(e["pmS"].split(":")[1]) - 10;
				}
				
				data[index++] = {
					id   	: index,
					title	: defaultTitle, 
					text : "PM TIME IN",
					trigger : { 
								count: 1440,
								every: { 
									weekday	: parseInt(e["day"]), 
									hour	: r_pmS_H, 
									minute	: r_pmS_M,
									second  : 0
								}
							 },
					
					data: { processor: true,sort: 3 }
				};
				
				data[index++] = {
					id   	: index,
					title	: defaultTitle, 
					text : "PM TIME OUT",
					trigger	: { 
								count: 1440,
								every: { 
									weekday	: parseInt(e["day"]), 
									hour	: parseInt(e["pmE"].split(":")[0]), 
									minute	: parseInt(e["pmE"].split(":")[1]),
									second  : 0
								}
							 },
					
					data: { processor: true, sort: 4 }
				};
				
			});
				
			//alert(JSON.stringify(data));
			cordova.plugins.notification.local.schedule(data);
			
			// TODO BACKGROUND PROCESS
			// check if notification is working if not do algo
			/*  NOTIFICATION CONDITION CHECKER
				*WORKS BUT APP NEED TO BE MINIMIZED NOT CLOSED
			*/	
			
		
			// WILL FIRE IF APP MINIMZED------------------------------------------------------
			cordova.plugins.notification.local.on("trigger", function(notification) {
				
				if (notification.data.processor) {
				$.ajax({
					url       : localStorage.getItem("server") + "service/serverdt",
					type      : "POST",
					dataType  : "json",
					beforeSend: function(xhr){
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
	
					   app.getDTRRecord(msg["date"], notification.data.sort);
					},
					error: function(jqXHR	, textStatus, errorThrown) {  
					   //alert(JSON.stringify(jqXHR));
					   //alert(JSON.stringify(textStatus));
					   //alert(JSON.stringify(errorThrown));
					}
				});
				}
			});
			//----------------------------------------------------------------------------------
			
			
			localStorage.setItem("notification-"+ localStorage.getItem("empnumber"), "true" );
			
		} else {
			
			cordova.plugins.notification.local.clearAll(function(notification) {
				console.log("notifications cancelled");
			}, this);

			localStorage.setItem("notification-"+ localStorage.getItem("empnumber"), "false" );
		}
	},
	getDTRRecord: function(pdate,notifId){
		//console.log("i am looping");
		
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
                 xhr.setRequestHeader('pdate'     ,  pdate ); 
            },  
            success: function(msg) { 
			var index = 0;			// check what in or out is current
			var sendNotif = false ;	// if true send notif
			var notifMessage = "";
			var amIn 	= false;
			var amOut 	= false;
			var pmIn 	= false;
			var pmOut	= false;		
			/* 
			
			
			*/
			$.each(msg, function(i,e){
				if ( index == 0 ) {
					if (i==0) {
						amIn = true;
						index++;
					}
				} else if (index == 1){
					if (msg[i]["type"] == "OUT") {
						amOut = true;
						index++;
					} 
				} else if (index == 2){
					if (msg[i]["type"] == "IN"){
						pmIn = true;
						index++;
					}
				} else if (index == 3) {
					if (msg[i]["type"] == "OUT"){
						pmOut = true;
						index++;
					}
				}
			});
			/* FLAG CHECKER  */
			//  console.log("############ NOTIF ID :" + notifId);					
			//  console.log("############ FLAGS    :" + amIn + " : " + amOut + " : " + pmIn + " : " + pmOut);
			/*				 */
			/*
				notif id = 1 == AM IN
				notif id = 2 == AM OUT 
				notif id = 3 == PM IN 
				notif id = 4 == PM OUT
			*/
			
			
			if (notifId == 1 && amIn  == false) {
				sendNotif = true;
				notifMessage = "DTR Alert: 10 Minutes before AM time in";
            } else if (notifId == 2 && amOut == false) {
				sendNotif = true;
				notifMessage = "DTR Alert: Time out for am schedule";
			} else if (notifId == 3 && pmIn  == false) {
				sendNotif = true;
				notifMessage = "DTR Alert: 10 Minutes before PM time in";
			} else if (notifId == 4 && pmOut == false) {
				sendNotif = true;
				notifMessage = "DTR Alert: Time out for pm schedule";
			}
			
			if (sendNotif) {
				cordova.plugins.notification.local.schedule( {
					id		: 999,
					title	: "DTR Reminder", 
					text 	: notifMessage,
					foreground: true,
					data: {processor: false}
				});
			}
			
			
			
			},
            error: function(jqXHR	, textStatus, errorThrown) {  
				//global.msg("jqXHR: " 		  + JSON.stringify(jqXHR)		);
             	//global.msg("STATUS: " 	  + JSON.stringify(textStatus)	);
				//global.msg("ERROR THROWN: " + JSON.stringify(errorThrown)	);
            }
        });  
    },
	onLogout: function(){
		localStorage.setItem("remember","false");
	},
	onAddDays: function() {
		
		
	}
};
=======
var _0x2a6a=['6:30\x20pm','7:00\x20pm','7:30\x20pm','8:00\x20pm','8:30\x20pm','9:00\x20pm','9:30\x20pm','10:00\x20pm','10:30\x20pm','Tuesday','Wednesday','Thursday','Friday','Satruday','JAN','MAR','APR','JUN','JUL','AUG','OCT','DEC','getItem','getElementById','panel','sidenav','beforeopen','#botNav','fadeOut','beforeclose','fadeIn','#sidenav','load','inc.sidenav.html','empnumber','#notifSwitch','prop','checked','bindEvents','onDeviceReady','split','toString','length','parse','schedule-','each','append','<option\x20value=\x22','</option>','notification-','true','plugins','local','clearAll','log','toggleSwitch','reformatTime','amS','amE','pmS','#schedList','<div\x20class=\x22schedule-links\x20bg-white\x22\x20id=\x22box','<a\x20herf=\x22#\x22\x20class=\x22sched-button\x20btn-block\x20h5\x20text-asphalt\x22\x20ontouchstart=\x22app.onTouchS(\x27','\x27)\x22\x20ontouchend=\x22app.onTouchE(\x27','\x27)\x22\x20\x20>\x20','day','<br/><small\x20class=\x22text-muted\x22>AM:\x20','am\x20-\x20','<br/><small\x20class=\x22text-muted\x22>PM:\x20','pm\x20-\x20','pm</small>','</a>','</div>','#box','class','schedule-links\x20bg-white','notification','confirm','Delete\x20schedule?','setItem','stringify','location','schedsetup.html','Cancel','Delete','toggle','replace','val','attr','#sched_day','form-control\x20border','validate','\x22\x20:\x20{','\x22day\x22\x20:\x20\x22','\x22amS\x22\x20:\x20\x22','#am_start','\x22amE\x22\x20:\x20\x22','\x22pmE\x22\x20:\x20\x22','slice','#am_end','\x22pmS\x22\x20:\x20\x22','#pm_start','#pm_end','DONE\x20SUBMIT','mon','Daily\x20Time\x20Record\x20Alert','AM\x20TIME\x20IN','AM\x20TIME\x20OUT','PM\x20TIME\x20IN','PM\x20TIME\x20OUT','pmE','schedule','trigger','data','processor','ajax','server','POST','json','setRequestHeader','ecode','date','getDTRRecord','sort','notifications\x20cancelled','false','#curdate-holder','attendance/dtr','type','OUT','DTR\x20Alert:\x2010\x20Minutes\x20before\x20AM\x20time\x20in','DTR\x20Alert:\x20Time\x20out\x20for\x20am\x20schedule','DTR\x20Alert:\x20Time\x20out\x20for\x20pm\x20schedule','DTR\x20Reminder','remember','6:00\x20am','6:30\x20am','7:00\x20am','7:30\x20am','8:00\x20am','8:30\x20am','9:00\x20am','9:30\x20am','10:00\x20am','10:30\x20am','11:00\x20am','12:00\x20pm','12:30\x20pm','1:00\x20pm','1:30\x20pm','2:00\x20pm','2:30\x20pm','3:00\x20pm','3:30\x20pm','4:00\x20pm','4:30\x20pm','5:00\x20pm','5:30\x20pm','6:00\x20pm'];(function(_0xb5913a,_0x109699){var _0x4f5a89=function(_0x324d10){while(--_0x324d10){_0xb5913a['push'](_0xb5913a['shift']());}};_0x4f5a89(++_0x109699);}(_0x2a6a,0x126));var _0x56fa=function(_0x3491ea,_0x84631b){_0x3491ea=_0x3491ea-0x0;var _0x542fb5=_0x2a6a[_0x3491ea];return _0x542fb5;};var slideout;var jsn;var timedata={'06:00':_0x56fa('0x0'),'06:30':_0x56fa('0x1'),'07:00':_0x56fa('0x2'),'07:30':_0x56fa('0x3'),'08:00':_0x56fa('0x4'),'08:30':_0x56fa('0x5'),'09:00':_0x56fa('0x6'),'09:30':_0x56fa('0x7'),'10:00':_0x56fa('0x8'),'10:30':_0x56fa('0x9'),'11:00':_0x56fa('0xa'),'11:30':'11:30\x20am','12:00':_0x56fa('0xb'),'12:30':_0x56fa('0xc'),'13:00':_0x56fa('0xd'),'13:30':_0x56fa('0xe'),'14:00':_0x56fa('0xf'),'14:30':_0x56fa('0x10'),'15:00':_0x56fa('0x11'),'15:30':_0x56fa('0x12'),'16:00':_0x56fa('0x13'),'16:30':_0x56fa('0x14'),'17:00':_0x56fa('0x15'),'17:30':_0x56fa('0x16'),'18:00':_0x56fa('0x17'),'18:30':_0x56fa('0x18'),'19:00':_0x56fa('0x19'),'19:30':_0x56fa('0x1a'),'20:00':_0x56fa('0x1b'),'20:30':_0x56fa('0x1c'),'21:00':_0x56fa('0x1d'),'21:30':_0x56fa('0x1e'),'22:00':_0x56fa('0x1f'),'22:30':_0x56fa('0x20')};var days={'1':'Monday','2':_0x56fa('0x21'),'3':_0x56fa('0x22'),'4':_0x56fa('0x23'),'5':_0x56fa('0x24'),'6':_0x56fa('0x25'),'7':'Sunday'};var months={'d01':_0x56fa('0x26'),'d02':'FEB','d03':_0x56fa('0x27'),'d04':_0x56fa('0x28'),'d05':'MAY','d06':_0x56fa('0x29'),'d07':_0x56fa('0x2a'),'d08':_0x56fa('0x2b'),'d09':'SEP','d10':_0x56fa('0x2c'),'d11':'NOV','d12':_0x56fa('0x2d')};var months2={'JAN':'01','FEB':'02','MAR':'03','APR':'04','MAY':'05','JUN':'06','JUL':'07','AUG':'08','SEP':'09','OCT':'10','NOV':'11','DEC':'12'};var longpress;var deleteOpened;var lastId='0';var app={'initialize':function(){empnumber=localStorage[_0x56fa('0x2e')]('empnumber');slideout=new Slideout({'panel':document[_0x56fa('0x2f')](_0x56fa('0x30')),'menu':document[_0x56fa('0x2f')](_0x56fa('0x31')),'padding':0x100,'tolerance':0x46});slideout['on'](_0x56fa('0x32'),function(){$(_0x56fa('0x33'))[_0x56fa('0x34')]();});slideout['on'](_0x56fa('0x35'),function(){$('#botNav')[_0x56fa('0x36')]();});$(_0x56fa('0x37'))[_0x56fa('0x38')](_0x56fa('0x39'));if(localStorage[_0x56fa('0x2e')]('notification-'+localStorage[_0x56fa('0x2e')](_0x56fa('0x3a')))=='true'){$(_0x56fa('0x3b'))[_0x56fa('0x3c')](_0x56fa('0x3d'),!![]);}else{$(_0x56fa('0x3b'))[_0x56fa('0x3c')](_0x56fa('0x3d'),![]);}app[_0x56fa('0x3e')]();},'bindEvents':function(){app[_0x56fa('0x3f')]();},'reformatTime':function(_0x3a6a0c){var _0xcac53f='';if(parseInt(_0x3a6a0c[_0x56fa('0x40')](':')[0x0])>0xc){_0xcac53f=(parseInt(_0x3a6a0c['split'](':')[0x0])-0xc)[_0x56fa('0x41')]();if(_0xcac53f[_0x56fa('0x42')]==0x1){_0xcac53f='0'+_0xcac53f+':'+_0x3a6a0c[_0x56fa('0x40')](':')[0x1];}else{_0xcac53f=_0xcac53f+':'+_0x3a6a0c['split'](':')[0x1];}}else{_0xcac53f=_0x3a6a0c;}return _0xcac53f;},'onDeviceReady':function(){jsn=JSON[_0x56fa('0x43')](localStorage[_0x56fa('0x2e')](_0x56fa('0x44')+localStorage[_0x56fa('0x2e')](_0x56fa('0x3a'))));$[_0x56fa('0x45')](timedata,function(_0x34b0bf,_0x1dc836){$('.timepicker')[_0x56fa('0x46')](_0x56fa('0x47')+_0x34b0bf+'\x22>'+_0x1dc836+_0x56fa('0x48'));});if(localStorage[_0x56fa('0x2e')](_0x56fa('0x49')+localStorage[_0x56fa('0x2e')](_0x56fa('0x3a')))==_0x56fa('0x4a')){cordova[_0x56fa('0x4b')]['notification'][_0x56fa('0x4c')][_0x56fa('0x4d')](function(_0x430fde){console[_0x56fa('0x4e')]('notifications\x20cancelled\x20:\x20BEFORE\x20RE\x20SCHEDULED');},this);app[_0x56fa('0x4f')]();}var _0x17fc5f=0x0;$[_0x56fa('0x45')](jsn,function(_0x558e3f,_0x4f3d91){var _0x293d90=app[_0x56fa('0x50')](_0x4f3d91[_0x56fa('0x51')]);var _0x2789cb=app[_0x56fa('0x50')](_0x4f3d91[_0x56fa('0x52')]);var _0x20bed6=app[_0x56fa('0x50')](_0x4f3d91[_0x56fa('0x53')]);var _0xa20dc=app[_0x56fa('0x50')](_0x4f3d91['pmE']);$(_0x56fa('0x54'))[_0x56fa('0x46')](_0x56fa('0x55')+_0x558e3f+'\x22>'+_0x56fa('0x56')+_0x558e3f+_0x56fa('0x57')+_0x558e3f+_0x56fa('0x58')+days[_0x4f3d91[_0x56fa('0x59')]]+_0x56fa('0x5a')+_0x293d90+_0x56fa('0x5b')+_0x2789cb+'pm</small>'+_0x56fa('0x5c')+_0x20bed6+_0x56fa('0x5d')+_0xa20dc+_0x56fa('0x5e')+_0x56fa('0x5f')+_0x56fa('0x60'));lastId=_0x558e3f;});},'onTouchE':function(_0x15af77){longpress=![];if(deleteOpened){}else{};$(_0x56fa('0x61')+_0x15af77)['prop'](_0x56fa('0x62'),_0x56fa('0x63'));},'onTouchS':function(_0x4e80f0){$(_0x56fa('0x61')+_0x4e80f0)[_0x56fa('0x3c')](_0x56fa('0x62'),'schedule-links\x20bg-light');longpress=!![];setTimeout(function(){if(longpress){deleteOpened=!![];navigator[_0x56fa('0x64')][_0x56fa('0x65')](_0x56fa('0x66'),function(_0x3c0cfc){if(_0x3c0cfc==0x2){delete jsn[_0x4e80f0];localStorage[_0x56fa('0x67')](_0x56fa('0x44')+localStorage[_0x56fa('0x2e')](_0x56fa('0x3a')),JSON[_0x56fa('0x68')](jsn));window[_0x56fa('0x69')]=_0x56fa('0x6a');};$(_0x56fa('0x61')+_0x4e80f0)[_0x56fa('0x3c')](_0x56fa('0x62'),_0x56fa('0x63'));},'',[_0x56fa('0x6b'),_0x56fa('0x6c')]);}else{deleteOpened=![];}},0x1f4);},'receivedEvent':function(_0x28c599){},'toggleMenu':function(){slideout[_0x56fa('0x6d')]();if(slideout['isOpen']()){$(_0x56fa('0x33'))[_0x56fa('0x34')]();}else{$('#botNav')[_0x56fa('0x36')]();}},'onLogout':function(){window[_0x56fa('0x69')][_0x56fa('0x6e')]('index.html');},'validate':function(){if($('#sched_day')[_0x56fa('0x6f')]()=='-1'){$('#sched_day')[_0x56fa('0x70')](_0x56fa('0x62'),'form-control\x20border\x20border-danger');return![];}else{$(_0x56fa('0x71'))['attr'](_0x56fa('0x62'),_0x56fa('0x72'));}return!![];},'onSubmit':function(){if(app[_0x56fa('0x73')]()){var _0x5bffac='';if(jsn==null||JSON[_0x56fa('0x68')](jsn)=='{}'){if($(_0x56fa('0x71'))['val']()=='8'){_0x5bffac='{';for(n=0x1;n<=0x7;n++){_0x5bffac+='\x22'+n['toString']()+_0x56fa('0x74')+_0x56fa('0x75')+n[_0x56fa('0x41')]()+'\x22,'+_0x56fa('0x76')+$(_0x56fa('0x77'))[_0x56fa('0x6f')]()+'\x22,'+_0x56fa('0x78')+$('#am_end')[_0x56fa('0x6f')]()+'\x22,'+'\x22pmS\x22\x20:\x20\x22'+$('#pm_start')['val']()+'\x22,'+_0x56fa('0x79')+$('#pm_end')[_0x56fa('0x6f')]()+'\x22'+'},';}_0x5bffac=_0x5bffac[_0x56fa('0x7a')](0x0,-0x1);_0x5bffac+='}';}else if($('#sched_day')[_0x56fa('0x6f')]()=='9'){_0x5bffac='{';for(n=0x1;n<=0x5;n++){_0x5bffac+='\x22'+n[_0x56fa('0x41')]()+_0x56fa('0x74')+_0x56fa('0x75')+n['toString']()+'\x22,'+_0x56fa('0x76')+$('#am_start')[_0x56fa('0x6f')]()+'\x22,'+_0x56fa('0x78')+$(_0x56fa('0x7b'))[_0x56fa('0x6f')]()+'\x22,'+_0x56fa('0x7c')+$(_0x56fa('0x7d'))[_0x56fa('0x6f')]()+'\x22,'+_0x56fa('0x79')+$(_0x56fa('0x7e'))[_0x56fa('0x6f')]()+'\x22'+'},';}_0x5bffac=_0x5bffac[_0x56fa('0x7a')](0x0,-0x1);_0x5bffac+='}';}else{_0x5bffac='{'+'\x22'+lastId+_0x56fa('0x74')+_0x56fa('0x75')+$(_0x56fa('0x71'))[_0x56fa('0x6f')]()+'\x22,'+_0x56fa('0x76')+$(_0x56fa('0x77'))[_0x56fa('0x6f')]()+'\x22,'+_0x56fa('0x78')+$(_0x56fa('0x7b'))[_0x56fa('0x6f')]()+'\x22,'+_0x56fa('0x7c')+$(_0x56fa('0x7d'))[_0x56fa('0x6f')]()+'\x22,'+_0x56fa('0x79')+$('#pm_end')[_0x56fa('0x6f')]()+'\x22'+'}'+'}';}localStorage[_0x56fa('0x67')](_0x56fa('0x44')+localStorage[_0x56fa('0x2e')](_0x56fa('0x3a')),_0x5bffac);}else{if($(_0x56fa('0x71'))['val']()=='8'){for(n=0x1;n<=0x7;n++){jsn[(parseInt(lastId)+n)[_0x56fa('0x41')]()]={'day':n['toString'](),'amS':$('#am_start')[_0x56fa('0x6f')](),'amE':$(_0x56fa('0x7b'))[_0x56fa('0x6f')](),'pmS':$(_0x56fa('0x7d'))[_0x56fa('0x6f')](),'pmE':$(_0x56fa('0x7e'))[_0x56fa('0x6f')]()};}}else if($(_0x56fa('0x71'))[_0x56fa('0x6f')]()=='9'){for(n=0x1;n<=0x5;n++){jsn[(parseInt(lastId)+n)[_0x56fa('0x41')]()]={'day':n[_0x56fa('0x41')](),'amS':$(_0x56fa('0x77'))[_0x56fa('0x6f')](),'amE':$('#am_end')[_0x56fa('0x6f')](),'pmS':$(_0x56fa('0x7d'))[_0x56fa('0x6f')](),'pmE':$(_0x56fa('0x7e'))[_0x56fa('0x6f')]()};}}else{jsn[(parseInt(lastId)+0x1)[_0x56fa('0x41')]()]={'day':$(_0x56fa('0x71'))[_0x56fa('0x6f')](),'amS':$('#am_start')[_0x56fa('0x6f')](),'amE':$(_0x56fa('0x7b'))[_0x56fa('0x6f')](),'pmS':$(_0x56fa('0x7d'))['val'](),'pmE':$(_0x56fa('0x7e'))[_0x56fa('0x6f')]()};}localStorage[_0x56fa('0x67')]('schedule-'+localStorage[_0x56fa('0x2e')](_0x56fa('0x3a')),JSON[_0x56fa('0x68')](jsn));}console[_0x56fa('0x4e')](_0x56fa('0x7f'));window[_0x56fa('0x69')]=_0x56fa('0x6a');};},'checkSchedule':function(_0x35d077){if(_0x35d077==_0x56fa('0x80')){}else{}},'toggleSwitch':function(){var _0x3e280d=0x1;var _0x24d67c=[];var _0x3c6930=0x0;if($(_0x56fa('0x3b'))[_0x56fa('0x3c')]('checked')){var _0xc1d01c=0x0;var _0x199f8b=_0x56fa('0x81');$['each'](jsn,function(_0x4da5a9,_0x5e09f2){var _0x21550f=0x0;var _0x22a581=0x0;if(_0x5e09f2[_0x56fa('0x51')][_0x56fa('0x40')](':')[0x1]==0x0){_0x21550f=parseInt(_0x5e09f2['amS'][_0x56fa('0x40')](':')[0x0])-0x1;_0x22a581=0x32;}else{_0x21550f=parseInt(_0x5e09f2[_0x56fa('0x51')][_0x56fa('0x40')](':')[0x0]);_0x22a581=parseInt(_0x5e09f2[_0x56fa('0x51')][_0x56fa('0x40')](':')[0x1])-0xa;}_0x24d67c[_0xc1d01c++]={'id':_0xc1d01c,'title':_0x199f8b,'text':_0x56fa('0x82'),'trigger':{'count':0x5a0,'every':{'weekday':parseInt(_0x5e09f2['day']),'hour':_0x21550f,'minute':_0x22a581,'second':0x0}},'data':{'processor':!![],'sort':0x1}};_0x24d67c[_0xc1d01c++]={'id':_0xc1d01c,'title':_0x199f8b,'text':_0x56fa('0x83'),'trigger':{'count':0x5a0,'every':{'weekday':parseInt(_0x5e09f2[_0x56fa('0x59')]),'hour':parseInt(_0x5e09f2[_0x56fa('0x52')]['split'](':')[0x0]),'minute':parseInt(_0x5e09f2[_0x56fa('0x52')][_0x56fa('0x40')](':')[0x1]),'second':0x1}},'data':{'processor':!![],'sort':0x2}};var _0x307bcf=0x0;var _0x5091fb=0x0;if(_0x5e09f2[_0x56fa('0x53')][_0x56fa('0x40')](':')[0x1]==0x0){_0x307bcf=parseInt(_0x5e09f2[_0x56fa('0x53')][_0x56fa('0x40')](':')[0x0])-0x1;_0x5091fb=0x32;}else{_0x307bcf=parseInt(_0x5e09f2['pmS']['split'](':')[0x0]);_0x5091fb=parseInt(_0x5e09f2[_0x56fa('0x53')][_0x56fa('0x40')](':')[0x1])-0xa;}_0x24d67c[_0xc1d01c++]={'id':_0xc1d01c,'title':_0x199f8b,'text':_0x56fa('0x84'),'trigger':{'count':0x5a0,'every':{'weekday':parseInt(_0x5e09f2[_0x56fa('0x59')]),'hour':_0x307bcf,'minute':_0x5091fb,'second':0x0}},'data':{'processor':!![],'sort':0x3}};_0x24d67c[_0xc1d01c++]={'id':_0xc1d01c,'title':_0x199f8b,'text':_0x56fa('0x85'),'trigger':{'count':0x5a0,'every':{'weekday':parseInt(_0x5e09f2[_0x56fa('0x59')]),'hour':parseInt(_0x5e09f2[_0x56fa('0x86')][_0x56fa('0x40')](':')[0x0]),'minute':parseInt(_0x5e09f2[_0x56fa('0x86')][_0x56fa('0x40')](':')[0x1]),'second':0x0}},'data':{'processor':!![],'sort':0x4}};});cordova[_0x56fa('0x4b')][_0x56fa('0x64')][_0x56fa('0x4c')][_0x56fa('0x87')](_0x24d67c);cordova[_0x56fa('0x4b')][_0x56fa('0x64')][_0x56fa('0x4c')]['on'](_0x56fa('0x88'),function(_0x1990a0){if(_0x1990a0[_0x56fa('0x89')][_0x56fa('0x8a')]){$[_0x56fa('0x8b')]({'url':localStorage[_0x56fa('0x2e')](_0x56fa('0x8c'))+'service/serverdt','type':_0x56fa('0x8d'),'dataType':_0x56fa('0x8e'),'beforeSend':function(_0xdd4857){_0xdd4857[_0x56fa('0x8f')](_0x56fa('0x90'),localStorage[_0x56fa('0x2e')](_0x56fa('0x90')));},'success':function(_0x252813){var _0x28408c=_0x252813['date'][_0x56fa('0x40')]('/')[0x2];var _0x51a36a=_0x252813[_0x56fa('0x91')][_0x56fa('0x40')]('/')[0x0];var _0x17926c=_0x252813['date'][_0x56fa('0x40')]('/')[0x1];var _0x2a4903=_0x28408c+'-'+_0x51a36a+'-'+_0x17926c;var _0x475759=_0x17926c+'-'+months['d'+_0x51a36a]+'-'+_0x28408c;app[_0x56fa('0x92')](_0x252813[_0x56fa('0x91')],_0x1990a0[_0x56fa('0x89')][_0x56fa('0x93')]);},'error':function(_0x223487,_0x2d61b2,_0xf39e13){}});}});localStorage[_0x56fa('0x67')](_0x56fa('0x49')+localStorage['getItem']('empnumber'),_0x56fa('0x4a'));}else{cordova[_0x56fa('0x4b')][_0x56fa('0x64')][_0x56fa('0x4c')][_0x56fa('0x4d')](function(_0x29f0ed){console[_0x56fa('0x4e')](_0x56fa('0x94'));},this);localStorage[_0x56fa('0x67')](_0x56fa('0x49')+localStorage[_0x56fa('0x2e')](_0x56fa('0x3a')),_0x56fa('0x95'));}},'getDTRRecord':function(_0x3c5d2d,_0x3a44a0){var _0x35db0b=_0x3c5d2d[_0x56fa('0x40')]('/')[0x2];var _0x213b92=_0x3c5d2d[_0x56fa('0x40')]('/')[0x0];var _0x5b1a44=_0x3c5d2d[_0x56fa('0x40')]('/')[0x1];$(_0x56fa('0x96'))['html'](_0x5b1a44+'-'+months['d'+_0x213b92]+'-'+_0x35db0b);$[_0x56fa('0x8b')]({'url':localStorage[_0x56fa('0x2e')](_0x56fa('0x8c'))+_0x56fa('0x97'),'type':_0x56fa('0x8d'),'dataType':_0x56fa('0x8e'),'beforeSend':function(_0x1f3eda){_0x1f3eda[_0x56fa('0x8f')](_0x56fa('0x90'),localStorage[_0x56fa('0x2e')](_0x56fa('0x90')));_0x1f3eda['setRequestHeader'](_0x56fa('0x3a'),localStorage[_0x56fa('0x2e')](_0x56fa('0x3a')));_0x1f3eda[_0x56fa('0x8f')]('pdate',_0x3c5d2d);},'success':function(_0x12e895){var _0x39ac0d=0x0;var _0x28ed5c=![];var _0x1e8b13='';var _0x2e99d8=![];var _0x22af4b=![];var _0x21e9f0=![];var _0x2dc4a4=![];$['each'](_0x12e895,function(_0x33cfc4,_0x4cf226){if(_0x39ac0d==0x0){if(_0x33cfc4==0x0){_0x2e99d8=!![];_0x39ac0d++;}}else if(_0x39ac0d==0x1){if(_0x12e895[_0x33cfc4][_0x56fa('0x98')]==_0x56fa('0x99')){_0x22af4b=!![];_0x39ac0d++;}}else if(_0x39ac0d==0x2){if(_0x12e895[_0x33cfc4][_0x56fa('0x98')]=='IN'){_0x21e9f0=!![];_0x39ac0d++;}}else if(_0x39ac0d==0x3){if(_0x12e895[_0x33cfc4][_0x56fa('0x98')]==_0x56fa('0x99')){_0x2dc4a4=!![];_0x39ac0d++;}}});if(_0x3a44a0==0x1&&_0x2e99d8==![]){_0x28ed5c=!![];_0x1e8b13=_0x56fa('0x9a');}else if(_0x3a44a0==0x2&&_0x22af4b==![]){_0x28ed5c=!![];_0x1e8b13=_0x56fa('0x9b');}else if(_0x3a44a0==0x3&&_0x21e9f0==![]){_0x28ed5c=!![];_0x1e8b13='DTR\x20Alert:\x2010\x20Minutes\x20before\x20PM\x20time\x20in';}else if(_0x3a44a0==0x4&&_0x2dc4a4==![]){_0x28ed5c=!![];_0x1e8b13=_0x56fa('0x9c');}if(_0x28ed5c){cordova[_0x56fa('0x4b')]['notification'][_0x56fa('0x4c')][_0x56fa('0x87')]({'id':0x3e7,'title':_0x56fa('0x9d'),'text':_0x1e8b13,'foreground':!![],'data':{'processor':![]}});}},'error':function(_0x13a9e3,_0x4420a6,_0x3c4d6e){}});},'onLogout':function(){localStorage[_0x56fa('0x67')](_0x56fa('0x9e'),_0x56fa('0x95'));},'onAddDays':function(){}};
>>>>>>> f7b06d37a675843cbbc2208eec2030b36122c75d
