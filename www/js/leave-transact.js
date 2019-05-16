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
