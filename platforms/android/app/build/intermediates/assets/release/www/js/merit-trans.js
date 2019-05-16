<<<<<<< HEAD
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
=======
var _0x23d9=['<dd>','NUM_VALUE','</dd>','<div\x20class=\x22list-group-item\x20list-group-item-action\x22>','<div\x20class=\x22col-12\x20font-weight-bold\x20text-success\x22\x20align=\x22center\x22>','.detailstab','#btnGroup','show','summary','slideUp','#btnSummary','attr','class','btn\x20btn-primary','#btnDetail','btn\x20btn-secondary','slideDown','toggle','isOpen','setItem','leave_id','doOptionOpen','remember','false','getItem','empnumber','getElementById','sidenav','fadeOut','beforeclose','#botNav','fadeIn','#sidenav','inc.sidenav.html','#botnav-performance','addClass','text-warning','onDeviceReady','addEventListener','scroll','clearTimeout','is\x20Scrolling','log','Scrolling\x20has\x20stopped.','server','merittransact/meritdate','json','setRequestHeader','empnum','ecode','each','#meritYear','append','<option\x20value=\x22','DATE','DISPLAY','</option>','#loadingGif','val','ajax','merittransact/meritheader','POST','cutoffdate','#meritHolder','DETAILS','<div\x20id=\x22row','\x22\x20ontouchstart=\x22app.onTouchStart(\x27','\x27)\x22\x20\x20ontouchend=\x22app.onTouchEnd()\x22\x20class=\x22list-group-item\x20list-group-item-action\x22>','<div\x20class=\x22row\x22>','\x09<div\x20class=\x22col-4\x20font-weight-bold\x20border-right\x22\x20>','<div\x20class=\x22col-12\x20font-weight-bold\x20text-warning\x22\x20align=\x22center\x22>','<h1>','</div>','SCORE','<div\x20class=\x22col-12\x20font-weight-bold\x22>','DESCRIPTION','PERCENTAGE','%</div>','<div\x20class=\x22list-group-item\x20bg-dark\x20text-warning\x20list-group-item-action\x20detailstab\x22>','<div\x20class=\x22row\x20bg-dark\x20text-warning\x22>','\x09<div\x20class=\x22col-12\x20font-weight-bold\x20border-right\x20bg-dark\x20text-warning\x22\x20>','<dl\x20class=\x22dl-horizontal\x20merit-dl\x20bg-dark\x20text-warning\x22\x20id=\x22subholder-','\x22>\x20</dl>','#subholder-','<dt>','</dt>'];(function(_0x558b1a,_0x5d0ed5){var _0x210d2b=function(_0x1d2223){while(--_0x1d2223){_0x558b1a['push'](_0x558b1a['shift']());}};_0x210d2b(++_0x5d0ed5);}(_0x23d9,0xc4));var _0x5895=function(_0x96f650,_0x1eedbf){_0x96f650=_0x96f650-0x0;var _0x35ea22=_0x23d9[_0x96f650];return _0x35ea22;};var slideout;var empnumber;var serverDate='';var longpress=![];var menuOpen=![];var isScrolling=![];var month={'Jan':'01','Feb':'02','Mar':'03','Apr':'04','May':'05','Jun':'06','Jul':'07','Aug':'08','Sep':'09','Oct':'10','Nov':'11','Dec':'12'};var month_caps={'JAN':'01','FEB':'02','MAR':'03','APR':'04','MAY':'05','JUN':'06','JUL':'07','AUG':'08','SEP':'09','OCT':'10','NOV':'11','DEC':'12'};var app={'initialize':function(){empnumber=localStorage[_0x5895('0x0')](_0x5895('0x1'));slideout=new Slideout({'panel':document[_0x5895('0x2')]('panel'),'menu':document[_0x5895('0x2')](_0x5895('0x3')),'padding':0x100,'tolerance':0x46});slideout['on']('beforeopen',function(){isScrolling=!![];$('#botNav')[_0x5895('0x4')]();});slideout['on'](_0x5895('0x5'),function(){$(_0x5895('0x6'))[_0x5895('0x7')]();});slideout['on']('close',function(){isScrolling=![];});$(_0x5895('0x8'))['load'](_0x5895('0x9'));$(_0x5895('0xa'))[_0x5895('0xb')](_0x5895('0xc'));},'bindEvents':function(){app[_0x5895('0xd')]();},'initializeMerit':function(){window[_0x5895('0xe')](_0x5895('0xf'),function(_0x59e245){isScrolling=!![];window[_0x5895('0x10')](isScrolling);console['log'](_0x5895('0x11'));isScrolling=setTimeout(function(){isScrolling=![];console[_0x5895('0x12')](_0x5895('0x13'));},0x1f4);},![]);$['ajax']({'url':localStorage['getItem'](_0x5895('0x14'))+_0x5895('0x15'),'type':'POST','dataType':_0x5895('0x16'),'beforeSend':function(_0x35b3fa){_0x35b3fa[_0x5895('0x17')](_0x5895('0x18'),localStorage[_0x5895('0x0')](_0x5895('0x1')));_0x35b3fa[_0x5895('0x17')](_0x5895('0x19'),localStorage['getItem'](_0x5895('0x19')));},'success':function(_0x13a24f){$[_0x5895('0x1a')](_0x13a24f,function(_0x31f890,_0xed851f){$(_0x5895('0x1b'))[_0x5895('0x1c')](_0x5895('0x1d')+_0xed851f[_0x5895('0x1e')]+'\x22>'+_0xed851f[_0x5895('0x1f')]+_0x5895('0x20'));});$(_0x5895('0x21'))['hide']();},'error':function(_0x50cd40,_0x95eeb8,_0x46e0b8){}});},'onDeviceReady':function(){},'receivedEvent':function(_0x30aef5){},'onYearChange':function(){var _0xd7b2bb=$(_0x5895('0x1b'))[_0x5895('0x22')]();$[_0x5895('0x23')]({'url':localStorage[_0x5895('0x0')](_0x5895('0x14'))+_0x5895('0x24'),'type':_0x5895('0x25'),'dataType':_0x5895('0x16'),'beforeSend':function(_0x34a387){_0x34a387[_0x5895('0x17')](_0x5895('0x18'),localStorage[_0x5895('0x0')](_0x5895('0x1')));_0x34a387[_0x5895('0x17')](_0x5895('0x26'),_0xd7b2bb);_0x34a387[_0x5895('0x17')]('ecode',localStorage['getItem']('ecode'));},'success':function(_0x1efce9){$(_0x5895('0x27'))['html']('');var _0x5516ab=0x0;$[_0x5895('0x1a')](_0x1efce9,function(_0x25ab74,_0xafe995){if(_0x25ab74!=_0x5895('0x28')){var _0x4c38ea=_0xafe995['ID'];$(_0x5895('0x27'))[_0x5895('0x1c')](_0x5895('0x29')+_0xafe995['ID']+_0x5895('0x2a')+_0xafe995['ID']+_0x5895('0x2b')+_0x5895('0x2c')+_0x5895('0x2d')+_0x5895('0x2c')+_0x5895('0x2e')+_0x5895('0x2f')+_0xafe995['SCORE']+'%</h1>'+_0x5895('0x30')+'<div\x20class=\x22col-12\x20font-weight-bold\x20text-secondary\x22\x20align=\x22center\x22>'+_0x5895('0x31')+_0x5895('0x30')+_0x5895('0x30')+'</div>'+'<div\x20class=\x22col-8\x22>'+_0x5895('0x2c')+_0x5895('0x32')+_0xafe995[_0x5895('0x33')]+_0x5895('0x30')+_0x5895('0x30')+_0x5895('0x2c')+'<div\x20class=\x22col-12\x20font-weight-bold\x22\x20>PERCENTAGE:\x20'+_0xafe995[_0x5895('0x34')]+_0x5895('0x35')+_0x5895('0x30')+_0x5895('0x30')+_0x5895('0x30')+'</div>');var _0xaf1d3b=0x0;$[_0x5895('0x1a')](_0x1efce9[_0x5895('0x28')],function(_0x4d3142,_0x367ee1){if(_0x4c38ea==_0x367ee1['ID']){_0xaf1d3b++;}});if(_0xaf1d3b>0x0){$(_0x5895('0x27'))['append'](_0x5895('0x36')+_0x5895('0x37')+_0x5895('0x38')+_0x5895('0x39')+_0x4c38ea+_0x5895('0x3a')+'</div>'+_0x5895('0x30')+'</div>');$[_0x5895('0x1a')](_0x1efce9['DETAILS'],function(_0x4b1ed9,_0x5d2cf){if(_0x4c38ea==_0x5d2cf['ID']){$(_0x5895('0x3b')+_0x4c38ea)['append'](_0x5895('0x3c')+_0x5d2cf['DESCRIPTION']+_0x5895('0x3d')+_0x5895('0x3e')+_0x5d2cf[_0x5895('0x3f')]+_0x5895('0x40'));}});}_0x5516ab=parseFloat(_0x5516ab)+parseFloat(_0xafe995[_0x5895('0x31')]);}});$(_0x5895('0x27'))[_0x5895('0x1c')](_0x5895('0x41')+'<div\x20class=\x22row\x22>'+'\x09<div\x20class=\x22col-12\x20font-weight-bold\x20border-right\x22\x20>'+_0x5895('0x2c')+_0x5895('0x42')+'<h1>'+_0x5516ab+'%</h1>'+_0x5895('0x30')+'<div\x20class=\x22col-12\x20font-weight-bold\x20text-secondary\x22\x20align=\x22center\x22>'+'TOTAL\x20SCORE'+'</div>'+_0x5895('0x30')+_0x5895('0x30')+_0x5895('0x30')+_0x5895('0x30'));$(_0x5895('0x43'))['hide']();$(_0x5895('0x44'))[_0x5895('0x45')]();},'error':function(_0x1a7132,_0x26629a,_0x2081c8){}});},'onViewTypeSelect':function(_0x2ad344){if(_0x2ad344==_0x5895('0x46')){$('.detailstab')[_0x5895('0x47')]();$(_0x5895('0x48'))[_0x5895('0x49')](_0x5895('0x4a'),_0x5895('0x4b'));$(_0x5895('0x4c'))['attr']('class',_0x5895('0x4d'));}else{$('.detailstab')[_0x5895('0x4e')]();$(_0x5895('0x48'))['attr'](_0x5895('0x4a'),'btn\x20btn-secondary');$(_0x5895('0x4c'))[_0x5895('0x49')]('class',_0x5895('0x4b'));}},'toggleMenu':function(){slideout[_0x5895('0x4f')]();if(slideout[_0x5895('0x50')]()){$('#botNav')[_0x5895('0x4')]();}else{$(_0x5895('0x6'))[_0x5895('0x7')]();}},'onTouchEnd':function(_0xdf3dd6){longpress=![];},'onTouchStart':function(_0x2bcd74){localStorage[_0x5895('0x51')](_0x5895('0x52'),_0x2bcd74);longpress=!![];setTimeout(function(){if(longpress){menuOpen=!![];app[_0x5895('0x53')](_0x2bcd74);}else{menuOpen=![];app[_0x5895('0x53')](_0x2bcd74);}},0x1f4);},'onLogout':function(){localStorage[_0x5895('0x51')](_0x5895('0x54'),_0x5895('0x55'));}};
>>>>>>> f7b06d37a675843cbbc2208eec2030b36122c75d
