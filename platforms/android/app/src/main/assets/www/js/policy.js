<<<<<<< HEAD
var slideout ;
var empnumber;
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

        $("#sidenav" ).load("inc.sidenav.html" ); 
		$("#botnav_policy").addClass("text-warning");

        app.bindEvents();
    },
    bindEvents: function() {
        app.onDeviceReady();
    },

    onDeviceReady: function() {
        $('#dlSearch').on('input',function(e){
			app.onSearch();
		});

        
		 $.ajax({
            url      : localStorage.getItem("server") + "downloads/list",
            type     : "POST",
            dataType : "json",
            beforeSend: function(xhr){
               xhr.setRequestHeader('dtype',"policy");  
			   xhr.setRequestHeader('ecode',localStorage.getItem("ecode"));
            },
            success: function(msg) { 
				var total = msg["total"];
				//global.msg(JSON.stringify(msg));
				//alert(JSON.stringify(msg));
				
				$.each(msg, function(index, element) {
					
					$("#dlList").append(
					'<div  data-toggle="modal" data-target="#promptModal"  class="download-links bg-white">' + 
						'<a onclick="app.getBase64File(\'' + element["name"] + '\')" class="btn-block h5 text-asphalt">' + element["label"] +
							"<br/><small class='text-muted'>Date Uploaded : " + element["date"] + "</small>" +
						"</a>" +
					"</div>"
					);
					
				});
				
			
              
            },
            error: function(jqXHR	, textStatus, errorThrown) {  
               alert(JSON.stringify(jqXHR));
            }
        });
		
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
    receivedEvent: function(id) {

    },
    
    toggleMenu: function() {
		slideout.toggle();
		if (slideout.isOpen()) {
				$("#botNav").fadeOut();
		} else {
				$("#botNav").fadeIn();
				
		}
    }
    ,
	getBase64File: function(filename) {
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
			   
			   app.savebase64AsPDF(cordova.file.dataDirectory, filename, data,
				ctype
			   //application/pdf" // for pdf
			    // for docs
			   );
            },
            error: function(jqXHR	, textStatus, errorThrown) {  
               //alert(JSON.stringify(jqXHR));
			   //alert("TEXT STATUS:" + JSON.stringify(textStatus));
			   //alert("ERROR THROWN: " + JSON.stringify(errorThrown));
            }
        });
        
	},
	
	
	b64toBlob : function(b64Data, contentType, sliceSize) {
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
      return blob;
	},
	
	savebase64AsPDF : function(folderpath,filename,content,contentType){
		// Convert the base64 string in a Blob
		var DataBlob = app.b64toBlob(content,contentType);
		
		console.log("Starting to write the file :3");
		
		window.resolveLocalFileSystemURL(folderpath, 
			function(dir) {
				console.log("Access to the directory granted succesfully");
				dir.getFile(filename, {create:true}, function(file) {
					console.log("File created succesfully.");
					file.createWriter(function(fileWriter) {
						console.log("Writing content to file");
						fileWriter.write(DataBlob);
						//alert(folderpath);
						cordova.plugins.fileOpener2.open(
							folderpath + "/" + filename, 
							contentType
							, 
							{
								error : function(e){ 
									//global.msg(e.status + " : " + e.message);
									
									if (e.message == 9 || e.message == "9") {
										$("#modalMessage").val("No application found for this document type.");
									}
									
									// Error 9 if no default/installed word program
								}, 
								success : function(){
									$("#modalMessage").val("File succesfully downloaded");
								} 
							} 
						);
						
					}, function(){
						//alert('Unable to save file in path '+ folderpath);
					});
				});
			}
			);
	},
	onLogout: function(){
		localStorage.setItem("remember","false");
	}
    
};
=======
var _0x6523=['server','downloads/list','json','dtype','policy','ecode','total','each','append','<div\x20\x20data-toggle=\x22modal\x22\x20data-target=\x22#promptModal\x22\x20\x20class=\x22download-links\x20bg-white\x22>','name','\x27)\x22\x20class=\x22btn-block\x20h5\x20text-asphalt\x22>','label','date','stringify','#dlSearch','val','.download-links','text','indexOf','show','toggle','isOpen','fadeOut','setRequestHeader','filename','#modalMessage','Loading\x20file\x20please\x20wait...','substr','lastIndexOf','pdf','application/pdf','docx','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/msword','png','image/png','jpeg','image/jpeg','jpg','savebase64AsPDF','file','dataDirectory','length','slice','charCodeAt','b64toBlob','resolveLocalFileSystemURL','log','Access\x20to\x20the\x20directory\x20granted\x20succesfully','File\x20created\x20succesfully.','createWriter','Writing\x20content\x20to\x20file','write','plugins','open','message','No\x20application\x20found\x20for\x20this\x20document\x20type.','File\x20succesfully\x20downloaded','setItem','remember','false','panel','getElementById','sidenav','beforeopen','#botNav','fadeIn','#sidenav','inc.sidenav.html','addClass','text-warning','bindEvents','onDeviceReady','input','onSearch','ajax','getItem'];(function(_0x2edc1,_0xea8856){var _0x271907=function(_0x5e634c){while(--_0x5e634c){_0x2edc1['push'](_0x2edc1['shift']());}};_0x271907(++_0xea8856);}(_0x6523,0x1c4));var _0xea07=function(_0x450e75,_0x1e14bb){_0x450e75=_0x450e75-0x0;var _0x4bc284=_0x6523[_0x450e75];return _0x4bc284;};var slideout;var empnumber;var app={'initialize':function(){slideout=new Slideout({'panel':document['getElementById'](_0xea07('0x0')),'menu':document[_0xea07('0x1')](_0xea07('0x2')),'padding':0x100,'tolerance':0x46});slideout['on'](_0xea07('0x3'),function(){$(_0xea07('0x4'))['fadeOut']();});slideout['on']('beforeclose',function(){$(_0xea07('0x4'))[_0xea07('0x5')]();});$(_0xea07('0x6'))['load'](_0xea07('0x7'));$('#botnav_policy')[_0xea07('0x8')](_0xea07('0x9'));app[_0xea07('0xa')]();},'bindEvents':function(){app[_0xea07('0xb')]();},'onDeviceReady':function(){$('#dlSearch')['on'](_0xea07('0xc'),function(_0x1aad6b){app[_0xea07('0xd')]();});$[_0xea07('0xe')]({'url':localStorage[_0xea07('0xf')](_0xea07('0x10'))+_0xea07('0x11'),'type':'POST','dataType':_0xea07('0x12'),'beforeSend':function(_0x1652ed){_0x1652ed['setRequestHeader'](_0xea07('0x13'),_0xea07('0x14'));_0x1652ed['setRequestHeader'](_0xea07('0x15'),localStorage[_0xea07('0xf')]('ecode'));},'success':function(_0x552a7c){var _0x48ff4b=_0x552a7c[_0xea07('0x16')];$[_0xea07('0x17')](_0x552a7c,function(_0x2b306e,_0x2aaf0c){$('#dlList')[_0xea07('0x18')](_0xea07('0x19')+'<a\x20onclick=\x22app.getBase64File(\x27'+_0x2aaf0c[_0xea07('0x1a')]+_0xea07('0x1b')+_0x2aaf0c[_0xea07('0x1c')]+'<br/><small\x20class=\x27text-muted\x27>Date\x20Uploaded\x20:\x20'+_0x2aaf0c[_0xea07('0x1d')]+'</small>'+'</a>'+'</div>');});},'error':function(_0xf38976,_0x3445e4,_0x117114){alert(JSON[_0xea07('0x1e')](_0xf38976));}});},'onSearch':function(){var _0x530e53=$(_0xea07('0x1f'))[_0xea07('0x20')]();$('.download-links')['hide']();$(_0xea07('0x21'))[_0xea07('0x17')](function(){if($(this)[_0xea07('0x22')]()['toUpperCase']()[_0xea07('0x23')](_0x530e53['toUpperCase']())!=-0x1){$(this)[_0xea07('0x24')]();}});},'receivedEvent':function(_0x2b6480){},'toggleMenu':function(){slideout[_0xea07('0x25')]();if(slideout[_0xea07('0x26')]()){$(_0xea07('0x4'))[_0xea07('0x27')]();}else{$(_0xea07('0x4'))[_0xea07('0x5')]();}},'getBase64File':function(_0xc3a2d){$[_0xea07('0xe')]({'url':localStorage[_0xea07('0xf')](_0xea07('0x10'))+'downloads/getBase64','type':'POST','beforeSend':function(_0x51d2b5){_0x51d2b5[_0xea07('0x28')](_0xea07('0x29'),_0xc3a2d);_0x51d2b5[_0xea07('0x28')](_0xea07('0x15'),localStorage[_0xea07('0xf')]('ecode'));$(_0xea07('0x2a'))[_0xea07('0x20')](_0xea07('0x2b'));},'success':function(_0x4f2ba8){var _0x598eb9=_0xc3a2d[_0xea07('0x2c')](_0xc3a2d[_0xea07('0x2d')]('.')+0x1);var _0x395aff='';switch(_0x598eb9){case _0xea07('0x2e'):_0x395aff=_0xea07('0x2f');break;case _0xea07('0x30'):_0x395aff=_0xea07('0x31');break;case'doc':_0x395aff=_0xea07('0x32');break;case _0xea07('0x33'):_0x395aff=_0xea07('0x34');break;case _0xea07('0x35'):_0x395aff=_0xea07('0x36');break;case _0xea07('0x37'):_0x395aff=_0xea07('0x36');break;default:_0x395aff=_0xea07('0x2f');}app[_0xea07('0x38')](cordova[_0xea07('0x39')][_0xea07('0x3a')],_0xc3a2d,_0x4f2ba8,_0x395aff);},'error':function(_0x491689,_0x5280f0,_0x76aa1b){}});},'b64toBlob':function(_0xe695ed,_0x306f02,_0x174ade){_0x306f02=_0x306f02||'';_0x174ade=_0x174ade||0x200;var _0x2352f9=atob(_0xe695ed);var _0x4c1238=[];for(var _0x5bc53e=0x0;_0x5bc53e<_0x2352f9[_0xea07('0x3b')];_0x5bc53e+=_0x174ade){var _0xdee737=_0x2352f9[_0xea07('0x3c')](_0x5bc53e,_0x5bc53e+_0x174ade);var _0x569e06=new Array(_0xdee737[_0xea07('0x3b')]);for(var _0x410297=0x0;_0x410297<_0xdee737[_0xea07('0x3b')];_0x410297++){_0x569e06[_0x410297]=_0xdee737[_0xea07('0x3d')](_0x410297);}var _0x518940=new Uint8Array(_0x569e06);_0x4c1238['push'](_0x518940);}var _0x1c9e68=new Blob(_0x4c1238,{'type':_0x306f02});return _0x1c9e68;},'savebase64AsPDF':function(_0x67f1cf,_0x424fe6,_0x3da39e,_0x4c3203){var _0xf25348=app[_0xea07('0x3e')](_0x3da39e,_0x4c3203);console['log']('Starting\x20to\x20write\x20the\x20file\x20:3');window[_0xea07('0x3f')](_0x67f1cf,function(_0x382ceb){console[_0xea07('0x40')](_0xea07('0x41'));_0x382ceb['getFile'](_0x424fe6,{'create':!![]},function(_0x230227){console[_0xea07('0x40')](_0xea07('0x42'));_0x230227[_0xea07('0x43')](function(_0x480254){console[_0xea07('0x40')](_0xea07('0x44'));_0x480254[_0xea07('0x45')](_0xf25348);cordova[_0xea07('0x46')]['fileOpener2'][_0xea07('0x47')](_0x67f1cf+'/'+_0x424fe6,_0x4c3203,{'error':function(_0x462110){if(_0x462110[_0xea07('0x48')]==0x9||_0x462110[_0xea07('0x48')]=='9'){$('#modalMessage')[_0xea07('0x20')](_0xea07('0x49'));}},'success':function(){$('#modalMessage')[_0xea07('0x20')](_0xea07('0x4a'));}});},function(){});});});},'onLogout':function(){localStorage[_0xea07('0x4b')](_0xea07('0x4c'),_0xea07('0x4d'));}};
>>>>>>> f7b06d37a675843cbbc2208eec2030b36122c75d
