var slideout;
var currentProfile = 0;
var currentSlide = "close";
var empnumber;
var curData;
var positions = {};
var app = {
    initialize: function() {
        /*
             Slide out config
        */
		empnumber = localStorage.getItem("empnumber");
        slideout = new Slideout({
            'panel'    : document.getElementById('panel'   ),
            'menu'     : document.getElementById('sidenav' ),
            'padding'  : 256, /* TODO: Change to screen width/2 on production  for menu slide */
            'tolerance': 70
        });
		slideout.on('beforeopen', function() {

				$("#botNav").fadeOut();
		});

		slideout.on('beforeclose', function() {
				$("#botNav").fadeIn();

		});
		
        $("#infoHolder").load("info/info0.html");
        $("#sidenav").load("inc.sidenav.html");

		$("#botnav-profile").addClass("text-warning");
		
		//alert("AFTER THIS IS BIND EVENT");
		
		$("#nameholder"	).html(localStorage.getItem("full_name"));
		$("#numholder"	).html(empnumber);
		app.getInfoList();
       
  
    },
    
    bindEvents: function(ids) {
         app.onDeviceReady(ids);
			   
    },

    onDeviceReady: function(ids) {
		//alert("ON DEVICE READY FIRED");
		//global.sys( "FULL EMPNUMBER: " + localStorage.getItem("full_empnumber"));
        //************************************************************************
        /* DOWNLOAD IMAGE TEST */
        var fileTransfer = new FileTransfer();
		var uri = "http://digitalpix.ust.edu.ph/employee/" + localStorage.getItem("full_empnumber") + "p.jpg"
		
		
	
			// WILL DOWNLOAD THE FILE IF NOT FOUND
				fileTransfer.download(
				uri,
				cordova.file.dataDirectory  +  localStorage.getItem("full_empnumber")  +"p.jpg"	,
				function(entry) {
					$("#dpHolder").attr("src",entry.toURL());
					//downloadedFile = true;
				},
				function(error) {
					//alert("download error source " + error.source);
					//alert(JSON.stringify(error));
					//$("#dpholder").attr("src",entry.toURL());
					//global.sys("download error target " + error.target);
					//alert("download error code" 	  + error.code);
				},
				true,
				{
					headers: {
						"referrer" : "https://supportstaff.ust.edu.ph",
								"referer"  : "https://supportstaff.ust.edu.ph"
					}
				});
		
		/*
		fileTransfer.download(
						uri,
						cordova.file.dataDirectory  + localStorage.getItem("full_empnumber")  +"p.jpg"	,
						function(entry) {
							//global.sys("download complete: " + entry.toURL());
							$("#dpHolder").attr("src",entry.toURL());
						  
						},
						function(error) {
							
							//alert("download error source " + error.source);
							//global.sys("download error target " + error.target);
							//alert("download error code" 	  + error.code);
						},
						true,
						{
							headers: {
								"referrer" : "http://supportstaff.ust.edu.ph",
								"referer"  : "http://supportstaff.ust.edu.ph"
							}
						}
		);
		*/
		//alert("GOT PAST download, going to ajax");
		
		$.ajax({
					url        : localStorage.getItem("server") + "service/jobpositionlist", 
					type       : "GET",
					dataType   : "json",            
					beforeSend : function(xhr){},
					success: function(msg) { 
					
						$.each(msg, function(i,e){
							
							positions[e["id"]] = e["name"];
						});
							
						app.requestRest(ids);
						
					 },
					 error: function(jqXHR	, textStatus, errorThrown) {
						alert("There was a server error, please reload the app", "Internal Error");
						//global.msg(JSON.stringify(jqXHR));
					 }
		}); 
        /**/
		
		//alert("GOT PAST ajax");

	
		
		
	
    },
    
    receivedEvent: function(id) {

    },

    onInfoSelect: function(info) {
	   var x =  $("#infoSelect").val();
	   localStorage.setItem("curinfo",x.toString());
       app.requestRest(x );

    },
	
	loadEditor: function(id,index){
		
		if (id == null) {
			localStorage.setItem("cureditID" , "none");
		} else {
			localStorage.setItem("cureditID" , id);
		}
		
		if (index == null){
			localStorage.setItem("cureditIndex" , "none");
		} else {
			localStorage.setItem("cureditIndex" , index);
		}
		
		window.location = "editor.html";
	},
    
    toggleMenu: function() {
		
		slideout.toggle();
		if (slideout.isOpen()) {
				$("#botNav").fadeOut();
		} else {
				$("#botNav").fadeIn();
				
		}
			   
    },
    
    printCert:function(certId, certType){
       // window.open('http://172.20.0.40:8888/reports/rwservlet?REPORT=hr_seminar_certificate2_ussap.rdf&DESFORMAT=PDF&DESTYPE=CACHE&P_HR_S_ID=44&P_EMP=5320&P_SESSION=&USERID=HR_USER4/hr_user4@domingo&ORACLE_SHUTDOWN=YES&PARAMFORM=NO ' , '_system', 'location=yes');
        //alert('http://172.20.0.40:8888/reports/rwservlet?REPORT=' + certType + '&DESFORMAT=PDF&DESTYPE=CACHE&P_HR_S_ID=' + certId + '&P_EMP=' + localStorage.getItem("empnumber") + '&P_SESSION=&USERID=HR_USER4/hr_user4@domingo&ORACLE_SHUTDOWN=YES&PARAMFORM=NO');
        window.open('http://172.20.0.40:8888/reports/rwservlet?REPORT=' + certType + '&DESFORMAT=PDF&DESTYPE=CACHE&P_HR_S_ID=' + certId + '&P_EMP=' + localStorage.getItem("empnumber") + '&P_SESSION=&USERID=HR_USER4/hr_user4@domingo&ORACLE_SHUTDOWN=YES&PARAMFORM=NO', '_system', 'location=yes')
        
        /*
          var fileTransfer = new FileTransfer();
		var uri = 'http://172.20.0.40:8888/reports/rwservlet?REPORT=' + certType + '&DESFORMAT=PDF&DESTYPE=CACHE&P_HR_S_ID=' + certId + '&P_EMP=' + empnumber + '&P_SESSION=&USERID=HR_USER4/hr_user4@domingo&ORACLE_SHUTDOWN=YES&PARAMFORM=NO';
		
		fileTransfer.download(
                    uri,
                    cordova.file.dataDirectory  + certId +".pdf"	,
                    function(entry) {
			//global.sys("download complete: " + entry.toURL());
			//$("#dpHolder").attr("src",entry.toURL());
                        window.open('https://docs.google.com/viewer?url=http://www.example.com/test.pdf&embedded=true', '_blank', 'location=yes'); 
                   
                        alert("DOWNLOAD COMPLETE: " + entry.toURL());
                    },
                    function(error) {
			alert("download error source " + error.source);
			//global.sys("download error target " + error.target);
			//alert("download error code" 	  + error.code);
                    },
                    true
		);
        */
    },
	
    setProfile: function(msg,x) {
		//global.sys("RECEIVED DATA: " + JSON.stringify(msg));
		var n = 0;
		
		var noData = '<div class="line"></div>' + '<div class="alert alert-danger m-3">Sorry. No data available</div>' + '<div class="p-2"></div>';
		
		if (msg["total"] != null) {
			n = parseInt(msg["total"]);
		}
		if (x==0) {
			
			// PERSONAL INFORMATION
			
			var emg = msg["emergency_contact"];
			localStorage.setItem("curData", JSON.stringify(emg));
			$("#sex"		  ).html(msg["sex"          ]);
			$("#emg_rel"      ).html(emg["relationship" ]);
			$("#surname"      ).html(msg["surname"      ]);
			$("#emg_name"	  ).html(emg["name"			]);		
			$("#religion"     ).html(msg["religion"     ]);
			$("#nickname"     ).html(msg["nickname"     ]);
			$("#emg_email"	  ).html(emg["email"		]);
			$("#birthdate"    ).html(msg["birthdate"    ]);		
			$("#first_name"   ).html(msg["first_name"   ]);
			$("#blood_type"   ).html(msg["blood_type"   ]);
			$("#birthplace"   ).html(msg["birthplace"   ]);
			$("#emg_address"  ).html(emg["address"		]);	
			$("#citizenship"  ).html(msg["citizenship"  ]);
			$("#middle_name"  ).html(msg["middle_name"  ]);					
			$("#civil_status" ).html(msg["civil_status" ]);
			
			

			if (emg["contact1"] != null) {
				$("#emg_contact").append(emg["contact1"]);	
			}
			if (emg["contact2"] != null) {
				$("#emg_contact").append(" / " + emg["contact2"]);	
			}
			if (emg["contact3"] != null) {
				$("#emg_contact").append(" / " + emg["contact3"]);	
			}		
		} else if (x==1) {
			
			// EMPLOYMENT INFORMATION
			localStorage.setItem("curData", JSON.stringify(msg));
			$("#empnumber" 		).html(localStorage.getItem("empnumber"));
			$("#emp_status" 	).html(msg["emp_status" 	]);
			$("#company_status" ).html(msg["company_status" ]);
			$("#computation" 	).html(msg["computation"	]);
			$("#department" 	).html(msg["department" 	]);
			$("#position" 		).html(msg["position" 		]);
			$("#union_flag" 	).html(msg["union_flag" 	]);
			$("#rank" 			).html(msg["rank_name" 		]);
			$("#sss" 			).html(msg["sss" 			]);
			$("#phealth" 		).html(msg["phealt" 		]);
			$("#pagibig" 		).html(msg["pagibig" 		]);
			$("#tin" 			).html(msg["tin" 			]);
			$("#tax" 			).html(msg["tax_exempt" 	]);
    
		} else if (x==2) {
			// CONTACT INFORMATION
			localStorage.setItem("curData", JSON.stringify(msg));
			$("#cur_address"     ).html(msg["mailing_address1" 	]);
			$("#prv_address"     ).html(msg["mailing_address2" 	]);
			$("#zipcode"		 ).html(msg["zipcode" 			]);
			$("#primary_contact" ).html(msg["primary_contact" 	]);
			$("#other_contact"   ).html(msg["other_contact" 	]);
			$("#official_email"  ).html(msg["official_email" 	]);
			$("#other_email"     ).html(msg["email" 			]);
			
		} else if (x==3) {
			// SPOUSE INFORMATION
			localStorage.setItem("curData", JSON.stringify(msg));
			$("#bus_contact" ).html(msg["bus_contact" 	    ]);
			$("#bus_address" ).html(msg["bus_address" 	    ]);
			$("#employer"    ).html(msg["employer" 	        ]);
			
			var lname = "";
			var fname = "";
			var mname = "";
			
			if (typeof msg["surname"] != 'undefined') {
				lname = msg["surname"];
			}
			if (typeof msg["firstname"] != 'undefined') {
				fname = msg["firstname"];
			}
			if (typeof msg["middlename"] != 'undefined') {
				mname = msg["middlename"];
			}
			
			$("#sname"       ).html(lname + " " + fname + " " + mname);
			
			
			$("#birthdate"   ).html(msg["birthdate"         ]);
			$("#occupation"  ).html(msg["occupation" 	    ]);
			$("#mobile"      ).html(msg["mobile" 		    ]);
			$("#phone"       ).html(msg["phone"             ]);
			$("#email"       ).html(msg["email" 		    ]);
			$("#mdate"       ).html(msg["date_of_marriage"  ]);
			$("#mplace"      ).html(msg["place_of_marriage" ]);
		} else if (x==4) {
			// PARENTS INFORMATION
			var m = msg["mother"];
			var f = msg["father"];
			var mlaw = msg["moinlaw"];
			var flaw = msg["finlaw"];
			localStorage.setItem("curData", JSON.stringify(msg));
			/* mother's details */
			$("#m_name"		  ).html( m["surname" ] + " " + m["firstname"] + " " + m["middlename"]);
			$("#m_bday"       ).html( m["birthdate"  ]);
			$("#m_occupation" ).html( m["occupation" ]);
			$("#m_contact"    ).html( m["contact"    ]);
			/* mother's details */
			$("#f_name"		  ).html( f["surname" ] + " " + f["firstname"] + " " + f["middlename"]);	
			$("#f_bday"       ).html( f["birthdate"  ]);
			$("#f_occupation" ).html( f["occupation" ]);
			$("#f_contact"    ).html( f["contact"    ]);
			/* father's inlaw details */
			$("#fl_name"	   ).html( flaw["surname" ] + " " + flaw["firstname"] + " " + flaw["middlename"]);
			$("#fl_bday"       ).html( flaw["birthdate"  ]);
			$("#fl_occupation" ).html( flaw["occupation" ]);
			$("#fl_contact"    ).html( flaw["contact"    ]);
			
			/* Mothers's inlaw details */
			$("#ml_name"	   ).html( mlaw["surname" ] + " " + mlaw["firstname"] + " " + mlaw["middlename"]);	
			$("#ml_bday"       ).html( mlaw["birthdate"  ]);
			$("#ml_occupation" ).html( mlaw["occupation" ]);
			$("#ml_contact"    ).html( mlaw["contact"    ]);
			
		} else if (x==5) {
			// SIBLING INFORMATION
			if (n==0) {
				$("#tbl").append(noData);
			}
			localStorage.setItem("curData", JSON.stringify(msg));
			for (i = 0; i < n ; i++) {
				var a = i.toString();
				var civil = "";
			    switch(msg[a]["civilstatus"]) {
					case 0: civil = "Single"			; break;
					case 1: civil = "Married"			; break;
					case 2: civil = "Widow/Widower"		; break;
					case 3: civil = "Legally Separated"	; break;
					case 4: civil = "Divorcee"			; break;
					case 5: civil = "Separated"			; break;
					case 6: civil = "Annulled"			; break;
				}
				$("#tbl").append(''
				+ '<div class="line"></div>' 
				+ '<div class="p-3">'
				+	'<p class="text-right">'
				+		'<button class="p-0 btn btn-link" onclick="app.loadEditor(\'' + msg[a]["hr_s_isd"] + '\',\'' + a + '\')" title="Edit Record"><i class="fas fa-edit"></i></button>'
				+		'<button class="p-0 btn btn-link ml-3" title="Delete"   onclick="app.confirmDelete(' + msg[a]["hr_s_isd"] + ')"><i class="far fa-trash-alt text-danger"></i></button>'
				+	'</p>'
				+	'<h5 class="text-asphalt">' + msg[a]["name"] + '</h5>'
					
				+	'<dl class="row">'
				+		'<dt class="col-5">Birthdate</dt>'
				+		'<dd class="col-7 text-asphalt">' + msg[a]["birthdate"] + '</dd>'

				+		'<dt class="col-5">Age</dt>'
				+		'<dd class="col-7 text-asphalt">' + msg[a]["age"] + '</dd>'

				+		'<dt class="col-5">Gender</dt>'
				+		'<dd class="col-7 text-asphalt">' + msg[a]["gender"] + '</dd>'

				+		'<dt class="col-5">Civil Status</dt>'
				+		'<dd class="col-7 text-asphalt">' + civil + '</dd>'

				+		'<dt class="col-5">Occupation</dt>'
				+		'<dd class="col-7 text-asphalt">' + msg[a]["occupation"] + '</dd>'
				+	'</dl>'
				+'</div>'
				
				+ '');
			}
	
		} else if (x==6) {
			// DEPENDENT INFORMATION
			if (n==0) {
				$("#tbl").append(noData);
			}
			localStorage.setItem("curData", JSON.stringify(msg));
			for (i = 0; i < n ; i++) {
				var a = i.toString();
				var civil = "";
			    switch(msg[a]["civilstatus"]) {
					case 0: civil = "Single"			; break;
					case 1: civil = "Married"			; break;
					case 2: civil = "Widow/Widower"		; break;
					case 3: civil = "Legally Separated"	; break;
					case 4: civil = "Divorcee"			; break;
					case 5: civil = "Separated"			; break;
					case 6: civil = "Annulled"			; break;
				}
				$("#tbl").append(''
				+	'<div class="line"></div>'
				+	'<div class="p-3">'
				+		'<p class="text-right">'
				+			'<button class="p-0 btn btn-link" onclick="app.loadEditor(\'' + msg[a]["id"] + '\',\'' + a + '\')" title="Edit Record"><i class="fas fa-edit"></i></button>'
				+			'<button class="p-0 btn btn-link ml-3" title="Delete"  onclick="app.confirmDelete(' + msg[a]["id"] + ')"><i class="far fa-trash-alt text-danger"></i></button>'
				+		'</p>'
				+		'<h5 class="text-asphalt">' + msg[a]["name"] + '</h5>'
						
				+		'<dl class="row">'
				+			'<dt class="col-5">Birthdate</dt>'
				+			'<dd class="col-7 text-asphalt">' + msg[a]["birthdate"] + '</dd>'

				+			'<dt class="col-5">Relationship</dt>'
				+			'<dd class="col-7 text-asphalt">' + msg[a]["relationship"] + '</dd>'

				+			'<dt class="col-5">Gender</dt>'
				+			'<dd class="col-7 text-asphalt">' + msg[a]["gender"] + '</dd>'

				+			'<dt class="col-5">Civil Status</dt>'
				+			'<dd class="col-7 text-asphalt">' + civil + '</dd>'

				+			'<dt class="col-5">Occupation</dt>'
				+			'<dd class="col-7 text-asphalt">' + msg[a]["occupation"] + '</dd>'
				+		'</dl>'
				+	'</div>'

				+ '');
		
			}
	

		} else if (x==7) {
			// RELATIVES EMPLOYED IN UST
			if (n==0) {
				$("#tbl").append(noData);
			}
			localStorage.setItem("curData", JSON.stringify(msg));
			for (i = 0; i < n ; i++) {
				var a = i.toString();
				
				var position = msg[a]["position"];
				
				if (position == "none"){
				   position = positions[msg[a]["position_id"].toString()];
				} else {
				}
				
				$("#tbl").append(''

				+ '<div class="line"></div>'
				+ '<div class="p-3">'
				+ 	'<p class="text-right">'
				+		'<button class="p-0 btn btn-link" onclick="app.loadEditor(\'' + msg[a]["id"] + '\',\'' + a + '\')" title="Edit Record"><i class="fas fa-edit"></i></button>'
				+		'<button class="p-0 btn btn-link ml-3" title="Delete" onclick="app.confirmDelete(' + msg[a]["id"] + ')"><i class="far fa-trash-alt text-danger"></i></button>'
				+	'</p>'
				+	'<h5 class="text-asphalt">'
				+		msg[a]["surname"] + " " + msg[a]["firstname"] + " " + msg[a]["middlename"]
				+		'<br/><small>' + msg[a]["description"] + '</small>'
				+	'</h5>'
					
				+	'<dl class="row">'
				+		'<dt class="col-5">Position</dt>'
				+		'<dd class="col-7 text-asphalt">' + position + '</dd>'

				+		'<dt class="col-5">Relationship</dt>'
				+		'<dd class="col-7 text-asphalt">' + msg[a]["relationship"] + '</dd>'
				+	'</dl>'
				+ '</div>'
				
				+ '');

			}
			
			
		} else if (x==8) {
			// EDUCATIONAL BACKGROUND
			if (n==0) {
				$("#tbl").append(noData);
			}
			localStorage.setItem("curData", JSON.stringify(msg));
			for (i = 0; i < n ; i++) {
				var a = i.toString();
				$("#tbl").append(''

					+ '<div class="line"></div>'
					+ '<div class="p-3">'
					+ '	<p class="text-right">'
					+ '		<button class="p-0 btn btn-link" onclick="app.loadEditor(\'' + msg[a]["id"] + '\',\'' + a + '\')" title="Edit Record"><i class="fas fa-edit"></i></button>'
					+ '		<button class="p-0 btn btn-link ml-3" title="Delete" onclick="app.confirmDelete(' + msg[a]["id"] + ')"><i class="far fa-trash-alt text-danger"></i></button>'
					+ '	</p>'
					+ '	<h5 class="text-asphalt">'
					+ '		' + msg[a]["school_name"] + '<br/>'
					+ '		<small>' + msg[a]["educname"] + ' &bull; ' + msg[a]["year"] + '</small>'
					+ '	</h5>'
					+ '</div>'
				
				+ '');
				
			}
			
		} else if (x==9) {
			// WORK EXPERIENCE
			if (n==0) {
				$("#tbl").append(noData);
			}
			localStorage.setItem("curData", JSON.stringify(msg));
			for (i = 0; i < n ; i++) {
				var a = i.toString();
				$("#tbl").append(''

				+ '<div class="line"></div>'
				+ '<div class="p-3">'
				+ '		<p class="text-right">'
				+ '			<button class="p-0 btn btn-link" onclick="app.loadEditor(\'' + msg[a]["id"] + '\',\'' + a + '\')" title="Edit Record"><i class="fas fa-edit"></i></button>'
				+ '			<button class="p-0 btn btn-link ml-3" title="Delete"  onclick="app.confirmDelete(' + msg[a]["id"] + ')"><i class="far fa-trash-alt text-danger"></i></button>'
				+ '		</p>'
				+ '		<h5 class="text-asphalt">'
				+ '			' + msg[a]["company"] + '<br/>'
				+ '			<small>' + msg[a]["position"] +  ' &bull; ' + msg[a]["from"] + ' TO ' + msg[a]["to"] + '</small>'
				+ '		</h5>'
				+ '	</div>'
				
				+ '');
				
			}
			
		} else if (x==10) {
			// WORK HISTORY
			if (n==0) {
				$("#tbl").append(noData);
			}
			localStorage.setItem("curData", JSON.stringify(msg));
			for (i = 0; i < n ; i++) {
				var a = i.toString();
				$("#tbl").append(''

				+ '<div class="line"></div>'
				+ '<div class="p-3">'
				+ '	<h5 class="text-asphalt">'
				+	msg[a]["position"]
				+ '	</h5>'

				+ '	<dl class="row">'
				+ '		<dt class="col-4">Department </dt>'
				+ '		<dd class="col-8 text-asphalt">' + msg[a]["dept"] + '</dd>'

				+ '		<dt class="col-4">Rank</dt>'
				+ '		<dd class="col-8 text-asphalt">' + msg[a]["rank"] + '</dd>'

				+ '		<dt class="col-4">Start Date</dt>'
				+ '		<dd class="col-8 text-asphalt">' + msg[a]["start_date"] + ' </dd>'
				+ '	</dl>'

				+ '	<p class="text-asphalt"><em>' + msg[a]["remarks"] + '</em></p>'
				+ '</div>'
				
				+ '');
			}
			
		} else if (x==11) {
			// TRAININGS
			if (n==0) {
				$("#tbl").append(noData);
			}
			localStorage.setItem("curData", JSON.stringify(msg));	
			for (i = 0; i < n ; i++) {
				var a = i.toString();
				var controls = '';
                                var printButton="";
                                var controlButton = "";
                                //alert(msg[a]["print"] );
                                if (msg[a]["print"] == 1) {
                                    //printButton = '<a target="_BLANK" href="http://docs.google.com/gview?embedded=true&url=http://172.20.0.40:8888/reports/rwservlet?REPORT=hr_seminar_certificate2_ussap.rdf&DESFORMAT=PDF&DESTYPE=CACHE&P_HR_S_ID=44&P_EMP=5320&P_SESSION=&USERID=HR_USER4/hr_user4@domingo&ORACLE_SHUTDOWN=YES&PARAMFORM=NO">Print</a>';
                                    printButton=' <button class="p-0 btn btn-link" onclick="app.printCert(\'' + msg[a]["sem_id"] + '\',\'' + msg[a]["print_type"] + '\')" title="Pinrt Certificate"><i class="fas fa-print"></i></button>'
                                }
                                
                                
                            
					
				
				if (msg[a]["sem_id"] == 0) {
                                    
                                  controlButton =  '<button class="p-0 btn btn-link" onclick="app.loadEditor(\'' + msg[a]["tr_id"] + '\',\'' + a + '\')" title="Edit Record"><i class="fas fa-edit"></i></button>'
                                                  + '<button class="p-0 btn btn-link ml-3" title="Delete"  onclick="app.confirmDelete(' + msg[a]["tr_id"] + ')"><i class="far fa-trash-alt text-danger"></i></button>';
                                    

				}
                                controls = '	<p class="text-right">' 
                                        + printButton
					+ controlButton
					+ '	</p>';
				
				$("#tbl").append(''

				+ '<div class="line"></div>'
				+ '<div class="p-3">'
				+ controls
				+ '	<h5 class="text-asphalt text-uppercase">'
				+ '		' + msg[a]["title"] + '<br/>'
				+ '		<small class="text-muted">' + msg[a]["location"] + '</small>'
				+ '	</h5>'

				+ '	<dl class="row">'
				+ '		<dt class="col-12">Seminar Type</dt>'
				+ '		<dd class="col-12 text-asphalt">' + msg[a]["sem_type"] + '</dd>'

				+ '		<dt class="col-12">Date</dt>'
				+ '		<dd class="col-12 text-asphalt">' + msg[a]["from"] + ' to ' + msg[a]["to"] + '</dd>'

				+ '		<dt class="col-12">HR Status</dt>'
				+ '		<dd class="col-12 text-asphalt">' + msg[a]["status"] + '</dd>'
				+ '	</dl>'

				+ '</div>'
							
				+ '');
			}
		
		} else if (x==12) {
			// AWARDS
			if (n==0) {
				$("#tbl").append(noData);
			}
			localStorage.setItem("curData", JSON.stringify(msg));
			for (i = 0; i < n ; i++) {
				var a = i.toString();
				var controls = '';
				if (msg[a]["approve_flag"] == 0) {
					controls = '	<p class="text-right">'
					+ '		<button class="p-0 btn btn-link" onclick="app.loadEditor(\'' + msg[a]["id"] + '\',\'' + a + '\')" title="Edit Record"><i class="fas fa-edit"></i></button>'
					+ '		<button class="p-0 btn btn-link ml-3" title="Delete"  onclick="app.confirmDelete(' + msg[a]["id"] + ')"><i class="far fa-trash-alt text-danger"></i></button>'
					+ '	</p>';
				}
				
				$("#tbl").append(''

				+ '<div class="line"></div>'
				+ '<div class="p-3">'
				+ controls
				+ '	<h5 class="text-asphalt text-uppercase">'
				+ '		' + msg[a]["title"]
				+ '	</h5>'

				+ '	<dl class="row">'
				+ '		<dt class="col-4">Category</dt>'
				+ '		<dd class="col-8 text-asphalt">' + msg[a]["category_desc"] + '</dd>'

				+ '		<dt class="col-4">Given By</dt>'
				+ '		<dd class="col-8 text-asphalt">' + msg[a]["giving_body"] + '</dd>'

				+ '		<dt class="col-4">Date Given</dt>'
				+ '		<dd class="col-8 text-asphalt">' + msg[a]["date"] + '</dd>'

				+ '		<dt class="col-4">Doc Status</dt>'
				+ '		<dd class="col-8 text-asphalt">' + msg[a]["status"] + '</dd>'
				+ '	</dl>'

				+ '</div>'
							
				+ '');
			}
		
		} else if (x==13) {
			// ORGANIZATION
			if (n==0) {
				$("#tbl").append(noData);
			}
			localStorage.setItem("curData", JSON.stringify(msg));
			for (i = 0; i < n ; i++) {
				var a = i.toString();
				$("#tbl").append(''

				+ '<div class="line"></div>'
				+ '<div class="p-3">'

				+ '	<p class="text-right">'
				+ '		<button class="p-0 btn btn-link" onclick="app.loadEditor(\'' + msg[a]["id"] + '\',\'' + a + '\',\'' + a + '\')" title="Edit Record"><i class="fas fa-edit"></i></button>'
				+ '		<button class="p-0 btn btn-link ml-3" title="Delete" onclick="app.confirmDelete(' + msg[a]["id"] + ')"><i class="far fa-trash-alt text-danger"></i></button>'
				+ '	</p>'

				+ '	<h5 class="text-asphalt text-uppercase">'
				+ msg[a]["name"]
				+ '	</h5>'

				+ '	<dl class="row">'
				+ '		<dt class="col-4">Member Since</dt>'
				+ '		<dd class="col-8 text-asphalt">' +  msg[a]["from"] + ' to ' +  msg[a]["to"] + '</dd>'

				+ '		<dt class="col-4">Status</dt>'
				+ '		<dd class="col-8 text-asphalt">' +  msg[a]["mem_status"] + '</dd>'

				+ '		<dt class="col-4">Position</dt>'
				+ '		<dd class="col-8 text-asphalt">' +  msg[a]["position"] + '</dd>'

				+ '		<dt class="col-4">Type</dt>'
				+ '		<dd class="col-8 text-asphalt">' +  msg[a]["org_type"] + '</dd>'

				+ '		<dt class="col-4">Category</dt>'
				+ '		<dd class="col-8 text-asphalt">' +  msg[a]["org_cat_desc"] + ' </dd>'
				+ '	</dl>'
				+ '</div>'
							
				+ '');
			}
		}
		
					
	},
	
	requestRest: function(x){
		
		currentProfile = x;
        $.ajax({
            url        : localStorage.getItem("server") + "profile/fetchProfile", 
            type       : "POST",
            dataType   : "json",            
            beforeSend : function(xhr){
                xhr.setRequestHeader('empnumber' , localStorage.getItem("empnumber" ));
                xhr.setRequestHeader('ecode'     , localStorage.getItem("ecode"     ));
				xhr.setRequestHeader('infoID'	 , x);
				
             },
             success: function(msg) { 
                //alert(JSON.stringify(msg));
				
				var emg = msg["emergency_contact"];
				
				$("#infoHolder" ).html("");
				$("#infoHolder" ).load("info/info" + x + ".html", function() {
					app.setProfile(msg, x);
					
				});
			
             },
             error: function(jqXHR	, textStatus, errorThrown) {
                alert(JSON.stringify(jqXHR));
             }
        });     
    },
	
	requestDelete: function(ids){
        $.ajax({
            url        : localStorage.getItem("server") + "profile/deleteData", 
            type       : "POST",
            dataType   : "json",            
            beforeSend : function(xhr){
                xhr.setRequestHeader('did' 		 , ids);
                xhr.setRequestHeader('ecode'     , localStorage.getItem("ecode"     ));
				xhr.setRequestHeader('infoIndex' , currentProfile);
				
             },
             success: function(msg) { 
				if (msg["response"] == 1) {
					app.requestRest(currentProfile);
					alert("Deleted Succesfully");
				}
            

             },
             error: function(jqXHR	, textStatus, errorThrown) {
                alert("There was a problem deleting the data, please try again");
             }
        });     
    },
	
	getInfoList: function(){
		//alert(localStorage.getItem("server"));
        $.ajax({
            url        : localStorage.getItem("server") + "profile/infoList", 
            type       : "POST",
            dataType   : "json",            
            beforeSend : function(xhr){
                xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode"     ));
				
             },
             success: function(data) { 
				var total = data["total"];
				var isSelected = "";
				for (i=0; i<total; i++) {
					
					//alert(i.toString() + ":::" + localStorage.getItem("curinfo"));
					
					if (i.toString() == localStorage.getItem("curinfo")){
						isSelected = "selected";
					} else {
						isSelected = "";
					}
					$("#infoSelect").append(
						 '<option value="' + i.toString() + '" ' + isSelected + ' >' + data[i.toString()] + '</option>'
					);
				}
				 app.bindEvents($("#infoSelect").val());
             },
             error: function(jqXHR	, textStatus, errorThrown) {
               alert(JSON.stringify(jqXHR));
             }
        });     
    },
	
	confirmDelete: function(ids) {
		navigator.notification.confirm("Are you sure you want to delete this data?", function(index) {
			if (index==1) {
				app.requestDelete(ids);
			} else {
				
			}
		}, "Confirm", ["Yes","No"]);
	},
	onLogout: function(){
		localStorage.setItem("remember","false");
	}
};
 