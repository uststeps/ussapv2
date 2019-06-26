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
var slideout ;
var app = {
    initialize: function() {

        slideout = new Slideout({
            'panel'    : document.getElementById('panel'  ),
            'menu'     : document.getElementById('sidenav'),
            'padding'  : 256,
            'tolerance': 70
        });
		slideout.on('beforeopen', function() { $("#botNav").fadeOut();
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
	
	openDatePicker: function() {
		$("#botNav").fadeOut();
		
	},

    onDeviceReady: function() {
        $("#dtrDate"    ).datepicker({
		  onSelect: function(dateText) {
			$("#botNav").fadeIn();
			app.getDTRRecord(dateText);  

			var year 	= dateText.split("/")[2];
			var month 	= dateText.split("/")[0];
			var day 	= dateText.split("/")[1];
			$("#dtrDate").val(day + "-" + months["d" + month] + "-" + year);
				
		  }
		}
		);
		
		
        $("#topbarTitle").html("ATTENDANCE");
   
        // populate dtr table
        $.ajax({
     
            url        : localStorage.getItem("server") + "service/serverdt",
            type       : "POST",
            dataType   : "json",
            beforeSend : function(xhr){
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
			  
			   $("#dtrDate").val(formatted_v2);
			   
               app.getDTRRecord(msg["date"]);
            },
            error: function(jqXHR	, textStatus, errorThrown) {  
               //alert(JSON.stringify(jqXHR));
               //alert(JSON.stringify(textStatus));
               //alert(JSON.stringify(errorThrown));
            }
        });
    },
    
    receivedEvent: function(id) {
    },
    
    onDateSelect: function() {
		//global.msg();
		//global.msg($("#dtrDate").val());

		var year 	= $("#dtrDate").val().split("-")[2];
		var month 	= $("#dtrDate").val().split("-")[1];
		var day 	= $("#dtrDate").val().split("-")[0];
		//console.log("############ ::::::::" + month);
		app.getDTRRecord(months2[month]+"/"+day+"/"+year);  
		$("#dtrDate").val(day + "-" + month + "-" + year);
		

    },
    onDateChange: function() {
		//alert($("#dtrDate").val());
		app.getDTRRecord($("#dtrDate").val());
	},
    getDTRRecord: function(pdate){
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
                 //xhr.setRequestHeader('empnumber' ,  5128 );
				 xhr.setRequestHeader('pdate'     ,  pdate ); 
            },  
            success: function(msg) { 
				//alert("SUCCESS");
				var str = "";
				//global.msg("DATA: " + JSON.stringify(msg));
                var total = Object.keys(msg).length;
				$("#dtrHolder").html(
					"<dt class='col-5'>Time</dt>" + 
                    "<dt class='col-7'>Check Type</dt>"
				);
                for (i=0; i < total; i++) {
                    var color = "success";
					
					if (msg[i].type == "IN") {color = "success";} else {color="danger"};
			
					$("#dtrHolder").append(
						"<dt class='col-5 text-asphalt'>" + msg[i].time + "</dt>" + 
                        "<dd class='col-7 text-" + color + "'>" + msg[i].type + "</dd>"
					);
					/*
						if (msg[i].type =="OUT") { color = "danger";};
						$("#tbody").append(
							"<tr><td>" + msg[i].time + "</td><td class='text-" + color + "'>" + msg[i].type + "</td></tr>"
						);
					*/
					
					
                }
				
				
                if (total==0){
                    $("#dtrHolder").html(
						"<dt class='col-12'>" + 
						"<div class='alert alert-danger'>" +
                            "<i class='far fa-frown-open'></i> Sorry. No Record Found" + 
                        "</div>" +
						"</dt>"
                    );
                }
                
				//global.msg(str);
                //alert(JSON.stringify(msg));  
            },
            error: function(jqXHR	, textStatus, errorThrown) {  
				//global.msg("jqXHR: " + JSON.stringify(jqXHR));
             	//global.msg("STATUS: " + JSON.stringify(textStatus));
				//global.msg("ERROR THROWN: " + JSON.stringify(errorThrown));
            }
        });  
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
		localStorage.setItem("remember","false");
	}
    
};
