var slideout;


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
		$("#botnav-attendance").addClass("text-warning");
        app.bindEvents();
        
    
    },
    bindEvents: function() {
        app.onDeviceReady();
    },

    onDeviceReady: function() {
  
         $.ajax({
     
            url        : localStorage.getItem("server") + "attendance/getOtherLeave",
            type       : "POST",
            dataType   : "json",
            beforeSend : function(xhr){
                 xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode"     ) );
                 xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber" ) );
            },  
            success: function(msg) { 
				var totalBday = 0;
				$.each(msg, function(index, element) {
					
										
					var reason = "";
					
					if (msg[index]["reason"] != null) {
						reason = msg[index]["reason"];
					}
					
					var remarks = "";
					
					if (msg[index]["description"] != null) {
						remarks = msg[index]["description"];
					}
					if (msg[index]["name"] == "BIRTHDAY LEAVE") {
					
						$("#bdayLeaveHolder").append(
							'<div class="line"></div>' +

								'<dl class="row p-3 mb-0">' + 
									'<dt class="col-5">Applied Date</dt>' + 
									'<dd class="col-7 text-asphalt">' + app.reformatDate(msg[index]["applicationDate"]) + '</dd>' + 

									'<dt class="col-5">Leave Date</dt>' + 
									'<dd class="col-7 text-asphalt">' +  app.reformatDate(msg[index]["dateFrom"])  + '</dd>' + 

									'<dt class="col-5">Days Leave</dt>' + 
									'<dd class="col-7 text-asphalt">' + msg[index]["daysLeave"] + '</dd>' + 

									'<dt class="col-5">Remarks</dt>' + 
									'<dd class="col-7 text-asphalt">' + remarks + '</dd>' + 
								'</dl>'
					
						);
						totalBday++;
					};
					
				});
				
				
					if (totalBday == 0) {
						$("#bdayLeaveHolder").append(
								'<div class="line"></div>' +

								'<dl class="row p-3 mb-0">' + 
									'<dt class="col-12 text-danger">No Record Found</dt>'  +
								'</dl>'
						);
					} 
				
				
				var totalEmg = 0;
				$.each(msg, function(index, element) {
					
					
					var reason = "";
					
					if (msg[index]["reason"] != null) {
						reason = msg[index]["reason"];
					}
					
					var remarks = "";
					
					if (msg[index]["description"] != null) {
						remarks = msg[index]["description"];
					}
					
					if (msg[index]["name"] != "BIRTHDAY LEAVE") {
					
						$("#emgLeaveHolder").append(
							'<div class="line"></div>' +

							'<dl class="row p-3 mb-0">' + 
									'<dt class="col-5">Applied Date</dt>' + 
									'<dd class="col-7 text-asphalt">' + app.reformatDate(msg[index]["applicationDate"]) + '</dd>' + 

									'<dt class="col-5">Leave Date</dt>' + 
									'<dd class="col-7 text-asphalt">' +  app.reformatDate(msg[index]["dateFrom"])  + ' to <br/>' +  app.reformatDate(msg[index]["dateTo"])  + '</dd>' + 

									'<dt class="col-5">Days Leave</dt>' + 
									'<dd class="col-7 text-asphalt">' + msg[index]["daysLeave"] + '</dd>' + 
									
									
									'<dt class="col-5">Reason</dt>' + 
									'<dd class="col-7 text-asphalt">' + reason + '</dd>' + 

									'<dt class="col-5">Remarks</dt>' + 
									'<dd class="col-7 text-asphalt">' + remarks + '</dd>' + 
							'</dl>'
					
						);
						totalEmg++;
					}
					
					
				});
				
				if (totalEmg == 0) {
						$("#emgLeaveHolder").append(
								'<div class="line"></div>' +

								'<dl class="row p-3 mb-0">' + 
									'<dt class="col-12 text-danger">No Record Found</dt>'  +
								'</dl>'
						);
					} 
				
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
