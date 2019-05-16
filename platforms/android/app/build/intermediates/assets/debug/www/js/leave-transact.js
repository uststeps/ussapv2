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
		//empnumber = "1689";
        slideout = new Slideout({
            'panel'    : document.getElementById('panel'   ),
            'menu'     : document.getElementById('sidenav' ),
            'padding'  : 256, /* TODO: Change to screen width/2 on production  for menu slide */
            'tolerance': 70
        });
		slideout.on('beforeopen', function() {
                     isScrolling = true;
				$("#botNav").fadeOut();
		});

		slideout.on('beforeclose', function() {
     
				$("#botNav").fadeIn();

		});
                
                slideout.on('close', function() {
                    isScrolling = false;
			

		});
		
        $("#sidenav").load("inc.sidenav.html");
	$("#botnav-profile").addClass("text-warning");
		
       
  
    },
    
    bindEvents: function() {
       app.onDeviceReady();

			   
    },
	
	
	ajaxLeaves: function(year){
		$.ajax({
			url   : localStorage.getItem("server") + "leavetransact/leavedata", 
					type       : "POST",
					dataType   : "json",            
					beforeSend : function(xhr){
						xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber" ));
						xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode") 	);
					},
					success: function(msg) { 
						
						var toPassYear = year;
						
						if (year == "current") {
							toPassYear = parseInt(msg["0"]);
						} 
						
						$.ajax({
							url        : localStorage.getItem("server") + "leavetransact/leavesbyyear", 
							type       : "POST",
							dataType   : "json",            
							beforeSend : function(xhr){
								xhr.setRequestHeader('empnumber' , empnumber);
								xhr.setRequestHeader('ecode'     , localStorage.getItem("ecode") 	);
								xhr.setRequestHeader('leaveyear' , toPassYear);
							},
							success: function(msg) { 
								//alert(JSON.stringify(msg));
								var i = 0;
								var totalList = 0;
								$("#leaveholder").html("");
								$.each(msg["leave-list"], function(index, element) {

	
									totalList++;
									i++;
									//alert(msg[index]["leave_date"]);
								});
								
								if (totalList==0){
									$("#leaveholder").append(
										'<div class="alert alert-warning">No Record Found</div>'
									);
								}
								
								
								
								
								for (x=totalList-1; x>=0 ; x--) {
									//alert(x);
									//alert( msg["leave-list"][x.toString()]["leave_id"] );
									var recIns1 = "";
									if (msg["leave-status"]["dh"][msg["leave-list"][x.toString()]["leave_id"]]!=null){
										recIns1 =msg["leave-status"]["dh"][msg["leave-list"][x.toString()]["leave_id"]]["rec_ins_dt"];
									}
									var recIns2 = "";
									if (msg["leave-status"]["hr"][msg["leave-list"][x.toString()]["leave_id"]]!=null){
										recIns2 =msg["leave-status"]["hr"][msg["leave-list"][x.toString()]["leave_id"]]["rec_ins_dt"];
									}
									
									var leaveName = "";
									
									if (msg["leave-list"][x.toString()]["leave_type_name"] == "BIRTHDAY LEAVE"){
										leaveName = "BL";
									} else {
										leaveName = msg["leave-list"][x.toString()]["leave_type_name"];
									}
									
									var rowIndex = 0;
									var canEdit = "true";
									if (recIns1 == ""){
										canEdit = "true";
									} else {
										canEdit = "false";
									}
									
									$("#leaveholder").append(
											
										'<div id="row' + msg["leave-list"][x.toString()]["leave_id"] + '" ontouchstart="app.onTouchStart(\'' + msg["leave-list"][x.toString()]["leave_id"] + '\')"  ontouchend="app.onTouchEnd()" class="list-group-item list-group-item-action">'
											+ '<div class="row">'
											+ '	<div class="col-4 font-weight-bold border-right" >'
											+		'<div class="row">'
											+			'<div class="col-12 font-weight-bold text-warning" align="center">'
											+				'<h1>' + leaveName  + '</h1>'
											+ 			'</div>'
											+ 			'<div class="col-12 font-weight-bold text-secondary" align="center">'
											+ 				msg["leave-list"][x.toString()]["leave_date"] 
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
											+ '<input type="hidden" id="canEdit' + msg["leave-list"][x.toString()]["leave_id"] + '" value="' + canEdit + '">' 
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
									//alert(JSON.stringify(jqXHR));
								}
							}); 
						
						$("#leaveYear").html("");
							$.each(msg, function(index, element) {

								$("#leaveYear").append(
									'<option value="' + msg[index] + '">' + element + '</option>'
								);
							
								//alert(msg[index]["leave_date"]);
							});
					
					if (year != "current") {
						$("#leaveYear").val(year);
					}
					},
				    error: function(jqXHR	, textStatus, errorThrown) {
						//alert(JSON.stringify(jqXHR));
					}
	
			
		});
	},
	
	onAjaxDoneDelete: function(result){
		if (result == 1) {
			localStorage.setItem("alert-leave", "success");
			localStorage.setItem("alert-leave-msg", "Leave deleted successfully");
		} else {
			localStorage.setItem("alert-leave", "danger");
			localStorage.setItem("alert-leave-msg", "There was an error deleting leave");
		}
		
		
		window.location = "trans-leave.html";
	},
	
	deleteLeave: function() {
		//alert(localStorage.getItem("leave_id"));
		
		$.ajax({
				url        : localStorage.getItem("server") + "leavetransact/deleteleave", 
				type       : "POST",
				dataType   : "json",            
				beforeSend : function(xhr){
					xhr.setRequestHeader('ecode'     , localStorage.getItem("ecode") 	);
					xhr.setRequestHeader('leaveid' ,  localStorage.getItem("leave_id"));
					xhr.setRequestHeader('empnumber' , empnumber);
				},
				success: function(msg) { 
				
					if (msg["return"] ==1) {
						app.onAjaxDoneDelete(0);
					} else {
						app.onAjaxDoneDelete(1);
					}
				},
				error: function(jqXHR	, textStatus, errorThrown) {
					app.onAjaxDoneDelete(0);
				}
		});
	
	},
	

	getLeaveList_Initial: function(){
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
		app.ajaxLeaves("current");
		var totalHeight = parseInt($("#botNav").height()) + (parseInt($("#botNav").css("padding-top")) * 8)
		$("#addButton").css("bottom", totalHeight );
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
	
	onViewDetails: function(leaveId) {
		localStorage.setItem("leave_id", leaveId);
		window.location = "trans-leave-details.html";
	},

    onDeviceReady: function() {


	
    },
    
    receivedEvent: function(id) {

    },
	
	onYearChange: function() {
		app.ajaxLeaves($("#leaveYear").val());
	},

    
    toggleMenu: function() {
		
		slideout.toggle();
		if (slideout.isOpen()) {
				$("#botNav").fadeOut();
		} else {
				$("#botNav").fadeIn();
				
		}
			   
    },
	
	removeDay: function(el) {
		$(el).parents("tr").remove() ;
		app.checkTotalDaysFiled();
	},
	
	
	validateApplication: function() {
		if ($("#worksched").val().length <=0) {
			$("#worksched").attr("class" , "form-control border-danger");
			return false;
		} else {
			$("#worksched").attr("class" , "form-control");
		}
		
		if ($("#dayoff1").val() == "-1") {
			$("#dayoff1").attr("class","form-control border-danger");
			return false;
		} else {
			$("#dayoff1").attr("class","form-control");
		}
		
		if ($("#dayoff2").val() == "-1") {
			$("#dayoff2").attr("class","form-control border-danger");
			return false;
		} else {
			$("#dayoff2").attr("class","form-control");
		}
		
		if ($("#leaveType").val() == "-1" ) {
			$("#leaveType").attr("class","form-control w-100 border-danger");
                        $("#leaveHolder-div").attr("class", "border-danger col");
                        
			return false;
		} else {
			$("#leaveType").attr("class","form-control");
                        $("#leaveHolder-div").attr("class", "col");
		}
		
		var findError = 0;
		var findHoliday = 0;
		var findDayOff = 0;
		var findLate = 0;
		$('.dateCounter').each(function(i, obj) {
						
			
			var curDate = new Date($(obj).val());
			
			/*
			Javascript
				1 = monday
				7 = sunday
				
			
			
			*/
			
			var day_off1 = parseInt($("#dayoff1").val())
			var day_off2 = parseInt($("#dayoff2").val())
			
			if (day_off1 == 1) {
				day_off1 = 7;
			} else {
				day_off1=day_off1-1;
			}
			if (day_off2 == 1) {
				day_off2 = 7;
			} else {
				day_off2=day_off2-1;
			}
			
			var SplittedDate = $(obj).val().split('-');
			var reformat = month[SplittedDate[1]] + "/" + SplittedDate[0] + "/" + SplittedDate[2];
				
			var difference = app.getDateDifference( reformat,serverDate);
			
			if ($(obj).val().length <= 0) {
				$(obj).attr("class","dateCounter form-control border-danger");
				findError++;
			} else {
                            
				if (app.checkIfHoliday($(obj).val())) {
					$(obj).attr("class","dateCounter form-control border-danger");
					findHoliday++;
				} else {
					//$(obj).attr("class","dateCounter form-control");
					//alert("curDate:"+curDate.getDay() + " --- " + day_off1  + " ||| " + day_off2);
					if (curDate.getDay() == day_off1 || curDate.getDay() == day_off2){
						$(obj).attr("class","dateCounter form-control border-danger");
						findDayOff++;
					} else {
						//$(obj).attr("class","dateCounter form-control");
						// Sick Leave
						if ($("#leaveData").val() != "1D9B3909DA8A22A9058FA85C3A0CFCFB") {
                                                       // alert(difference);
							if (difference >= 3) {
								findLate++;
							}
						} 
						$(obj).attr("class","dateCounter form-control");
					}
					
				};
				//$(obj).attr("class","dateCounter form-control");
			}
			

			
		});
		
		
                
                
		if (findError > 0) {
			return false;
		}
		
		if (findHoliday > 0) {
			return false;
		}	
		
		if (findDayOff > 0) {
			alert(findDayOff + " of the date selected are/is your dayoff");
			return false;
		}			
		
		if ($("#leaveType").val() == "1D9B3909DA8A22A9058FA85C3A0CFCFB") {
			if ($("#reasonLeave").val().length == 0 ) {
				$("#reasonLeave").attr("class","form-control border-danger");
				return false;
			} else {
				$("#reasonLeave").attr("class","form-control");
			}
		}
		
		
		if (findLate>0) {
			$(".reasonLate").show();
			if ($("#reasonLate").val().length <= 0 ) {
				$("#reasonLate").attr("class","form-control reasonLate border-danger");
				return false;
			} else {
				$("#reasonLate").attr("class","form-control reasonLate");
			}
		} else {
			$(".reasonLate").hide();
		};
		
		return true;
	},
	
	getDateDifference : function (serverDate, dateString) {
		
		var date1 = new Date(serverDate);
		var date2 = new Date(dateString);
		
		
		
		var timeDiff = Math.abs(date2.getTime() - date1.getTime());
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
		
		
		if (date1 > date2) {
			return -1;
		} else if (date1 < date2) {
			return diffDays;
		}
		
		

	},
	
	submitApplication: function() {
		
	
		if (app.validateApplication()) {
				
			var LeaveApplication = {
				employeeNumber : empnumber,
				worksched : $("#worksched").val(),
				dayoff1   : $("#dayoff1").val(),
				dayoff2   : $("#dayoff2").val(),
				leaveType : $("#leaveType").val(),
				totalDays : $("#totalDaysFiled").val(),
				reasonLeave : $("#reasonLeave").val(),
				reasonLate : $("#reasonLate").val(),
			}
			
			var days = {};
			
			var counter = 0;
			$('.idHolder').each(function(i, obj) {
				days[counter.toString()] = {
					"date" : $("#date" + $(obj).val()).val(),
					"dayType" : $("#dayType" + $(obj).val()).val()
				}
				
				counter++;
			});
			
			//alert(JSON.stringify(days));
			
			$.ajax({
				url        : localStorage.getItem("server") + "leavetransact/submitleave", 
				type       : "POST",            
				beforeSend : function(xhr){
					xhr.setRequestHeader('LeaveApplication' ,  JSON.stringify(LeaveApplication));
					xhr.setRequestHeader('LeaveDays' , JSON.stringify(days));
					xhr.setRequestHeader('actionType', $("#actionType").val());
					xhr.setRequestHeader('leaveId', $("#leaveAppId").val());
					xhr.setRequestHeader('ecode'     , localStorage.getItem("ecode") 	);
				},
				success: function(msg) { 
                                        //alert(JSON.stringify(msg));
					localStorage.setItem("alert-leave", "success");
					if ($("#actionType").val() == "new") {
						localStorage.setItem("alert-leave-msg", "Leave created successfully");
					} else {
						localStorage.setItem("alert-leave-msg", "Leave updated successfully");
					}
					window.location = "trans-leave.html";
				},
				error: function(jqXHR	, textStatus, errorThrown) {
					alert("There was an error with your request, please try again");
					//alert(JSON.stringify(jqXHR));
				}
			}); 
			
			
			
		} 
		
		
	},
	
	checkIfHoliday: function(dateToCheck) {
		
		var isHoliday = false;
		
		for(i=0;i<holidaysTotal; i++ ){
			var fromDate = new Date(holidays[i.toString()]["dateFrom"]);
			var toDate = new Date(holidays[i.toString()]["dateTo"]);
			var toCheck = new Date(dateToCheck);
			if (  toCheck >= fromDate && toCheck <= toDate ) {
				isHoliday = true;
				return false;
				
			};
			
		}
		return isHoliday;
	},
	
	checkTotalDaysFiled : function() {
		
		dayCounter = 0;
		var counter = 0;
		$('.dayType').each(function(i, obj) {
			
			if ($(obj).val() == "0") {
				dayCounter = dayCounter +  1;
			} else {
				dayCounter = dayCounter + 0.5;
				
			}
			
			counter++;
		});
		
		
		if ($("#leaveType").val() == "1D9B3909DA8A22A9058FA85C3A0CFCFB"){
			//For Sick Leave 
			
			if (counter == 3 ) {
				$("#addButton").hide();
				$("#clearButton").hide();
			} else {
				$("#addButton").show();
				$("#clearButton").show();
			}
			
		} else if ($("#leaveType").val() == "D0CFC7C3BCDD77C3B7033A8409325E0D" ) {
			$("#addButton").hide();
		}else {
			
			
			$("#addButton").show();
		}
		
		$("#totalDaysFiled").val(dayCounter);
		$("#totalDaysHolder").html($("#totalDaysFiled").val());
	
	},
	
	
	clearDay:function(){
		$("#dateTable").html("");
			
			app.addDay();
	},
	
	checkDatePickerOptions: function() {
		
		var serverDt = new Date(serverDate);
		var bday = new Date(empBirthdate);
		var month_i = bday.getMonth()+1
		var formatted = month_i.toString() + "/" + bday.getDate() + "/" + serverDt.getFullYear();
		//alert(formatted);
		if ($("#leaveType").val() == "D0CFC7C3BCDD77C3B7033A8409325E0D"){
			$('.dateCounter').datepicker('destroy');
			$('.dateCounter').datepicker( {
				changeMonth : true, changeYear : true, minDate : new Date(formatted), maxDate : new Date((new Date).getFullYear() + 1, 11, 31), yearRange : serverDt.getFullYear() + ":c+1", firstDay : 7, dateFormat : 'dd-M-yy'
			});
		} else if ($("#leaveType").val() == "1D9B3909DA8A22A9058FA85C3A0CFCFB"){
			$('.dateCounter').datepicker('destroy');
			$('.dateCounter').datepicker( {
				changeMonth : true, changeYear : true, minDate : new Date(2016, 0, 1), maxDate : "0", yearRange : "2016:c+1", firstDay : 7, dateFormat : 'dd-M-yy'
			});
		} else {
			$('.dateCounter').datepicker('destroy');
			$('.dateCounter').datepicker( {
				changeMonth : true, changeYear : true, minDate : '-30D', yearRange : "2016:c+1", firstDay : 7, dateFormat : 'dd-M-yy'
			});
		}
		
	},
        
        changeLeaveType: function(leaveType) {
          $(".vl-button").attr("class","btn btn-secondary w-100 vl-button leavetype-button");
          $(".sl-button").attr("class","btn btn-secondary w-100 sl-button leavetype-button");
          $(".bl-button").attr("class","btn btn-secondary w-100 bl-button leavetype-button");
          $("." + leaveType + "-button").attr("class","btn btn-warning w-100 " + leaveType + "-button leavetype-button");
          
          if (leaveType == "bl") {
              $("#leaveType").val("D0CFC7C3BCDD77C3B7033A8409325E0D");
          } else if (leaveType == "sl") {
              $("#leaveType").val("1D9B3909DA8A22A9058FA85C3A0CFCFB");
          } else {
              $("#leaveType").val("139762731B9FD2F651EEFA3556C2D39B");
          }
          
          app.onChangeLeaveType();
        
        },
	
	onChangeLeaveType: function() {
		$("#dateTable").html("");
		//alert($("#leaveType").val());
		if ($("#leaveType").val() == "D0CFC7C3BCDD77C3B7033A8409325E0D"){
			//For Birthday Leave
		
			app.addDay();
			$("#clearButton").hide();
			$("#addButton").hide();
		} else if ($("#leaveType").val() == "1D9B3909DA8A22A9058FA85C3A0CFCFB"){
			//For Sick Leave 
			

			app.addDay();
			
			$("#clearButton").show();
			$("#addButton").show();
		} else {
			
			
			app.addDay();
			
			$("#clearButton").show();
			$("#addButton").show();
		}
		
	},
	
	addDay_edit:function(editData){
		
		var totalDays =  $('.dateCounter').length;
		overAll++;
		
		var delButton = "";
		
		var splitted = editData["leave_date"].split("-");
		
		var ref_year = splitted[2];
		var ref_month = month_caps[splitted[1]];
		var ref_day = splitted[0];
		
		var reformatted = ref_year + "-" + ref_month + "-" + ref_day;
		
		if (totalDays > 0){
		
		delButton ='<td>' +
				'<button onclick="app.removeDay(this)" id="remove' + overAll + '" class="removeButton btn text-danger btn-link"><i class="fas fa-trash-alt"></i></button>' + 
			'</td>';
		
		}
		
		var timePeriod = editData["time_period"];
		
		var selectedFlag = ["","",""];
		
		
		if (timePeriod == "WD"){
			selectedFlag[0] = "selected";
		} else if (timePeriod == "AM") {
			selectedFlag[1] = "selected";
		} else if (timePeriod == "PM") {
			selectedFlag[2] = "selected";
		}
		
		$("#dateTable").append('<tr>' +
			'<td>' +
				'<input type="hidden" id="idHolder' +  overAll + '" class="idHolder" value="' + overAll + '"/>' +
				'<input id="date' + overAll + '" class="dateCounter form-control" readonly type="text"/>' + 
			'</td>' + 
			'<td>' + 
				'<select class="dayType form-control" id="dayType' + overAll + '" onchange="app.checkTotalDaysFiled()">'+
					'<option ' + selectedFlag[0] + ' value="0">' + 
						'WHOLE DAY' +
					'</option>' +
					'<option ' + selectedFlag[1] + ' value="1">' +
						'AM' + 
					'</option>' +
					'<option ' + selectedFlag[2] + ' value="2">' + 
						'PM' + 
					'</option>' + 
				'</select>' + 
			'</td>' + 
			
			delButton +
			
		'</tr>');
		

		app.checkDatePickerOptions();	
		
		app.checkTotalDaysFiled();
		$('#date' + overAll).datepicker("setDate", new Date(reformatted) );
		
	},
	
	
	addDay: function() {
		
		
		var totalDays =  $('.dateCounter').length;
		overAll++;
		
		var delButton = "";
		
		if (totalDays > 0){
		
		delButton ='<td>' +
				'<button onclick="app.removeDay(this)" id="remove' + overAll + '" class="removeButton btn text-danger btn-link"><i class="fas fa-trash-alt"></i></button>' + 
			'</td>';
		
		}
		
		$("#dateTable").append('<tr>' +
			'<td>' +
				'<input type="hidden" id="idHolder' +  overAll + '" class="idHolder" value="' + overAll + '"/>' +
				'<input id="date' + overAll + '" class="dateCounter form-control" readonly type="text"/>' + 
			'</td>' + 
			'<td>' + 
				'<select class="dayType form-control" id="dayType' + overAll + '" onchange="app.checkTotalDaysFiled()">'+
					'<option value="0">' + 
						'WHOLE DAY' +
					'</option>' +
					'<option value="1">' +
						'AM' + 
					'</option>' +
					'<option value="2">' + 
						'PM' + 
					'</option>' + 
				'</select>' + 
			'</td>' + 
			
			delButton +
			
		'</tr>');
		
		app.checkDatePickerOptions();	
		app.checkTotalDaysFiled();
		
		
	},
	
	initializeApplication: function() {
		$(".reasonLate").hide();
				
	
		$.ajax({
			url        : localStorage.getItem("server") + "leavetransact/leaveAppData", 
			type       : "POST",
			dataType   : "json",            
			beforeSend : function(xhr){
				xhr.setRequestHeader('empnumber' , empnumber);
				xhr.setRequestHeader('ecode'   , localStorage.getItem("ecode") 	);
			},
			success: function(msg) { 
				
				
				
				$("#credit_sl").html(msg["LeaveBalance"]["SL"]);
				$("#credit_vl").html(msg["LeaveBalance"]["VL"]);
				
				
				empBirthdate = msg["Employee"]["birthdate"];
				holidays = msg["Holidays"];
				holidaysTotal = msg["TotalHolidays"];
				serverDate = msg["ServerDate"].split(' ')[0];
				birthdateLeaveCount = msg["BirthdayLeaveCount"];
			
                                if (birthdateLeaveCount > 0) {
                                    $("#BtnBirthday").remove();
                                }
                                
                                
                                	
				
				if (msg["LastFiled"] != null ) {
					$("#worksched").val(msg["LastFiled"]["workSched"]);
					$("#dayoff1").val(msg["LastFiled"]["dayOff1"]);
					$("#dayoff2").val(msg["LastFiled"]["dayOff2"]);
				}
				
				app.addDay();
				
				if (localStorage.getItem("isEditApplication") == "true"){
					$("#actionType").val("edit");
					app.initializeEdit();
					
				} else {
					$("#actionType").val("new");
					$("#loadingGif").hide();
					$("#contentHolder").show();
				}
			},
			error: function(jqXHR	, textStatus, errorThrown) {
				alert(JSON.stringify(jqXHR));
			}
		}); 
		//alert("TEST");
		
		
		
		
	},
	
	
	initializeEdit: function() {
		
		var leave_id = parseInt(localStorage.getItem("leave_id"));
			$.ajax({
				url        : localStorage.getItem("server") + "leavetransact/leavebyid", 
				type       : "POST",
				dataType   : "json",            
				beforeSend : function(xhr){
					xhr.setRequestHeader('empnumber' , empnumber);
					xhr.setRequestHeader('leaveid' , leave_id);
					xhr.setRequestHeader('ecode'   , localStorage.getItem("ecode") 	);
				},
				success: function(msg) { 
					$("#leaveAppId").val(leave_id);
				
					var leaveType = msg["leave_application"]["leave_type_name"];
					if (leaveType == "VL") {
						$("#leaveType").val("139762731B9FD2F651EEFA3556C2D39B");
                                                $(".vl-button").attr("class","btn btn-primary w-100 vl-button leavetype-button");
					} else if ( leaveType == "SL") {
						$("#leaveType").val("1D9B3909DA8A22A9058FA85C3A0CFCFB");
                                                 $(".sl-button").attr("class","btn btn-primary w-100 sl-button leavetype-button");
					} else {
						$("#leaveType").val("D0CFC7C3BCDD77C3B7033A8409325E0D");
                                                 $(".bl-button").attr("class","btn btn-primary w-100 bl-button leavetype-button");
					}
					app.onChangeLeaveType();
					
					
					$("#dateTable").html("");	
					$.each(msg["leave_details"], function(index, element) {
						app.addDay_edit(element);
						
					});
					
					if (msg["leave_application"]["leave_reason"] != null) {
					$("#reasonLeave").val(msg["leave_application"]["leave_reason"]);
					} 
					if (msg["leave_application"]["leave_late_reason"] != null) {
					$("#reasonLate").val(msg["leave_application"]["leave_late_reason"]);
					}
					$("#loadingGif").hide();
					$("#contentHolder").show();
					localStorage.setItem("isEditApplication", null);
					
					
				},
				error: function(jqXHR	, textStatus, errorThrown) {
					alert(JSON.stringify(jqXHR));
					localStorage.setItem("isEditApplication", null);
				}
			}); 
	},
	
	editLeave:function(){
		
		localStorage.setItem("isEditApplication", "true");
		window.location = "trans-leave-apply.html";
	},
	
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
			app.onViewDetails(lId);
                    }
		}
	},
	
	onTouchStart: function(lId) {
		localStorage.setItem("leave_id", lId);
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
	
	getLeaveDetails:function(){
		var leave_id = parseInt(localStorage.getItem("leave_id"));
		$.ajax({
			url        : localStorage.getItem("server") + "leavetransact/leavebyid", 
			type       : "POST",
			dataType   : "json",            
			beforeSend : function(xhr){
				xhr.setRequestHeader('empnumber' , empnumber);
				xhr.setRequestHeader('leaveid' , leave_id);
				xhr.setRequestHeader('ecode'   , localStorage.getItem("ecode") 	);
			},
			success: function(msg) { 
				//alert(JSON.stringify(msg));
				var leave_app = msg["leave_application"];
				var leave_balance = msg["leave_balance"];
				var leave_details = msg["leave_details"]["0"];
				var leave_status = msg["leave_status"];
				
				$("#leave_type").html(leave_app["leave_type_name"]);
				$("#date_filed").html(leave_app["leave_date"]);
				

				
				
				
				var totalDaysSum = 0;
				
                                if (leave_app["cancel_flag"] == 1) {
                                    
                                    $(".cancelRem").show();
                                        $("#cancel_flag").html("CANCELLED");
                                        $("#remark_cancel").html(leave_app["cancel_reason"]);
                                            
                                    } else {
                                        
                                          $(".cancelRem").hide();
                                    }
				
				$("#leave_status_list").html("");
				$.each(msg["leave_details"], function(index, element) {
					
					var stat_dept = element["approval_flag"];
				
					if (stat_dept == "1"){
						stat_dept = '<div class="text text-success"><i class="fas fa-check"></i>&nbsp;APPROVED</div>';
					} else if (stat_dept == "0") {
						stat_dept = '<div class="text text-danger"><i class="fas fa-times"></i>&nbsp;DISAPPROVED</div>';
					} else {
						stat_dept = '<div class="text text-secondary"><i class="far fa-circle"></i>&nbsp;PENDING</div>';
					}
					
					var stat_hr = element["payment_flag"];
					
					if (stat_hr == "1"){
						stat_hr = '<div class="text text-success"><i class="fas fa-check"></i>&nbsp;WITH PAY</div>';
					} else if (stat_hr == "0") {
						stat_hr = '<div class="text text-danger"><i class="fas fa-times"></i>&nbsp;WITHOUT PAY</div>';
					} else if (stat_hr == "2") {
						stat_hr ='<div class="text text-danger"><i class="fas fa-times"></i>&nbsp;CANCELLED</div>';
					} else {
						stat_hr ='<div class="text text-danger"></div>';
					}
					
					if (stat_dept == '<div class="text text-secondary"><i class="far fa-circle"></i>&nbsp;PENDING</div>') {
						stat_hr = '<div class="text text-secondary"><i class="far fa-circle"></i>&nbsp;PENDING</div>';
					}

					
					totalDaysSum =  element["total_days"];
					
                                        
                                        
                                    
                                        
					$("#leave_status_list").append(
			
					   '<div class="row">' 
					+    '<div class="col col-4 border-right" align="center" >' 
					+	   	'<div class="row">'
					+			'<div class="row">'
					+				'<div class="col-12" >' + element["leave_date"] +  '</div>'
					+				'<div class="col-12" >' + element["week_day"] + '</div>'
					+ 		    '</div>'
					+		'</div>'
					+   '</div>'
					+ 	'<div class="col col-4" align="center">'
						+	'<div class="row">'
						+		'<div class="col-12">'
						+			stat_dept
						+		'</div>'
						+		'<div class="col-12">'
						+			'Dept Head'
						+		'</div>'
						+	'</div>'
						+ '</div>'
						+ '<div class="col col-4" align="center">'
						+	'<div class="row">'
						+		'<div class="col-12">'
						+			stat_hr
						+		'</div>'
						+		'<div class="col-12">'
						+			'HRD Head'
						+		'</div>'
						+	'</div>'
						+ '</div>'
                                                
					+ '</div>'
					+ '</div>'
					);
				});
								
				$("#total_days").html(totalDaysSum);
				
				$("#reason").html(leave_app["leave_reason"]);
				$("#reason_late").html(leave_app["leave_late_reason"]);
				
			
				$("#balance_sl").html(leave_balance["SL"]);
				
				$("#remark_dept").html('<i class="far fa-user"></i>&nbsp;' + leave_status["0"]["approver_name"]);
				$("#remark_dept_date").html('<i class="far fa-clock"></i>&nbsp;' +  leave_status["0"]["rec_ins_dt"]);
				
				$("#remark_hr").html('<i class="far fa-user"></i>&nbsp;' + leave_status["1"]["approver_name"]);
				$("#remark_hr_date").html('<i class="far fa-clock"></i>&nbsp;' +  leave_status["1"]["rec_ins_dt"]);
				
				$("#balance_vl").html(leave_balance["VL"]);
				
				$("#day_with_pay").html(msg["count_withPay"]);
				$("#day_witho_pay").html(msg["count_withoutPay"]);
			},
			error: function(jqXHR	, textStatus, errorThrown) {
				alert(JSON.stringify(jqXHR));
			}
		}); 
						
		
	},
	
	onLogout: function(){
		localStorage.setItem("remember","false");
	}
};
=======
var _0xa443=['beforeclose','close','#sidenav','load','inc.sidenav.html','#botnav-profile','text-warning','onDeviceReady','ajax','leavetransact/leavedata','POST','json','setRequestHeader','ecode','current','leavetransact/leavesbyyear','#leaveholder','html','append','<div\x20class=\x22alert\x20alert-warning\x22>No\x20Record\x20Found</div>','leave-status','leave-list','toString','leave_id','rec_ins_dt','leave_type_name','BIRTHDAY\x20LEAVE','true','false','<div\x20id=\x22row','\x22\x20ontouchstart=\x22app.onTouchStart(\x27','\x27)\x22\x20\x20ontouchend=\x22app.onTouchEnd()\x22\x20class=\x22list-group-item\x20list-group-item-action\x22>','<div\x20class=\x22row\x22>','\x09<div\x20class=\x22col-4\x20font-weight-bold\x20border-right\x22\x20>','<div\x20class=\x22col-12\x20font-weight-bold\x20text-warning\x22\x20align=\x22center\x22>','<h1>','</h1>','</div>','<div\x20class=\x22col-12\x20font-weight-bold\x20text-secondary\x22\x20align=\x22center\x22>','<div\x20class=\x22col-8\x22>','<div\x20class=\x22col-6\x20font-weight-bold\x22>\x20Department\x20Head</div>','<div\x20class=\x22col-6\x20font-weight-bold\x22\x20>\x20HR\x20Department</div>','<input\x20type=\x22hidden\x22\x20id=\x22canEdit','#loadingGif','hide','#leaveYear','each','<option\x20value=\x22','</option>','alert-leave','success','setItem','Leave\x20deleted\x20successfully','danger','alert-leave-msg','There\x20was\x20an\x20error\x20deleting\x20leave','location','trans-leave.html','leaveid','return','onAjaxDoneDelete','addEventListener','scroll','clearTimeout','log','is\x20Scrolling','Scrolling\x20has\x20stopped.','ajaxLeaves','height','#addButton','css','#alert-leave','show','attr','class','alert\x20alert-success','alert\x20alert-danger','val','toggle','isOpen','parents','checkTotalDaysFiled','length','#worksched','form-control','#dayoff1','form-control\x20border-danger','#dayoff2','#leaveType','form-control\x20w-100\x20border-danger','#leaveHolder-div','border-danger\x20col','col','split','getDateDifference','checkIfHoliday','dateCounter\x20form-control\x20border-danger','getDay','#leaveData','1D9B3909DA8A22A9058FA85C3A0CFCFB','\x20of\x20the\x20date\x20selected\x20are/is\x20your\x20dayoff','#reasonLeave','.reasonLate','#reasonLate','form-control\x20reasonLate','abs','getTime','ceil','validateApplication','#totalDaysFiled','.idHolder','#dayType','server','leavetransact/submitleave','stringify','LeaveDays','actionType','#actionType','new','Leave\x20updated\x20successfully','There\x20was\x20an\x20error\x20with\x20your\x20request,\x20please\x20try\x20again','dateFrom','dateTo','#clearButton','#totalDaysHolder','#dateTable','getMonth','getDate','getFullYear','D0CFC7C3BCDD77C3B7033A8409325E0D','.dateCounter','datepicker','destroy',':c+1','dd-M-yy','-30D','2016:c+1','.vl-button','btn\x20btn-secondary\x20w-100\x20vl-button\x20leavetype-button','.sl-button','.bl-button','btn\x20btn-secondary\x20w-100\x20bl-button\x20leavetype-button','-button','btn\x20btn-warning\x20w-100\x20','-button\x20leavetype-button','139762731B9FD2F651EEFA3556C2D39B','onChangeLeaveType','addDay','leave_date','<button\x20onclick=\x22app.removeDay(this)\x22\x20id=\x22remove','\x22\x20class=\x22removeButton\x20btn\x20text-danger\x20btn-link\x22><i\x20class=\x22fas\x20fa-trash-alt\x22></i></button>','time_period','selected','<tr>','<td>','<input\x20type=\x22hidden\x22\x20id=\x22idHolder','\x22\x20class=\x22idHolder\x22\x20value=\x22','\x22/>','<input\x20id=\x22date','\x22\x20class=\x22dateCounter\x20form-control\x22\x20readonly\x20type=\x22text\x22/>','<select\x20class=\x22dayType\x20form-control\x22\x20id=\x22dayType','\x22\x20onchange=\x22app.checkTotalDaysFiled()\x22>','<option\x20','\x20value=\x220\x22>','WHOLE\x20DAY','\x20value=\x221\x22>','\x20value=\x222\x22>','</select>','</tr>','checkDatePickerOptions','#date','setDate','</td>','<option\x20value=\x220\x22>','<option\x20value=\x221\x22>','<option\x20value=\x222\x22>','leavetransact/leaveAppData','#credit_sl','LeaveBalance','#credit_vl','Employee','birthdate','Holidays','TotalHolidays','ServerDate','BirthdayLeaveCount','LastFiled','workSched','dayOff1','initializeEdit','#contentHolder','leavetransact/leavebyid','leave_application','btn\x20btn-primary\x20w-100\x20vl-button\x20leavetype-button','btn\x20btn-primary\x20w-100\x20sl-button\x20leavetype-button','btn\x20btn-primary\x20w-100\x20bl-button\x20leavetype-button','leave_details','leave_reason','leave_late_reason','isEditApplication','trans-leave-apply.html','#optionModal','modal','#canEdit','#editButton','#delButton','#canEditWarning','onViewDetails','doOptionOpen','leave_status','#leave_type','#date_filed','#leave_status_list','approval_flag','<div\x20class=\x22text\x20text-success\x22><i\x20class=\x22fas\x20fa-check\x22></i>&nbsp;APPROVED</div>','<div\x20class=\x22text\x20text-danger\x22><i\x20class=\x22fas\x20fa-times\x22></i>&nbsp;DISAPPROVED</div>','<div\x20class=\x22text\x20text-secondary\x22><i\x20class=\x22far\x20fa-circle\x22></i>&nbsp;PENDING</div>','payment_flag','<div\x20class=\x22text\x20text-success\x22><i\x20class=\x22fas\x20fa-check\x22></i>&nbsp;WITH\x20PAY</div>','<div\x20class=\x22text\x20text-danger\x22><i\x20class=\x22fas\x20fa-times\x22></i>&nbsp;WITHOUT\x20PAY</div>','total_days','<div\x20class=\x22col\x20col-4\x20border-right\x22\x20align=\x22center\x22\x20>','<div\x20class=\x22col-12\x22\x20>','week_day','<div\x20class=\x22col\x20col-4\x22\x20align=\x22center\x22>','<div\x20class=\x22col-12\x22>','Dept\x20Head','HRD\x20Head','#total_days','#reason_late','#balance_sl','approver_name','#remark_dept_date','<i\x20class=\x22far\x20fa-clock\x22></i>&nbsp;','#remark_hr','<i\x20class=\x22far\x20fa-user\x22></i>&nbsp;','#remark_hr_date','#day_with_pay','remember','getItem','empnumber','getElementById','panel','beforeopen','#botNav','fadeOut'];(function(_0x38c7f5,_0x32e1c6){var _0x5ca3bd=function(_0x14159f){while(--_0x14159f){_0x38c7f5['push'](_0x38c7f5['shift']());}};_0x5ca3bd(++_0x32e1c6);}(_0xa443,0x1e5));var _0x3f2f=function(_0x202059,_0x5b48db){_0x202059=_0x202059-0x0;var _0x5450bf=_0xa443[_0x202059];return _0x5450bf;};var slideout;var empnumber;var paged_leave={};var overAll=0x0;var dayCounter=0x0;var empBirthdate='';var serverDate='';var birthdateLeaveCount=0x0;var holidays;var holidaysTotal=0x0;var longpress=![];var menuOpen=![];var isScrolling=![];var month={'Jan':'01','Feb':'02','Mar':'03','Apr':'04','May':'05','Jun':'06','Jul':'07','Aug':'08','Sep':'09','Oct':'10','Nov':'11','Dec':'12'};var month_caps={'JAN':'01','FEB':'02','MAR':'03','APR':'04','MAY':'05','JUN':'06','JUL':'07','AUG':'08','SEP':'09','OCT':'10','NOV':'11','DEC':'12'};var app={'initialize':function(){empnumber=localStorage[_0x3f2f('0x0')](_0x3f2f('0x1'));slideout=new Slideout({'panel':document[_0x3f2f('0x2')](_0x3f2f('0x3')),'menu':document[_0x3f2f('0x2')]('sidenav'),'padding':0x100,'tolerance':0x46});slideout['on'](_0x3f2f('0x4'),function(){isScrolling=!![];$(_0x3f2f('0x5'))[_0x3f2f('0x6')]();});slideout['on'](_0x3f2f('0x7'),function(){$(_0x3f2f('0x5'))['fadeIn']();});slideout['on'](_0x3f2f('0x8'),function(){isScrolling=![];});$(_0x3f2f('0x9'))[_0x3f2f('0xa')](_0x3f2f('0xb'));$(_0x3f2f('0xc'))['addClass'](_0x3f2f('0xd'));},'bindEvents':function(){app[_0x3f2f('0xe')]();},'ajaxLeaves':function(_0x1fb6da){$[_0x3f2f('0xf')]({'url':localStorage[_0x3f2f('0x0')]('server')+_0x3f2f('0x10'),'type':_0x3f2f('0x11'),'dataType':_0x3f2f('0x12'),'beforeSend':function(_0x471994){_0x471994[_0x3f2f('0x13')]('empnumber',localStorage[_0x3f2f('0x0')]('empnumber'));_0x471994[_0x3f2f('0x13')](_0x3f2f('0x14'),localStorage[_0x3f2f('0x0')](_0x3f2f('0x14')));},'success':function(_0x53983f){var _0x2268e8=_0x1fb6da;if(_0x1fb6da==_0x3f2f('0x15')){_0x2268e8=parseInt(_0x53983f['0']);}$[_0x3f2f('0xf')]({'url':localStorage[_0x3f2f('0x0')]('server')+_0x3f2f('0x16'),'type':_0x3f2f('0x11'),'dataType':_0x3f2f('0x12'),'beforeSend':function(_0x2bfa2c){_0x2bfa2c[_0x3f2f('0x13')]('empnumber',empnumber);_0x2bfa2c['setRequestHeader']('ecode',localStorage[_0x3f2f('0x0')](_0x3f2f('0x14')));_0x2bfa2c[_0x3f2f('0x13')]('leaveyear',_0x2268e8);},'success':function(_0x53983f){var _0x2c2229=0x0;var _0x4118fd=0x0;$(_0x3f2f('0x17'))[_0x3f2f('0x18')]('');$['each'](_0x53983f['leave-list'],function(_0x32b5ca,_0x4af849){_0x4118fd++;_0x2c2229++;});if(_0x4118fd==0x0){$(_0x3f2f('0x17'))[_0x3f2f('0x19')](_0x3f2f('0x1a'));}for(x=_0x4118fd-0x1;x>=0x0;x--){var _0x2e8f47='';if(_0x53983f[_0x3f2f('0x1b')]['dh'][_0x53983f[_0x3f2f('0x1c')][x[_0x3f2f('0x1d')]()]['leave_id']]!=null){_0x2e8f47=_0x53983f['leave-status']['dh'][_0x53983f[_0x3f2f('0x1c')][x['toString']()][_0x3f2f('0x1e')]][_0x3f2f('0x1f')];}var _0xd82536='';if(_0x53983f[_0x3f2f('0x1b')]['hr'][_0x53983f[_0x3f2f('0x1c')][x['toString']()][_0x3f2f('0x1e')]]!=null){_0xd82536=_0x53983f[_0x3f2f('0x1b')]['hr'][_0x53983f[_0x3f2f('0x1c')][x[_0x3f2f('0x1d')]()][_0x3f2f('0x1e')]][_0x3f2f('0x1f')];}var _0x407d74='';if(_0x53983f[_0x3f2f('0x1c')][x[_0x3f2f('0x1d')]()][_0x3f2f('0x20')]==_0x3f2f('0x21')){_0x407d74='BL';}else{_0x407d74=_0x53983f[_0x3f2f('0x1c')][x[_0x3f2f('0x1d')]()]['leave_type_name'];}var _0x5d4eb4=0x0;var _0x198c59=_0x3f2f('0x22');if(_0x2e8f47==''){_0x198c59=_0x3f2f('0x22');}else{_0x198c59=_0x3f2f('0x23');}$(_0x3f2f('0x17'))[_0x3f2f('0x19')](_0x3f2f('0x24')+_0x53983f[_0x3f2f('0x1c')][x[_0x3f2f('0x1d')]()]['leave_id']+_0x3f2f('0x25')+_0x53983f[_0x3f2f('0x1c')][x[_0x3f2f('0x1d')]()][_0x3f2f('0x1e')]+_0x3f2f('0x26')+_0x3f2f('0x27')+_0x3f2f('0x28')+_0x3f2f('0x27')+_0x3f2f('0x29')+_0x3f2f('0x2a')+_0x407d74+_0x3f2f('0x2b')+_0x3f2f('0x2c')+_0x3f2f('0x2d')+_0x53983f[_0x3f2f('0x1c')][x['toString']()]['leave_date']+'</div>'+_0x3f2f('0x2c')+_0x3f2f('0x2c')+_0x3f2f('0x2e')+_0x3f2f('0x27')+_0x3f2f('0x2f')+'<div\x20class=\x22col-6\x20\x22\x20>'+_0x2e8f47+_0x3f2f('0x2c')+_0x3f2f('0x2c')+_0x3f2f('0x27')+_0x3f2f('0x30')+'<div\x20class=\x22col-6\x22\x20>'+_0xd82536+_0x3f2f('0x2c')+_0x3f2f('0x31')+_0x53983f['leave-list'][x[_0x3f2f('0x1d')]()][_0x3f2f('0x1e')]+'\x22\x20value=\x22'+_0x198c59+'\x22>'+'</div>'+'</div>'+_0x3f2f('0x2c')+_0x3f2f('0x2c'));_0x5d4eb4++;}$(_0x3f2f('0x32'))[_0x3f2f('0x33')]();},'error':function(_0x1e1c3d,_0xc763bf,_0x2b326e){}});$(_0x3f2f('0x34'))[_0x3f2f('0x18')]('');$[_0x3f2f('0x35')](_0x53983f,function(_0x437a78,_0x21024){$(_0x3f2f('0x34'))[_0x3f2f('0x19')](_0x3f2f('0x36')+_0x53983f[_0x437a78]+'\x22>'+_0x21024+_0x3f2f('0x37'));});if(_0x1fb6da!=_0x3f2f('0x15')){$(_0x3f2f('0x34'))['val'](_0x1fb6da);}},'error':function(_0x283dd2,_0x35d2a6,_0x1b51b7){}});},'onAjaxDoneDelete':function(_0x5aa5b4){if(_0x5aa5b4==0x1){localStorage['setItem'](_0x3f2f('0x38'),_0x3f2f('0x39'));localStorage[_0x3f2f('0x3a')]('alert-leave-msg',_0x3f2f('0x3b'));}else{localStorage['setItem'](_0x3f2f('0x38'),_0x3f2f('0x3c'));localStorage[_0x3f2f('0x3a')](_0x3f2f('0x3d'),_0x3f2f('0x3e'));}window[_0x3f2f('0x3f')]=_0x3f2f('0x40');},'deleteLeave':function(){$[_0x3f2f('0xf')]({'url':localStorage['getItem']('server')+'leavetransact/deleteleave','type':_0x3f2f('0x11'),'dataType':_0x3f2f('0x12'),'beforeSend':function(_0x550bd1){_0x550bd1[_0x3f2f('0x13')](_0x3f2f('0x14'),localStorage['getItem'](_0x3f2f('0x14')));_0x550bd1[_0x3f2f('0x13')](_0x3f2f('0x41'),localStorage[_0x3f2f('0x0')](_0x3f2f('0x1e')));_0x550bd1[_0x3f2f('0x13')](_0x3f2f('0x1'),empnumber);},'success':function(_0x539a96){if(_0x539a96[_0x3f2f('0x42')]==0x1){app[_0x3f2f('0x43')](0x0);}else{app[_0x3f2f('0x43')](0x1);}},'error':function(_0x286890,_0x3b31e5,_0x259cc7){app['onAjaxDoneDelete'](0x0);}});},'getLeaveList_Initial':function(){window[_0x3f2f('0x44')](_0x3f2f('0x45'),function(_0x45bc36){isScrolling=!![];window[_0x3f2f('0x46')](isScrolling);console[_0x3f2f('0x47')](_0x3f2f('0x48'));isScrolling=setTimeout(function(){isScrolling=![];console[_0x3f2f('0x47')](_0x3f2f('0x49'));},0x1f4);},![]);app[_0x3f2f('0x4a')](_0x3f2f('0x15'));var _0x208b50=parseInt($(_0x3f2f('0x5'))[_0x3f2f('0x4b')]())+parseInt($(_0x3f2f('0x5'))['css']('padding-top'))*0x8;$(_0x3f2f('0x4c'))[_0x3f2f('0x4d')]('bottom',_0x208b50);$(_0x3f2f('0x4e'))[_0x3f2f('0x33')]();if(localStorage['getItem'](_0x3f2f('0x38'))=='success'){$(_0x3f2f('0x4e'))[_0x3f2f('0x4f')]();$(_0x3f2f('0x4e'))[_0x3f2f('0x50')](_0x3f2f('0x51'),_0x3f2f('0x52'));$(_0x3f2f('0x4e'))[_0x3f2f('0x18')](localStorage[_0x3f2f('0x0')](_0x3f2f('0x3d')));}else if(localStorage[_0x3f2f('0x0')](_0x3f2f('0x38'))=='danger'){$(_0x3f2f('0x4e'))[_0x3f2f('0x4f')]();$(_0x3f2f('0x4e'))[_0x3f2f('0x50')]('class',_0x3f2f('0x53'));$(_0x3f2f('0x4e'))['html'](localStorage[_0x3f2f('0x0')](_0x3f2f('0x3d')));}else{};localStorage[_0x3f2f('0x3a')](_0x3f2f('0x38'),null);},'onViewDetails':function(_0x502c51){localStorage[_0x3f2f('0x3a')](_0x3f2f('0x1e'),_0x502c51);window[_0x3f2f('0x3f')]='trans-leave-details.html';},'onDeviceReady':function(){},'receivedEvent':function(_0x3020df){},'onYearChange':function(){app['ajaxLeaves']($(_0x3f2f('0x34'))[_0x3f2f('0x54')]());},'toggleMenu':function(){slideout[_0x3f2f('0x55')]();if(slideout[_0x3f2f('0x56')]()){$(_0x3f2f('0x5'))[_0x3f2f('0x6')]();}else{$(_0x3f2f('0x5'))['fadeIn']();}},'removeDay':function(_0x3c3380){$(_0x3c3380)[_0x3f2f('0x57')]('tr')['remove']();app[_0x3f2f('0x58')]();},'validateApplication':function(){if($('#worksched')[_0x3f2f('0x54')]()[_0x3f2f('0x59')]<=0x0){$(_0x3f2f('0x5a'))[_0x3f2f('0x50')](_0x3f2f('0x51'),'form-control\x20border-danger');return![];}else{$('#worksched')['attr'](_0x3f2f('0x51'),_0x3f2f('0x5b'));}if($(_0x3f2f('0x5c'))[_0x3f2f('0x54')]()=='-1'){$('#dayoff1')[_0x3f2f('0x50')](_0x3f2f('0x51'),_0x3f2f('0x5d'));return![];}else{$(_0x3f2f('0x5c'))[_0x3f2f('0x50')](_0x3f2f('0x51'),'form-control');}if($(_0x3f2f('0x5e'))[_0x3f2f('0x54')]()=='-1'){$(_0x3f2f('0x5e'))[_0x3f2f('0x50')](_0x3f2f('0x51'),_0x3f2f('0x5d'));return![];}else{$(_0x3f2f('0x5e'))[_0x3f2f('0x50')](_0x3f2f('0x51'),_0x3f2f('0x5b'));}if($(_0x3f2f('0x5f'))[_0x3f2f('0x54')]()=='-1'){$(_0x3f2f('0x5f'))['attr'](_0x3f2f('0x51'),_0x3f2f('0x60'));$(_0x3f2f('0x61'))[_0x3f2f('0x50')](_0x3f2f('0x51'),_0x3f2f('0x62'));return![];}else{$('#leaveType')[_0x3f2f('0x50')](_0x3f2f('0x51'),_0x3f2f('0x5b'));$(_0x3f2f('0x61'))[_0x3f2f('0x50')](_0x3f2f('0x51'),_0x3f2f('0x63'));}var _0x3263a0=0x0;var _0x4b13dd=0x0;var _0x492d71=0x0;var _0x50121b=0x0;$('.dateCounter')[_0x3f2f('0x35')](function(_0x278aa9,_0x14a624){var _0x54b124=new Date($(_0x14a624)['val']());var _0x47fb1c=parseInt($(_0x3f2f('0x5c'))['val']());var _0x363e53=parseInt($(_0x3f2f('0x5e'))[_0x3f2f('0x54')]());if(_0x47fb1c==0x1){_0x47fb1c=0x7;}else{_0x47fb1c=_0x47fb1c-0x1;}if(_0x363e53==0x1){_0x363e53=0x7;}else{_0x363e53=_0x363e53-0x1;}var _0x367f27=$(_0x14a624)[_0x3f2f('0x54')]()[_0x3f2f('0x64')]('-');var _0x3d8ac7=month[_0x367f27[0x1]]+'/'+_0x367f27[0x0]+'/'+_0x367f27[0x2];var _0x155e64=app[_0x3f2f('0x65')](serverDate,_0x3d8ac7);if($(_0x14a624)[_0x3f2f('0x54')]()[_0x3f2f('0x59')]<=0x0){$(_0x14a624)[_0x3f2f('0x50')](_0x3f2f('0x51'),'dateCounter\x20form-control\x20border-danger');_0x3263a0++;}else{if(app[_0x3f2f('0x66')]($(_0x14a624)[_0x3f2f('0x54')]())){$(_0x14a624)[_0x3f2f('0x50')](_0x3f2f('0x51'),_0x3f2f('0x67'));_0x4b13dd++;}else{if(_0x54b124[_0x3f2f('0x68')]()==_0x47fb1c||_0x54b124[_0x3f2f('0x68')]()==_0x363e53){$(_0x14a624)[_0x3f2f('0x50')](_0x3f2f('0x51'),_0x3f2f('0x67'));_0x492d71++;}else{if($(_0x3f2f('0x69'))[_0x3f2f('0x54')]()!=_0x3f2f('0x6a')){if(_0x155e64<=0x3){_0x50121b++;}}$(_0x14a624)[_0x3f2f('0x50')]('class','dateCounter\x20form-control');}};}});if(_0x3263a0>0x0){return![];}if(_0x4b13dd>0x0){return![];}if(_0x492d71>0x0){alert(_0x492d71+_0x3f2f('0x6b'));return![];}if($('#leaveType')[_0x3f2f('0x54')]()==_0x3f2f('0x6a')){if($(_0x3f2f('0x6c'))['val']()[_0x3f2f('0x59')]==0x0){$(_0x3f2f('0x6c'))['attr'](_0x3f2f('0x51'),_0x3f2f('0x5d'));return![];}else{$(_0x3f2f('0x6c'))[_0x3f2f('0x50')]('class','form-control');}}if(_0x50121b>0x0){$(_0x3f2f('0x6d'))[_0x3f2f('0x4f')]();if($(_0x3f2f('0x6e'))[_0x3f2f('0x54')]()[_0x3f2f('0x59')]<=0x0){$(_0x3f2f('0x6e'))[_0x3f2f('0x50')](_0x3f2f('0x51'),'form-control\x20reasonLate\x20border-danger');return![];}else{$(_0x3f2f('0x6e'))['attr'](_0x3f2f('0x51'),_0x3f2f('0x6f'));}}else{$(_0x3f2f('0x6d'))[_0x3f2f('0x33')]();};return!![];},'getDateDifference':function(_0x48f005,_0x5a2ea5){var _0x4f8547=new Date(_0x48f005);var _0x15557b=new Date(_0x5a2ea5);var _0x13b62c=Math[_0x3f2f('0x70')](_0x15557b[_0x3f2f('0x71')]()-_0x4f8547['getTime']());var _0xdbdd17=Math[_0x3f2f('0x72')](_0x13b62c/(0x3e8*0xe10*0x18));if(_0x4f8547>_0x15557b){return-0x1;}else if(_0x4f8547<_0x15557b){return _0xdbdd17;}},'submitApplication':function(){if(app[_0x3f2f('0x73')]()){var _0x4da7e={'employeeNumber':empnumber,'worksched':$(_0x3f2f('0x5a'))['val'](),'dayoff1':$(_0x3f2f('0x5c'))[_0x3f2f('0x54')](),'dayoff2':$(_0x3f2f('0x5e'))[_0x3f2f('0x54')](),'leaveType':$('#leaveType')[_0x3f2f('0x54')](),'totalDays':$(_0x3f2f('0x74'))[_0x3f2f('0x54')](),'reasonLeave':$(_0x3f2f('0x6c'))['val'](),'reasonLate':$(_0x3f2f('0x6e'))[_0x3f2f('0x54')]()};var _0x3af4f8={};var _0x22bc38=0x0;$(_0x3f2f('0x75'))['each'](function(_0x356e60,_0x5d9a91){_0x3af4f8[_0x22bc38[_0x3f2f('0x1d')]()]={'date':$('#date'+$(_0x5d9a91)['val']())[_0x3f2f('0x54')](),'dayType':$(_0x3f2f('0x76')+$(_0x5d9a91)[_0x3f2f('0x54')]())['val']()};_0x22bc38++;});$[_0x3f2f('0xf')]({'url':localStorage[_0x3f2f('0x0')](_0x3f2f('0x77'))+_0x3f2f('0x78'),'type':_0x3f2f('0x11'),'beforeSend':function(_0x36e782){_0x36e782[_0x3f2f('0x13')]('LeaveApplication',JSON[_0x3f2f('0x79')](_0x4da7e));_0x36e782[_0x3f2f('0x13')](_0x3f2f('0x7a'),JSON[_0x3f2f('0x79')](_0x3af4f8));_0x36e782[_0x3f2f('0x13')](_0x3f2f('0x7b'),$(_0x3f2f('0x7c'))[_0x3f2f('0x54')]());_0x36e782[_0x3f2f('0x13')]('leaveId',$('#leaveAppId')[_0x3f2f('0x54')]());_0x36e782[_0x3f2f('0x13')]('ecode',localStorage[_0x3f2f('0x0')]('ecode'));},'success':function(_0x54e5a6){alert(JSON[_0x3f2f('0x79')](_0x54e5a6));localStorage[_0x3f2f('0x3a')](_0x3f2f('0x38'),'success');if($(_0x3f2f('0x7c'))[_0x3f2f('0x54')]()==_0x3f2f('0x7d')){localStorage[_0x3f2f('0x3a')](_0x3f2f('0x3d'),'Leave\x20created\x20successfully');}else{localStorage[_0x3f2f('0x3a')](_0x3f2f('0x3d'),_0x3f2f('0x7e'));}window[_0x3f2f('0x3f')]=_0x3f2f('0x40');},'error':function(_0x2abec2,_0x1f6131,_0x4dc899){alert(_0x3f2f('0x7f'));alert(JSON[_0x3f2f('0x79')](_0x2abec2));}});}},'checkIfHoliday':function(_0x4a196c){var _0x4453c0=![];for(i=0x0;i<holidaysTotal;i++){var _0x51549b=new Date(holidays[i['toString']()][_0x3f2f('0x80')]);var _0x46182b=new Date(holidays[i[_0x3f2f('0x1d')]()][_0x3f2f('0x81')]);var _0x529bb6=new Date(_0x4a196c);if(_0x529bb6>=_0x51549b&&_0x529bb6<=_0x46182b){_0x4453c0=!![];return![];};}return _0x4453c0;},'checkTotalDaysFiled':function(){dayCounter=0x0;var _0x1c5437=0x0;$('.dayType')[_0x3f2f('0x35')](function(_0x27ad0a,_0x3c879c){if($(_0x3c879c)[_0x3f2f('0x54')]()=='0'){dayCounter=dayCounter+0x1;}else{dayCounter=dayCounter+0.5;}_0x1c5437++;});if($(_0x3f2f('0x5f'))['val']()==_0x3f2f('0x6a')){if(_0x1c5437==0x3){$(_0x3f2f('0x4c'))[_0x3f2f('0x33')]();$(_0x3f2f('0x82'))[_0x3f2f('0x33')]();}else{$(_0x3f2f('0x4c'))[_0x3f2f('0x4f')]();$(_0x3f2f('0x82'))['show']();}}else if($('#leaveType')[_0x3f2f('0x54')]()=='D0CFC7C3BCDD77C3B7033A8409325E0D'){$('#addButton')[_0x3f2f('0x33')]();}else{$('#addButton')[_0x3f2f('0x4f')]();}$(_0x3f2f('0x74'))[_0x3f2f('0x54')](dayCounter);$(_0x3f2f('0x83'))[_0x3f2f('0x18')]($('#totalDaysFiled')['val']());},'clearDay':function(){$(_0x3f2f('0x84'))[_0x3f2f('0x18')]('');app['addDay']();},'checkDatePickerOptions':function(){var _0x29d8d3=new Date(serverDate);var _0x3188c0=new Date(empBirthdate);var _0xa8e92b=_0x3188c0[_0x3f2f('0x85')]()+0x1;var _0x438bc9=_0xa8e92b['toString']()+'/'+_0x3188c0[_0x3f2f('0x86')]()+'/'+_0x29d8d3[_0x3f2f('0x87')]();if($('#leaveType')['val']()==_0x3f2f('0x88')){$(_0x3f2f('0x89'))[_0x3f2f('0x8a')](_0x3f2f('0x8b'));$(_0x3f2f('0x89'))[_0x3f2f('0x8a')]({'changeMonth':!![],'changeYear':!![],'minDate':new Date(_0x438bc9),'maxDate':new Date(new Date()[_0x3f2f('0x87')]()+0x1,0xb,0x1f),'yearRange':_0x29d8d3[_0x3f2f('0x87')]()+_0x3f2f('0x8c'),'firstDay':0x7,'dateFormat':'dd-M-yy'});}else if($('#leaveType')[_0x3f2f('0x54')]()=='1D9B3909DA8A22A9058FA85C3A0CFCFB'){$(_0x3f2f('0x89'))[_0x3f2f('0x8a')](_0x3f2f('0x8b'));$(_0x3f2f('0x89'))[_0x3f2f('0x8a')]({'changeMonth':!![],'changeYear':!![],'minDate':new Date(0x7e0,0x0,0x1),'maxDate':'0','yearRange':'2016:c+1','firstDay':0x7,'dateFormat':_0x3f2f('0x8d')});}else{$(_0x3f2f('0x89'))[_0x3f2f('0x8a')](_0x3f2f('0x8b'));$(_0x3f2f('0x89'))[_0x3f2f('0x8a')]({'changeMonth':!![],'changeYear':!![],'minDate':_0x3f2f('0x8e'),'yearRange':_0x3f2f('0x8f'),'firstDay':0x7,'dateFormat':_0x3f2f('0x8d')});}},'changeLeaveType':function(_0x59b7d0){$(_0x3f2f('0x90'))[_0x3f2f('0x50')](_0x3f2f('0x51'),_0x3f2f('0x91'));$(_0x3f2f('0x92'))[_0x3f2f('0x50')](_0x3f2f('0x51'),'btn\x20btn-secondary\x20w-100\x20sl-button\x20leavetype-button');$(_0x3f2f('0x93'))['attr'](_0x3f2f('0x51'),_0x3f2f('0x94'));$('.'+_0x59b7d0+_0x3f2f('0x95'))[_0x3f2f('0x50')](_0x3f2f('0x51'),_0x3f2f('0x96')+_0x59b7d0+_0x3f2f('0x97'));if(_0x59b7d0=='bl'){$(_0x3f2f('0x5f'))[_0x3f2f('0x54')](_0x3f2f('0x88'));}else if(_0x59b7d0=='sl'){$(_0x3f2f('0x5f'))['val']('1D9B3909DA8A22A9058FA85C3A0CFCFB');}else{$(_0x3f2f('0x5f'))[_0x3f2f('0x54')](_0x3f2f('0x98'));}app[_0x3f2f('0x99')]();},'onChangeLeaveType':function(){$('#dateTable')[_0x3f2f('0x18')]('');if($(_0x3f2f('0x5f'))[_0x3f2f('0x54')]()==_0x3f2f('0x88')){app[_0x3f2f('0x9a')]();$(_0x3f2f('0x82'))[_0x3f2f('0x33')]();$(_0x3f2f('0x4c'))[_0x3f2f('0x33')]();}else if($(_0x3f2f('0x5f'))[_0x3f2f('0x54')]()==_0x3f2f('0x6a')){app[_0x3f2f('0x9a')]();$(_0x3f2f('0x82'))[_0x3f2f('0x4f')]();$(_0x3f2f('0x4c'))[_0x3f2f('0x4f')]();}else{app[_0x3f2f('0x9a')]();$('#clearButton')['show']();$(_0x3f2f('0x4c'))[_0x3f2f('0x4f')]();}},'addDay_edit':function(_0x2c644f){var _0x1b41ed=$(_0x3f2f('0x89'))[_0x3f2f('0x59')];overAll++;var _0x52bf89='';var _0x270126=_0x2c644f[_0x3f2f('0x9b')]['split']('-');var _0x30c096=_0x270126[0x2];var _0x1397e4=month_caps[_0x270126[0x1]];var _0x436b1a=_0x270126[0x0];var _0x4a8c22=_0x30c096+'-'+_0x1397e4+'-'+_0x436b1a;if(_0x1b41ed>0x0){_0x52bf89='<td>'+_0x3f2f('0x9c')+overAll+_0x3f2f('0x9d')+'</td>';}var _0x42b18c=_0x2c644f[_0x3f2f('0x9e')];var _0x54d4f0=['','',''];if(_0x42b18c=='WD'){_0x54d4f0[0x0]=_0x3f2f('0x9f');}else if(_0x42b18c=='AM'){_0x54d4f0[0x1]=_0x3f2f('0x9f');}else if(_0x42b18c=='PM'){_0x54d4f0[0x2]=_0x3f2f('0x9f');}$(_0x3f2f('0x84'))[_0x3f2f('0x19')](_0x3f2f('0xa0')+_0x3f2f('0xa1')+_0x3f2f('0xa2')+overAll+_0x3f2f('0xa3')+overAll+_0x3f2f('0xa4')+_0x3f2f('0xa5')+overAll+_0x3f2f('0xa6')+'</td>'+_0x3f2f('0xa1')+_0x3f2f('0xa7')+overAll+_0x3f2f('0xa8')+_0x3f2f('0xa9')+_0x54d4f0[0x0]+_0x3f2f('0xaa')+_0x3f2f('0xab')+_0x3f2f('0x37')+_0x3f2f('0xa9')+_0x54d4f0[0x1]+_0x3f2f('0xac')+'AM'+_0x3f2f('0x37')+_0x3f2f('0xa9')+_0x54d4f0[0x2]+_0x3f2f('0xad')+'PM'+'</option>'+_0x3f2f('0xae')+'</td>'+_0x52bf89+_0x3f2f('0xaf'));app[_0x3f2f('0xb0')]();app[_0x3f2f('0x58')]();$(_0x3f2f('0xb1')+overAll)[_0x3f2f('0x8a')](_0x3f2f('0xb2'),new Date(_0x4a8c22));},'addDay':function(){var _0x399972=$('.dateCounter')[_0x3f2f('0x59')];overAll++;var _0x488790='';if(_0x399972>0x0){_0x488790=_0x3f2f('0xa1')+'<button\x20onclick=\x22app.removeDay(this)\x22\x20id=\x22remove'+overAll+_0x3f2f('0x9d')+_0x3f2f('0xb3');}$(_0x3f2f('0x84'))[_0x3f2f('0x19')](_0x3f2f('0xa0')+_0x3f2f('0xa1')+_0x3f2f('0xa2')+overAll+_0x3f2f('0xa3')+overAll+'\x22/>'+_0x3f2f('0xa5')+overAll+_0x3f2f('0xa6')+_0x3f2f('0xb3')+_0x3f2f('0xa1')+_0x3f2f('0xa7')+overAll+_0x3f2f('0xa8')+_0x3f2f('0xb4')+_0x3f2f('0xab')+'</option>'+_0x3f2f('0xb5')+'AM'+_0x3f2f('0x37')+_0x3f2f('0xb6')+'PM'+'</option>'+_0x3f2f('0xae')+_0x3f2f('0xb3')+_0x488790+_0x3f2f('0xaf'));app[_0x3f2f('0xb0')]();app[_0x3f2f('0x58')]();},'initializeApplication':function(){$(_0x3f2f('0x6d'))[_0x3f2f('0x33')]();$[_0x3f2f('0xf')]({'url':localStorage[_0x3f2f('0x0')](_0x3f2f('0x77'))+_0x3f2f('0xb7'),'type':'POST','dataType':_0x3f2f('0x12'),'beforeSend':function(_0x557b7d){_0x557b7d['setRequestHeader'](_0x3f2f('0x1'),empnumber);_0x557b7d[_0x3f2f('0x13')]('ecode',localStorage['getItem'](_0x3f2f('0x14')));},'success':function(_0x1f89c8){$(_0x3f2f('0xb8'))[_0x3f2f('0x18')](_0x1f89c8[_0x3f2f('0xb9')]['SL']);$(_0x3f2f('0xba'))[_0x3f2f('0x18')](_0x1f89c8[_0x3f2f('0xb9')]['VL']);empBirthdate=_0x1f89c8[_0x3f2f('0xbb')][_0x3f2f('0xbc')];holidays=_0x1f89c8[_0x3f2f('0xbd')];holidaysTotal=_0x1f89c8[_0x3f2f('0xbe')];serverDate=_0x1f89c8[_0x3f2f('0xbf')][_0x3f2f('0x64')]('\x20')[0x0];birthdateLeaveCount=_0x1f89c8[_0x3f2f('0xc0')];if(_0x1f89c8[_0x3f2f('0xc1')]!=null){$(_0x3f2f('0x5a'))[_0x3f2f('0x54')](_0x1f89c8[_0x3f2f('0xc1')][_0x3f2f('0xc2')]);$(_0x3f2f('0x5c'))['val'](_0x1f89c8[_0x3f2f('0xc1')][_0x3f2f('0xc3')]);$('#dayoff2')[_0x3f2f('0x54')](_0x1f89c8[_0x3f2f('0xc1')]['dayOff2']);}app[_0x3f2f('0x9a')]();if(localStorage[_0x3f2f('0x0')]('isEditApplication')=='true'){$('#actionType')[_0x3f2f('0x54')]('edit');app[_0x3f2f('0xc4')]();}else{$(_0x3f2f('0x7c'))[_0x3f2f('0x54')](_0x3f2f('0x7d'));$(_0x3f2f('0x32'))[_0x3f2f('0x33')]();$(_0x3f2f('0xc5'))[_0x3f2f('0x4f')]();}},'error':function(_0x9602,_0x4c5e69,_0x32ad9d){alert(JSON[_0x3f2f('0x79')](_0x9602));}});},'initializeEdit':function(){var _0xf4a51b=parseInt(localStorage[_0x3f2f('0x0')]('leave_id'));$[_0x3f2f('0xf')]({'url':localStorage[_0x3f2f('0x0')]('server')+_0x3f2f('0xc6'),'type':_0x3f2f('0x11'),'dataType':_0x3f2f('0x12'),'beforeSend':function(_0x250fc5){_0x250fc5[_0x3f2f('0x13')](_0x3f2f('0x1'),empnumber);_0x250fc5[_0x3f2f('0x13')](_0x3f2f('0x41'),_0xf4a51b);_0x250fc5[_0x3f2f('0x13')](_0x3f2f('0x14'),localStorage[_0x3f2f('0x0')]('ecode'));},'success':function(_0x48500f){$('#leaveAppId')[_0x3f2f('0x54')](_0xf4a51b);var _0x34d15c=_0x48500f[_0x3f2f('0xc7')][_0x3f2f('0x20')];if(_0x34d15c=='VL'){$(_0x3f2f('0x5f'))[_0x3f2f('0x54')](_0x3f2f('0x98'));$(_0x3f2f('0x90'))[_0x3f2f('0x50')](_0x3f2f('0x51'),_0x3f2f('0xc8'));}else if(_0x34d15c=='SL'){$('#leaveType')['val'](_0x3f2f('0x6a'));$(_0x3f2f('0x92'))[_0x3f2f('0x50')]('class',_0x3f2f('0xc9'));}else{$(_0x3f2f('0x5f'))[_0x3f2f('0x54')]('D0CFC7C3BCDD77C3B7033A8409325E0D');$(_0x3f2f('0x93'))['attr'](_0x3f2f('0x51'),_0x3f2f('0xca'));}app['onChangeLeaveType']();$(_0x3f2f('0x84'))[_0x3f2f('0x18')]('');$[_0x3f2f('0x35')](_0x48500f[_0x3f2f('0xcb')],function(_0x55d57a,_0x2cdb3c){app['addDay_edit'](_0x2cdb3c);});if(_0x48500f[_0x3f2f('0xc7')][_0x3f2f('0xcc')]!=null){$(_0x3f2f('0x6c'))[_0x3f2f('0x54')](_0x48500f[_0x3f2f('0xc7')][_0x3f2f('0xcc')]);}if(_0x48500f[_0x3f2f('0xc7')]['leave_late_reason']!=null){$('#reasonLate')['val'](_0x48500f['leave_application'][_0x3f2f('0xcd')]);}$(_0x3f2f('0x32'))[_0x3f2f('0x33')]();$('#contentHolder')[_0x3f2f('0x4f')]();localStorage[_0x3f2f('0x3a')](_0x3f2f('0xce'),null);},'error':function(_0xb820a3,_0x4ae6e4,_0x4dcabf){alert(JSON[_0x3f2f('0x79')](_0xb820a3));localStorage[_0x3f2f('0x3a')]('isEditApplication',null);}});},'editLeave':function(){localStorage[_0x3f2f('0x3a')](_0x3f2f('0xce'),_0x3f2f('0x22'));window[_0x3f2f('0x3f')]=_0x3f2f('0xcf');},'onTouchEnd':function(_0x2a3a7f){longpress=![];},'doOptionOpen':function(_0x15181d){if(menuOpen){if(!isScrolling){menuOpen=![];$(_0x3f2f('0xd0'))[_0x3f2f('0xd1')](_0x3f2f('0x4f'));if($(_0x3f2f('0xd2')+_0x15181d)[_0x3f2f('0x54')]()==_0x3f2f('0x23')){$(_0x3f2f('0xd3'))[_0x3f2f('0x33')]();$(_0x3f2f('0xd4'))[_0x3f2f('0x33')]();$(_0x3f2f('0xd5'))[_0x3f2f('0x4f')]();}else{$(_0x3f2f('0xd3'))[_0x3f2f('0x4f')]();$('#delButton')['show']();$('#canEditWarning')[_0x3f2f('0x33')]();}}}else{if(!isScrolling){app[_0x3f2f('0xd6')](_0x15181d);}}},'onTouchStart':function(_0x1628a2){localStorage[_0x3f2f('0x3a')]('leave_id',_0x1628a2);longpress=!![];setTimeout(function(){if(longpress){menuOpen=!![];app[_0x3f2f('0xd7')](_0x1628a2);}else{menuOpen=![];app[_0x3f2f('0xd7')](_0x1628a2);}},0x1f4);},'getLeaveDetails':function(){var _0x589aa3=parseInt(localStorage[_0x3f2f('0x0')]('leave_id'));$['ajax']({'url':localStorage[_0x3f2f('0x0')](_0x3f2f('0x77'))+_0x3f2f('0xc6'),'type':_0x3f2f('0x11'),'dataType':_0x3f2f('0x12'),'beforeSend':function(_0x1ecf3f){_0x1ecf3f[_0x3f2f('0x13')](_0x3f2f('0x1'),empnumber);_0x1ecf3f[_0x3f2f('0x13')](_0x3f2f('0x41'),_0x589aa3);_0x1ecf3f['setRequestHeader'](_0x3f2f('0x14'),localStorage[_0x3f2f('0x0')](_0x3f2f('0x14')));},'success':function(_0x4c3846){var _0x180146=_0x4c3846[_0x3f2f('0xc7')];var _0xb101db=_0x4c3846['leave_balance'];var _0x307b6b=_0x4c3846[_0x3f2f('0xcb')]['0'];var _0x4b633d=_0x4c3846[_0x3f2f('0xd8')];$(_0x3f2f('0xd9'))[_0x3f2f('0x18')](_0x180146[_0x3f2f('0x20')]);$(_0x3f2f('0xda'))[_0x3f2f('0x18')](_0x180146['leave_date']);var _0x71f5d6=0x0;$(_0x3f2f('0xdb'))['html']('');$[_0x3f2f('0x35')](_0x4c3846[_0x3f2f('0xcb')],function(_0x2fa139,_0x8d2f09){var _0x1636ea=_0x8d2f09[_0x3f2f('0xdc')];if(_0x1636ea=='1'){_0x1636ea=_0x3f2f('0xdd');}else if(_0x1636ea=='0'){_0x1636ea=_0x3f2f('0xde');}else{_0x1636ea=_0x3f2f('0xdf');}var _0x393763=_0x8d2f09[_0x3f2f('0xe0')];if(_0x393763=='1'){_0x393763=_0x3f2f('0xe1');}else if(_0x393763=='0'){_0x393763=_0x3f2f('0xe2');}else if(_0x393763=='2'){_0x393763='<div\x20class=\x22text\x20text-danger\x22><i\x20class=\x22fas\x20fa-times\x22></i>&nbsp;CANCELLED</div>';}else{_0x393763='<div\x20class=\x22text\x20text-danger\x22></div>';}if(_0x1636ea=='<div\x20class=\x22text\x20text-secondary\x22><i\x20class=\x22far\x20fa-circle\x22></i>&nbsp;PENDING</div>'){_0x393763=_0x3f2f('0xdf');}_0x71f5d6=_0x8d2f09[_0x3f2f('0xe3')];$(_0x3f2f('0xdb'))[_0x3f2f('0x19')](_0x3f2f('0x27')+_0x3f2f('0xe4')+_0x3f2f('0x27')+_0x3f2f('0x27')+'<div\x20class=\x22col-12\x22\x20>'+_0x8d2f09[_0x3f2f('0x9b')]+'</div>'+_0x3f2f('0xe5')+_0x8d2f09[_0x3f2f('0xe6')]+'</div>'+'</div>'+_0x3f2f('0x2c')+'</div>'+_0x3f2f('0xe7')+'<div\x20class=\x22row\x22>'+'<div\x20class=\x22col-12\x22>'+_0x1636ea+_0x3f2f('0x2c')+_0x3f2f('0xe8')+_0x3f2f('0xe9')+_0x3f2f('0x2c')+_0x3f2f('0x2c')+_0x3f2f('0x2c')+_0x3f2f('0xe7')+'<div\x20class=\x22row\x22>'+_0x3f2f('0xe8')+_0x393763+_0x3f2f('0x2c')+_0x3f2f('0xe8')+_0x3f2f('0xea')+'</div>'+_0x3f2f('0x2c')+_0x3f2f('0x2c')+_0x3f2f('0x2c')+'</div>');});$(_0x3f2f('0xeb'))['html'](_0x71f5d6);$('#reason')[_0x3f2f('0x18')](_0x180146[_0x3f2f('0xcc')]);$(_0x3f2f('0xec'))['html'](_0x180146['leave_late_reason']);$(_0x3f2f('0xed'))[_0x3f2f('0x18')](_0xb101db['SL']);$('#remark_dept')[_0x3f2f('0x18')]('<i\x20class=\x22far\x20fa-user\x22></i>&nbsp;'+_0x4b633d['0'][_0x3f2f('0xee')]);$(_0x3f2f('0xef'))[_0x3f2f('0x18')](_0x3f2f('0xf0')+_0x4b633d['0'][_0x3f2f('0x1f')]);$(_0x3f2f('0xf1'))[_0x3f2f('0x18')](_0x3f2f('0xf2')+_0x4b633d['1'][_0x3f2f('0xee')]);$(_0x3f2f('0xf3'))[_0x3f2f('0x18')](_0x3f2f('0xf0')+_0x4b633d['1'][_0x3f2f('0x1f')]);$('#balance_vl')[_0x3f2f('0x18')](_0xb101db['VL']);$(_0x3f2f('0xf4'))[_0x3f2f('0x18')](_0x4c3846['count_withPay']);$('#day_witho_pay')[_0x3f2f('0x18')](_0x4c3846['count_withoutPay']);},'error':function(_0xdd0b6,_0x50f6b7,_0x2f0cbc){alert(JSON[_0x3f2f('0x79')](_0xdd0b6));}});},'onLogout':function(){localStorage['setItem'](_0x3f2f('0xf5'),_0x3f2f('0x23'));}};
>>>>>>> f7b06d37a675843cbbc2208eec2030b36122c75d
