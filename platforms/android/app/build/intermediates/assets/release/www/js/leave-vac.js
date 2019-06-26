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
     
            url        : localStorage.getItem("server") + "attendance/leaveData",
            type       : "POST",
            dataType   : "json",
            beforeSend : function(xhr){
                 xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode"     ) );
                 xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber") );
            },  
            success: function(msg) { 
			
			
                //global.msg(JSON.stringify(msg));
				//$("#overallTotal").html(msg["totalSickLeave"]);
				$.each(msg["vacationLeave"], function(index, element) {
					var textcolor = "success";
					
					if (element["available"] == "0") {
						textcolor = "danger";
					}
					
					var buttonString = '<button onclick="app.onViewDetails(\'' +  element["date_from2"] + "\',\'" +  element["date2"] + '\',\'' + element["allowable"] + '\',\'' + element["consumed"] + '\',\'' + 'VL' + '\')" class="btn btn-link small">View Details</button>';
					
					if ( element["consumed"] == 0 ) {
						buttonString = "";
					}
					
					$("#vlDataHolder").append(
						 '<tr class="text-asphalt">' 
                         + '<td>' + element["date_from2"] + ' - ' + element["date2"] + '<br/>'
                         + '<small>'
                         + '<span class="text-secondary">Allowable :</span> ' + element["allowable"] 
                         + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                         + '<span class="text-secondary">Consumed :</span> ' + element["consumed"]
                         + '</small>'
                         + '</td>'
                         + '<td class="text-center">'
                         + '<span class="h4 text-success">' + element["available"] + '</span><br/>'
                         + buttonString
                         + '</td>'
                         + '</tr>'
					);
				});
				
				
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
	
	onViewDetails: function(sDateFrom,sDateTo, sAllowable, sConsumed, sType) {
		localStorage.setItem("LeaveDetailsDateFrom"		, sDateFrom		 );
		localStorage.setItem("LeaveDetailsDateTo"		, sDateTo		 );
		localStorage.setItem("LeaveDetailsAllowable", sAllowable );
		localStorage.setItem("LeaveDetailsConsumed"	, sConsumed	 );
		localStorage.setItem("LeaveDetailsType" , sType);
		
		window.location = "leavedetails.html";
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
