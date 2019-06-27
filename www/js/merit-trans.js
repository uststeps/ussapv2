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
                xhr.setRequestHeader('empnum' ,  4800);
              //  xhr.setRequestHeader('empnum' ,  localStorage.getItem("empnumber" ));
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
                xhr.setRequestHeader('empnum' ,  4800);
               // xhr.setRequestHeader('empnum' ,  localStorage.getItem("empnumber" ));
                xhr.setRequestHeader('cutoffdate', selectedDate);
                xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode") 	);
            },
            success: function(msg) {
                $("#categ_holder").html("");
                var totalScore = 0;
                $.each(msg, function(index, element) {
                    
                    if (index != "DETAILS"){
                    var cur_id = element["ID"];
                 
                   totalScore = parseFloat(totalScore) + parseFloat(element["SCORE"]);
                         $("#categ_holder").append(
                                '<div class="col-6  border-right border-bottom ">'
                                +    '<div class="text-center p-4 h-100 box-100">'
                                +        '<h2 class="text-asphalt" >'+ element["SCORE"] + '<small class="text-muted">/' + element['PERCENTAGE'] +' </small></h2>'
                                +        '<p class="small">'
                                +            '<a class="" data-toggle="collapse" href="#row'+element["ID"]+'" role="button" aria-expanded="false" aria-controls="row'+element["ID"]+'">'
                                +            '' + element["DESCRIPTION"] + '<i class="fas fa-angle-down"></i>'
                                +            '</a>'
                                +        '</p>'

                                +        '<div class="collapse" id="row' + element["ID"] + '">'
                                 +            '<small id="sub' + element["ID"] + '">'
            
                                +            '</small>'
                                +        '</div>'
                                +    '</div>'
                                + '</div>'
                       );
                        
        
            
                    var dataCounter = 0;
                    $.each(msg["DETAILS"], function(indexCounter, elementCounter) {
                        if (cur_id == elementCounter["ID"]){
                          dataCounter++;
                        }
                    });
                    
                  
             
                    $.each(msg["DETAILS"], function(index2, element2) {
                        if (cur_id == element2["ID"]){
                    
                           $('#sub' + cur_id).append(
                                   element2["DESCRIPTION"] + '<strong>&nbsp;&nbsp' +element2["NUM_VALUE"] +'</strong> <br/>'
                             
                            );
                        }
                    });
                  }
                       
                    
             
                    
                
                // }
		});
                
                
                   
                    var textColor = "text-danger";
                    if (totalScore >= 85 ) {
                        textColor = "text-success";
                    } else {
                         textColor = "text-danger";
                    };
                    
                  $("#headinfo").html(
                        '<div class="p-3">'
                         +    ' <h5 class="text-center"><small class="text-muted">Evaluation Period</small><br/>' + $("#meritYear option:selected").text() + '</h5>'
                         +    '<h1 class="text-center ' + textColor + '">' + totalScore + '%</h1>'
                         +    '<p class="text-center">Total Score</p>'
                         + '</div>'
                );
 
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
