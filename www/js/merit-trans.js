var slideout;
var empnumber;
var serverDate = "";
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
	$("#botnav-performance").addClass("text-warning");
		
       
  
    },
    
    bindEvents: function() {
       app.onDeviceReady();		   
    },
	
    initializeMerit: function(){
        window.addEventListener('scroll', function ( event ) {
            isScrolling = true;
            // Clear our timeout throughout the scroll
            window.clearTimeout( isScrolling );
            console.log( 'is Scrolling' );
            // Set a timeout to run after scrolling ends
            isScrolling = setTimeout(function() {
                isScrolling = false;
                console.log( 'Scrolling has stopped.' );
            }, 500);
        }, false);      
	//alert("TRYING TO FETCH DATE");
        $.ajax({
            url   : localStorage.getItem("server") + "merittransact/meritdate", 
            type       : "POST",
            dataType   : "json",            
            beforeSend : function(xhr){
               // xhr.setRequestHeader('empnum' ,  4800);
                xhr.setRequestHeader('empnum' ,  localStorage.getItem("empnumber" ));
                xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode") 	);
            },
            success: function(msg) { 
                $.each(msg, function(index, element) {
                    $("#meritYear").append(
                        '<option value="'+element["DATE"]+'">'+element["DISPLAY"]+'</option>'
                     );
		});
                
                
                
                $("#loadingGif").hide();
            },
            error: function(jqXHR	, textStatus, errorThrown) {
                //alert(JSON.stringify(jqXHR));
            }
	});            
		
    },
	
    onDeviceReady: function() {

	
    },
    
    receivedEvent: function(id) {

    },
	
    onYearChange: function() {
	//app.ajaxLeaves($("#leaveYear").val());
        var selectedDate = $("#meritYear").val();
        $.ajax({
            url   : localStorage.getItem("server") + "merittransact/meritheader", 
            type       : "POST",
            dataType   : "json",            
            beforeSend : function(xhr){
                //xhr.setRequestHeader('empnum' ,  4800);
                xhr.setRequestHeader('empnum' ,  localStorage.getItem("empnumber" ));
                xhr.setRequestHeader('cutoffdate', selectedDate);
                xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode") 	);
            },
            success: function(msg) {
                $("#meritHolder").html("");
                var totalScore = 0;
                $.each(msg, function(index, element) {
                    
                    if (index != "DETAILS"){
                    var cur_id = element["ID"];
                    $("#meritHolder").append(
                          '<div id="row' + element["ID"] + '" ontouchstart="app.onTouchStart(\'' + element["ID"] + '\')"  ontouchend="app.onTouchEnd()" class="list-group-item list-group-item-action">'
				+ '<div class="row">'
				+ '	<div class="col-4 font-weight-bold border-right" >'
				+		'<div class="row">'
				+			'<div class="col-12 font-weight-bold text-warning" align="center">'
				+				'<h1>' + element["SCORE"] + '%</h1>'
				+ 			'</div>'
				+ 			'<div class="col-12 font-weight-bold text-secondary" align="center">'
				+ 			'SCORE'
				+ 			'</div>'
				+ 		'</div>'
				+ '</div>'
				+ '<div class="col-8">'
				+ '<div class="row">'
                                    + '<div class="col-12 font-weight-bold">' + element["DESCRIPTION"] + '</div>'
				+ '</div>'
				+ '<div class="row">'
                                    +  '<div class="col-12 font-weight-bold" >PERCENTAGE: ' + element["PERCENTAGE"] + '%</div>'
				+ '</div>'
				+ '</div>'
                            + '</div>'
			+ '</div>'
                        
                    
             
                        
                     );
             
                    var dataCounter = 0;
                    $.each(msg["DETAILS"], function(indexCounter, elementCounter) {
                        if (cur_id == elementCounter["ID"]){
                          dataCounter++;
                        }
                    });
                    
                    if (dataCounter > 0) {
                     $("#meritHolder").append(
                         '<div class="list-group-item bg-dark text-warning list-group-item-action detailstab">'
                 
                                      + '<div class="row bg-dark text-warning">'
                                      + '	<div class="col-12 font-weight-bold border-right bg-dark text-warning" >'
                                      + '<dl class="dl-horizontal merit-dl bg-dark text-warning" id="subholder-' +  cur_id  + '"> </dl>'
                                      +		'</div>'
                                      + '</div>'
                        + '</div>'
                    );
             
                    $.each(msg["DETAILS"], function(index2, element2) {
                        if (cur_id == element2["ID"]){
                           $("#subholder-"+cur_id).append(
                               '<dt>' + element2["DESCRIPTION"] + '</dt>'
                               +'<dd>' + element2["NUM_VALUE"] + '</dd>'
                            );
                        }
                    });
                  }
                    
             
                    
                    totalScore = parseFloat(totalScore) + parseFloat(element["SCORE"]);
                 }
		});
                
                
                
                
                
               
                
                
                
                $("#meritHolder").append(
                   '<div class="list-group-item list-group-item-action">'
			+ '<div class="row">'
			+ '	<div class="col-12 font-weight-bold border-right" >'
			+		'<div class="row">'
			+			'<div class="col-12 font-weight-bold text-success" align="center">'
			+				'<h1>' + totalScore + '%</h1>'
			+ 			'</div>'
			+ 			'<div class="col-12 font-weight-bold text-secondary" align="center">'
			+ 			'TOTAL SCORE'
			+ 			'</div>'
			+               '</div>'
                                + '</div>'

                        + '</div>'
                    + '</div>'      
                );
              
               
                $(".detailstab").hide();
                $("#btnGroup").show();
                
            },
            error: function(jqXHR	, textStatus, errorThrown) {
                //alert(JSON.stringify(jqXHR));
            }
	});       
        
        
    },
    onViewTypeSelect: function(viewType) {
        
        if (viewType == "summary") {
            
             
                $(".detailstab").slideUp();
                $("#btnSummary").attr("class","btn btn-primary");
                $("#btnDetail").attr("class","btn btn-secondary");
        } else {
             
                $(".detailstab").slideDown();
                $("#btnSummary").attr("class","btn btn-secondary");
                $("#btnDetail").attr("class","btn btn-primary");
                
            
        }
        
        
    },
    toggleMenu: function() {
	slideout.toggle();
	if (slideout.isOpen()) {
            $("#botNav").fadeOut();
	} else {
            $("#botNav").fadeIn();
	}
			   
    },

    onTouchEnd: function(lId){
		longpress= false;	
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
	
    onLogout: function(){
        localStorage.setItem("remember","false");
    }
};
