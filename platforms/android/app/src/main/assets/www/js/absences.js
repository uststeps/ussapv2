var slideout;
var empnumber;
var dateData;
var app = {
    initialize: function() {
        
        slideout = new Slideout({
            'panel'    : document.getElementById('panel'  ),
            'menu'     : document.getElementById('sidenav'),
            'padding'  : 256,
            'tolerance': 70
        });
		
        //Menu open handler
		slideout.on('beforeopen'  , function() { $("#botNav").fadeOut(); });
		//Menu close handler
		slideout.on('beforeclose' , function() { $("#botNav").fadeIn();  });

		
        $("#sidenav"      	   ).load("inc.sidenav.html");
		$("#botnav-attendance" ).addClass("text-warning");
	
        app.bindEvents();
        
    },
    bindEvents: function() {
       app.onDeviceReady();
    },

    onDeviceReady: function() {
      
	   $.ajax({
            url        : localStorage.getItem("server") + "attendance/absencesData",
            type       : "POST",
            dataType   : "json",
            beforeSend : function(xhr){
                   xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber") );
                   xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode"    ) );
            },
            success: function(msg) { 
				dateData = msg["monthyear"];
				$.each(msg["yearlist"], function(index, element) {
					$("#listYear").append("<option value='" + element + "'>" + element + "</option>");
				});	
            },	
            error: function(jqXHR	, textStatus, errorThrown) {
				global.msg("Error connecting to server, please restart the app", "Connectivity issue");
            }
       });
	   
    },
    receivedEvent: function(id) {
    },
	
	onYearSelect: function(){
		$.each(dateData, function(index, element) {
			$("#listMonth").html("<option value='-1'> Select a Month </option>");
			if (element.split(" ")["1"] == $("#listYear").val()) {
				$("#listMonth").append("<option value='" + element + "'>" + element + "</option>");
			}
		});
	},
	
	onMonthSelect: function() {
		if ($("#listMonth").val() == "-1") { } else { app.requestAbsence($("#listMonth").val()); }
	},
    
    toggleMenu: function() {
        slideout.toggle();
		if (slideout.isOpen()) {
				$("#botNav").fadeOut();
		} else {
				$("#botNav").fadeIn();
				
		}
    },
	
	requestAbsence: function(edate) {
		$("#dateHolder").html(edate);
		$.ajax({
            url        : localStorage.getItem("server") + "attendance/absences",
            type       : "POST",
            dataType   : "json",
            beforeSend : function(xhr){
                   xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber") );
                   xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode") );
				   xhr.setRequestHeader('edate'		,  edate);
            },
            success: function(msg) { 
              //global.msg(JSON.stringify(msg));
			  $("#rowHolder").html("");
			  $.each(msg["dataList"], function(i, e) {
				$("#rowHolder").append(
					'<tr class="text-asphalt">'
                    +    '<td class="small">' + e["date"] + '</td><td>' + e["totalDays"] + '</td><td>' + e["totalMinsLate"] + '</td><td>' + e["totalMinsUnder"] + '</td>'
                    + '</tr>'
				);
			  });
			  
			  $("#total1").html(msg["totalDays"  ]);
			  $("#total2").html(msg["totalLate"  ]);
			  $("#total3").html(msg["totalUnder" ]);
            },	
             error: function(jqXHR	, textStatus, errorThrown) {
				global.msg("Error connecting to server, please restart the app", "Connectivity issue");
              // global.msg(JSON.stringify(jqXHR));
             }
       });
	},
	
	
	onLogout: function(){
		localStorage.setItem("remember","false");
	}
 
};
