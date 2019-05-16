<<<<<<< HEAD
var slideout;
var empnumber;
var paged_leave = {};
var overAll = 0;
var dayCounter = 0;
var empBirthdate = "";
var serverDate = "";
var birthdateLeaveCount = 0;
var holidays;
var holidaysTotal = 0;
var longpress = false;
var menuOpen = false;
    var isScrolling = false;
var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var month = {
	"Jan" : "01",
	"Feb" : "02",
	"Mar" : "03",
	"Apr" : "04",
	"May" : "05",
	"Jun" : "06",
	"Jul" : "07",
	"Aug" : "08",
	"Sep" : "09",
	"Oct" : "10",
	"Nov" : "11",
	"Dec" : "12"
};

var month_caps = {
	"JAN" : "01",
	"FEB" : "02",
	"MAR" : "03",
	"APR" : "04",
	"MAY" : "05",
	"JUN" : "06",
	"JUL" : "07",
	"AUG" : "08",
	"SEP" : "09",
	"OCT" : "10",
	"NOV" : "11",
	"DEC" : "12"
};

var app = {
	
    initialize: function() {
        /*
             Slide out config
        */
		empnumber = localStorage.getItem("empnumber");
		//empnumber = "4800";
        slideout = new Slideout({
            'panel'    : document.getElementById('panel'   ),
            'menu'     : document.getElementById('sidenav' ),
            'padding'  : 256, /* TODO: Change to screen width/2 on production  for menu slide */
            'tolerance': 70
        });
		slideout.on('beforeopen', function() {
				$("#botNav").fadeOut();
		});

		slideout.on('beforeclose', function() {
				$("#botNav").fadeIn();

		});
		
        window.addEventListener('scroll', function ( event ) {
                isScrolling = true;
                // Clear our timeout throughout the scroll
                window.clearTimeout( isScrolling );
                console.log( 'is Scrolling' );
                // Set a timeout to run after scrolling ends
                isScrolling = setTimeout(function() {

                        // Run the callback
                        isScrolling = false;
                        console.log( 'Scrolling has stopped.' );

                }, 500);

        }, false);        

                
        $("#sidenav").load("inc.sidenav.html");
		$("#botnav-profile").addClass("text-warning");
		
   
  
    },
    
    bindEvents: function() {
        app.onDeviceReady();	   
    },
	onDeviceReady: function() {},
	
	onTouchEnd: function(lId){
		longpress= false;
		
	},
	
	doOptionOpen: function(lId){
		if (menuOpen){
                               if (!isScrolling){
			menuOpen = false;
			
			$('#optionModal').modal('show');
			
			if ($("#canEdit" + lId).val() == "false"){
				$("#editButton").hide();
				$("#delButton").hide();
				$("#canEditWarning").show();
				
			} else {
				$("#editButton").show();
				$("#delButton").show();
				$("#canEditWarning").hide();
			}
                               }
			
		} else {
                    if (!isScrolling){
			window.location = "trans-schedule-details.html";
                  }
		}
	},
	
	onTouchStart: function(lId) {
		localStorage.setItem("changescheduleId" , lId);
		longpress=true;    
		setTimeout(function() {    
				if(longpress){
					menuOpen = true;
					app.doOptionOpen(lId);
				} else {
					menuOpen = false;
					app.doOptionOpen(lId);
				
				}

     
		}, 500);
	},
	
	
	getChangeSchedYears: function(year) {
		$.ajax({
			url   : localStorage.getItem("server") + "schedtransact/changeschedyears", 
					type       : "POST",
					dataType   : "json",            
					beforeSend : function(xhr){
						xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber" ));
						xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode") 	);
					},
					success: function(msg) { 
						//alert(JSON.stringify(msg));
						var toPassYear = year;
						
						if (year == "current") {toPassYear = parseInt(msg["0"]);} 
						
						$.ajax({
							url        : localStorage.getItem("server") + "schedtransact/getchangeschedlist", 
							type       : "POST",
							dataType   : "json",            
							beforeSend : function(xhr){
								xhr.setRequestHeader('empnumber' , empnumber);
								xhr.setRequestHeader('ecode'     , localStorage.getItem("ecode") 	);
								xhr.setRequestHeader('appyear' , toPassYear);
							},
							success: function(msg) { 
						
								var i = 0;
								var totalList = 0;
								$("#applicationHolder").html("");
								$.each(msg["appList"], function(index, element) {

	
									totalList++;
									i++;
									
								});
								
							
								if (totalList == 0){
									$("#applicationHolder").append(
										'<div class="alert alert-warning">No Record Found</div>'
									);
								}
								
								for (x=totalList-1; x>=0 ; x--) {
									
									var appl = msg["appList"][x.toString()];
									
									//alert(JSON.stringify(appl));
									var statHR = msg["appStatus"][appl["id"] + "-" + "hr"];
									var statDH = msg["appStatus"][appl["id"] + "-" + "dh"];
									var recIns1 = "";
									if ( statHR !=null){
										recIns1 =statHR["dsp_approval_date"];
									}
									var recIns2 = "";
									if (statDH!=null){
										recIns2 =statDH["dsp_approval_date"];
									}
									
									var rowIndex = 0;
									var canEdit = "true";
									if (recIns1 == ""){
										canEdit = "true";
									} else {
										canEdit = "false";
									}
									
									$("#applicationHolder").append(
											
										'<div id="row' + appl["id"] + '" ontouchstart="app.onTouchStart(\'' + appl["id"] + '\')"  ontouchend="app.onTouchEnd()" class="list-group-item list-group-item-action">'
											+ '<div class="row">'
											+ '	<div class="col-4 font-weight-bold border-right" >'
											+		'<div class="row">'
											+			'<div class="col-12 font-weight-bold text-dark" align="center">'
											+				'<h5>' + appl["rec_ins_dt"] + '</h5>'
											+ 			'</div>'
											+ 			'<div class="col-12 font-weight-bold text-secondary" align="center">'
											+ 				'Application Date'
											+ 			'</div>'
											+ 		'</div>'
											+ '</div>'
											+ '<div class="col-8">'
											+ '<div class="row">'
											+ '<div class="col-6 font-weight-bold"> Department Head</div>'
											+			'<div class="col-6 " >' +  recIns1  + '</div>'
											+ '</div>'
											+ '<div class="row">'
											+       '<div class="col-6 font-weight-bold" > HR Department</div>'
											+ '<div class="col-6" >' +  recIns2 + '</div>'
											+ '<input type="hidden" id="canEdit' + appl["id"] + '" value="' + canEdit + '">' 
											+ '</div>'
											+ '</div>'
									
											+ '</div>'
									+ '</div>'
										
										
									);
									rowIndex++;
							
								}
									
								$("#loadingGif").hide();
								},
								error: function(jqXHR	, textStatus, errorThrown) {
									alert(JSON.stringify(jqXHR));
								}
							}); 
						
	
						$("#yearSelect").html("");
						$.each(msg, function(index, element) {
							$("#yearSelect").append(
								'<option value="' + msg[index] + '">' + element + '</option>'
							);
						});
					
						if (year != "current") {$("#yearSelect").val(year);}
					},
				    error: function(jqXHR	, textStatus, errorThrown) {
						//alert(JSON.stringify(jqXHR));
					}
	
			
		});
		
		$("#alert-leave").hide();
		if (localStorage.getItem("alert-leave") == "success") {
			$("#alert-leave").show();
			$("#alert-leave").attr("class", "alert alert-success");
			$("#alert-leave").html(localStorage.getItem("alert-leave-msg"));
		} else if (localStorage.getItem("alert-leave") == "danger") {
			$("#alert-leave").show();
			$("#alert-leave").attr("class", "alert alert-danger");
			$("#alert-leave").html(localStorage.getItem("alert-leave-msg"));
			
		} else {
			
		};
		localStorage.setItem("alert-leave", null);
	},
	
	getChangeSched_List: function() {
		var totalHeight = parseInt($("#botNav").height()) + (parseInt($("#botNav").css("padding-top")) * 8)
		$("#addButton").css("bottom", totalHeight );
		app.getChangeSchedYears("current");
		
	},
	
	setDaySelects: function() {
			$(".daySelect").html(
		
			'<option value=""></option>'
            + '<option value="02FFBD1C5AA4FAC2DCC599BB4CF4A761">AM : 06:00 - 12:00 / PM : 01:00 - 03:00&nbsp;</option>'
            + '<option value="0B303EC6F5DAE1EE55930B87EFEFC231">AM : 06:00 - 11:00 / PM : 12:00 - 03:00&nbsp;</option>'
            + '<option value="944635FE8A7900B1C0CF4E8BEDCF29E2">AM : 06:30 - 12:00 / PM : 01:00 - 03:30&nbsp;</option>'
            + '<option value="0086D976D947B3767C170F001CDB0B24">AM : 07:00 - 11:00 / PM : 12:00 - 04:00&nbsp;</option>'
            + '<option value="5733F58CED1BD34283CD43472EFF435A">AM : 07:00 - 12:00 / PM : 01:00 - 04:00&nbsp;</option>'
            + '<option value="2574BD912D2DBFDFD3C3AA0B9580A070">AM : 07:00 - 01:00 / PM : 02:00 - 04:00&nbsp;</option>'
            + '<option value="EA8EAD0FEC87FDC68EB148374EE180AC">AM : 07:00 - 04:00 / PM :&nbsp;(Selected employees only)</option>'
            + '<option value="E24AA82056D5853754FD5930038B6096">AM : 07:30 - 12:00 / PM : 01:00 - 04:30&nbsp;</option>'
            + '<option value="CEDE2A39954AA70190067AAB16E18FDA">AM : 08:00 - 05:00 / PM :&nbsp;(Selected employees only)</option>'
            + '<option value="0C85895A10E1F25877730C24D66A4E20">AM : 08:00 - 12:00 / PM : 01:00 - 05:00&nbsp;</option>'
            + '<option value="0B4B55807CC950A83CF0E18CB77E53E1">AM : 08:00 - 01:00 / PM : 02:00 - 05:00&nbsp;</option>'
            + '<option value="956724F37BD7FF187722726BC0721823">AM : 08:00 - 11:00 / PM : 12:00 - 05:00&nbsp;</option>'
            + '<option value="6E9637BE4BD203672A1E1641BC5DE583">AM : 08:00 - 12:00 / PM : 01:30 - 05:30&nbsp;</option>'
            + '<option value="73005881E9CAAADFCC3CF4AB3AE1BE6B">AM : 09:00 - 12:00 / PM : 01:00 - 06:00&nbsp;</option>'
            + '<option value="944C059C01F9BC337AC6A25F2F6A10A3">AM : 09:00 - 01:00 / PM : 02:00 - 06:00&nbsp;</option>'
            + '<option value="5DFD62692782F024CB7CB9D2606C8AEF">AM : 09:30 - 12:00 / PM : 01:00 - 06:30&nbsp;</option>'
            + '<option value="183C28BB604361390AD6916FA8D2F6E5">AM : 10:00 - 01:00 / PM : 02:00 - 07:00&nbsp;</option>'
            + '<option value="7DA26F800D7D11B8CA7B0182A9D1B0B4">AM : 10:00 - 02:00 / PM : 03:00 - 07:00&nbsp;</option>'
            + '<option value="F86DD43EA6203A77172BC1DA18C1D806">AM : 10:00 - 03:00 / PM : 04:00 - 07:00&nbsp;</option>'
            + '<option value="BFA7B549CE804817A06BE1BD77CCCAA1">AM : 10:00 - 12:00 / PM : 01:00 - 07:00&nbsp;</option>'
            + '<option value="E2C27A0303FACFCBF86C7D874B9D7685">AM : 11:00 - 02:00 / PM : 03:00 - 08:00&nbsp;</option>'
            + '<option value="B06A9ECD3212C9787A90B2CB9595FB1C">AM : 11:00 - 03:00 / PM : 04:00 - 08:00&nbsp;</option>'
            + '<option value="935EB415C9CBCC3D7B6A279304A56602">AM : 11:00 - 04:00 / PM : 05:00 - 08:00&nbsp;</option>'
            + '<option value="B0C3566A4F86D82A6A09EA5AAEB8E8F1">AM : 11:00 - 07:00 / PM : &nbsp;(Selected employees only)</option>'
            + '<option value="5C59202AAB6112CF686C5E1B4916E75C">AM : 12:00 - 03:00 / PM : 04:00 - 09:00&nbsp;</option>'
            + '<option value="7C6DEB173440D1EBCECE860339F5CE31">AM : 12:00 - 04:00 / PM : 05:00 - 09:00&nbsp;</option>'
            + '<option value="6DFFB9247A59D95A6BED4AD40823F91E">AM : 12:30 - 04:30 / PM : 05:30 - 09:30&nbsp;</option>'
            + '<option value="49C2921287E943D064F14CD064570D3B">AM : / PM : 12:00 - 08:00&nbsp;(Selected employees only) </option>'
            + '<option value="6C7F53783DBA099A1DFD661EAB51D43A">AM : Day Off / PM : --&nbsp;</option>'
            + '<option value="7A85615D828732151C0E2F001C36468A">AM : 12:00-05:00 / PM : 06:00-09:00 &nbsp;</option>'
		);
	},
	
	
	checkDaysToDisable: function (day){
		var dayDiff = app.getDateDifference($("#date_from").val(), $("#date_to").val());
		var enabledDays = {};
		if (dayDiff <= 7) {
			
			var counter = day;
			enabledDays[daysOfWeek[counter]] = "true";	
			for (x=0;x<dayDiff;x++){
				if (counter == 7 ) {
					counter=0;
				}
				enabledDays[daysOfWeek[counter]] = "true";		
				counter++;

			}
			enabledDays[daysOfWeek[counter]] = "true";	
		}
		
		$( ".daySelect" ).each(function( index ,obj) {
			$(obj).val("");
			if ($("#typeSelector").val() == "9FAA65992CFD1AA5557FFE22F191F793") {
				// FOR ONLY
				$("#date_to").hide();
				if ($(obj).attr("id") != daysOfWeek[day]){
					$(obj).prop("disabled","true");
					$(obj).hide();
				} else {
					$(obj).show();
					$(obj).removeAttr("disabled");
				}
			} else if ($("#typeSelector").val() == "02FFBD1C5AA4FAC2DCC599BB4CF4A761" ) {
				// ONWARDS 
				$("#date_to").hide();
				$(obj).removeAttr("disabled");
				$(obj).show();
			} else if ($("#typeSelector").val() == "626F3AA8014AB6FD3D0F87E311D49C9A"){
				// to 
				$("#date_to").show();
				if (dayDiff >= 7){
					$(obj).removeAttr("disabled");
					$(obj).show();
				} else {
					if (enabledDays[$(obj).attr("id") ] == null){
						$(obj).prop("disabled","true");
						$(obj).hide();
					} else {
						$(obj).removeAttr("disabled");
						$(obj).show();
					}
				};
				
			}
		});
	},

	
	getDateDifference : function (dateFrom, dateTo) {
		
		var date1 = new Date(dateFrom);
		var date2 = new Date(dateTo);
		
		
		
		var timeDiff = Math.abs(date2.getTime() - date1.getTime());
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
		
		
		if (date1 > date2) {
			return -1;
		} else if (date1 < date2) {
			return diffDays;
		}
		
		

	},
        changeFrom:function(fromType) {
            
            $(".only-button").attr('class','btn btn-secondary w-100 only-button from-button');
             $(".onward-button").attr('class','btn btn-secondary w-100 onward-button from-button');
              $(".to-button").attr('class','btn btn-secondary w-100 to-button from-button');
              
              $("."+fromType+"-button").attr('class','btn btn-warning w-100 '+ fromType+'-button from-button');
            if (fromType == "only") {
                $("#typeSelector").val("9FAA65992CFD1AA5557FFE22F191F793");
            } else if (fromType == "onward") {
                 $("#typeSelector").val("02FFBD1C5AA4FAC2DCC599BB4CF4A761");
            } else if (fromType == "to") {
                 $("#typeSelector").val("626F3AA8014AB6FD3D0F87E311D49C9A");
            }
            
            app.onFromSelect();
            
        }
        ,
	
	onFromSelect: function() {
		
	
		
		var curDate = new Date($("#date_from").val());
		app.checkDaysToDisable(curDate.getDay());
		
	},

	
	initializeChangeSchedule: function() {
		app.setDaySelects();
		$("#applicationIdHolder").val(localStorage.getItem("changescheduleId"));
		
		$('#date_from').datepicker( {
				changeMonth : true, changeYear : true, minDate : 1, yearRange : "2016:c+1", firstDay : 7, dateFormat : 'dd-M-yy'
		});
		$('#date_to').datepicker( {
				changeMonth : true, changeYear : true, minDate : 1, yearRange : "2016:c+1", firstDay : 7, dateFormat : 'dd-M-yy'
		});
		$.ajax({
				url   : localStorage.getItem("server") + "schedtransact/initializeApplication", 
					type       : "POST",
					dataType   : "json",            
					beforeSend : function(xhr){
						xhr.setRequestHeader('empnumber' , empnumber);
						xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode") 	);
					},
					success: function(msg) { 
						app.populateEmpSchedule(msg["empSched"]); 
						
						if ($("#applicationIdHolder").val() == null){
						
						} else if ($("#applicationIdHolder").val() == "null" ){
							
						} else if ($("#applicationIdHolder").val().length <= 0 ){
							
						}else {
							app.initializeEdit($("#applicationIdHolder").val());
						}
						
					},
				    error: function(jqXHR	, textStatus, errorThrown) {
						
					}
		});
		
		
		
		
		
	},
	
	reformatDate:function(rDate){
		var splitted = rDate.split("-");
		
		var ref_year = splitted[2];
		var ref_month = month_caps[splitted[1]];
		var ref_day = splitted[0];
		
		var reformatted = ref_year + "-" + ref_month + "-" + ref_day;
		
		return reformatted;
	},
	
	
	initializeEdit: function(appId) {
		$.ajax({
				url   : localStorage.getItem("server") + "schedtransact/getapplicationdetails", 
					type       : "POST",
					dataType   : "json",            
					beforeSend : function(xhr){
						xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber" ));
						//xhr.setRequestHeader('empnumber' ,  "4800");
						xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode") 	);
						xhr.setRequestHeader('appId'	 , appId);
					},
					success: function(msg) { 
						var effectivity = msg["appData"]["effectivity"];
						
						
						
						var reason = msg["appData"]["reason_cws"];
						$("#changeReason").val(reason);
						var dateFrom="";
						var dateTo = "";
						if (msg["appData"]["date_from"] != null) {
							dateFrom = msg["appData"]["date_from"];
							$('#date_from').datepicker("setDate", new Date(app.reformatDate(dateFrom)) );
						}
						if (msg["appData"]["date_to"] != null) {
							dateTo = msg["appData"]["date_to"];
							$('#date_to').datepicker("setDate", new Date(app.reformatDate(dateTo)) );
						}
                                                
                                                
                                                   
         
          
     
						
						if (effectivity == 1) {// 1 ONLY
                                                           $(".only-button").attr('class','btn btn-warning w-100 only-button from-button');
							$("#typeSelector").val("9FAA65992CFD1AA5557FFE22F191F793");
						} else if (effectivity ==2) {// 2 ONWARDS
                                                       $(".onward-button").attr('class','btn btn-warning w-100 onward-button from-button');
							$("#typeSelector").val("02FFBD1C5AA4FAC2DCC599BB4CF4A761");
						} else if (effectivity == 3){// 3 TO
                                                      $(".to-button").attr('class','btn btn-warning w-100 to-button from-button');
							$("#typeSelector").val("626F3AA8014AB6FD3D0F87E311D49C9A");
						} 
						
						app.onFromSelect();
						
						$.each(msg["appDays"], function(index, element) {
							$("#" + element["dsp_day_name"]).val(element["hr_ws_id"]);
							$("#" + element["dsp_day_name"]+"-cadId").val(element["cad_id"]);
			
						});
						
						localStorage.setItem("changescheduleId", null);
						
					},
				    error: function(jqXHR	, textStatus, errorThrown) {
						
					}
		});
		
	},
	
	
	editApplication:function(){
		window.location = "trans-schedule-apply.html";
	},
	
	deleteApplication:function(){
		
		$.ajax({
				url   : localStorage.getItem("server") + "schedtransact/deleteapplication", 
					type       : "POST",
					dataType   : "json",            
					beforeSend : function(xhr){
						xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber" ));
						xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode") 	);
						xhr.setRequestHeader('applicationId'	 , localStorage.getItem("changescheduleId"));
					},
					success: function(msg) { 
						if (msg["error"] >0){
							localStorage.setItem("alert-leave","danger");
							localStorage.setItem("alert-leave-msg","Application was not deleted");
						} else {
							localStorage.setItem("alert-leave","success");
							localStorage.setItem("alert-leave-msg","Application was deleted");
						}
						window.location = "trans-schedule.html";
						
					},
				    error: function(jqXHR	, textStatus, errorThrown) {
						localStorage.setItem("alert-leave","danger");
						localStorage.setItem("alert-leave-msg","Application was not deleted");
						window.location = "trans-schedule.html";
					}
		});
	},
	
	populateEmpSchedule: function(empScheduleJson) {
		var days = [];
		var am	 =[];
		var pm   =[];
		var total = 0;
			
		$.each(empScheduleJson, function(index, element) {
			
			if (index == "Monday"){
				days[0] = index;
				am[0] = element["sched"].split(";\t")[0];
				pm[0] = element["sched"].split(";\t")[1];
			} else if (index == "Tuesday"){
				days[1] = index;
				am[1] = element["sched"].split(";\t")[0];
				pm[1] = element["sched"].split(";\t")[1];
			} else if (index == "Wednesday"){
				days[2] = index;
				am[2] = element["sched"].split(";\t")[0];
				pm[2] = element["sched"].split(";\t")[1];
			} else if (index == "Thursday"){
				days[3] = index;
				am[3] = element["sched"].split(";\t")[0];
				pm[3] = element["sched"].split(";\t")[1];
			} else if (index == "Friday"){
				days[4] = index;
				am[4] = element["sched"].split(";\t")[0];
				pm[4] = element["sched"].split(";\t")[1];
			} else if (index == "Saturday"){
				days[5] = index;
				am[5] = element["sched"].split(";\t")[0];
				pm[5] = element["sched"].split(";\t")[1];
			} else if (index == "Sunday"){
				days[6] = index;
				am[6] = element["sched"].split(";\t")[0];
				pm[6] = element["sched"].split(";\t")[1];
			}
			
			total++;
			
					
		});
	
		for (i=0; i<total;i++){
			$("#emp_schedule").append(
					
							'<div class="row bg-default">' 
							   
							+   '<div class="col col-4 border-right " align="center" >' 
							+	   	'<div class="row">'
							+				'<div class="col-12 text-dark font-weight-bold" align="right">' + days[i] +  '</div>'
							+		'</div>'
							+   '</div>'
							
							+ 	'<div class="col col-8" align="center">'
							+		'<div class="col-12 text-dark">'
							+				am[i] + " - " + pm[i]
							+		'</div>'
							+ 	'</div>'

							+ '</div>'
							);
		}
	},
	
	
	getChangeSchedDetails: function() {
			$.ajax({
				url   : localStorage.getItem("server") + "schedtransact/getapplicationdetails", 
					type       : "POST",
					dataType   : "json",            
					beforeSend : function(xhr){
						xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber" ));
						//xhr.setRequestHeader('empnumber' ,  "4800");
						xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode") 	);
						xhr.setRequestHeader('appId'	 , localStorage.getItem("changescheduleId"));
					},
					success: function(msg) { 
						var appData 	= msg["appData"];
						var appStatus 	= msg["appStatus"];
						var appDays 	= msg["appDays"];
						var empSchedule = msg["empSchedule"];

						$("#filingDate").html(appData["rec_ins_dt"]);
							
						if (appData["effectivity"] == 1) {
							$("#effectivity").html( appData["date_from"] + "&nbsp; " + "ONLY");
						} else if (appData["effectivity"] == 2) {
							$("#effectivity").html( appData["date_from"] + "&nbsp; " + "ONWARDS");
						} else if (appData["effectivity"] == 3) {
							$("#effectivity").html( appData["date_from"] + "&nbsp; TO " + appData["date_to"]);
						}
						
						if (appData["reason_cws"] !=null){
							$("#schedReason").html(appData["reason_cws"]);
						}
							
						$.each(appStatus, function(index, element) {
							
							if (element["remarks"] != null){
								$("#remark_" + element["approving_body"]).html(element["remarks"]);
							} else {
								$("#remark_" + element["approving_body"]).html("");
							}
							$("#remark_" + element["approving_body"] + "_date").html(
								element["approver_name"] + " - " + element["rec_ins_dt"]
							);
							
						});
							
						app.populateEmpSchedule(empSchedule);
						
						$.each(appDays, function(index, element) {
							
							if (element["morning_sched"] != null && element["afternoon_sched"] !=null){
								$("#proposed_schedule").append(
							
									'<div class="row bg-default">' 
									   
									+   '<div class="col col-4 border-right " align="center" >' 
									+	   	'<div class="row">'
									+				'<div class="col-12 text-dark" >' + element["dsp_day_name"] +  '</div>'
									+		'</div>'
									+   '</div>'
									
									+ 	'<div class="col col-8" align="center">'
									+		'<div class="col-12 text-dark">'
									+				element["morning_sched"] + " - " + element["afternoon_sched"]
									+		'</div>'
									+ 	'</div>'
									
									/*
									+ 	'<div class="col col-4" align="center">'
									+			'<div class="col-12">'
									+				element["sched"].split(";\t")[1]
									+			'</div>'
									+ 	'</div>'
									*/
									+ '</div>'
									);
							}
							
							
					
						});
						localStorage.setItem("changescheduleId",null);
					},
				    error: function(jqXHR	, textStatus, errorThrown) {
						
					}
			});
	},
	
	validation: function() {
		
		var errors = [];
		var numError = 0;
		var dateDifference = app.getDateDifference($("#date_from").val(), $("#date_to").val());
		if ($("#date_from").val().length <= 0) {
			$("#date_from").attr("class","form-control border border-danger");
			numError++;
			errors[numError] = "Date From required.";
			
		} else {
			$("#date_from").attr("class","form-control");
		}
		
		var dayOffs = 0;
		
		if ($("#typeSelector").val() == "9FAA65992CFD1AA5557FFE22F191F793") {
				// FOR ONLY
			$("#typeSelector").attr("class", "form-control");
		} else if ($("#typeSelector").val() == "02FFBD1C5AA4FAC2DCC599BB4CF4A761" ) {
				// ONWARDS 
			$( ".daySelect" ).each(function( index ,obj) {
			
			});
			$("#typeSelector").attr("class", "form-control");
		} else if ($("#typeSelector").val() == "626F3AA8014AB6FD3D0F87E311D49C9A") {
			$("#typeSelector").attr("class", "form-control");
			if ($("#date_to").val().length <= 0) {
				$("#date_to").attr("class","form-control border border-danger");
				numError++;
				errors[numError] = "Date To required.";
				
			} else {
				$("#date_to").attr("class","form-control");
			}
		} else {
			$("#typeSelector").attr("class", "form-control border border-danger");
			numError++;
			errors[numError] = "Change schedule type required.";
		}
		
		var findEmpty = 0;
		var dayOffCount = 0;
		var selectedValuesArray = new Array();
		
		$( ".daySelect" ).each(function( index ,obj) {
			if(!$(obj).prop("disabled")){
				if ($(obj).val().length <=0) {
					findEmpty++;
					$(obj).attr("class","form-control daySelect border border-danger");
					
					
				} else {
					$(obj).attr("class","form-control daySelect");
				}
				
				if ($(obj).val() == "6C7F53783DBA099A1DFD661EAB51D43A"){
					dayOffCount++;
				}
				
				if ($(obj).val().trim() != '' && $.inArray($(obj).val().trim(), selectedValuesArray) == -1){
					selectedValuesArray.push($(this).val().trim());
				}
			};
		});
		
		if (findEmpty > 0){
			numError++;
			errors[numError] = "Some schedules are empty.";
		}
		

		if ($("#changeReason").val().length <=0){
			$("#changeReason").attr("class", "form-control border border-danger");
			numError++;
			errors[numError] = "Reason required.";
		} else {
			$("#changeReason").attr("class", "form-control");
		}
		
		if (dateDifference >= 7 && dayOffCount != 2){
			numError++;
			errors[numError] = "Staff must have 2 days of Day off.";
		} else if (dateDifference < 7 && dayOffCount > 0){
			numError++;
			errors[numError] = "Day off not allowed for Application with less than 7 days.";
		} else if (dateDifference >= 7 && selectedValuesArray.length > 3) {
			numError++;
			errors[numError] = "Work Schedule Selection Not Allowed.";
			
		} else if (dateDifference < 7 && selectedValuesArray.length > 2){
			numError++;
			errors[numError] = "Work Schedule Selection Not Allowed.";
		}
		
		
		if (numError >0){
			$("#errorList").html("");
			for (k=0; k<numError; k++){
				
				$("#errorList").append(
					'<li>' +errors[k+1] + '</li>'
				);
				$("#errorMessage").show();
			}
			return false;
		} else {
			$("#errorMessage").hide();
			$(".daySelect").attr("class","form-control daySelect");
			return true;
		}
	},
	
	submitApplication: function() {
			
			
		if (app.validation()){
			var dateFrom = $("#date_from").val();
			var dateTo = $("#date_to").val();
			
			var dayIndex = 0;
			var days = {};
			var cadId = {};
			
			var applicationData = {};
			$( ".daySelect" ).each(function( index ,obj) {
				if(!$(obj).prop("disabled")){
					days[$(obj).attr("id")] = $(obj).val();
					cadId[$(obj).attr("id")] = $("#"+$(obj).attr("id")+"-cadId").val();
				};
			});
			
		
			var isEdit = false;
			if ($("#applicationIdHolder").val() == null){
			} else if ($("#applicationIdHolder").val() == "null" ){
			} else {
				isEdit = true;
				applicationData["applicationId"] = $("#applicationIdHolder").val();
			}
			applicationData["dateFrom"] = dateFrom;
			applicationData["dateTo"] = dateTo;
			applicationData["days"]  = days;
			applicationData["applicationType"] = $("#typeSelector").val();
			applicationData["applicationReason"] = $("#changeReason").val();
			applicationData["empnumber"] = empnumber;
			applicationData["cadId"] = cadId;
			
			$.ajax({
				url   : localStorage.getItem("server") + "schedtransact/submitapplication", 
					type       : "POST",
					dataType   : "json",            
					beforeSend : function(xhr){
						xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber" ));
						//xhr.setRequestHeader('empnumber' ,  "4800");
						xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode") 	);
						xhr.setRequestHeader('applicationData'	 ,JSON.stringify(applicationData));
					},
					success: function(msg) { 
						//alert(JSON.stringify(msg));
						if (isEdit){
							localStorage.setItem("alert-leave-msg","Application successfully updated");
						} else {
							localStorage.setItem("alert-leave-msg","Application successfully added");
						}
						localStorage.setItem("alert-leave","success");
						window.location = "trans-schedule.html";
					},
				    error: function(jqXHR	, textStatus, errorThrown) {
						alert(JSON.stringify(jqXHR));
						if (isEdit){
							localStorage.setItem("alert-leave-msg","There was an error updating application");
						} else {
							localStorage.setItem("alert-leave-msg","There was an error adding application");
						}
						localStorage.setItem("alert-leave","danger");
						window.location = "trans-schedule.html";
					}
			});
			
		} 
	}

};
=======
var _0x4278=['btn\x20btn-warning\x20w-100\x20','-button\x20from-button','onFromSelect','checkDaysToDisable','getDay','setDaySelects','#applicationIdHolder','#date_from','datepicker','2016:c+1','dd-M-yy','schedtransact/initializeApplication','populateEmpSchedule','empSched','null','initializeEdit','split','appId','appData','effectivity','reason_cws','#changeReason','date_from','setDate','date_to','reformatDate','btn\x20btn-warning\x20w-100\x20only-button\x20from-button','btn\x20btn-warning\x20w-100\x20onward-button\x20from-button','btn\x20btn-warning\x20w-100\x20to-button\x20from-button','appDays','dsp_day_name','-cadId','cad_id','trans-schedule-apply.html','schedtransact/deleteapplication','applicationId','error','Application\x20was\x20not\x20deleted','Application\x20was\x20deleted','trans-schedule.html','sched','#emp_schedule','<div\x20class=\x22row\x20bg-default\x22>','<div\x20class=\x22col\x20col-4\x20border-right\x20\x22\x20align=\x22center\x22\x20>','<div\x20class=\x22col\x20col-8\x22\x20align=\x22center\x22>','<div\x20class=\x22col-12\x20text-dark\x22>','\x20-\x20','schedtransact/getapplicationdetails','empSchedule','#filingDate','#effectivity','&nbsp;\x20','ONLY','ONWARDS','&nbsp;\x20TO\x20','remarks','#remark_','approving_body','_date','approver_name','morning_sched','afternoon_sched','#proposed_schedule','<div\x20class=\x22col-12\x20text-dark\x22\x20>','getDateDifference','length','Date\x20From\x20required.','form-control','Date\x20To\x20required.','Change\x20schedule\x20type\x20required.','form-control\x20daySelect\x20border\x20border-danger','form-control\x20daySelect','6C7F53783DBA099A1DFD661EAB51D43A','inArray','trim','push','Some\x20schedules\x20are\x20empty.','Reason\x20required.','Day\x20off\x20not\x20allowed\x20for\x20Application\x20with\x20less\x20than\x207\x20days.','Work\x20Schedule\x20Selection\x20Not\x20Allowed.','#errorList','<li>','#errorMessage','validation','dateTo','days','applicationType','applicationReason','cadId','applicationData','Application\x20successfully\x20updated','Application\x20successfully\x20added','There\x20was\x20an\x20error\x20updating\x20application','There\x20was\x20an\x20error\x20adding\x20application','Sunday','Monday','Tuesday','Thursday','Friday','Saturday','getItem','empnumber','getElementById','panel','sidenav','#botNav','fadeIn','addEventListener','scroll','log','is\x20Scrolling','Scrolling\x20has\x20stopped.','#sidenav','load','inc.sidenav.html','#botnav-profile','addClass','onDeviceReady','#optionModal','modal','show','#canEdit','val','false','#editButton','hide','#delButton','#canEditWarning','location','setItem','changescheduleId','doOptionOpen','server','schedtransact/changeschedyears','POST','json','setRequestHeader','ecode','current','ajax','schedtransact/getchangeschedlist','appyear','html','each','appList','#applicationHolder','append','<div\x20class=\x22alert\x20alert-warning\x22>No\x20Record\x20Found</div>','toString','appStatus','dsp_approval_date','true','<div\x20id=\x22row','\x22\x20ontouchstart=\x22app.onTouchStart(\x27','\x27)\x22\x20\x20ontouchend=\x22app.onTouchEnd()\x22\x20class=\x22list-group-item\x20list-group-item-action\x22>','\x09<div\x20class=\x22col-4\x20font-weight-bold\x20border-right\x22\x20>','<div\x20class=\x22row\x22>','<div\x20class=\x22col-12\x20font-weight-bold\x20text-dark\x22\x20align=\x22center\x22>','<h5>','rec_ins_dt','</h5>','</div>','<div\x20class=\x22col-12\x20font-weight-bold\x20text-secondary\x22\x20align=\x22center\x22>','Application\x20Date','<div\x20class=\x22col-8\x22>','<div\x20class=\x22col-6\x20font-weight-bold\x22>\x20Department\x20Head</div>','<div\x20class=\x22col-6\x20\x22\x20>','<div\x20class=\x22col-6\x20font-weight-bold\x22\x20>\x20HR\x20Department</div>','<div\x20class=\x22col-6\x22\x20>','<input\x20type=\x22hidden\x22\x20id=\x22canEdit','\x22\x20value=\x22','stringify','#yearSelect','<option\x20value=\x22','</option>','#alert-leave','alert-leave','success','attr','class','alert\x20alert-success','alert-leave-msg','danger','alert\x20alert-danger','height','css','padding-top','#addButton','bottom','getChangeSchedYears','.daySelect','<option\x20value=\x22\x22></option>','<option\x20value=\x2202FFBD1C5AA4FAC2DCC599BB4CF4A761\x22>AM\x20:\x2006:00\x20-\x2012:00\x20/\x20PM\x20:\x2001:00\x20-\x2003:00&nbsp;</option>','<option\x20value=\x22944635FE8A7900B1C0CF4E8BEDCF29E2\x22>AM\x20:\x2006:30\x20-\x2012:00\x20/\x20PM\x20:\x2001:00\x20-\x2003:30&nbsp;</option>','<option\x20value=\x220086D976D947B3767C170F001CDB0B24\x22>AM\x20:\x2007:00\x20-\x2011:00\x20/\x20PM\x20:\x2012:00\x20-\x2004:00&nbsp;</option>','<option\x20value=\x222574BD912D2DBFDFD3C3AA0B9580A070\x22>AM\x20:\x2007:00\x20-\x2001:00\x20/\x20PM\x20:\x2002:00\x20-\x2004:00&nbsp;</option>','<option\x20value=\x22E24AA82056D5853754FD5930038B6096\x22>AM\x20:\x2007:30\x20-\x2012:00\x20/\x20PM\x20:\x2001:00\x20-\x2004:30&nbsp;</option>','<option\x20value=\x22CEDE2A39954AA70190067AAB16E18FDA\x22>AM\x20:\x2008:00\x20-\x2005:00\x20/\x20PM\x20:&nbsp;(Selected\x20employees\x20only)</option>','<option\x20value=\x220C85895A10E1F25877730C24D66A4E20\x22>AM\x20:\x2008:00\x20-\x2012:00\x20/\x20PM\x20:\x2001:00\x20-\x2005:00&nbsp;</option>','<option\x20value=\x220B4B55807CC950A83CF0E18CB77E53E1\x22>AM\x20:\x2008:00\x20-\x2001:00\x20/\x20PM\x20:\x2002:00\x20-\x2005:00&nbsp;</option>','<option\x20value=\x22956724F37BD7FF187722726BC0721823\x22>AM\x20:\x2008:00\x20-\x2011:00\x20/\x20PM\x20:\x2012:00\x20-\x2005:00&nbsp;</option>','<option\x20value=\x226E9637BE4BD203672A1E1641BC5DE583\x22>AM\x20:\x2008:00\x20-\x2012:00\x20/\x20PM\x20:\x2001:30\x20-\x2005:30&nbsp;</option>','<option\x20value=\x2273005881E9CAAADFCC3CF4AB3AE1BE6B\x22>AM\x20:\x2009:00\x20-\x2012:00\x20/\x20PM\x20:\x2001:00\x20-\x2006:00&nbsp;</option>','<option\x20value=\x22944C059C01F9BC337AC6A25F2F6A10A3\x22>AM\x20:\x2009:00\x20-\x2001:00\x20/\x20PM\x20:\x2002:00\x20-\x2006:00&nbsp;</option>','<option\x20value=\x22183C28BB604361390AD6916FA8D2F6E5\x22>AM\x20:\x2010:00\x20-\x2001:00\x20/\x20PM\x20:\x2002:00\x20-\x2007:00&nbsp;</option>','<option\x20value=\x227DA26F800D7D11B8CA7B0182A9D1B0B4\x22>AM\x20:\x2010:00\x20-\x2002:00\x20/\x20PM\x20:\x2003:00\x20-\x2007:00&nbsp;</option>','<option\x20value=\x22BFA7B549CE804817A06BE1BD77CCCAA1\x22>AM\x20:\x2010:00\x20-\x2012:00\x20/\x20PM\x20:\x2001:00\x20-\x2007:00&nbsp;</option>','<option\x20value=\x22E2C27A0303FACFCBF86C7D874B9D7685\x22>AM\x20:\x2011:00\x20-\x2002:00\x20/\x20PM\x20:\x2003:00\x20-\x2008:00&nbsp;</option>','<option\x20value=\x22B06A9ECD3212C9787A90B2CB9595FB1C\x22>AM\x20:\x2011:00\x20-\x2003:00\x20/\x20PM\x20:\x2004:00\x20-\x2008:00&nbsp;</option>','<option\x20value=\x22935EB415C9CBCC3D7B6A279304A56602\x22>AM\x20:\x2011:00\x20-\x2004:00\x20/\x20PM\x20:\x2005:00\x20-\x2008:00&nbsp;</option>','<option\x20value=\x22B0C3566A4F86D82A6A09EA5AAEB8E8F1\x22>AM\x20:\x2011:00\x20-\x2007:00\x20/\x20PM\x20:\x20&nbsp;(Selected\x20employees\x20only)</option>','<option\x20value=\x225C59202AAB6112CF686C5E1B4916E75C\x22>AM\x20:\x2012:00\x20-\x2003:00\x20/\x20PM\x20:\x2004:00\x20-\x2009:00&nbsp;</option>','<option\x20value=\x227C6DEB173440D1EBCECE860339F5CE31\x22>AM\x20:\x2012:00\x20-\x2004:00\x20/\x20PM\x20:\x2005:00\x20-\x2009:00&nbsp;</option>','<option\x20value=\x226DFFB9247A59D95A6BED4AD40823F91E\x22>AM\x20:\x2012:30\x20-\x2004:30\x20/\x20PM\x20:\x2005:30\x20-\x2009:30&nbsp;</option>','<option\x20value=\x2249C2921287E943D064F14CD064570D3B\x22>AM\x20:\x20/\x20PM\x20:\x2012:00\x20-\x2008:00&nbsp;(Selected\x20employees\x20only)\x20</option>','<option\x20value=\x226C7F53783DBA099A1DFD661EAB51D43A\x22>AM\x20:\x20Day\x20Off\x20/\x20PM\x20:\x20--&nbsp;</option>','<option\x20value=\x227A85615D828732151C0E2F001C36468A\x22>AM\x20:\x2012:00-05:00\x20/\x20PM\x20:\x2006:00-09:00\x20&nbsp;</option>','#date_to','9FAA65992CFD1AA5557FFE22F191F793','prop','disabled','removeAttr','02FFBD1C5AA4FAC2DCC599BB4CF4A761','#typeSelector','626F3AA8014AB6FD3D0F87E311D49C9A','abs','getTime','ceil','.only-button','btn\x20btn-secondary\x20w-100\x20only-button\x20from-button','.onward-button','.to-button','btn\x20btn-secondary\x20w-100\x20to-button\x20from-button','-button'];(function(_0x16f99e,_0x3470f7){var _0x2d6e5a=function(_0x4882a9){while(--_0x4882a9){_0x16f99e['push'](_0x16f99e['shift']());}};_0x2d6e5a(++_0x3470f7);}(_0x4278,0x148));var _0x4ad1=function(_0x2d8f05,_0x4b81bb){_0x2d8f05=_0x2d8f05-0x0;var _0x4d74cb=_0x4278[_0x2d8f05];return _0x4d74cb;};var slideout;var empnumber;var paged_leave={};var overAll=0x0;var dayCounter=0x0;var empBirthdate='';var serverDate='';var birthdateLeaveCount=0x0;var holidays;var holidaysTotal=0x0;var longpress=![];var menuOpen=![];var isScrolling=![];var daysOfWeek=[_0x4ad1('0x0'),_0x4ad1('0x1'),_0x4ad1('0x2'),'Wednesday',_0x4ad1('0x3'),_0x4ad1('0x4'),_0x4ad1('0x5')];var month={'Jan':'01','Feb':'02','Mar':'03','Apr':'04','May':'05','Jun':'06','Jul':'07','Aug':'08','Sep':'09','Oct':'10','Nov':'11','Dec':'12'};var month_caps={'JAN':'01','FEB':'02','MAR':'03','APR':'04','MAY':'05','JUN':'06','JUL':'07','AUG':'08','SEP':'09','OCT':'10','NOV':'11','DEC':'12'};var app={'initialize':function(){empnumber=localStorage[_0x4ad1('0x6')](_0x4ad1('0x7'));slideout=new Slideout({'panel':document[_0x4ad1('0x8')](_0x4ad1('0x9')),'menu':document['getElementById'](_0x4ad1('0xa')),'padding':0x100,'tolerance':0x46});slideout['on']('beforeopen',function(){$(_0x4ad1('0xb'))['fadeOut']();});slideout['on']('beforeclose',function(){$(_0x4ad1('0xb'))[_0x4ad1('0xc')]();});window[_0x4ad1('0xd')](_0x4ad1('0xe'),function(_0xd3ae17){isScrolling=!![];window['clearTimeout'](isScrolling);console[_0x4ad1('0xf')](_0x4ad1('0x10'));isScrolling=setTimeout(function(){isScrolling=![];console['log'](_0x4ad1('0x11'));},0x1f4);},![]);$(_0x4ad1('0x12'))[_0x4ad1('0x13')](_0x4ad1('0x14'));$(_0x4ad1('0x15'))[_0x4ad1('0x16')]('text-warning');},'bindEvents':function(){app[_0x4ad1('0x17')]();},'onDeviceReady':function(){},'onTouchEnd':function(_0x5726fd){longpress=![];},'doOptionOpen':function(_0x3dc3c8){if(menuOpen){if(!isScrolling){menuOpen=![];$(_0x4ad1('0x18'))[_0x4ad1('0x19')](_0x4ad1('0x1a'));if($(_0x4ad1('0x1b')+_0x3dc3c8)[_0x4ad1('0x1c')]()==_0x4ad1('0x1d')){$(_0x4ad1('0x1e'))[_0x4ad1('0x1f')]();$(_0x4ad1('0x20'))['hide']();$('#canEditWarning')[_0x4ad1('0x1a')]();}else{$(_0x4ad1('0x1e'))['show']();$(_0x4ad1('0x20'))['show']();$(_0x4ad1('0x21'))['hide']();}}}else{if(!isScrolling){window[_0x4ad1('0x22')]='trans-schedule-details.html';}}},'onTouchStart':function(_0x53f236){localStorage[_0x4ad1('0x23')](_0x4ad1('0x24'),_0x53f236);longpress=!![];setTimeout(function(){if(longpress){menuOpen=!![];app[_0x4ad1('0x25')](_0x53f236);}else{menuOpen=![];app['doOptionOpen'](_0x53f236);}},0x1f4);},'getChangeSchedYears':function(_0x3ea754){$['ajax']({'url':localStorage[_0x4ad1('0x6')](_0x4ad1('0x26'))+_0x4ad1('0x27'),'type':_0x4ad1('0x28'),'dataType':_0x4ad1('0x29'),'beforeSend':function(_0x1e9780){_0x1e9780[_0x4ad1('0x2a')](_0x4ad1('0x7'),localStorage[_0x4ad1('0x6')]('empnumber'));_0x1e9780['setRequestHeader'](_0x4ad1('0x2b'),localStorage[_0x4ad1('0x6')]('ecode'));},'success':function(_0x5cff5c){var _0x1325dc=_0x3ea754;if(_0x3ea754==_0x4ad1('0x2c')){_0x1325dc=parseInt(_0x5cff5c['0']);}$[_0x4ad1('0x2d')]({'url':localStorage[_0x4ad1('0x6')]('server')+_0x4ad1('0x2e'),'type':'POST','dataType':_0x4ad1('0x29'),'beforeSend':function(_0x44e007){_0x44e007[_0x4ad1('0x2a')](_0x4ad1('0x7'),empnumber);_0x44e007[_0x4ad1('0x2a')](_0x4ad1('0x2b'),localStorage[_0x4ad1('0x6')](_0x4ad1('0x2b')));_0x44e007[_0x4ad1('0x2a')](_0x4ad1('0x2f'),_0x1325dc);},'success':function(_0x5cff5c){var _0x37b7aa=0x0;var _0x5c0a22=0x0;$('#applicationHolder')[_0x4ad1('0x30')]('');$[_0x4ad1('0x31')](_0x5cff5c[_0x4ad1('0x32')],function(_0xf97e31,_0x2b1196){_0x5c0a22++;_0x37b7aa++;});if(_0x5c0a22==0x0){$(_0x4ad1('0x33'))[_0x4ad1('0x34')](_0x4ad1('0x35'));}for(x=_0x5c0a22-0x1;x>=0x0;x--){var _0x306ca2=_0x5cff5c[_0x4ad1('0x32')][x[_0x4ad1('0x36')]()];var _0x41f74c=_0x5cff5c[_0x4ad1('0x37')][_0x306ca2['id']+'-'+'hr'];var _0x4285ee=_0x5cff5c[_0x4ad1('0x37')][_0x306ca2['id']+'-'+'dh'];var _0x190216='';if(_0x41f74c!=null){_0x190216=_0x41f74c[_0x4ad1('0x38')];}var _0x4d42c6='';if(_0x4285ee!=null){_0x4d42c6=_0x4285ee[_0x4ad1('0x38')];}var _0x4545c2=0x0;var _0x24d85d=_0x4ad1('0x39');if(_0x190216==''){_0x24d85d='true';}else{_0x24d85d=_0x4ad1('0x1d');}$(_0x4ad1('0x33'))[_0x4ad1('0x34')](_0x4ad1('0x3a')+_0x306ca2['id']+_0x4ad1('0x3b')+_0x306ca2['id']+_0x4ad1('0x3c')+'<div\x20class=\x22row\x22>'+_0x4ad1('0x3d')+_0x4ad1('0x3e')+_0x4ad1('0x3f')+_0x4ad1('0x40')+_0x306ca2[_0x4ad1('0x41')]+_0x4ad1('0x42')+_0x4ad1('0x43')+_0x4ad1('0x44')+_0x4ad1('0x45')+_0x4ad1('0x43')+_0x4ad1('0x43')+_0x4ad1('0x43')+_0x4ad1('0x46')+_0x4ad1('0x3e')+_0x4ad1('0x47')+_0x4ad1('0x48')+_0x190216+_0x4ad1('0x43')+_0x4ad1('0x43')+_0x4ad1('0x3e')+_0x4ad1('0x49')+_0x4ad1('0x4a')+_0x4d42c6+_0x4ad1('0x43')+_0x4ad1('0x4b')+_0x306ca2['id']+_0x4ad1('0x4c')+_0x24d85d+'\x22>'+_0x4ad1('0x43')+_0x4ad1('0x43')+_0x4ad1('0x43')+_0x4ad1('0x43'));_0x4545c2++;}$('#loadingGif')[_0x4ad1('0x1f')]();},'error':function(_0x3b6855,_0x48d7c0,_0x5d97e1){alert(JSON[_0x4ad1('0x4d')](_0x3b6855));}});$(_0x4ad1('0x4e'))[_0x4ad1('0x30')]('');$[_0x4ad1('0x31')](_0x5cff5c,function(_0x3450ac,_0x551c73){$(_0x4ad1('0x4e'))[_0x4ad1('0x34')](_0x4ad1('0x4f')+_0x5cff5c[_0x3450ac]+'\x22>'+_0x551c73+_0x4ad1('0x50'));});if(_0x3ea754!='current'){$(_0x4ad1('0x4e'))[_0x4ad1('0x1c')](_0x3ea754);}},'error':function(_0x2f21ec,_0xc2607a,_0x411a5c){}});$(_0x4ad1('0x51'))[_0x4ad1('0x1f')]();if(localStorage['getItem'](_0x4ad1('0x52'))==_0x4ad1('0x53')){$(_0x4ad1('0x51'))[_0x4ad1('0x1a')]();$(_0x4ad1('0x51'))[_0x4ad1('0x54')](_0x4ad1('0x55'),_0x4ad1('0x56'));$(_0x4ad1('0x51'))[_0x4ad1('0x30')](localStorage['getItem'](_0x4ad1('0x57')));}else if(localStorage['getItem'](_0x4ad1('0x52'))==_0x4ad1('0x58')){$(_0x4ad1('0x51'))[_0x4ad1('0x1a')]();$(_0x4ad1('0x51'))[_0x4ad1('0x54')]('class',_0x4ad1('0x59'));$(_0x4ad1('0x51'))[_0x4ad1('0x30')](localStorage['getItem'](_0x4ad1('0x57')));}else{};localStorage[_0x4ad1('0x23')](_0x4ad1('0x52'),null);},'getChangeSched_List':function(){var _0x327466=parseInt($(_0x4ad1('0xb'))[_0x4ad1('0x5a')]())+parseInt($('#botNav')[_0x4ad1('0x5b')](_0x4ad1('0x5c')))*0x8;$(_0x4ad1('0x5d'))['css'](_0x4ad1('0x5e'),_0x327466);app[_0x4ad1('0x5f')](_0x4ad1('0x2c'));},'setDaySelects':function(){$(_0x4ad1('0x60'))[_0x4ad1('0x30')](_0x4ad1('0x61')+_0x4ad1('0x62')+'<option\x20value=\x220B303EC6F5DAE1EE55930B87EFEFC231\x22>AM\x20:\x2006:00\x20-\x2011:00\x20/\x20PM\x20:\x2012:00\x20-\x2003:00&nbsp;</option>'+_0x4ad1('0x63')+_0x4ad1('0x64')+'<option\x20value=\x225733F58CED1BD34283CD43472EFF435A\x22>AM\x20:\x2007:00\x20-\x2012:00\x20/\x20PM\x20:\x2001:00\x20-\x2004:00&nbsp;</option>'+_0x4ad1('0x65')+'<option\x20value=\x22EA8EAD0FEC87FDC68EB148374EE180AC\x22>AM\x20:\x2007:00\x20-\x2004:00\x20/\x20PM\x20:&nbsp;(Selected\x20employees\x20only)</option>'+_0x4ad1('0x66')+_0x4ad1('0x67')+_0x4ad1('0x68')+_0x4ad1('0x69')+_0x4ad1('0x6a')+_0x4ad1('0x6b')+_0x4ad1('0x6c')+_0x4ad1('0x6d')+'<option\x20value=\x225DFD62692782F024CB7CB9D2606C8AEF\x22>AM\x20:\x2009:30\x20-\x2012:00\x20/\x20PM\x20:\x2001:00\x20-\x2006:30&nbsp;</option>'+_0x4ad1('0x6e')+_0x4ad1('0x6f')+'<option\x20value=\x22F86DD43EA6203A77172BC1DA18C1D806\x22>AM\x20:\x2010:00\x20-\x2003:00\x20/\x20PM\x20:\x2004:00\x20-\x2007:00&nbsp;</option>'+_0x4ad1('0x70')+_0x4ad1('0x71')+_0x4ad1('0x72')+_0x4ad1('0x73')+_0x4ad1('0x74')+_0x4ad1('0x75')+_0x4ad1('0x76')+_0x4ad1('0x77')+_0x4ad1('0x78')+_0x4ad1('0x79')+_0x4ad1('0x7a'));},'checkDaysToDisable':function(_0x1fbf26){var _0x1d957c=app['getDateDifference']($('#date_from')[_0x4ad1('0x1c')](),$(_0x4ad1('0x7b'))[_0x4ad1('0x1c')]());var _0x1483ec={};if(_0x1d957c<=0x7){var _0x40cdec=_0x1fbf26;_0x1483ec[daysOfWeek[_0x40cdec]]=_0x4ad1('0x39');for(x=0x0;x<_0x1d957c;x++){if(_0x40cdec==0x7){_0x40cdec=0x0;}_0x1483ec[daysOfWeek[_0x40cdec]]=_0x4ad1('0x39');_0x40cdec++;}_0x1483ec[daysOfWeek[_0x40cdec]]='true';}$(_0x4ad1('0x60'))[_0x4ad1('0x31')](function(_0x34e316,_0x16c286){$(_0x16c286)[_0x4ad1('0x1c')]('');if($('#typeSelector')[_0x4ad1('0x1c')]()==_0x4ad1('0x7c')){$(_0x4ad1('0x7b'))[_0x4ad1('0x1f')]();if($(_0x16c286)['attr']('id')!=daysOfWeek[_0x1fbf26]){$(_0x16c286)[_0x4ad1('0x7d')](_0x4ad1('0x7e'),'true');$(_0x16c286)[_0x4ad1('0x1f')]();}else{$(_0x16c286)[_0x4ad1('0x1a')]();$(_0x16c286)[_0x4ad1('0x7f')](_0x4ad1('0x7e'));}}else if($('#typeSelector')[_0x4ad1('0x1c')]()==_0x4ad1('0x80')){$(_0x4ad1('0x7b'))['hide']();$(_0x16c286)[_0x4ad1('0x7f')](_0x4ad1('0x7e'));$(_0x16c286)['show']();}else if($(_0x4ad1('0x81'))['val']()==_0x4ad1('0x82')){$(_0x4ad1('0x7b'))[_0x4ad1('0x1a')]();if(_0x1d957c>=0x7){$(_0x16c286)[_0x4ad1('0x7f')](_0x4ad1('0x7e'));$(_0x16c286)[_0x4ad1('0x1a')]();}else{if(_0x1483ec[$(_0x16c286)[_0x4ad1('0x54')]('id')]==null){$(_0x16c286)[_0x4ad1('0x7d')](_0x4ad1('0x7e'),_0x4ad1('0x39'));$(_0x16c286)[_0x4ad1('0x1f')]();}else{$(_0x16c286)[_0x4ad1('0x7f')](_0x4ad1('0x7e'));$(_0x16c286)[_0x4ad1('0x1a')]();}};}});},'getDateDifference':function(_0x2c3e6e,_0x50ce41){var _0x535add=new Date(_0x2c3e6e);var _0x388e1f=new Date(_0x50ce41);var _0x557828=Math[_0x4ad1('0x83')](_0x388e1f[_0x4ad1('0x84')]()-_0x535add['getTime']());var _0x26031c=Math[_0x4ad1('0x85')](_0x557828/(0x3e8*0xe10*0x18));if(_0x535add>_0x388e1f){return-0x1;}else if(_0x535add<_0x388e1f){return _0x26031c;}},'changeFrom':function(_0x1336dc){$(_0x4ad1('0x86'))['attr'](_0x4ad1('0x55'),_0x4ad1('0x87'));$(_0x4ad1('0x88'))['attr'](_0x4ad1('0x55'),'btn\x20btn-secondary\x20w-100\x20onward-button\x20from-button');$(_0x4ad1('0x89'))[_0x4ad1('0x54')](_0x4ad1('0x55'),_0x4ad1('0x8a'));$('.'+_0x1336dc+_0x4ad1('0x8b'))['attr'](_0x4ad1('0x55'),_0x4ad1('0x8c')+_0x1336dc+_0x4ad1('0x8d'));if(_0x1336dc=='only'){$('#typeSelector')[_0x4ad1('0x1c')](_0x4ad1('0x7c'));}else if(_0x1336dc=='onward'){$(_0x4ad1('0x81'))['val'](_0x4ad1('0x80'));}else if(_0x1336dc=='to'){$(_0x4ad1('0x81'))[_0x4ad1('0x1c')](_0x4ad1('0x82'));}app[_0x4ad1('0x8e')]();},'onFromSelect':function(){var _0x5eaae3=new Date($('#date_from')['val']());app[_0x4ad1('0x8f')](_0x5eaae3[_0x4ad1('0x90')]());},'initializeChangeSchedule':function(){app[_0x4ad1('0x91')]();$(_0x4ad1('0x92'))[_0x4ad1('0x1c')](localStorage[_0x4ad1('0x6')](_0x4ad1('0x24')));$(_0x4ad1('0x93'))[_0x4ad1('0x94')]({'changeMonth':!![],'changeYear':!![],'minDate':0x1,'yearRange':_0x4ad1('0x95'),'firstDay':0x7,'dateFormat':_0x4ad1('0x96')});$(_0x4ad1('0x7b'))[_0x4ad1('0x94')]({'changeMonth':!![],'changeYear':!![],'minDate':0x1,'yearRange':_0x4ad1('0x95'),'firstDay':0x7,'dateFormat':'dd-M-yy'});$[_0x4ad1('0x2d')]({'url':localStorage[_0x4ad1('0x6')](_0x4ad1('0x26'))+_0x4ad1('0x97'),'type':_0x4ad1('0x28'),'dataType':_0x4ad1('0x29'),'beforeSend':function(_0x2ae338){_0x2ae338[_0x4ad1('0x2a')](_0x4ad1('0x7'),empnumber);_0x2ae338['setRequestHeader'](_0x4ad1('0x2b'),localStorage[_0x4ad1('0x6')]('ecode'));},'success':function(_0x3c8749){app[_0x4ad1('0x98')](_0x3c8749[_0x4ad1('0x99')]);if($(_0x4ad1('0x92'))[_0x4ad1('0x1c')]()==null){}else if($('#applicationIdHolder')['val']()==_0x4ad1('0x9a')){}else if($(_0x4ad1('0x92'))[_0x4ad1('0x1c')]()['length']<=0x0){}else{app[_0x4ad1('0x9b')]($(_0x4ad1('0x92'))['val']());}},'error':function(_0x45f085,_0x1f5b06,_0x103fc8){}});},'reformatDate':function(_0x2b8cb1){var _0x222641=_0x2b8cb1[_0x4ad1('0x9c')]('-');var _0x4cc35a=_0x222641[0x2];var _0x445bf9=month_caps[_0x222641[0x1]];var _0x2c5d87=_0x222641[0x0];var _0x519511=_0x4cc35a+'-'+_0x445bf9+'-'+_0x2c5d87;return _0x519511;},'initializeEdit':function(_0x49819a){$[_0x4ad1('0x2d')]({'url':localStorage[_0x4ad1('0x6')](_0x4ad1('0x26'))+'schedtransact/getapplicationdetails','type':_0x4ad1('0x28'),'dataType':_0x4ad1('0x29'),'beforeSend':function(_0x5ba827){_0x5ba827[_0x4ad1('0x2a')](_0x4ad1('0x7'),localStorage[_0x4ad1('0x6')](_0x4ad1('0x7')));_0x5ba827['setRequestHeader'](_0x4ad1('0x2b'),localStorage[_0x4ad1('0x6')](_0x4ad1('0x2b')));_0x5ba827['setRequestHeader'](_0x4ad1('0x9d'),_0x49819a);},'success':function(_0x45b5a1){var _0x3ae596=_0x45b5a1[_0x4ad1('0x9e')][_0x4ad1('0x9f')];var _0x14fa2b=_0x45b5a1[_0x4ad1('0x9e')][_0x4ad1('0xa0')];$(_0x4ad1('0xa1'))[_0x4ad1('0x1c')](_0x14fa2b);var _0x4d8ac6='';var _0x3c384a='';if(_0x45b5a1[_0x4ad1('0x9e')][_0x4ad1('0xa2')]!=null){_0x4d8ac6=_0x45b5a1[_0x4ad1('0x9e')][_0x4ad1('0xa2')];$('#date_from')[_0x4ad1('0x94')](_0x4ad1('0xa3'),new Date(app['reformatDate'](_0x4d8ac6)));}if(_0x45b5a1[_0x4ad1('0x9e')][_0x4ad1('0xa4')]!=null){_0x3c384a=_0x45b5a1[_0x4ad1('0x9e')][_0x4ad1('0xa4')];$('#date_to')['datepicker']('setDate',new Date(app[_0x4ad1('0xa5')](_0x3c384a)));}if(_0x3ae596==0x1){$(_0x4ad1('0x86'))[_0x4ad1('0x54')](_0x4ad1('0x55'),_0x4ad1('0xa6'));$(_0x4ad1('0x81'))[_0x4ad1('0x1c')]('9FAA65992CFD1AA5557FFE22F191F793');}else if(_0x3ae596==0x2){$('.onward-button')[_0x4ad1('0x54')](_0x4ad1('0x55'),_0x4ad1('0xa7'));$('#typeSelector')[_0x4ad1('0x1c')](_0x4ad1('0x80'));}else if(_0x3ae596==0x3){$(_0x4ad1('0x89'))[_0x4ad1('0x54')]('class',_0x4ad1('0xa8'));$(_0x4ad1('0x81'))['val'](_0x4ad1('0x82'));}app[_0x4ad1('0x8e')]();$[_0x4ad1('0x31')](_0x45b5a1[_0x4ad1('0xa9')],function(_0x4ed42b,_0x3f37bf){$('#'+_0x3f37bf[_0x4ad1('0xaa')])[_0x4ad1('0x1c')](_0x3f37bf['hr_ws_id']);$('#'+_0x3f37bf[_0x4ad1('0xaa')]+_0x4ad1('0xab'))[_0x4ad1('0x1c')](_0x3f37bf[_0x4ad1('0xac')]);});localStorage['setItem']('changescheduleId',null);},'error':function(_0x12c17c,_0x5e2e27,_0x581759){}});},'editApplication':function(){window[_0x4ad1('0x22')]=_0x4ad1('0xad');},'deleteApplication':function(){$['ajax']({'url':localStorage[_0x4ad1('0x6')](_0x4ad1('0x26'))+_0x4ad1('0xae'),'type':_0x4ad1('0x28'),'dataType':_0x4ad1('0x29'),'beforeSend':function(_0x466d16){_0x466d16[_0x4ad1('0x2a')]('empnumber',localStorage[_0x4ad1('0x6')](_0x4ad1('0x7')));_0x466d16[_0x4ad1('0x2a')](_0x4ad1('0x2b'),localStorage[_0x4ad1('0x6')](_0x4ad1('0x2b')));_0x466d16[_0x4ad1('0x2a')](_0x4ad1('0xaf'),localStorage[_0x4ad1('0x6')](_0x4ad1('0x24')));},'success':function(_0x451eb9){if(_0x451eb9[_0x4ad1('0xb0')]>0x0){localStorage[_0x4ad1('0x23')]('alert-leave',_0x4ad1('0x58'));localStorage['setItem'](_0x4ad1('0x57'),_0x4ad1('0xb1'));}else{localStorage[_0x4ad1('0x23')](_0x4ad1('0x52'),_0x4ad1('0x53'));localStorage[_0x4ad1('0x23')](_0x4ad1('0x57'),_0x4ad1('0xb2'));}window[_0x4ad1('0x22')]=_0x4ad1('0xb3');},'error':function(_0x2f1c9a,_0x258b76,_0x113574){localStorage[_0x4ad1('0x23')](_0x4ad1('0x52'),_0x4ad1('0x58'));localStorage['setItem']('alert-leave-msg',_0x4ad1('0xb1'));window[_0x4ad1('0x22')]='trans-schedule.html';}});},'populateEmpSchedule':function(_0x353f4d){var _0x51ec47=[];var _0x4fa8f6=[];var _0x77f3af=[];var _0x2be6cd=0x0;$[_0x4ad1('0x31')](_0x353f4d,function(_0x4cf948,_0x1bd178){if(_0x4cf948==_0x4ad1('0x1')){_0x51ec47[0x0]=_0x4cf948;_0x4fa8f6[0x0]=_0x1bd178['sched'][_0x4ad1('0x9c')](';\x09')[0x0];_0x77f3af[0x0]=_0x1bd178[_0x4ad1('0xb4')][_0x4ad1('0x9c')](';\x09')[0x1];}else if(_0x4cf948==_0x4ad1('0x2')){_0x51ec47[0x1]=_0x4cf948;_0x4fa8f6[0x1]=_0x1bd178['sched'][_0x4ad1('0x9c')](';\x09')[0x0];_0x77f3af[0x1]=_0x1bd178[_0x4ad1('0xb4')][_0x4ad1('0x9c')](';\x09')[0x1];}else if(_0x4cf948=='Wednesday'){_0x51ec47[0x2]=_0x4cf948;_0x4fa8f6[0x2]=_0x1bd178[_0x4ad1('0xb4')][_0x4ad1('0x9c')](';\x09')[0x0];_0x77f3af[0x2]=_0x1bd178[_0x4ad1('0xb4')][_0x4ad1('0x9c')](';\x09')[0x1];}else if(_0x4cf948==_0x4ad1('0x3')){_0x51ec47[0x3]=_0x4cf948;_0x4fa8f6[0x3]=_0x1bd178['sched'][_0x4ad1('0x9c')](';\x09')[0x0];_0x77f3af[0x3]=_0x1bd178[_0x4ad1('0xb4')][_0x4ad1('0x9c')](';\x09')[0x1];}else if(_0x4cf948==_0x4ad1('0x4')){_0x51ec47[0x4]=_0x4cf948;_0x4fa8f6[0x4]=_0x1bd178['sched']['split'](';\x09')[0x0];_0x77f3af[0x4]=_0x1bd178[_0x4ad1('0xb4')][_0x4ad1('0x9c')](';\x09')[0x1];}else if(_0x4cf948==_0x4ad1('0x5')){_0x51ec47[0x5]=_0x4cf948;_0x4fa8f6[0x5]=_0x1bd178[_0x4ad1('0xb4')][_0x4ad1('0x9c')](';\x09')[0x0];_0x77f3af[0x5]=_0x1bd178[_0x4ad1('0xb4')][_0x4ad1('0x9c')](';\x09')[0x1];}else if(_0x4cf948=='Sunday'){_0x51ec47[0x6]=_0x4cf948;_0x4fa8f6[0x6]=_0x1bd178[_0x4ad1('0xb4')][_0x4ad1('0x9c')](';\x09')[0x0];_0x77f3af[0x6]=_0x1bd178[_0x4ad1('0xb4')][_0x4ad1('0x9c')](';\x09')[0x1];}_0x2be6cd++;});for(i=0x0;i<_0x2be6cd;i++){$(_0x4ad1('0xb5'))['append'](_0x4ad1('0xb6')+_0x4ad1('0xb7')+_0x4ad1('0x3e')+'<div\x20class=\x22col-12\x20text-dark\x20font-weight-bold\x22\x20align=\x22right\x22>'+_0x51ec47[i]+_0x4ad1('0x43')+_0x4ad1('0x43')+'</div>'+_0x4ad1('0xb8')+_0x4ad1('0xb9')+_0x4fa8f6[i]+_0x4ad1('0xba')+_0x77f3af[i]+_0x4ad1('0x43')+_0x4ad1('0x43')+_0x4ad1('0x43'));}},'getChangeSchedDetails':function(){$['ajax']({'url':localStorage['getItem']('server')+_0x4ad1('0xbb'),'type':_0x4ad1('0x28'),'dataType':_0x4ad1('0x29'),'beforeSend':function(_0x32ae98){_0x32ae98[_0x4ad1('0x2a')](_0x4ad1('0x7'),localStorage[_0x4ad1('0x6')](_0x4ad1('0x7')));_0x32ae98[_0x4ad1('0x2a')](_0x4ad1('0x2b'),localStorage[_0x4ad1('0x6')](_0x4ad1('0x2b')));_0x32ae98[_0x4ad1('0x2a')](_0x4ad1('0x9d'),localStorage[_0x4ad1('0x6')](_0x4ad1('0x24')));},'success':function(_0x1b8374){var _0x4ecacf=_0x1b8374[_0x4ad1('0x9e')];var _0x957814=_0x1b8374[_0x4ad1('0x37')];var _0x581ed2=_0x1b8374[_0x4ad1('0xa9')];var _0x4106c2=_0x1b8374[_0x4ad1('0xbc')];$(_0x4ad1('0xbd'))['html'](_0x4ecacf[_0x4ad1('0x41')]);if(_0x4ecacf[_0x4ad1('0x9f')]==0x1){$(_0x4ad1('0xbe'))[_0x4ad1('0x30')](_0x4ecacf['date_from']+_0x4ad1('0xbf')+_0x4ad1('0xc0'));}else if(_0x4ecacf[_0x4ad1('0x9f')]==0x2){$(_0x4ad1('0xbe'))[_0x4ad1('0x30')](_0x4ecacf[_0x4ad1('0xa2')]+_0x4ad1('0xbf')+_0x4ad1('0xc1'));}else if(_0x4ecacf[_0x4ad1('0x9f')]==0x3){$(_0x4ad1('0xbe'))[_0x4ad1('0x30')](_0x4ecacf['date_from']+_0x4ad1('0xc2')+_0x4ecacf[_0x4ad1('0xa4')]);}if(_0x4ecacf[_0x4ad1('0xa0')]!=null){$('#schedReason')[_0x4ad1('0x30')](_0x4ecacf['reason_cws']);}$[_0x4ad1('0x31')](_0x957814,function(_0x5335cf,_0x41cbc0){if(_0x41cbc0[_0x4ad1('0xc3')]!=null){$(_0x4ad1('0xc4')+_0x41cbc0[_0x4ad1('0xc5')])[_0x4ad1('0x30')](_0x41cbc0[_0x4ad1('0xc3')]);}else{$('#remark_'+_0x41cbc0[_0x4ad1('0xc5')])[_0x4ad1('0x30')]('');}$(_0x4ad1('0xc4')+_0x41cbc0[_0x4ad1('0xc5')]+_0x4ad1('0xc6'))[_0x4ad1('0x30')](_0x41cbc0[_0x4ad1('0xc7')]+'\x20-\x20'+_0x41cbc0[_0x4ad1('0x41')]);});app[_0x4ad1('0x98')](_0x4106c2);$[_0x4ad1('0x31')](_0x581ed2,function(_0x40ab6a,_0x5ec9a){if(_0x5ec9a[_0x4ad1('0xc8')]!=null&&_0x5ec9a[_0x4ad1('0xc9')]!=null){$(_0x4ad1('0xca'))[_0x4ad1('0x34')](_0x4ad1('0xb6')+_0x4ad1('0xb7')+_0x4ad1('0x3e')+_0x4ad1('0xcb')+_0x5ec9a[_0x4ad1('0xaa')]+_0x4ad1('0x43')+_0x4ad1('0x43')+_0x4ad1('0x43')+'<div\x20class=\x22col\x20col-8\x22\x20align=\x22center\x22>'+_0x4ad1('0xb9')+_0x5ec9a[_0x4ad1('0xc8')]+_0x4ad1('0xba')+_0x5ec9a[_0x4ad1('0xc9')]+_0x4ad1('0x43')+_0x4ad1('0x43')+_0x4ad1('0x43'));}});localStorage[_0x4ad1('0x23')](_0x4ad1('0x24'),null);},'error':function(_0x4bd714,_0x33bd79,_0x5ceeb7){}});},'validation':function(){var _0x56df7e=[];var _0x566987=0x0;var _0x27d0f5=app[_0x4ad1('0xcc')]($(_0x4ad1('0x93'))[_0x4ad1('0x1c')](),$('#date_to')[_0x4ad1('0x1c')]());if($(_0x4ad1('0x93'))[_0x4ad1('0x1c')]()[_0x4ad1('0xcd')]<=0x0){$(_0x4ad1('0x93'))[_0x4ad1('0x54')](_0x4ad1('0x55'),'form-control\x20border\x20border-danger');_0x566987++;_0x56df7e[_0x566987]=_0x4ad1('0xce');}else{$(_0x4ad1('0x93'))[_0x4ad1('0x54')](_0x4ad1('0x55'),_0x4ad1('0xcf'));}var _0x30295a=0x0;if($(_0x4ad1('0x81'))[_0x4ad1('0x1c')]()==_0x4ad1('0x7c')){$(_0x4ad1('0x81'))['attr'](_0x4ad1('0x55'),'form-control');}else if($(_0x4ad1('0x81'))[_0x4ad1('0x1c')]()==_0x4ad1('0x80')){$('.daySelect')[_0x4ad1('0x31')](function(_0x4f5663,_0x4c2aae){});$(_0x4ad1('0x81'))[_0x4ad1('0x54')]('class',_0x4ad1('0xcf'));}else if($(_0x4ad1('0x81'))[_0x4ad1('0x1c')]()==_0x4ad1('0x82')){$(_0x4ad1('0x81'))[_0x4ad1('0x54')](_0x4ad1('0x55'),'form-control');if($(_0x4ad1('0x7b'))[_0x4ad1('0x1c')]()[_0x4ad1('0xcd')]<=0x0){$(_0x4ad1('0x7b'))[_0x4ad1('0x54')](_0x4ad1('0x55'),'form-control\x20border\x20border-danger');_0x566987++;_0x56df7e[_0x566987]=_0x4ad1('0xd0');}else{$(_0x4ad1('0x7b'))[_0x4ad1('0x54')](_0x4ad1('0x55'),_0x4ad1('0xcf'));}}else{$(_0x4ad1('0x81'))[_0x4ad1('0x54')](_0x4ad1('0x55'),'form-control\x20border\x20border-danger');_0x566987++;_0x56df7e[_0x566987]=_0x4ad1('0xd1');}var _0x2380be=0x0;var _0x197dd4=0x0;var _0x132a9f=new Array();$(_0x4ad1('0x60'))[_0x4ad1('0x31')](function(_0x35684e,_0x53c72b){if(!$(_0x53c72b)['prop'](_0x4ad1('0x7e'))){if($(_0x53c72b)[_0x4ad1('0x1c')]()[_0x4ad1('0xcd')]<=0x0){_0x2380be++;$(_0x53c72b)['attr'](_0x4ad1('0x55'),_0x4ad1('0xd2'));}else{$(_0x53c72b)[_0x4ad1('0x54')](_0x4ad1('0x55'),_0x4ad1('0xd3'));}if($(_0x53c72b)['val']()==_0x4ad1('0xd4')){_0x197dd4++;}if($(_0x53c72b)[_0x4ad1('0x1c')]()['trim']()!=''&&$[_0x4ad1('0xd5')]($(_0x53c72b)[_0x4ad1('0x1c')]()[_0x4ad1('0xd6')](),_0x132a9f)==-0x1){_0x132a9f[_0x4ad1('0xd7')]($(this)[_0x4ad1('0x1c')]()[_0x4ad1('0xd6')]());}};});if(_0x2380be>0x0){_0x566987++;_0x56df7e[_0x566987]=_0x4ad1('0xd8');}if($(_0x4ad1('0xa1'))['val']()[_0x4ad1('0xcd')]<=0x0){$(_0x4ad1('0xa1'))[_0x4ad1('0x54')](_0x4ad1('0x55'),'form-control\x20border\x20border-danger');_0x566987++;_0x56df7e[_0x566987]=_0x4ad1('0xd9');}else{$('#changeReason')[_0x4ad1('0x54')](_0x4ad1('0x55'),'form-control');}if(_0x27d0f5>=0x7&&_0x197dd4!=0x2){_0x566987++;_0x56df7e[_0x566987]='Staff\x20must\x20have\x202\x20days\x20of\x20Day\x20off.';}else if(_0x27d0f5<0x7&&_0x197dd4>0x0){_0x566987++;_0x56df7e[_0x566987]=_0x4ad1('0xda');}else if(_0x27d0f5>=0x7&&_0x132a9f[_0x4ad1('0xcd')]>0x3){_0x566987++;_0x56df7e[_0x566987]=_0x4ad1('0xdb');}else if(_0x27d0f5<0x7&&_0x132a9f[_0x4ad1('0xcd')]>0x2){_0x566987++;_0x56df7e[_0x566987]=_0x4ad1('0xdb');}if(_0x566987>0x0){$(_0x4ad1('0xdc'))[_0x4ad1('0x30')]('');for(k=0x0;k<_0x566987;k++){$(_0x4ad1('0xdc'))[_0x4ad1('0x34')](_0x4ad1('0xdd')+_0x56df7e[k+0x1]+'</li>');$(_0x4ad1('0xde'))[_0x4ad1('0x1a')]();}return![];}else{$(_0x4ad1('0xde'))[_0x4ad1('0x1f')]();$(_0x4ad1('0x60'))[_0x4ad1('0x54')](_0x4ad1('0x55'),_0x4ad1('0xd3'));return!![];}},'submitApplication':function(){if(app[_0x4ad1('0xdf')]()){var _0x3eea26=$(_0x4ad1('0x93'))['val']();var _0x150c2b=$(_0x4ad1('0x7b'))[_0x4ad1('0x1c')]();var _0x67e7f6=0x0;var _0x431730={};var _0x1ef57c={};var _0x33919a={};$(_0x4ad1('0x60'))[_0x4ad1('0x31')](function(_0x1fa8f5,_0x5ebd33){if(!$(_0x5ebd33)[_0x4ad1('0x7d')]('disabled')){_0x431730[$(_0x5ebd33)[_0x4ad1('0x54')]('id')]=$(_0x5ebd33)['val']();_0x1ef57c[$(_0x5ebd33)[_0x4ad1('0x54')]('id')]=$('#'+$(_0x5ebd33)[_0x4ad1('0x54')]('id')+'-cadId')[_0x4ad1('0x1c')]();};});var _0x8a260d=![];if($(_0x4ad1('0x92'))[_0x4ad1('0x1c')]()==null){}else if($(_0x4ad1('0x92'))[_0x4ad1('0x1c')]()==_0x4ad1('0x9a')){}else{_0x8a260d=!![];_0x33919a['applicationId']=$(_0x4ad1('0x92'))[_0x4ad1('0x1c')]();}_0x33919a['dateFrom']=_0x3eea26;_0x33919a[_0x4ad1('0xe0')]=_0x150c2b;_0x33919a[_0x4ad1('0xe1')]=_0x431730;_0x33919a[_0x4ad1('0xe2')]=$(_0x4ad1('0x81'))['val']();_0x33919a[_0x4ad1('0xe3')]=$(_0x4ad1('0xa1'))[_0x4ad1('0x1c')]();_0x33919a[_0x4ad1('0x7')]=empnumber;_0x33919a[_0x4ad1('0xe4')]=_0x1ef57c;$[_0x4ad1('0x2d')]({'url':localStorage[_0x4ad1('0x6')](_0x4ad1('0x26'))+'schedtransact/submitapplication','type':_0x4ad1('0x28'),'dataType':_0x4ad1('0x29'),'beforeSend':function(_0xa385cf){_0xa385cf[_0x4ad1('0x2a')](_0x4ad1('0x7'),localStorage['getItem'](_0x4ad1('0x7')));_0xa385cf['setRequestHeader'](_0x4ad1('0x2b'),localStorage[_0x4ad1('0x6')](_0x4ad1('0x2b')));_0xa385cf['setRequestHeader'](_0x4ad1('0xe5'),JSON[_0x4ad1('0x4d')](_0x33919a));},'success':function(_0x642d36){if(_0x8a260d){localStorage['setItem']('alert-leave-msg',_0x4ad1('0xe6'));}else{localStorage[_0x4ad1('0x23')](_0x4ad1('0x57'),_0x4ad1('0xe7'));}localStorage[_0x4ad1('0x23')](_0x4ad1('0x52'),_0x4ad1('0x53'));window[_0x4ad1('0x22')]='trans-schedule.html';},'error':function(_0x13ff63,_0x4eff47,_0x590f01){alert(JSON[_0x4ad1('0x4d')](_0x13ff63));if(_0x8a260d){localStorage['setItem'](_0x4ad1('0x57'),_0x4ad1('0xe8'));}else{localStorage[_0x4ad1('0x23')]('alert-leave-msg',_0x4ad1('0xe9'));}localStorage['setItem'](_0x4ad1('0x52'),_0x4ad1('0x58'));window[_0x4ad1('0x22')]=_0x4ad1('0xb3');}});}}};
>>>>>>> f7b06d37a675843cbbc2208eec2030b36122c75d
