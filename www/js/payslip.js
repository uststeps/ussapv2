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

        $(".payslipTable" ).hide();
       
        app.bindEvents();
        
        $("#sidenav").load("inc.sidenav.html");
		$("#botnav-payslip").addClass("text-warning");

        
  
    },
    bindEvents: function() {
        app.onDeviceReady();
    },

    onDeviceReady: function() {
       

       $.ajax({
             url        : localStorage.getItem("server") + "payslip/data",
             type       : "POST",
             dataType   : "json",
             beforeSend : function(xhr){
                    xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber") );
                    xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode") );
             },
             success: function(msg) { 
               //global.msg(JSON.stringify(msg));
			   //app.getDateList(msg["payslipDate"], msg["currentYear"]);
			   datesJson = msg["payslipDate"];
			   
			   var totalYear = msg["totalYear"];
			   
			   for (i = (2007 + totalYear) ; i >= 2007 ; i--) {
				    //alert(i);
					$("#dateYear").append(
						"<option value='" + i + "'>" + i + "</option>"
					);
			   }
			     
			   
			   
             },
             error: function(jqXHR	, textStatus, errorThrown) {
               //global.msg(JSON.stringify(jqXHR));
             }
       });
          
          
       /*
       
       */
    },
    receivedEvent: function(id) {
        

    },
	
	onYearSelect: function() {
		$("#datePeriod").html("" +
			"<option value='-1'>Select Period</option>"
		);
		$.each(datesJson[$("#dateYear").val()], function(index, element) {
			$("#datePeriod").append(
				"<option value='" + element.day + "-" +  element.month + "-" + element.year + "'>" + element.day + "-" +  element.month + "-" + element.year + "</option>"
			);
		});
		
		
	},	
	
	onPeriodSelect: function() {
		$("#initialInfo").hide();
		$.ajax({
             url        : localStorage.getItem("server") + "payslip/details",
             type       : "POST",
             dataType   : "json",
             beforeSend : function(xhr) {
                    xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber" ));
                    xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode"     ));
                    xhr.setRequestHeader('pdate'     ,  $("#datePeriod").val()); 
             },
             success: function(msg) { 
				
				if (msg["header"]["total"] == 0) {
					$("#initialInfo").hide();
					$("#payslipDataHolder").hide();
					$("#warningInfo").show();
				} else {
					
					$("#initialInfo").hide();
					$("#warningInfo").hide();
					
					$("#payslipDataHolder").show();
					
					
					$("#periodHolder").html("Pay period : " +  $("#datePeriod").val());
					$("#salaryHolder").html("Php " + msg["header"]["gross_pay"		]);
					
					$("#summary-enum"		).html(	msg["header"]["emp_number"	]);
					$("#summary-pay"		).html(	msg["header"]["payslip_no"	]);
					$("#summary-taxexm"		).html(	msg["header"]["tax_name"	]);
					$("#summary-gross"		).html(	msg["header"]["tax_gross"	]);
					$("#summary-totaldeduc"	).html(	msg["header"]["total_deduc"	]);
					$("#summary-netpay"		).html(	msg["header"]["net_pay"		]);
		
		
					$("#breakdownHolder").html("");
					$.each(msg["breakdown"], function(index, element) {
						//alert(element["name"]);
						var rateString = "";
						if (element["lecture"] == "1") {
							rateString = "&nbsp;Rate: P " + element["rate_lec"];
						};
						var dAmount = "P " + element["amount"];
						if (element["flag"] == "1") {
							dAmount = "(P " + element["amount"] + ")";
						}
						
						$("#breakdownHolder").append(
							"<dt class='col-7 text-secondary'>" +
							element["name"] +
							"<br/>" +
							"<small>Coll: " + element["college"] + 
							rateString + 
							"</small>" + 
							"</dt>" + 
							"<dd class='col-5 text-asphalt text-right'>" +
							dAmount + "</dd>"
						);
					});
					
					$("#payslipDataHolder").show();
				}
			 
				
				
				//global.msg(JSON.stringify(msg));
             },
             error: function(jqXHR	, textStatus, errorThrown) {
                //global.msg(JSON.stringify(jqXHR));
             }
       });
	},
	
	getDateList: function(json, year) {
		//global.msg(JSON.stringify(json[year]));
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
