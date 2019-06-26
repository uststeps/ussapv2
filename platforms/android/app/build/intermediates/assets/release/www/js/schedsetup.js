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
