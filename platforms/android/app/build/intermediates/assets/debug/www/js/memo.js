<<<<<<< HEAD
var slideout ;
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
        $("#botnav_memo").addClass("text-warning");
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
               xhr.setRequestHeader('dtype',"memo");  
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
    },
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
var _0x1993=['setItem','false','getElementById','sidenav','beforeopen','#botNav','fadeOut','beforeclose','fadeIn','#sidenav','load','#botnav_memo','addClass','bindEvents','onDeviceReady','#dlSearch','ajax','getItem','server','downloads/list','POST','json','setRequestHeader','dtype','ecode','each','#dlList','append','<div\x20\x20data-toggle=\x22modal\x22\x20data-target=\x22#promptModal\x22\x20\x20class=\x22download-links\x20bg-white\x22>','<a\x20onclick=\x22app.getBase64File(\x27','name','\x27)\x22\x20class=\x22btn-block\x20h5\x20text-asphalt\x22>','label','<br/><small\x20class=\x27text-muted\x27>Date\x20Uploaded\x20:\x20','date','</a>','</div>','stringify','val','.download-links','indexOf','toUpperCase','toggle','isOpen','downloads/getBase64','filename','#modalMessage','substr','lastIndexOf','pdf','application/pdf','docx','application/vnd.openxmlformats-officedocument.wordprocessingml.document','image/png','jpeg','image/jpeg','jpg','savebase64AsPDF','file','dataDirectory','slice','length','charCodeAt','push','log','Starting\x20to\x20write\x20the\x20file\x20:3','getFile','File\x20created\x20succesfully.','Writing\x20content\x20to\x20file','write','plugins','message','No\x20application\x20found\x20for\x20this\x20document\x20type.','File\x20succesfully\x20downloaded'];(function(_0x6e56a3,_0x4698e7){var _0xbdafd0=function(_0x353ec3){while(--_0x353ec3){_0x6e56a3['push'](_0x6e56a3['shift']());}};_0xbdafd0(++_0x4698e7);}(_0x1993,0x96));var _0x213d=function(_0x5a30c2,_0x2fd867){_0x5a30c2=_0x5a30c2-0x0;var _0x3be2a8=_0x1993[_0x5a30c2];return _0x3be2a8;};var slideout;var app={'initialize':function(){slideout=new Slideout({'panel':document[_0x213d('0x0')]('panel'),'menu':document[_0x213d('0x0')](_0x213d('0x1')),'padding':0x100,'tolerance':0x46});slideout['on'](_0x213d('0x2'),function(){$(_0x213d('0x3'))[_0x213d('0x4')]();});slideout['on'](_0x213d('0x5'),function(){$('#botNav')[_0x213d('0x6')]();});$(_0x213d('0x7'))[_0x213d('0x8')]('inc.sidenav.html');$(_0x213d('0x9'))[_0x213d('0xa')]('text-warning');app[_0x213d('0xb')]();},'bindEvents':function(){app[_0x213d('0xc')]();},'onDeviceReady':function(){$(_0x213d('0xd'))['on']('input',function(_0x32fea7){app['onSearch']();});$[_0x213d('0xe')]({'url':localStorage[_0x213d('0xf')](_0x213d('0x10'))+_0x213d('0x11'),'type':_0x213d('0x12'),'dataType':_0x213d('0x13'),'beforeSend':function(_0xa7af58){_0xa7af58[_0x213d('0x14')](_0x213d('0x15'),'memo');_0xa7af58[_0x213d('0x14')](_0x213d('0x16'),localStorage[_0x213d('0xf')](_0x213d('0x16')));},'success':function(_0x1b21ac){var _0x307c07=_0x1b21ac['total'];$[_0x213d('0x17')](_0x1b21ac,function(_0x12fd32,_0x242c9a){$(_0x213d('0x18'))[_0x213d('0x19')](_0x213d('0x1a')+_0x213d('0x1b')+_0x242c9a[_0x213d('0x1c')]+_0x213d('0x1d')+_0x242c9a[_0x213d('0x1e')]+_0x213d('0x1f')+_0x242c9a[_0x213d('0x20')]+'</small>'+_0x213d('0x21')+_0x213d('0x22'));});},'error':function(_0x179081,_0x502eea,_0x30350a){alert(JSON[_0x213d('0x23')](_0x179081));}});},'onSearch':function(){var _0x54ebe9=$(_0x213d('0xd'))[_0x213d('0x24')]();$(_0x213d('0x25'))['hide']();$(_0x213d('0x25'))[_0x213d('0x17')](function(){if($(this)['text']()['toUpperCase']()[_0x213d('0x26')](_0x54ebe9[_0x213d('0x27')]())!=-0x1){$(this)['show']();}});},'receivedEvent':function(_0x4b44c8){},'toggleMenu':function(){slideout[_0x213d('0x28')]();if(slideout[_0x213d('0x29')]()){$(_0x213d('0x3'))['fadeOut']();}else{$(_0x213d('0x3'))[_0x213d('0x6')]();}},'getBase64File':function(_0x540914){$[_0x213d('0xe')]({'url':localStorage['getItem']('server')+_0x213d('0x2a'),'type':_0x213d('0x12'),'beforeSend':function(_0x39e1e7){_0x39e1e7['setRequestHeader'](_0x213d('0x2b'),_0x540914);_0x39e1e7[_0x213d('0x14')](_0x213d('0x16'),localStorage[_0x213d('0xf')](_0x213d('0x16')));$(_0x213d('0x2c'))['val']('Loading\x20file\x20please\x20wait...');},'success':function(_0x2fc8d3){var _0x161e5f=_0x540914[_0x213d('0x2d')](_0x540914[_0x213d('0x2e')]('.')+0x1);var _0x50209d='';switch(_0x161e5f){case _0x213d('0x2f'):_0x50209d=_0x213d('0x30');break;case _0x213d('0x31'):_0x50209d=_0x213d('0x32');break;case'doc':_0x50209d='application/msword';break;case'png':_0x50209d=_0x213d('0x33');break;case _0x213d('0x34'):_0x50209d=_0x213d('0x35');break;case _0x213d('0x36'):_0x50209d=_0x213d('0x35');break;default:_0x50209d=_0x213d('0x30');}app[_0x213d('0x37')](cordova[_0x213d('0x38')][_0x213d('0x39')],_0x540914,_0x2fc8d3,_0x50209d);},'error':function(_0xd9e78e,_0x3fe917,_0x35f514){}});},'b64toBlob':function(_0x54fff9,_0x9a52b3,_0xc38f63){_0x9a52b3=_0x9a52b3||'';_0xc38f63=_0xc38f63||0x200;var _0x4feaaf=atob(_0x54fff9);var _0x1f8b3d=[];for(var _0x3c3cee=0x0;_0x3c3cee<_0x4feaaf['length'];_0x3c3cee+=_0xc38f63){var _0xfd0d44=_0x4feaaf[_0x213d('0x3a')](_0x3c3cee,_0x3c3cee+_0xc38f63);var _0x3f23ce=new Array(_0xfd0d44[_0x213d('0x3b')]);for(var _0x2b89bf=0x0;_0x2b89bf<_0xfd0d44[_0x213d('0x3b')];_0x2b89bf++){_0x3f23ce[_0x2b89bf]=_0xfd0d44[_0x213d('0x3c')](_0x2b89bf);}var _0x1aa881=new Uint8Array(_0x3f23ce);_0x1f8b3d[_0x213d('0x3d')](_0x1aa881);}var _0x1310cf=new Blob(_0x1f8b3d,{'type':_0x9a52b3});return _0x1310cf;},'savebase64AsPDF':function(_0x572435,_0x1d5a38,_0x90e71b,_0x1e4959){var _0x5e9427=app['b64toBlob'](_0x90e71b,_0x1e4959);console[_0x213d('0x3e')](_0x213d('0x3f'));window['resolveLocalFileSystemURL'](_0x572435,function(_0xb1a731){console[_0x213d('0x3e')]('Access\x20to\x20the\x20directory\x20granted\x20succesfully');_0xb1a731[_0x213d('0x40')](_0x1d5a38,{'create':!![]},function(_0x587a55){console[_0x213d('0x3e')](_0x213d('0x41'));_0x587a55['createWriter'](function(_0x4b4261){console[_0x213d('0x3e')](_0x213d('0x42'));_0x4b4261[_0x213d('0x43')](_0x5e9427);cordova[_0x213d('0x44')]['fileOpener2']['open'](_0x572435+'/'+_0x1d5a38,_0x1e4959,{'error':function(_0x1eb909){if(_0x1eb909[_0x213d('0x45')]==0x9||_0x1eb909[_0x213d('0x45')]=='9'){$(_0x213d('0x2c'))[_0x213d('0x24')](_0x213d('0x46'));}},'success':function(){$(_0x213d('0x2c'))[_0x213d('0x24')](_0x213d('0x47'));}});},function(){});});});},'onLogout':function(){localStorage[_0x213d('0x48')]('remember',_0x213d('0x49'));}};
>>>>>>> f7b06d37a675843cbbc2208eec2030b36122c75d
