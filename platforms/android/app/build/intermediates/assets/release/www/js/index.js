//localStorage.setItem("ecode" , "aaa");
localStorage.setItem("ecode" 		, "u9n4mT^a|X!545P"	); // Same as Server code --HeaderParam xml ecode 
localStorage.setItem("isEmu" 		, "false"	);
localStorage.setItem("showAlert"	, "console"	);
localStorage.setItem("isBypass"		, "false"	);
localStorage.setItem("isRemember" 	, "false"	);
localStorage.setItem("curinfo"		, "0"		);
localStorage.setItem("version" 		, "3.0.3"  );

localStorage.setItem("server"	, "http://10.1.16.29:7101/restServiceUSSAP/resources/"		);
//localStorage.setItem("server"		, "http://172.24.0.120:9279/restServiceUSSAP/resources/"	);
//localStorage.setItem("server"		, "http://10.1.16.29:7101/restServiceUSSAP/resources/"		);
//localStorage.setItem("server"		, "https://supportstaff.ust.edu.ph/restServiceUSSAP/resources/");

/*-------------------------------------------------*/
/* SCHEDULE DATA */
var jsn;
var lastIndex;

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
/**/
var app = {
	
    initialize: function() {
        
        
        document.addEventListener("backbutton", function(e){
			navigator.notification.confirm(
				"Exit application?",        	 	// Alert Message
				function(buttonIndex) {				// Callback on message
					if (buttonIndex == 2) {			
						navigator.app.exitApp();
					};
				},                 					// callback
				"",           						// title
				['Cancel', 'Exit']                  // Buttons
			);	
		}, true);
        cordova.plugins.notification.local.cancelAll(function(notification) {
			global.sys("Notification Cancelled");
		}, this);
		
		//alert(localStorage.getItem("remember"));
		
		if (localStorage.getItem("remember") == "true"){
			$("#rememberme").prop("checked", true);
			app.onLogin();
		} else {
			
		}
    },
    
    bindEvents: function() {
           
		

    }, 

    onDeviceReady: function() {

		 
		/* CANCEL ALL PENDING NOTIF WHEN INDEX LOADS */
		
    }, 
    
    receivedEvent: function(id) {
		
    },
    
    onLogin: function(){
		$(".alert").hide();
		var empnum;
		var pass;
		$("#currentVersion").html(localStorage.getItem("version"));
                //alert(localStorage.getItem("remember"));
		if (localStorage.getItem("remember") == "true") {
			empnum = localStorage.getItem("empnumber");
			pass   = localStorage.getItem("mypass");
		} else {
                       // empnum = "4816";
			empnum = $("#empnumber").val();
			pass = $("#password").val();
			
		}
		
		if (app.validation()) {
			//return false;
            $.ajax(
             {
                url        : localStorage.getItem("server") + "service/login",
                dataType   : "json",
                type       : "POST",
                beforeSend : function(xhr){
                    xhr.setRequestHeader('empnumber' ,  empnum			);
                    xhr.setRequestHeader('password'  ,  pass			);
                    xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode") 	);
					
					$("#loadingDiv"		).show();
					$("#empnumber"		).attr("readonly"	, "true" );
					$("#password"		).attr("readonly"	, "true" );
					$("#loginButton"	).attr("disabled"	, "true" );
                },
                success    : function(msg) { 
					$("#loadingDiv").hide();
					$("#empnumber").removeAttr("readonly");
					$("#password").removeAttr("readonly");
					$("#loginButton").removeAttr("disabled");
				   //alert("VALDIATED: " + msg["validated"]);
                   if (msg["validated"] == "true") {
					  
					  
					   
                            localStorage.setItem("empnumber"       , empnum  );
                            //localStorage.setItem("empnumber"       , "4816"  );
					  localStorage.setItem("college_1"       , msg["college_1"]       );
					  localStorage.setItem("college_2"       , msg["college_2"]       );
					  localStorage.setItem("full_name"       , msg["full_name"]       );
					  localStorage.setItem("full_empnumber"  , msg["full_empnumber"]  );
					  localStorage.setItem("employment_date" , msg["employment_date"] );
					  localStorage.setItem("mypass" , pass);
					  
					  
					  //alert(localStorage.getItem("full_empnumber"));
				
					  localStorage.setItem("passwordValidator",pass);
					  
					  
					  	if ($("#rememberme").is(":checked")) {
							localStorage.setItem("remember", "true");
						} else {
							localStorage.setItem("remember", "false");
						};
						
                                                //alert(localStorage.getItem("remember"));
						jsn = JSON.parse(localStorage.getItem("schedule-" + localStorage.getItem("empnumber")));
							
						if (localStorage.getItem("notification-" + localStorage.getItem("empnumber")) == "true") {	
							cordova.plugins.notification.local.cancelAll(function(notification) {
								console.log("notifications cancelled : BEFORE RE SCHEDULED");
							}, this);
							app.toggleSwitch();
						} 
					  if (msg["initial"] == "true") {
						// GO TO INITIAL SETUP

						window.location = "initialsetup.html";
					  } else {
						// GO DIRECTLY TO PROFILE
						window.location = "profile.html";
					  };
					  
		
                   } else {
					    $("#loadingDiv"  ).hide();
						$("#empnumber"   ).removeAttr("readonly");
						$("#password"    ).removeAttr("readonly");
						$("#loginButton" ).removeAttr("disabled");
					
					    $(".alert").html("Invalid Login");
					    $(".alert").show();

				   }
                },
                error     : function(jqXHR	, textStatus, errorThrown) {
					global.sys("ERROR AT AJAX LOGIN : " + JSON.stringify(jqXHR));
					$("#loadingDiv" ).hide();
					$("#empnumber"  ).removeAttr("readonly");
					$("#password"   ).removeAttr("readonly");
					$("#loginButton").removeAttr("disabled");
					
					$(".alert").html("There was an error connecting to the server.");
					$(".alert").show();
			   }
            });
        } else {
            $(".alert").html("Employee number and password is required.");
			$(".alert").show();		
		}
		return false;
    },
    
    validation: function() {
		
		if (localStorage.getItem("remember")=="true"){
			return true;
		} else {
			if ( $("#empnumber").val().length == 0 ) {
				return false;
			}
			
			if ($("#password").val().length == 0 ) {
				return false;
			}
			return true;
		}
		
      
    },
	
	isNumber: function(evt) {
        var iKeyCode = (evt.which) ? evt.which : evt.keyCode
        if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57)) return false;
        return true;
    }  ,
	onLogout: function(){
		window.location.replace("index.html");
	}  ,	
	toggleSwitch: function(){
		var check = 1;
		var data = [];
		var dtrFlag = 0;
	
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
						global.sys("AJAX ERROR AT serverdt : " + JSON.stringify(jqXHR));
					   //alert(JSON.stringify(jqXHR));
					   //alert(JSON.stringify(textStatus));
					   //alert(JSON.stringify(errorThrown));
					}
				});
				}
			});
			/**/
			
			
			localStorage.setItem("notification-"+ localStorage.getItem("empnumber"), "true" );
			
		
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
			/* */
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
    }
};
