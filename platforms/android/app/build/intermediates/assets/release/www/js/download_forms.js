<<<<<<< HEAD
var slideout;
var empnumber;
var app = {
    initialize: function() {
		empnumber = localStorage.getItem("empnumber");
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
       
        $("#sidenav"      ).load("inc.sidenav.html");
        
		$("#botnav-forms").addClass("text-warning");
		//alert("GOING BIND");
        app.bindEvents();
    },
    bindEvents: function() {
      app.onDeviceReady();
    },

    onDeviceReady: function() {
       // $("#downloadTable" ).DataTable();
	   
	   	$('#dlSearch').on('input',function(e){
			app.onSearch();
		});
	   
        $("#topbarTitle"   ).html("DOWNLOADABLE FORMS");
        
        $.ajax({
            url      : localStorage.getItem("server") + "downloads/list",
            type     : "POST",
            dataType : "json",
            beforeSend: function(xhr){
               xhr.setRequestHeader('dtype',"form");  
			   xhr.setRequestHeader('ecode',localStorage.getItem("ecode"));
			 
            },
            success: function(msg) { 
				var total = msg["total"];
				//global.msg(JSON.stringify(msg));
				//alert(JSON.stringify(msg));
				
				$.each(msg, function(index, element) {
					
					$("#dlList").append(
					"<div class='download-links bg-white'>" + 
						'<a data-toggle="modal" data-target="#promptModal" onclick="app.getBase64File(\'' + element["name"] + '\')" class="btn-block h5 text-asphalt">' + element["label"] +
							"<br/><small class='text-muted'>Date Uploaded : " + element["date"] + "</small>" +
						"</a>" +
					"</div>"
					);
				});
				
			
              
            },
            error: function(jqXHR	, textStatus, errorThrown) {  
               //alert(JSON.stringify(jqXHR));
            }
        });
        
		
		//app.getBase64File("penaltyforviolationofanti-smokingpolicy-52ea465f-6a21-4318-85fe-0e904643ef7e.pdf");
    },
	
	onSearch: function(){
	
		var txt = $('#dlSearch').val();
		$('.download-links').hide();
		$('.download-links').each(function(){
		   if($(this).text().toUpperCase().indexOf(txt.toUpperCase()) != -1){
			   $(this).show();
		   }
		});
		
	},
	
	onFormRequest: function() {
		//alert("TEST");
	},
	getBase64File: function(filename) {
		//alert("TRYING TO GET BASE 64");
		$.ajax({
            url      : localStorage.getItem("server") + "downloads/getBase64",
            type     : "POST",
            beforeSend: function(xhr){
               xhr.setRequestHeader('filename',filename);  
			   xhr.setRequestHeader('ecode',localStorage.getItem("ecode"));
			   $("#modalMessage").val("Loading file please wait...");
            },
            success: function(data) { 
               //global.msg(JSON.stringify(data));
			   //alert("GOT BASE 64");
			   //alert(data);
			   var extension = filename.substr( (filename.lastIndexOf('.') +1) );
			   var ctype = "";
			   //alert(extension);
			   
			   switch (extension) {
				case 'pdf':
					ctype = "application/pdf";
					break;
				case 'docx':
					ctype = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
					break;
				case 'doc':
					ctype = "application/msword";
					break;
				case 'png':
					ctype = "image/png";
					break;
				case 'jpeg':
					ctype = "image/jpeg";
					break;
				case 'jpg':
					ctype = "image/jpeg";
					break;
				default:
					ctype = "application/pdf";
			   }
			   //alert("GOING TO SAVE");
			   //alert("STORAGE DIRECTORY: " + cordova.file.applicationStorageDirectory + "/Documents" );
			   //alert("DATA DIRECTORY : " + cordova.file.dataDirectory);
			   app.savebase64AsPDF(cordova.file.dataDirectory , filename, data,
				ctype
			   //application/pdf" // for pdf
			    // for docs
			   );
            },
            error: function(jqXHR	, textStatus, errorThrown) {  
				alert("ERROR TRYING TO GET BASE64");
              // alert(JSON.stringify(jqXHR));
			   //alert("TEXT STATUS:" + JSON.stringify(textStatus));
			   //alert("ERROR THROWN: " + JSON.stringify(errorThrown));
            }
        });
        
	},
	
	
	b64toBlob : function(b64Data, contentType, sliceSize) {
		//alert("TRYING TO CONVER");
        contentType = contentType || '';
        sliceSize   = sliceSize || 512;
		//alert(b64Data);
        var byteCharacters  = atob(b64Data);
        var byteArrays 		= [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

      var blob = new Blob(byteArrays, {type: contentType});
	  //alert("CONVERTING FINISHED");
      return blob;
	},
	
	savebase64AsPDF : function(folderpath,filename,content,contentType){
		// Convert the base64 string in a Blob
		var DataBlob = app.b64toBlob(content,contentType);
		
		console.log("Starting to write the file :3");
		//alert("TRYING TO WRITE FILE");
		//alert(folderpath);
		window.resolveLocalFileSystemURL(folderpath, 
			function(dir) {
				console.log("Access to the directory granted succesfully");
				//alert("RESOLVE LOCAL FILE");
				dir.getFile(filename, {create:true}, function(file) {
					console.log("File created succesfully.");
					//alert("GETTING FILE");
					
					file.createWriter(function(fileWriter) {
						console.log("Writing content to file");
						//alert("CONSOLE WRITER START");
						fileWriter.write(DataBlob);
						
						//alert(folderpath);
						cordova.plugins.fileOpener2.open(
							folderpath + "/" + filename, 
							contentType
							, 
							{
								error : function(e){ 
									//global.msg(e.status + " : " + e.message);
									//alert("No application found for this document type.");
									if (e.message == 9 || e.message == "9") {
										$("#modalMessage").val("No application found for this document type.");
									}
									
									// Error 9 if no default/installed word program
								}, 
								success : function(){
									//alert("FILE SUCCESFULLY DOWNLOADED");
									$("#modalMessage").val("File succesfully downloaded");
								} 
							} 
						);
						
					}, function(){
						alert('Unable to save file in path '+ folderpath);
					});
				},function() {
					//alert("GET FILE SUCCESS");
				}, function(){
					alert("ERROR TRYING TO GET FILE");
				});
			}, function(){
				//alert("SUCCESS FILE HANDLING");
			}, function(){
				alert("ERROR FILE HANDLING");
			}
			);
		//alert("GOT PAST FILE SAVING ");
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
=======
var _0x1ddc=['onSearch','#topbarTitle','DOWNLOADABLE\x20FORMS','ajax','server','downloads/list','POST','json','form','setRequestHeader','ecode','total','each','#dlList','append','<div\x20class=\x27download-links\x20bg-white\x27>','<a\x20data-toggle=\x22modal\x22\x20data-target=\x22#promptModal\x22\x20onclick=\x22app.getBase64File(\x27','\x27)\x22\x20class=\x22btn-block\x20h5\x20text-asphalt\x22>','label','<br/><small\x20class=\x27text-muted\x27>Date\x20Uploaded\x20:\x20','date','</small>','</div>','val','.download-links','hide','text','toUpperCase','indexOf','show','downloads/getBase64','#modalMessage','Loading\x20file\x20please\x20wait...','substr','lastIndexOf','pdf','docx','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/msword','png','image/png','image/jpeg','jpg','application/pdf','savebase64AsPDF','file','dataDirectory','ERROR\x20TRYING\x20TO\x20GET\x20BASE64','length','b64toBlob','log','Starting\x20to\x20write\x20the\x20file\x20:3','resolveLocalFileSystemURL','Access\x20to\x20the\x20directory\x20granted\x20succesfully','createWriter','Writing\x20content\x20to\x20file','write','plugins','Unable\x20to\x20save\x20file\x20in\x20path\x20','ERROR\x20TRYING\x20TO\x20GET\x20FILE','ERROR\x20FILE\x20HANDLING','toggle','isOpen','setItem','false','getItem','empnumber','getElementById','panel','sidenav','beforeopen','fadeOut','beforeclose','fadeIn','#sidenav','load','inc.sidenav.html','addClass','text-warning','bindEvents','onDeviceReady','#dlSearch','input'];(function(_0x18b5f5,_0x17072e){var _0x3fdd06=function(_0x52b85d){while(--_0x52b85d){_0x18b5f5['push'](_0x18b5f5['shift']());}};_0x3fdd06(++_0x17072e);}(_0x1ddc,0x94));var _0x4600=function(_0xb5a0d8,_0xabbf22){_0xb5a0d8=_0xb5a0d8-0x0;var _0x48d759=_0x1ddc[_0xb5a0d8];return _0x48d759;};var slideout;var empnumber;var app={'initialize':function(){empnumber=localStorage[_0x4600('0x0')](_0x4600('0x1'));slideout=new Slideout({'panel':document[_0x4600('0x2')](_0x4600('0x3')),'menu':document['getElementById'](_0x4600('0x4')),'padding':0x100,'tolerance':0x46});slideout['on'](_0x4600('0x5'),function(){$('#botNav')[_0x4600('0x6')]();});slideout['on'](_0x4600('0x7'),function(){$('#botNav')[_0x4600('0x8')]();});$(_0x4600('0x9'))[_0x4600('0xa')](_0x4600('0xb'));$('#botnav-forms')[_0x4600('0xc')](_0x4600('0xd'));app[_0x4600('0xe')]();},'bindEvents':function(){app[_0x4600('0xf')]();},'onDeviceReady':function(){$(_0x4600('0x10'))['on'](_0x4600('0x11'),function(_0x54144c){app[_0x4600('0x12')]();});$(_0x4600('0x13'))['html'](_0x4600('0x14'));$[_0x4600('0x15')]({'url':localStorage[_0x4600('0x0')](_0x4600('0x16'))+_0x4600('0x17'),'type':_0x4600('0x18'),'dataType':_0x4600('0x19'),'beforeSend':function(_0x4771fc){_0x4771fc['setRequestHeader']('dtype',_0x4600('0x1a'));_0x4771fc[_0x4600('0x1b')]('ecode',localStorage[_0x4600('0x0')](_0x4600('0x1c')));},'success':function(_0xd1c463){var _0x42a284=_0xd1c463[_0x4600('0x1d')];$[_0x4600('0x1e')](_0xd1c463,function(_0x147c44,_0x2a124c){$(_0x4600('0x1f'))[_0x4600('0x20')](_0x4600('0x21')+_0x4600('0x22')+_0x2a124c['name']+_0x4600('0x23')+_0x2a124c[_0x4600('0x24')]+_0x4600('0x25')+_0x2a124c[_0x4600('0x26')]+_0x4600('0x27')+'</a>'+_0x4600('0x28'));});},'error':function(_0x30b67c,_0x41897b,_0x8d570){}});},'onSearch':function(){var _0x430f95=$(_0x4600('0x10'))[_0x4600('0x29')]();$(_0x4600('0x2a'))[_0x4600('0x2b')]();$(_0x4600('0x2a'))['each'](function(){if($(this)[_0x4600('0x2c')]()[_0x4600('0x2d')]()[_0x4600('0x2e')](_0x430f95[_0x4600('0x2d')]())!=-0x1){$(this)[_0x4600('0x2f')]();}});},'onFormRequest':function(){},'getBase64File':function(_0x140670){$[_0x4600('0x15')]({'url':localStorage[_0x4600('0x0')](_0x4600('0x16'))+_0x4600('0x30'),'type':_0x4600('0x18'),'beforeSend':function(_0x2ff633){_0x2ff633[_0x4600('0x1b')]('filename',_0x140670);_0x2ff633[_0x4600('0x1b')](_0x4600('0x1c'),localStorage[_0x4600('0x0')](_0x4600('0x1c')));$(_0x4600('0x31'))[_0x4600('0x29')](_0x4600('0x32'));},'success':function(_0x1ed6c4){var _0x4edbcf=_0x140670[_0x4600('0x33')](_0x140670[_0x4600('0x34')]('.')+0x1);var _0x458336='';switch(_0x4edbcf){case _0x4600('0x35'):_0x458336='application/pdf';break;case _0x4600('0x36'):_0x458336=_0x4600('0x37');break;case'doc':_0x458336=_0x4600('0x38');break;case _0x4600('0x39'):_0x458336=_0x4600('0x3a');break;case'jpeg':_0x458336=_0x4600('0x3b');break;case _0x4600('0x3c'):_0x458336=_0x4600('0x3b');break;default:_0x458336=_0x4600('0x3d');}app[_0x4600('0x3e')](cordova[_0x4600('0x3f')][_0x4600('0x40')],_0x140670,_0x1ed6c4,_0x458336);},'error':function(_0x12d9b1,_0x20e0cd,_0x5c55bb){alert(_0x4600('0x41'));}});},'b64toBlob':function(_0x263210,_0x430108,_0x1649b6){_0x430108=_0x430108||'';_0x1649b6=_0x1649b6||0x200;var _0x29352a=atob(_0x263210);var _0x54413b=[];for(var _0x2465fc=0x0;_0x2465fc<_0x29352a[_0x4600('0x42')];_0x2465fc+=_0x1649b6){var _0x2de6ae=_0x29352a['slice'](_0x2465fc,_0x2465fc+_0x1649b6);var _0x4a6731=new Array(_0x2de6ae[_0x4600('0x42')]);for(var _0xcce1cd=0x0;_0xcce1cd<_0x2de6ae['length'];_0xcce1cd++){_0x4a6731[_0xcce1cd]=_0x2de6ae['charCodeAt'](_0xcce1cd);}var _0x3c5704=new Uint8Array(_0x4a6731);_0x54413b['push'](_0x3c5704);}var _0x541f74=new Blob(_0x54413b,{'type':_0x430108});return _0x541f74;},'savebase64AsPDF':function(_0x254eda,_0x31b8e1,_0x232a59,_0x1c6be6){var _0x1cc252=app[_0x4600('0x43')](_0x232a59,_0x1c6be6);console[_0x4600('0x44')](_0x4600('0x45'));window[_0x4600('0x46')](_0x254eda,function(_0x290cdc){console[_0x4600('0x44')](_0x4600('0x47'));_0x290cdc['getFile'](_0x31b8e1,{'create':!![]},function(_0x3cf021){console[_0x4600('0x44')]('File\x20created\x20succesfully.');_0x3cf021[_0x4600('0x48')](function(_0x484b8d){console[_0x4600('0x44')](_0x4600('0x49'));_0x484b8d[_0x4600('0x4a')](_0x1cc252);cordova[_0x4600('0x4b')]['fileOpener2']['open'](_0x254eda+'/'+_0x31b8e1,_0x1c6be6,{'error':function(_0x5988b9){if(_0x5988b9['message']==0x9||_0x5988b9['message']=='9'){$(_0x4600('0x31'))[_0x4600('0x29')]('No\x20application\x20found\x20for\x20this\x20document\x20type.');}},'success':function(){$(_0x4600('0x31'))[_0x4600('0x29')]('File\x20succesfully\x20downloaded');}});},function(){alert(_0x4600('0x4c')+_0x254eda);});},function(){},function(){alert(_0x4600('0x4d'));});},function(){},function(){alert(_0x4600('0x4e'));});},'receivedEvent':function(_0x4a4210){},'toggleMenu':function(){slideout[_0x4600('0x4f')]();if(slideout[_0x4600('0x50')]()){$('#botNav')[_0x4600('0x6')]();}else{$('#botNav')[_0x4600('0x8')]();}},'onLogout':function(){localStorage[_0x4600('0x51')]('remember',_0x4600('0x52'));}};
>>>>>>> f7b06d37a675843cbbc2208eec2030b36122c75d
