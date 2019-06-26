var slideout;
var datesJson;
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
     
        app.bindEvents(); 
    },
    
    bindEvents: function() {
        app.onDeviceReady();
    },

    onDeviceReady: function() {

       $.ajax({
             url        : localStorage.getItem("server") + "attendance/overtimeData",
             type       : "POST",
             dataType   : "json",
             beforeSend : function(xhr){
					//
                    xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber") );
                    xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode") );
             },
             success: function(msg) { 
               //global.msg(JSON.stringify(msg));
			   datesJson = msg["datesv3"];
			   
	
			   /*
			   $.each(datesJson, function (i,e){
					$("#listDates").append(
						"<option value='" + e.day + "-" +  e.month + "-" + e.year + "'>" + e.day + "-" +  e.month + "-" + e.year + "</option>"
					);
				});
				*/
			
			   var totalYear = msg["totalYear"];
			   
			    $.each(datesJson, function (i,e){
					if(JSON.stringify(datesJson[i]) == "{}") {
						
					} else {
						$("#listYear").prepend(
							"<option value='" + i + "'>" + i + "</option>"
						);
					}
				});
				$("#listYear").prepend(
					'<option value="-1" selected>Select Year</option>'
				);
				//alert(msg["endYear"]);
				   /*
				   for (i = msg["endYear"] ; i >= 2007 ; i--) {
						//alert(i);
						$("#listDates").append(
							"<option value='" + i + "'>" + i + "</option>"
						);
				   }
				   */
			 
				$("#loading_holder"	).hide();
				$("#the_content"	).show();
			
             },
             error: function(jqXHR	, textStatus, errorThrown) {
               //global.msg(JSON.stringify(jqXHR));
             }
       });
          
    },
	
	onYearSelect: function() {
		$("#listDates").html("<option value='-1'>Select Period</option> ");
		$.each(datesJson[$("#listYear").val()], function (i,e){
			$("#listDates").append(
				"<option value='" + e.day + "-" +  e.month + "-" + e.year + "'>" + e.day + "-" +  e.month + "-" + e.year + "</option>"
			);
		});
		
		
	},
	
	onDateSelect: function() {
		$("#dateHolder").html($("#listDates").val());
		$.ajax({
             url        : localStorage.getItem("server") + "attendance/overtime",
             type       : "POST",
             dataType   : "json",
             beforeSend : function(xhr){
					//xhr.setRequestHeader('empnumber' ,  5128 );
                    xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber") );
                    xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode") );
					xhr.setRequestHeader('pdate'     ,  $("#listDates").val());
             },
             success: function(msg) { 
				//global.msg(JSON.stringify(msg));
				//alert(JSON.stringify(msg));
				var total = 0;
				$("#otHolder").html(
					'<dt class="col-5 text-secondary">Overtime date</dt>'
                    + '<dt class="col-7 text-secondary">Minutes</dt>'
				);
				
				$.each(msg, function(i,e) {
					$("#otHolder").append(
						'<dt class="col-5">' + e["date"] + '</dt>' +
                        '<dd class="col-7 ">' + e["mins"] + '</dd>'
					);
					total++;
				});
				
				if (total == 0) {
					$("#infoInitial").hide();
					$("#infoMain").hide();
					$("#infoWarning").show();
				} else {
					$("#infoInitial").hide();
					$("#infoMain").show();
					$("#infoWarning").hide();
				};
				
             },
             error: function(jqXHR	, textStatus, errorThrown) {
				//alert(JSON.stringify(jqXHR));
               //global.msg(JSON.stringify(jqXHR));
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
	onLogout: function(){
		localStorage.setItem("remember","false");
	}
  
};
