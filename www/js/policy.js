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
