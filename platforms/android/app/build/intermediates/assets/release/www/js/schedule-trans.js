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
 