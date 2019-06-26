var slideout;
var app = {
    initialize: function() {

        slideout = new Slideout({
            'panel'    : document.getElementById('panel'  ),
            'menu'     : document.getElementById('sidenav'),
            'padding'  : 256,
            'tolerance': 70
        });
		//Menu on open  handler
		slideout.on('beforeopen'  , function() { $("#botNav").fadeOut(); });
		//Menu on close handler
		slideout.on('beforeclose' , function() { $("#botNav").fadeIn();  });
    
        $("#sidenav"      ).load("inc.sidenav.html"      );
        $("#botnav-attendance").addClass("text-warning");
        app.bindEvents();
        
    
    },
	
    bindEvents: function() {
       app.onDeviceReady();
    },

    onDeviceReady: function() {

		if ( localStorage.getItem("LeaveDetailsType") == "VL") {
				$("#detailsLabel").html("Vacation Leave Detail");
				$("#backLink").attr("href", "vacationleavesummary.html");
			
		} else {
				$("#detailsLabel").html("Sick Leave Detail");
				$("#backLink").attr("href", "sickleavesummary.html");
		};
	
  
        $("#detailsDate").html(localStorage.getItem("LeaveDetailsDateFrom") + " - " + localStorage.getItem("LeaveDetailsDateTo"));
		$("#detailsSummary").html(
			"Allowable : " + 
			localStorage.getItem("LeaveDetailsAllowable") + 
			" &nbsp;&nbsp;&nbsp; Consumed : " + 
			localStorage.getItem("LeaveDetailsConsumed")
		);
		
		
		$("#detailsHolder").html();
		
		var sURL = "getSickLeaveDetails";
		
		if ( localStorage.getItem("LeaveDetailsType") == "VL") {
			sURL = "getVacLeaveDetails";
		}
		
		$.ajax({
			url        : localStorage.getItem("server") + "attendance/" + sURL,
            type       : "POST",
            dataType   : "json",
            beforeSend : function(xhr){
                 xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode"     ) );
				 xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber" ) );
				 xhr.setRequestHeader('dateFrom'  ,  localStorage.getItem("LeaveDetailsDateFrom" ) );
				 xhr.setRequestHeader('dateTo'    ,  localStorage.getItem("LeaveDetailsDateTo"   ) );
            },  
            success: function(msg) { 
			
                //global.msg(JSON.stringify(msg));
				
				//alert(JSON.stringify(msg));
				var total = 0;
				$.each(msg, function(index, element) {
					
					var payFlagString = "Not Entitled";
					
					if (msg[index]["paymentFlag"] == "1") {
						payFlagString = "Entitled";
					}
					
					if (msg[index]["name"] == localStorage.getItem("LeaveDetailsType")) {
					
						$("#detailsHolder").append(
							'<tr class="text-asphalt">' +
								'<td class="small">' +
									'<span class="text-secondary">Leave Date :</span> ' + app.reformatDate(msg[index]["dateFrom"]) + ' to ' +  app.reformatDate(msg[index]["dateTo"]) + ' <br/>'+
									'<span class="text-secondary">Application Date :</span> ' + app.reformatDate(msg[index]["applicationDate"]) + '<br/>' + 
									'<span class="text-secondary">Days Leave :</span>' + msg[index]["daysLeave"] + '<br/>' + 
									'<span class="text-secondary">Reason :</span>' + msg[index]["reason"] + '<br/>' + 
									'<span class="text-secondary">HR Remarks :</span>' + msg[index]["description"] + '<br/>' + 
								'</td>' + 
							'</tr>'
						);
						
						total++;
					};
				});
				
				
				if (total > 0) {
					
					'<tr class="text-danger">' +
                            '<center>' + 'No Record Found' +  '</center>' +
                      '</tr>'
				};
				
            },
            error: function(jqXHR	, textStatus, errorThrown) {  
                //alert(JSON.stringify(jqXHR       ));
                //alert(JSON.stringify(textStatus  ));
                //alert(JSON.stringify(errorThrown ));
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
        
    
    onCheckDtr: function() {
        
    },
	
	reformatDate: function(rawDate){
		var months = [];
			months["01"] = "JAN";
			months["02"] = "FEB";
			months["03"] = "MAR";
			months["04"] = "APR";
			months["05"] = "MAY";
			months["06"] = "JUN";
			months["07"] = "JUL";
			months["08"] = "AUG";
			months["09"] = "SEP";
			months["10"] = "OCT";
			months["11"] = "NOV";
			months["12"] = "DEC";
		
		var rMonth = rawDate.split("/")[0];
		var rDay   = rawDate.split("/")[1];
		var rYear  = rawDate.split("/")[2];
		
		return rDay + "-" + months[rMonth] + "-" + rYear;
	},
	onLogout: function(){
		localStorage.setItem("remember","false");
	}
 
};
