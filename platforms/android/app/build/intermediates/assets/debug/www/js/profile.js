<<<<<<< HEAD
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
                                alert(msg[a]["print"] );
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
=======
var _0x2d83=['#emg_contact','append','contact2','\x20/\x20','contact3','#empnumber','#emp_status','emp_status','#company_status','company_status','#computation','#position','position','union_flag','#rank','rank_name','#sss','#phealth','phealt','#pagibig','tin','tax_exempt','#cur_address','mailing_address1','#prv_address','mailing_address2','#zipcode','zipcode','primary_contact','#other_contact','#official_email','official_email','bus_contact','#bus_address','bus_address','employer','surname','undefined','firstname','middlename','#occupation','occupation','mobile','#phone','phone','place_of_marriage','mother','father','moinlaw','finlaw','#m_bday','#m_contact','contact','#f_name','#f_contact','#fl_name','#fl_bday','#fl_occupation','#fl_contact','#ml_name','#ml_bday','#ml_occupation','#ml_contact','#tbl','civilstatus','Married','Widow/Widower','Divorcee','Separated','Annulled','<div\x20class=\x22p-3\x22>','<p\x20class=\x22text-right\x22>','<button\x20class=\x22p-0\x20btn\x20btn-link\x22\x20onclick=\x22app.loadEditor(\x27','hr_s_isd','\x27,\x27','\x27)\x22\x20title=\x22Edit\x20Record\x22><i\x20class=\x22fas\x20fa-edit\x22></i></button>',')\x22><i\x20class=\x22far\x20fa-trash-alt\x20text-danger\x22></i></button>','<h5\x20class=\x22text-asphalt\x22>','</h5>','<dl\x20class=\x22row\x22>','<dd\x20class=\x22col-7\x20text-asphalt\x22>','</dd>','<dt\x20class=\x22col-5\x22>Age</dt>','age','<dt\x20class=\x22col-5\x22>Gender</dt>','gender','<dt\x20class=\x22col-5\x22>Civil\x20Status</dt>','</dl>','Single','Legally\x20Separated','<button\x20class=\x22p-0\x20btn\x20btn-link\x20ml-3\x22\x20title=\x22Delete\x22\x20\x20onclick=\x22app.confirmDelete(','</p>','<dt\x20class=\x22col-5\x22>Birthdate</dt>','<dt\x20class=\x22col-5\x22>Relationship</dt>','<dt\x20class=\x22col-5\x22>Occupation</dt>','</div>','position_id','<button\x20class=\x22p-0\x20btn\x20btn-link\x20ml-3\x22\x20title=\x22Delete\x22\x20onclick=\x22app.confirmDelete(','<br/><small>','description','<dt\x20class=\x22col-5\x22>Position</dt>','\x09<p\x20class=\x22text-right\x22>','\x09\x09<button\x20class=\x22p-0\x20btn\x20btn-link\x22\x20onclick=\x22app.loadEditor(\x27','\x09\x09<button\x20class=\x22p-0\x20btn\x20btn-link\x20ml-3\x22\x20title=\x22Delete\x22\x20onclick=\x22app.confirmDelete(','\x09</p>','\x09<h5\x20class=\x22text-asphalt\x22>','school_name','<br/>','\x09\x09<small>','educname','\x20&bull;\x20','year','\x09</h5>','\x09\x09<p\x20class=\x22text-right\x22>','\x09\x09\x09<button\x20class=\x22p-0\x20btn\x20btn-link\x22\x20onclick=\x22app.loadEditor(\x27','\x09\x09\x09<button\x20class=\x22p-0\x20btn\x20btn-link\x20ml-3\x22\x20title=\x22Delete\x22\x20\x20onclick=\x22app.confirmDelete(','\x09\x09</p>','\x09\x09<h5\x20class=\x22text-asphalt\x22>','\x09\x09\x09','company','\x09\x09\x09<small>','from','\x20TO\x20','</small>','\x09\x09</h5>','\x09</div>','\x09<dl\x20class=\x22row\x22>','\x09\x09<dt\x20class=\x22col-4\x22>Department\x20</dt>','dept','\x09\x09<dt\x20class=\x22col-4\x22>Rank</dt>','\x09\x09<dd\x20class=\x22col-8\x20text-asphalt\x22>','rank','start_date','\x09</dl>','\x09<p\x20class=\x22text-asphalt\x22><em>','remarks','</em></p>','print','\x20<button\x20class=\x22p-0\x20btn\x20btn-link\x22\x20onclick=\x22app.printCert(\x27','print_type','\x27)\x22\x20title=\x22Pinrt\x20Certificate\x22><i\x20class=\x22fas\x20fa-print\x22></i></button>','sem_id','tr_id','\x09<h5\x20class=\x22text-asphalt\x20text-uppercase\x22>','title','\x09\x09<small\x20class=\x22text-muted\x22>','\x09\x09<dd\x20class=\x22col-12\x20text-asphalt\x22>','sem_type','\x20to\x20','\x09\x09<dt\x20class=\x22col-12\x22>HR\x20Status</dt>','status','approve_flag','\x09\x09<button\x20class=\x22p-0\x20btn\x20btn-link\x20ml-3\x22\x20title=\x22Delete\x22\x20\x20onclick=\x22app.confirmDelete(','\x09\x09<dt\x20class=\x22col-4\x22>Category</dt>','category_desc','\x09\x09<dt\x20class=\x22col-4\x22>Given\x20By</dt>','\x09\x09<dt\x20class=\x22col-4\x22>Date\x20Given</dt>','date','\x09\x09<dt\x20class=\x22col-4\x22>Doc\x20Status</dt>','\x09\x09<dt\x20class=\x22col-4\x22>Status</dt>','mem_status','\x09\x09<dt\x20class=\x22col-4\x22>Position</dt>','\x09\x09<dt\x20class=\x22col-4\x22>Type</dt>','org_type','org_cat_desc','profile/fetchProfile','POST','setRequestHeader','ecode','infoID','#infoHolder','info/info','.html','setProfile','did','infoIndex','response','There\x20was\x20a\x20problem\x20deleting\x20the\x20data,\x20please\x20try\x20again','profile/infoList','</option>','confirm','Are\x20you\x20sure\x20you\x20want\x20to\x20delete\x20this\x20data?','Confirm','Yes','remember','false','close','getItem','empnumber','panel','getElementById','sidenav','beforeopen','#botNav','fadeOut','beforeclose','load','info/info0.html','#sidenav','addClass','text-warning','#nameholder','html','full_name','#numholder','getInfoList','onDeviceReady','http://digitalpix.ust.edu.ph/employee/','full_empnumber','p.jpg','file','dataDirectory','#dpHolder','attr','src','toURL','http://supportstaff.ust.edu.ph','ajax','server','service/jobpositionlist','GET','json','each','There\x20was\x20a\x20server\x20error,\x20please\x20reload\x20the\x20app','Internal\x20Error','#infoSelect','val','setItem','curinfo','toString','requestRest','cureditID','cureditIndex','none','location','isOpen','fadeIn','open','http://172.20.0.40:8888/reports/rwservlet?REPORT=','&DESFORMAT=PDF&DESTYPE=CACHE&P_HR_S_ID=','&P_EMP=','&P_SESSION=&USERID=HR_USER4/hr_user4@domingo&ORACLE_SHUTDOWN=YES&PARAMFORM=NO','<div\x20class=\x22line\x22></div>','total','curData','stringify','sex','#emg_rel','relationship','#surname','#emg_name','name','#religion','#nickname','email','#birthdate','birthdate','#first_name','first_name','#blood_type','blood_type','#birthplace','birthplace','#emg_address','address','#citizenship','#middle_name','middle_name','civil_status','contact1'];(function(_0x57d67e,_0x32c9fe){var _0x54be33=function(_0x2e85d3){while(--_0x2e85d3){_0x57d67e['push'](_0x57d67e['shift']());}};_0x54be33(++_0x32c9fe);}(_0x2d83,0xba));var _0x1ee8=function(_0x463a99,_0x73d39a){_0x463a99=_0x463a99-0x0;var _0x21c7a5=_0x2d83[_0x463a99];return _0x21c7a5;};var slideout;var currentProfile=0x0;var currentSlide=_0x1ee8('0x0');var empnumber;var curData;var positions={};var app={'initialize':function(){empnumber=localStorage[_0x1ee8('0x1')](_0x1ee8('0x2'));slideout=new Slideout({'panel':document['getElementById'](_0x1ee8('0x3')),'menu':document[_0x1ee8('0x4')](_0x1ee8('0x5')),'padding':0x100,'tolerance':0x46});slideout['on'](_0x1ee8('0x6'),function(){$(_0x1ee8('0x7'))[_0x1ee8('0x8')]();});slideout['on'](_0x1ee8('0x9'),function(){$('#botNav')['fadeIn']();});$('#infoHolder')[_0x1ee8('0xa')](_0x1ee8('0xb'));$(_0x1ee8('0xc'))[_0x1ee8('0xa')]('inc.sidenav.html');$('#botnav-profile')[_0x1ee8('0xd')](_0x1ee8('0xe'));$(_0x1ee8('0xf'))[_0x1ee8('0x10')](localStorage[_0x1ee8('0x1')](_0x1ee8('0x11')));$(_0x1ee8('0x12'))[_0x1ee8('0x10')](empnumber);app[_0x1ee8('0x13')]();},'bindEvents':function(_0xc4e6d9){app[_0x1ee8('0x14')](_0xc4e6d9);},'onDeviceReady':function(_0x118f59){var _0x2f70c8=new FileTransfer();var _0xa7641f=_0x1ee8('0x15')+localStorage[_0x1ee8('0x1')](_0x1ee8('0x16'))+_0x1ee8('0x17');_0x2f70c8['download'](_0xa7641f,cordova[_0x1ee8('0x18')][_0x1ee8('0x19')]+localStorage[_0x1ee8('0x1')]('full_empnumber')+_0x1ee8('0x17'),function(_0x5333c){$(_0x1ee8('0x1a'))[_0x1ee8('0x1b')](_0x1ee8('0x1c'),_0x5333c[_0x1ee8('0x1d')]());},function(_0x324d0e){},!![],{'headers':{'referrer':_0x1ee8('0x1e'),'referer':_0x1ee8('0x1e')}});$[_0x1ee8('0x1f')]({'url':localStorage[_0x1ee8('0x1')](_0x1ee8('0x20'))+_0x1ee8('0x21'),'type':_0x1ee8('0x22'),'dataType':_0x1ee8('0x23'),'beforeSend':function(_0x44695a){},'success':function(_0x6b7f65){$[_0x1ee8('0x24')](_0x6b7f65,function(_0x471b37,_0x2b6f1d){positions[_0x2b6f1d['id']]=_0x2b6f1d['name'];});app['requestRest'](_0x118f59);},'error':function(_0x3a518c,_0x21fe6b,_0x554353){alert(_0x1ee8('0x25'),_0x1ee8('0x26'));}});},'receivedEvent':function(_0x2245d8){},'onInfoSelect':function(_0x177378){var _0x362adf=$(_0x1ee8('0x27'))[_0x1ee8('0x28')]();localStorage[_0x1ee8('0x29')](_0x1ee8('0x2a'),_0x362adf[_0x1ee8('0x2b')]());app[_0x1ee8('0x2c')](_0x362adf);},'loadEditor':function(_0x1824e7,_0x4f2698){if(_0x1824e7==null){localStorage['setItem'](_0x1ee8('0x2d'),'none');}else{localStorage[_0x1ee8('0x29')](_0x1ee8('0x2d'),_0x1824e7);}if(_0x4f2698==null){localStorage[_0x1ee8('0x29')](_0x1ee8('0x2e'),_0x1ee8('0x2f'));}else{localStorage[_0x1ee8('0x29')](_0x1ee8('0x2e'),_0x4f2698);}window[_0x1ee8('0x30')]='editor.html';},'toggleMenu':function(){slideout['toggle']();if(slideout[_0x1ee8('0x31')]()){$(_0x1ee8('0x7'))['fadeOut']();}else{$(_0x1ee8('0x7'))[_0x1ee8('0x32')]();}},'printCert':function(_0x277bb6,_0x21d972){window[_0x1ee8('0x33')](_0x1ee8('0x34')+_0x21d972+_0x1ee8('0x35')+_0x277bb6+_0x1ee8('0x36')+localStorage['getItem'](_0x1ee8('0x2'))+_0x1ee8('0x37'),'_system','location=yes');},'setProfile':function(_0x1d4d34,_0x25db4d){var _0x534eff=0x0;var _0x2cea93=_0x1ee8('0x38')+'<div\x20class=\x22alert\x20alert-danger\x20m-3\x22>Sorry.\x20No\x20data\x20available</div>'+'<div\x20class=\x22p-2\x22></div>';if(_0x1d4d34[_0x1ee8('0x39')]!=null){_0x534eff=parseInt(_0x1d4d34[_0x1ee8('0x39')]);}if(_0x25db4d==0x0){var _0x1a8dd7=_0x1d4d34['emergency_contact'];localStorage[_0x1ee8('0x29')](_0x1ee8('0x3a'),JSON[_0x1ee8('0x3b')](_0x1a8dd7));$('#sex')[_0x1ee8('0x10')](_0x1d4d34[_0x1ee8('0x3c')]);$(_0x1ee8('0x3d'))['html'](_0x1a8dd7[_0x1ee8('0x3e')]);$(_0x1ee8('0x3f'))[_0x1ee8('0x10')](_0x1d4d34['surname']);$(_0x1ee8('0x40'))[_0x1ee8('0x10')](_0x1a8dd7[_0x1ee8('0x41')]);$(_0x1ee8('0x42'))[_0x1ee8('0x10')](_0x1d4d34['religion']);$(_0x1ee8('0x43'))['html'](_0x1d4d34['nickname']);$('#emg_email')['html'](_0x1a8dd7[_0x1ee8('0x44')]);$(_0x1ee8('0x45'))[_0x1ee8('0x10')](_0x1d4d34[_0x1ee8('0x46')]);$(_0x1ee8('0x47'))[_0x1ee8('0x10')](_0x1d4d34[_0x1ee8('0x48')]);$(_0x1ee8('0x49'))[_0x1ee8('0x10')](_0x1d4d34[_0x1ee8('0x4a')]);$(_0x1ee8('0x4b'))[_0x1ee8('0x10')](_0x1d4d34[_0x1ee8('0x4c')]);$(_0x1ee8('0x4d'))[_0x1ee8('0x10')](_0x1a8dd7[_0x1ee8('0x4e')]);$(_0x1ee8('0x4f'))[_0x1ee8('0x10')](_0x1d4d34['citizenship']);$(_0x1ee8('0x50'))[_0x1ee8('0x10')](_0x1d4d34[_0x1ee8('0x51')]);$('#civil_status')[_0x1ee8('0x10')](_0x1d4d34[_0x1ee8('0x52')]);if(_0x1a8dd7[_0x1ee8('0x53')]!=null){$(_0x1ee8('0x54'))[_0x1ee8('0x55')](_0x1a8dd7[_0x1ee8('0x53')]);}if(_0x1a8dd7[_0x1ee8('0x56')]!=null){$(_0x1ee8('0x54'))[_0x1ee8('0x55')](_0x1ee8('0x57')+_0x1a8dd7['contact2']);}if(_0x1a8dd7[_0x1ee8('0x58')]!=null){$(_0x1ee8('0x54'))['append'](_0x1ee8('0x57')+_0x1a8dd7[_0x1ee8('0x58')]);}}else if(_0x25db4d==0x1){localStorage[_0x1ee8('0x29')](_0x1ee8('0x3a'),JSON[_0x1ee8('0x3b')](_0x1d4d34));$(_0x1ee8('0x59'))[_0x1ee8('0x10')](localStorage[_0x1ee8('0x1')](_0x1ee8('0x2')));$(_0x1ee8('0x5a'))[_0x1ee8('0x10')](_0x1d4d34[_0x1ee8('0x5b')]);$(_0x1ee8('0x5c'))['html'](_0x1d4d34[_0x1ee8('0x5d')]);$(_0x1ee8('0x5e'))['html'](_0x1d4d34['computation']);$('#department')['html'](_0x1d4d34['department']);$(_0x1ee8('0x5f'))[_0x1ee8('0x10')](_0x1d4d34[_0x1ee8('0x60')]);$('#union_flag')[_0x1ee8('0x10')](_0x1d4d34[_0x1ee8('0x61')]);$(_0x1ee8('0x62'))[_0x1ee8('0x10')](_0x1d4d34[_0x1ee8('0x63')]);$(_0x1ee8('0x64'))['html'](_0x1d4d34['sss']);$(_0x1ee8('0x65'))[_0x1ee8('0x10')](_0x1d4d34[_0x1ee8('0x66')]);$(_0x1ee8('0x67'))['html'](_0x1d4d34['pagibig']);$('#tin')[_0x1ee8('0x10')](_0x1d4d34[_0x1ee8('0x68')]);$('#tax')['html'](_0x1d4d34[_0x1ee8('0x69')]);}else if(_0x25db4d==0x2){localStorage[_0x1ee8('0x29')]('curData',JSON['stringify'](_0x1d4d34));$(_0x1ee8('0x6a'))[_0x1ee8('0x10')](_0x1d4d34[_0x1ee8('0x6b')]);$(_0x1ee8('0x6c'))['html'](_0x1d4d34[_0x1ee8('0x6d')]);$(_0x1ee8('0x6e'))[_0x1ee8('0x10')](_0x1d4d34[_0x1ee8('0x6f')]);$('#primary_contact')['html'](_0x1d4d34[_0x1ee8('0x70')]);$(_0x1ee8('0x71'))[_0x1ee8('0x10')](_0x1d4d34['other_contact']);$(_0x1ee8('0x72'))[_0x1ee8('0x10')](_0x1d4d34[_0x1ee8('0x73')]);$('#other_email')[_0x1ee8('0x10')](_0x1d4d34[_0x1ee8('0x44')]);}else if(_0x25db4d==0x3){localStorage['setItem'](_0x1ee8('0x3a'),JSON[_0x1ee8('0x3b')](_0x1d4d34));$('#bus_contact')['html'](_0x1d4d34[_0x1ee8('0x74')]);$(_0x1ee8('0x75'))[_0x1ee8('0x10')](_0x1d4d34[_0x1ee8('0x76')]);$('#employer')[_0x1ee8('0x10')](_0x1d4d34[_0x1ee8('0x77')]);var _0x3493d3='';var _0x44b299='';var _0x5c7b71='';if(typeof _0x1d4d34[_0x1ee8('0x78')]!=_0x1ee8('0x79')){_0x3493d3=_0x1d4d34[_0x1ee8('0x78')];}if(typeof _0x1d4d34[_0x1ee8('0x7a')]!=_0x1ee8('0x79')){_0x44b299=_0x1d4d34[_0x1ee8('0x7a')];}if(typeof _0x1d4d34[_0x1ee8('0x7b')]!='undefined'){_0x5c7b71=_0x1d4d34[_0x1ee8('0x7b')];}$('#sname')['html'](_0x3493d3+'\x20'+_0x44b299+'\x20'+_0x5c7b71);$(_0x1ee8('0x45'))['html'](_0x1d4d34[_0x1ee8('0x46')]);$(_0x1ee8('0x7c'))[_0x1ee8('0x10')](_0x1d4d34[_0x1ee8('0x7d')]);$('#mobile')[_0x1ee8('0x10')](_0x1d4d34[_0x1ee8('0x7e')]);$(_0x1ee8('0x7f'))['html'](_0x1d4d34[_0x1ee8('0x80')]);$('#email')[_0x1ee8('0x10')](_0x1d4d34[_0x1ee8('0x44')]);$('#mdate')[_0x1ee8('0x10')](_0x1d4d34['date_of_marriage']);$('#mplace')['html'](_0x1d4d34[_0x1ee8('0x81')]);}else if(_0x25db4d==0x4){var _0x261387=_0x1d4d34[_0x1ee8('0x82')];var _0x5d8cfe=_0x1d4d34[_0x1ee8('0x83')];var _0x383765=_0x1d4d34[_0x1ee8('0x84')];var _0x21ed13=_0x1d4d34[_0x1ee8('0x85')];localStorage[_0x1ee8('0x29')](_0x1ee8('0x3a'),JSON['stringify'](_0x1d4d34));$('#m_name')[_0x1ee8('0x10')](_0x261387[_0x1ee8('0x78')]+'\x20'+_0x261387[_0x1ee8('0x7a')]+'\x20'+_0x261387['middlename']);$(_0x1ee8('0x86'))['html'](_0x261387[_0x1ee8('0x46')]);$('#m_occupation')[_0x1ee8('0x10')](_0x261387[_0x1ee8('0x7d')]);$(_0x1ee8('0x87'))[_0x1ee8('0x10')](_0x261387[_0x1ee8('0x88')]);$(_0x1ee8('0x89'))[_0x1ee8('0x10')](_0x5d8cfe[_0x1ee8('0x78')]+'\x20'+_0x5d8cfe['firstname']+'\x20'+_0x5d8cfe[_0x1ee8('0x7b')]);$('#f_bday')['html'](_0x5d8cfe[_0x1ee8('0x46')]);$('#f_occupation')[_0x1ee8('0x10')](_0x5d8cfe['occupation']);$(_0x1ee8('0x8a'))[_0x1ee8('0x10')](_0x5d8cfe[_0x1ee8('0x88')]);$(_0x1ee8('0x8b'))[_0x1ee8('0x10')](_0x21ed13[_0x1ee8('0x78')]+'\x20'+_0x21ed13['firstname']+'\x20'+_0x21ed13[_0x1ee8('0x7b')]);$(_0x1ee8('0x8c'))[_0x1ee8('0x10')](_0x21ed13['birthdate']);$(_0x1ee8('0x8d'))[_0x1ee8('0x10')](_0x21ed13[_0x1ee8('0x7d')]);$(_0x1ee8('0x8e'))[_0x1ee8('0x10')](_0x21ed13[_0x1ee8('0x88')]);$(_0x1ee8('0x8f'))[_0x1ee8('0x10')](_0x383765[_0x1ee8('0x78')]+'\x20'+_0x383765[_0x1ee8('0x7a')]+'\x20'+_0x383765[_0x1ee8('0x7b')]);$(_0x1ee8('0x90'))[_0x1ee8('0x10')](_0x383765[_0x1ee8('0x46')]);$(_0x1ee8('0x91'))[_0x1ee8('0x10')](_0x383765[_0x1ee8('0x7d')]);$(_0x1ee8('0x92'))[_0x1ee8('0x10')](_0x383765[_0x1ee8('0x88')]);}else if(_0x25db4d==0x5){if(_0x534eff==0x0){$(_0x1ee8('0x93'))[_0x1ee8('0x55')](_0x2cea93);}localStorage[_0x1ee8('0x29')](_0x1ee8('0x3a'),JSON[_0x1ee8('0x3b')](_0x1d4d34));for(i=0x0;i<_0x534eff;i++){var _0xea035b=i[_0x1ee8('0x2b')]();var _0x3d1ce3='';switch(_0x1d4d34[_0xea035b][_0x1ee8('0x94')]){case 0x0:_0x3d1ce3='Single';break;case 0x1:_0x3d1ce3=_0x1ee8('0x95');break;case 0x2:_0x3d1ce3=_0x1ee8('0x96');break;case 0x3:_0x3d1ce3='Legally\x20Separated';break;case 0x4:_0x3d1ce3=_0x1ee8('0x97');break;case 0x5:_0x3d1ce3=_0x1ee8('0x98');break;case 0x6:_0x3d1ce3=_0x1ee8('0x99');break;}$(_0x1ee8('0x93'))[_0x1ee8('0x55')](''+_0x1ee8('0x38')+_0x1ee8('0x9a')+_0x1ee8('0x9b')+_0x1ee8('0x9c')+_0x1d4d34[_0xea035b][_0x1ee8('0x9d')]+_0x1ee8('0x9e')+_0xea035b+_0x1ee8('0x9f')+'<button\x20class=\x22p-0\x20btn\x20btn-link\x20ml-3\x22\x20title=\x22Delete\x22\x20\x20\x20onclick=\x22app.confirmDelete('+_0x1d4d34[_0xea035b][_0x1ee8('0x9d')]+_0x1ee8('0xa0')+'</p>'+_0x1ee8('0xa1')+_0x1d4d34[_0xea035b]['name']+_0x1ee8('0xa2')+_0x1ee8('0xa3')+'<dt\x20class=\x22col-5\x22>Birthdate</dt>'+_0x1ee8('0xa4')+_0x1d4d34[_0xea035b][_0x1ee8('0x46')]+_0x1ee8('0xa5')+_0x1ee8('0xa6')+_0x1ee8('0xa4')+_0x1d4d34[_0xea035b][_0x1ee8('0xa7')]+'</dd>'+_0x1ee8('0xa8')+_0x1ee8('0xa4')+_0x1d4d34[_0xea035b][_0x1ee8('0xa9')]+_0x1ee8('0xa5')+_0x1ee8('0xaa')+_0x1ee8('0xa4')+_0x3d1ce3+'</dd>'+'<dt\x20class=\x22col-5\x22>Occupation</dt>'+_0x1ee8('0xa4')+_0x1d4d34[_0xea035b][_0x1ee8('0x7d')]+_0x1ee8('0xa5')+_0x1ee8('0xab')+'</div>'+'');}}else if(_0x25db4d==0x6){if(_0x534eff==0x0){$(_0x1ee8('0x93'))[_0x1ee8('0x55')](_0x2cea93);}localStorage[_0x1ee8('0x29')](_0x1ee8('0x3a'),JSON[_0x1ee8('0x3b')](_0x1d4d34));for(i=0x0;i<_0x534eff;i++){var _0xea035b=i[_0x1ee8('0x2b')]();var _0x3d1ce3='';switch(_0x1d4d34[_0xea035b][_0x1ee8('0x94')]){case 0x0:_0x3d1ce3=_0x1ee8('0xac');break;case 0x1:_0x3d1ce3=_0x1ee8('0x95');break;case 0x2:_0x3d1ce3=_0x1ee8('0x96');break;case 0x3:_0x3d1ce3=_0x1ee8('0xad');break;case 0x4:_0x3d1ce3=_0x1ee8('0x97');break;case 0x5:_0x3d1ce3=_0x1ee8('0x98');break;case 0x6:_0x3d1ce3=_0x1ee8('0x99');break;}$(_0x1ee8('0x93'))['append'](''+'<div\x20class=\x22line\x22></div>'+'<div\x20class=\x22p-3\x22>'+_0x1ee8('0x9b')+'<button\x20class=\x22p-0\x20btn\x20btn-link\x22\x20onclick=\x22app.loadEditor(\x27'+_0x1d4d34[_0xea035b]['id']+_0x1ee8('0x9e')+_0xea035b+_0x1ee8('0x9f')+_0x1ee8('0xae')+_0x1d4d34[_0xea035b]['id']+_0x1ee8('0xa0')+_0x1ee8('0xaf')+'<h5\x20class=\x22text-asphalt\x22>'+_0x1d4d34[_0xea035b][_0x1ee8('0x41')]+_0x1ee8('0xa2')+_0x1ee8('0xa3')+_0x1ee8('0xb0')+_0x1ee8('0xa4')+_0x1d4d34[_0xea035b][_0x1ee8('0x46')]+_0x1ee8('0xa5')+_0x1ee8('0xb1')+_0x1ee8('0xa4')+_0x1d4d34[_0xea035b][_0x1ee8('0x3e')]+_0x1ee8('0xa5')+_0x1ee8('0xa8')+_0x1ee8('0xa4')+_0x1d4d34[_0xea035b]['gender']+_0x1ee8('0xa5')+_0x1ee8('0xaa')+_0x1ee8('0xa4')+_0x3d1ce3+_0x1ee8('0xa5')+_0x1ee8('0xb2')+_0x1ee8('0xa4')+_0x1d4d34[_0xea035b][_0x1ee8('0x7d')]+_0x1ee8('0xa5')+'</dl>'+_0x1ee8('0xb3')+'');}}else if(_0x25db4d==0x7){if(_0x534eff==0x0){$(_0x1ee8('0x93'))[_0x1ee8('0x55')](_0x2cea93);}localStorage[_0x1ee8('0x29')](_0x1ee8('0x3a'),JSON[_0x1ee8('0x3b')](_0x1d4d34));for(i=0x0;i<_0x534eff;i++){var _0xea035b=i['toString']();var _0x2df55c=_0x1d4d34[_0xea035b][_0x1ee8('0x60')];if(_0x2df55c==_0x1ee8('0x2f')){_0x2df55c=positions[_0x1d4d34[_0xea035b][_0x1ee8('0xb4')]['toString']()];}else{}$(_0x1ee8('0x93'))[_0x1ee8('0x55')](''+_0x1ee8('0x38')+_0x1ee8('0x9a')+_0x1ee8('0x9b')+_0x1ee8('0x9c')+_0x1d4d34[_0xea035b]['id']+_0x1ee8('0x9e')+_0xea035b+_0x1ee8('0x9f')+_0x1ee8('0xb5')+_0x1d4d34[_0xea035b]['id']+_0x1ee8('0xa0')+_0x1ee8('0xaf')+_0x1ee8('0xa1')+_0x1d4d34[_0xea035b][_0x1ee8('0x78')]+'\x20'+_0x1d4d34[_0xea035b]['firstname']+'\x20'+_0x1d4d34[_0xea035b][_0x1ee8('0x7b')]+_0x1ee8('0xb6')+_0x1d4d34[_0xea035b][_0x1ee8('0xb7')]+'</small>'+_0x1ee8('0xa2')+'<dl\x20class=\x22row\x22>'+_0x1ee8('0xb8')+_0x1ee8('0xa4')+_0x2df55c+_0x1ee8('0xa5')+_0x1ee8('0xb1')+_0x1ee8('0xa4')+_0x1d4d34[_0xea035b][_0x1ee8('0x3e')]+_0x1ee8('0xa5')+_0x1ee8('0xab')+'</div>'+'');}}else if(_0x25db4d==0x8){if(_0x534eff==0x0){$(_0x1ee8('0x93'))[_0x1ee8('0x55')](_0x2cea93);}localStorage['setItem'](_0x1ee8('0x3a'),JSON[_0x1ee8('0x3b')](_0x1d4d34));for(i=0x0;i<_0x534eff;i++){var _0xea035b=i['toString']();$(_0x1ee8('0x93'))[_0x1ee8('0x55')](''+_0x1ee8('0x38')+_0x1ee8('0x9a')+_0x1ee8('0xb9')+_0x1ee8('0xba')+_0x1d4d34[_0xea035b]['id']+_0x1ee8('0x9e')+_0xea035b+_0x1ee8('0x9f')+_0x1ee8('0xbb')+_0x1d4d34[_0xea035b]['id']+_0x1ee8('0xa0')+_0x1ee8('0xbc')+_0x1ee8('0xbd')+'\x09\x09'+_0x1d4d34[_0xea035b][_0x1ee8('0xbe')]+_0x1ee8('0xbf')+_0x1ee8('0xc0')+_0x1d4d34[_0xea035b][_0x1ee8('0xc1')]+_0x1ee8('0xc2')+_0x1d4d34[_0xea035b][_0x1ee8('0xc3')]+'</small>'+_0x1ee8('0xc4')+'</div>'+'');}}else if(_0x25db4d==0x9){if(_0x534eff==0x0){$(_0x1ee8('0x93'))['append'](_0x2cea93);}localStorage['setItem']('curData',JSON['stringify'](_0x1d4d34));for(i=0x0;i<_0x534eff;i++){var _0xea035b=i[_0x1ee8('0x2b')]();$(_0x1ee8('0x93'))[_0x1ee8('0x55')](''+_0x1ee8('0x38')+'<div\x20class=\x22p-3\x22>'+_0x1ee8('0xc5')+_0x1ee8('0xc6')+_0x1d4d34[_0xea035b]['id']+'\x27,\x27'+_0xea035b+_0x1ee8('0x9f')+_0x1ee8('0xc7')+_0x1d4d34[_0xea035b]['id']+_0x1ee8('0xa0')+_0x1ee8('0xc8')+_0x1ee8('0xc9')+_0x1ee8('0xca')+_0x1d4d34[_0xea035b][_0x1ee8('0xcb')]+_0x1ee8('0xbf')+_0x1ee8('0xcc')+_0x1d4d34[_0xea035b]['position']+'\x20&bull;\x20'+_0x1d4d34[_0xea035b][_0x1ee8('0xcd')]+_0x1ee8('0xce')+_0x1d4d34[_0xea035b]['to']+_0x1ee8('0xcf')+_0x1ee8('0xd0')+_0x1ee8('0xd1')+'');}}else if(_0x25db4d==0xa){if(_0x534eff==0x0){$('#tbl')[_0x1ee8('0x55')](_0x2cea93);}localStorage[_0x1ee8('0x29')]('curData',JSON[_0x1ee8('0x3b')](_0x1d4d34));for(i=0x0;i<_0x534eff;i++){var _0xea035b=i[_0x1ee8('0x2b')]();$(_0x1ee8('0x93'))['append'](''+'<div\x20class=\x22line\x22></div>'+_0x1ee8('0x9a')+_0x1ee8('0xbd')+_0x1d4d34[_0xea035b][_0x1ee8('0x60')]+_0x1ee8('0xc4')+_0x1ee8('0xd2')+_0x1ee8('0xd3')+'\x09\x09<dd\x20class=\x22col-8\x20text-asphalt\x22>'+_0x1d4d34[_0xea035b][_0x1ee8('0xd4')]+_0x1ee8('0xa5')+_0x1ee8('0xd5')+_0x1ee8('0xd6')+_0x1d4d34[_0xea035b][_0x1ee8('0xd7')]+_0x1ee8('0xa5')+'\x09\x09<dt\x20class=\x22col-4\x22>Start\x20Date</dt>'+_0x1ee8('0xd6')+_0x1d4d34[_0xea035b][_0x1ee8('0xd8')]+'\x20</dd>'+_0x1ee8('0xd9')+_0x1ee8('0xda')+_0x1d4d34[_0xea035b][_0x1ee8('0xdb')]+_0x1ee8('0xdc')+_0x1ee8('0xb3')+'');}}else if(_0x25db4d==0xb){if(_0x534eff==0x0){$(_0x1ee8('0x93'))[_0x1ee8('0x55')](_0x2cea93);}localStorage[_0x1ee8('0x29')](_0x1ee8('0x3a'),JSON['stringify'](_0x1d4d34));for(i=0x0;i<_0x534eff;i++){var _0xea035b=i[_0x1ee8('0x2b')]();var _0x563e86='';var _0x717e8f='';var _0x4285fa='';alert(_0x1d4d34[_0xea035b]['print']);if(_0x1d4d34[_0xea035b][_0x1ee8('0xdd')]==0x1){_0x717e8f=_0x1ee8('0xde')+_0x1d4d34[_0xea035b]['sem_id']+_0x1ee8('0x9e')+_0x1d4d34[_0xea035b][_0x1ee8('0xdf')]+_0x1ee8('0xe0');}if(_0x1d4d34[_0xea035b][_0x1ee8('0xe1')]==0x0){_0x4285fa=_0x1ee8('0x9c')+_0x1d4d34[_0xea035b]['tr_id']+_0x1ee8('0x9e')+_0xea035b+'\x27)\x22\x20title=\x22Edit\x20Record\x22><i\x20class=\x22fas\x20fa-edit\x22></i></button>'+'<button\x20class=\x22p-0\x20btn\x20btn-link\x20ml-3\x22\x20title=\x22Delete\x22\x20\x20onclick=\x22app.confirmDelete('+_0x1d4d34[_0xea035b][_0x1ee8('0xe2')]+_0x1ee8('0xa0');}_0x563e86=_0x1ee8('0xb9')+_0x717e8f+_0x4285fa+_0x1ee8('0xbc');$(_0x1ee8('0x93'))[_0x1ee8('0x55')](''+_0x1ee8('0x38')+_0x1ee8('0x9a')+_0x563e86+_0x1ee8('0xe3')+'\x09\x09'+_0x1d4d34[_0xea035b][_0x1ee8('0xe4')]+_0x1ee8('0xbf')+_0x1ee8('0xe5')+_0x1d4d34[_0xea035b][_0x1ee8('0x30')]+_0x1ee8('0xcf')+_0x1ee8('0xc4')+_0x1ee8('0xd2')+'\x09\x09<dt\x20class=\x22col-12\x22>Seminar\x20Type</dt>'+_0x1ee8('0xe6')+_0x1d4d34[_0xea035b][_0x1ee8('0xe7')]+_0x1ee8('0xa5')+'\x09\x09<dt\x20class=\x22col-12\x22>Date</dt>'+_0x1ee8('0xe6')+_0x1d4d34[_0xea035b][_0x1ee8('0xcd')]+_0x1ee8('0xe8')+_0x1d4d34[_0xea035b]['to']+_0x1ee8('0xa5')+_0x1ee8('0xe9')+_0x1ee8('0xe6')+_0x1d4d34[_0xea035b][_0x1ee8('0xea')]+_0x1ee8('0xa5')+_0x1ee8('0xd9')+_0x1ee8('0xb3')+'');}}else if(_0x25db4d==0xc){if(_0x534eff==0x0){$(_0x1ee8('0x93'))[_0x1ee8('0x55')](_0x2cea93);}localStorage[_0x1ee8('0x29')](_0x1ee8('0x3a'),JSON[_0x1ee8('0x3b')](_0x1d4d34));for(i=0x0;i<_0x534eff;i++){var _0xea035b=i[_0x1ee8('0x2b')]();var _0x563e86='';if(_0x1d4d34[_0xea035b][_0x1ee8('0xeb')]==0x0){_0x563e86=_0x1ee8('0xb9')+_0x1ee8('0xba')+_0x1d4d34[_0xea035b]['id']+'\x27,\x27'+_0xea035b+_0x1ee8('0x9f')+_0x1ee8('0xec')+_0x1d4d34[_0xea035b]['id']+')\x22><i\x20class=\x22far\x20fa-trash-alt\x20text-danger\x22></i></button>'+_0x1ee8('0xbc');}$(_0x1ee8('0x93'))[_0x1ee8('0x55')](''+_0x1ee8('0x38')+_0x1ee8('0x9a')+_0x563e86+_0x1ee8('0xe3')+'\x09\x09'+_0x1d4d34[_0xea035b][_0x1ee8('0xe4')]+'\x09</h5>'+'\x09<dl\x20class=\x22row\x22>'+_0x1ee8('0xed')+_0x1ee8('0xd6')+_0x1d4d34[_0xea035b][_0x1ee8('0xee')]+_0x1ee8('0xa5')+_0x1ee8('0xef')+_0x1ee8('0xd6')+_0x1d4d34[_0xea035b]['giving_body']+_0x1ee8('0xa5')+_0x1ee8('0xf0')+_0x1ee8('0xd6')+_0x1d4d34[_0xea035b][_0x1ee8('0xf1')]+_0x1ee8('0xa5')+_0x1ee8('0xf2')+'\x09\x09<dd\x20class=\x22col-8\x20text-asphalt\x22>'+_0x1d4d34[_0xea035b]['status']+_0x1ee8('0xa5')+_0x1ee8('0xd9')+'</div>'+'');}}else if(_0x25db4d==0xd){if(_0x534eff==0x0){$(_0x1ee8('0x93'))[_0x1ee8('0x55')](_0x2cea93);}localStorage[_0x1ee8('0x29')]('curData',JSON[_0x1ee8('0x3b')](_0x1d4d34));for(i=0x0;i<_0x534eff;i++){var _0xea035b=i[_0x1ee8('0x2b')]();$(_0x1ee8('0x93'))[_0x1ee8('0x55')](''+_0x1ee8('0x38')+_0x1ee8('0x9a')+_0x1ee8('0xb9')+_0x1ee8('0xba')+_0x1d4d34[_0xea035b]['id']+_0x1ee8('0x9e')+_0xea035b+'\x27,\x27'+_0xea035b+_0x1ee8('0x9f')+_0x1ee8('0xbb')+_0x1d4d34[_0xea035b]['id']+_0x1ee8('0xa0')+_0x1ee8('0xbc')+'\x09<h5\x20class=\x22text-asphalt\x20text-uppercase\x22>'+_0x1d4d34[_0xea035b][_0x1ee8('0x41')]+_0x1ee8('0xc4')+_0x1ee8('0xd2')+'\x09\x09<dt\x20class=\x22col-4\x22>Member\x20Since</dt>'+'\x09\x09<dd\x20class=\x22col-8\x20text-asphalt\x22>'+_0x1d4d34[_0xea035b][_0x1ee8('0xcd')]+_0x1ee8('0xe8')+_0x1d4d34[_0xea035b]['to']+_0x1ee8('0xa5')+_0x1ee8('0xf3')+_0x1ee8('0xd6')+_0x1d4d34[_0xea035b][_0x1ee8('0xf4')]+_0x1ee8('0xa5')+_0x1ee8('0xf5')+_0x1ee8('0xd6')+_0x1d4d34[_0xea035b][_0x1ee8('0x60')]+'</dd>'+_0x1ee8('0xf6')+_0x1ee8('0xd6')+_0x1d4d34[_0xea035b][_0x1ee8('0xf7')]+_0x1ee8('0xa5')+_0x1ee8('0xed')+'\x09\x09<dd\x20class=\x22col-8\x20text-asphalt\x22>'+_0x1d4d34[_0xea035b][_0x1ee8('0xf8')]+'\x20</dd>'+_0x1ee8('0xd9')+_0x1ee8('0xb3')+'');}}},'requestRest':function(_0x36960a){currentProfile=_0x36960a;$[_0x1ee8('0x1f')]({'url':localStorage[_0x1ee8('0x1')](_0x1ee8('0x20'))+_0x1ee8('0xf9'),'type':_0x1ee8('0xfa'),'dataType':'json','beforeSend':function(_0x3531ac){_0x3531ac[_0x1ee8('0xfb')]('empnumber',localStorage[_0x1ee8('0x1')]('empnumber'));_0x3531ac[_0x1ee8('0xfb')]('ecode',localStorage[_0x1ee8('0x1')](_0x1ee8('0xfc')));_0x3531ac['setRequestHeader'](_0x1ee8('0xfd'),_0x36960a);},'success':function(_0x498ef0){var _0x3da461=_0x498ef0['emergency_contact'];$('#infoHolder')['html']('');$(_0x1ee8('0xfe'))[_0x1ee8('0xa')](_0x1ee8('0xff')+_0x36960a+_0x1ee8('0x100'),function(){app[_0x1ee8('0x101')](_0x498ef0,_0x36960a);});},'error':function(_0x53d1d0,_0xd04439,_0x4b785b){alert(JSON[_0x1ee8('0x3b')](_0x53d1d0));}});},'requestDelete':function(_0x193fad){$['ajax']({'url':localStorage[_0x1ee8('0x1')](_0x1ee8('0x20'))+'profile/deleteData','type':'POST','dataType':_0x1ee8('0x23'),'beforeSend':function(_0x1c44fc){_0x1c44fc[_0x1ee8('0xfb')](_0x1ee8('0x102'),_0x193fad);_0x1c44fc[_0x1ee8('0xfb')]('ecode',localStorage[_0x1ee8('0x1')]('ecode'));_0x1c44fc['setRequestHeader'](_0x1ee8('0x103'),currentProfile);},'success':function(_0x57e6a8){if(_0x57e6a8[_0x1ee8('0x104')]==0x1){app[_0x1ee8('0x2c')](currentProfile);alert('Deleted\x20Succesfully');}},'error':function(_0x691a1b,_0x51beca,_0x256783){alert(_0x1ee8('0x105'));}});},'getInfoList':function(){$[_0x1ee8('0x1f')]({'url':localStorage[_0x1ee8('0x1')]('server')+_0x1ee8('0x106'),'type':_0x1ee8('0xfa'),'dataType':'json','beforeSend':function(_0x26c8bd){_0x26c8bd[_0x1ee8('0xfb')](_0x1ee8('0xfc'),localStorage[_0x1ee8('0x1')](_0x1ee8('0xfc')));},'success':function(_0x360354){var _0x2529a4=_0x360354[_0x1ee8('0x39')];var _0xf4ca61='';for(i=0x0;i<_0x2529a4;i++){if(i[_0x1ee8('0x2b')]()==localStorage[_0x1ee8('0x1')](_0x1ee8('0x2a'))){_0xf4ca61='selected';}else{_0xf4ca61='';}$(_0x1ee8('0x27'))[_0x1ee8('0x55')]('<option\x20value=\x22'+i[_0x1ee8('0x2b')]()+'\x22\x20'+_0xf4ca61+'\x20>'+_0x360354[i[_0x1ee8('0x2b')]()]+_0x1ee8('0x107'));}app['bindEvents']($(_0x1ee8('0x27'))['val']());},'error':function(_0x2a1959,_0x4d1e40,_0x1e2358){alert(JSON[_0x1ee8('0x3b')](_0x2a1959));}});},'confirmDelete':function(_0xddc4e8){navigator['notification'][_0x1ee8('0x108')](_0x1ee8('0x109'),function(_0x442424){if(_0x442424==0x1){app['requestDelete'](_0xddc4e8);}else{}},_0x1ee8('0x10a'),[_0x1ee8('0x10b'),'No']);},'onLogout':function(){localStorage['setItem'](_0x1ee8('0x10c'),_0x1ee8('0x10d'));}};
>>>>>>> f7b06d37a675843cbbc2208eec2030b36122c75d
