<<<<<<< HEAD
var slideout;
var positions = {};
var months = {};
months["JAN"] = "01";
months["FEB"] = "02"; 
months["MAR"] = "03"; 
months["APR"] = "04"; 
months["MAY"] = "05"; 
months["JUN"] = "06"; 
months["JUL"] = "07"; 
months["AUG"] = "08"; 
months["SEP"] = "09"; 
months["OCT"] = "10"; 
months["NOV"] = "11"; 
months["DEC"] = "12"; 
var app = {
	initialize: function() {
        slideout = new Slideout({
			'panel': document.getElementById('panel'),
            'menu': document.getElementById('sidenav'),
            'padding': 256,
            'tolerance': 70
        });
		
		slideout.on('beforeopen', function() {

				$("#botNav").fadeOut();
		});

		slideout.on('beforeclose', function() {
				$("#botNav").fadeIn();

		});
		
        $("#sidenav").load("inc.sidenav.html");
        app.bindEvents();
        
  
    },
    bindEvents: function() {
		app.onDeviceReady();
    },
	
	onCancel: function() {
		window.location = "profile.html";	
	},

    onDeviceReady: function() {
		var title = "";
		var curInfo  = localStorage.getItem("curinfo"		);
		var curEdit  = localStorage.getItem("cureditID"		);
		var curData  = localStorage.getItem("curData"		);
		var curIndex = localStorage.getItem("cureditIndex"	);
		var json = JSON.parse(curData);
		
		
		//global.msg(curData);
		//global.msg("CURRENT INDEX: " + curIndex);
		//global.msg("GOT DATA FROM INDEX: " + JSON.stringify(json[curIndex.toString()]));
		
		if (curEdit == "none") {
			$("#editIDHolder").val('new');
		} else {
			$("#editIDHolder").val(curEdit);
		}
		
		//alert(curInfo);
		
		switch (curInfo) {
			case "0": 
				title = "Emergency Contact";
				break;
			case "2": 
				title = "Contact Details";
				break;
			case "3": 
				title = "Spouse Information";
				break;
			case "4": 
				title = "Parents Information";
				break;
			case "5": 
				title = "Siblings Information";
				break;
			case "6": 
				title = "Dependents Information";
				break;
			case "7": 
				title = "Relatives Employed in UST";
				break;
			case "8": 
				title = "Educational Background";
				break;
			case "9": 
				title = "Work Experience";
				break;
			case "11": 
				title = "Trainings";
				break;
			case "12": 
				title = "Awards";
				break;
			case "13": 
				title = "Organization & Activities";
				break;
		}
		
		
        $("#topbarTitle").html(title);
		$("#editHolder").load("edit/edit" + curInfo + ".html", function() {
				app.setFields(curInfo, json , curIndex, $("#editIDHolder").val());
		});
	},
	

    setFields: function(id, json, curIndex, eType) {
        //alert(json['name']);
		//alert(id);
		switch (id) {
			case "0": 
				if (eType == "update" || eType != "none") {
				$("#name"		  ).val(json['name'			]);
				$("#relationship" ).val(json['relationship'	]);
				$("#contact1"	  ).val(json['contact1'		]);
				$("#contact2"	  ).val(json['contact2'		]);
				$("#contact3"	  ).val(json['contact3'		]);
				$("#email"		  ).val(json['email'		]);
				$("#address"	  ).val(json['address'		]);
				}
				break;
			case "2": 
				if (eType == "update" || eType != "none") {
				$("#zipcode"	  	  ).val(json["zipcode"			]);
				$("#other_contact"	  ).val(json["other_contact"	]);
				$("#mailing_address1" ).val(json["mailing_address1"	]);
				$("#primary_contact"  ).val(json["primary_contact"	]);
				$("#mailing_address2" ).val(json["mailing_address2"	]);
				$("#email"			  ).val(json["email"			]);
				}
				break;
			case "3": 
				if (eType == "update" || eType != "none") {
				$("#employer"	 ).val( json["employer"   ]);
				$("#bus_contact" ).val( json["bus_contact"]);
				$("#bus_address" ).val( json["bus_address"]);
				
				$("#firstname"	 ).val( json["firstname"  ]);
				$("#middlename"  ).val( json["middlename" ]);
				$("#surname"	 ).val( json["surname"    ]);
				
				$("#birthdate"   ).val( app.reformatDate(json["birthdate"  ]));
				$("#occupation"  ).val( json["occupation" ]);
				$("#mobile"		 ).val( json["mobile"	  ]);
				$("#phone"		 ).val( json["phone"	  ]);
				$("#email"		 ).val( json["email"	  ]);
				
				$("#date_of_marriage"	).val( app.reformatDate(json["date_of_marriage"  ]));
				$("#place_of_marriage"	).val( json["place_of_marriage" ]);
				}
				break;
			case "4": 
				if (eType == "update" || eType != "none") {
				var mother   = json["mother" ];
				var father   = json["father" ];
				var mo_inlaw = json["moinlaw"];
				var fa_inlaw = json["finlaw" ];
				
				$("#m_lname"	 ).val( mother["surname"	]);
				$("#m_fname"	 ).val( mother["firstname"  ]);
				$("#m_mname"	 ).val( mother["middlename" ]);
				$("#m_bday"		 ).val( app.reformatDate(mother["birthdate"  ]));
				$("#m_contact"	 ).val( mother["contact"	]);
				$("#m_occupation").val( mother["occupation" ]);
				
				$("#f_lname"	 ).val( father["surname"	]);
				$("#f_fname"	 ).val( father["firstname"	]);
				$("#f_mname"	 ).val( father["middlename" ]);
				$("#f_bday"		 ).val( app.reformatDate( father["birthdate"	]));
				$("#f_contact"	 ).val( father["contact"	]);
				$("#f_occupation").val( father["occupation" ]);
				
				$("#fl_lname"	  ).val( fa_inlaw["surname"	   ]);
				$("#fl_fname"	  ).val( fa_inlaw["firstname"  ]);
				$("#fl_mname"	  ).val( fa_inlaw["middlename" ]);
				$("#fl_bday"	  ).val( app.reformatDate(fa_inlaw["birthdate"  ]));
				$("#fl_contact"	  ).val( fa_inlaw["contact"	   ]);
				$("#fl_occupation").val( fa_inlaw["occupation" ]);
				
				$("#ml_lname"	  ).val( mo_inlaw["surname"	   ]);
				$("#ml_fname"	  ).val( mo_inlaw["firstname"  ]);
				$("#ml_mname"	  ).val( mo_inlaw["middlename" ]);
				$("#ml_bday"	  ).val( app.reformatDate(mo_inlaw["birthdate"  ]));
				$("#ml_contact"	  ).val( mo_inlaw["contact"	   ]);
				$("#ml_occupation").val( mo_inlaw["occupation" ]);
				}
				break;
			case "5": 
				var d = json[curIndex.toString()];
				
				$.ajax({
					url        : localStorage.getItem("server") + "service/civilstatuslist", 
					type       : "GET",
					dataType   : "json",            
					beforeSend : function(xhr){},
					 success: function(msg) { 
						var isSelected="";
						
						$.each(msg, function(i,e){
							if (eType == "update" || eType != "none") {
							if (d["civilstatus"] == e["id"]){
								isSelected="selected";
							}
							}
							$("#civilstatus").append(
								'<option value="' + e["id"] + '"  ' + isSelected + '>' + e["meaning"] + '</option>'
							);
						});

					 },
					 error: function(jqXHR	, textStatus, errorThrown) {
						//global.msg(JSON.stringify(jqXHR));
					 }
				});   

				if (eType == "update" || eType != "none") {		
				
				$("#occupation"	).val( d["occupation"	]);			 
		
				
				$("#birthdate"	).val(app.reformatDate( d["birthdate"	]));
				
				$("#gender"		).val( d["gender"		]);
				$("#name"		).val( d["name"			]);
				$("#age"		).val( d["age"			]);
				}
				break;
			case "6": 
				var d = json[curIndex.toString()];
				$.ajax({
					url        : localStorage.getItem("server") + "service/civilstatuslist", 
					type       : "GET",
					dataType   : "json",            
					beforeSend : function(xhr){},
					 success: function(msg) { 
						var isSelected="";
						
						$.each(msg, function(i,e){
							if (eType == "update" || eType != "none") {
							if (d["civilstatus"].toString() == e["id"].toString()){
								isSelected="selected";
							} else {
								isSelected = "";
							}
							}
							$("#civilstatus").append(
								'<option value="' + e["id"] + '"  ' + isSelected + '>' + e["meaning"] + '</option>'
							);
						});

					 },
					 error: function(jqXHR	, textStatus, errorThrown) {
						//global.msg(JSON.stringify(jqXHR));
					 }
				});     
				if (eType != "new") {
				$("#occupation"	).val( d["occupation"	]);			 
				 var month = d["birthdate"	].split("/")[0];
				 var day   = d["birthdate"	].split("/")[1];
				 var year  = d["birthdate"	].split("/")[2];
				 
				 var reformatted = year + "-" + month + "-" + day;
				
				$("#birthdate"	).val(reformatted);
				
				$("#gender"		).val( d["gender"		]);
				$("#name"		).val( d["name"			]);
				$("#age"		).val( d["age"			]);
				$("#gender"		).val( d["gender"		]);
				$("#relationship").val(d["relationship"]);
				}
				break;
			case "7": 
				var d = json[curIndex.toString()];
				var isSelected="";
				$.ajax({
					url        : localStorage.getItem("server") + "service/jobpositionlist", 
					type       : "GET",
					dataType   : "json",            
					beforeSend : function(xhr){},
					success: function(msg) { 
					
						//alert(JSON.stringify(msg));
						
						//alert("OBJECT POS ID: " + d["position_id"]);
						
						$.each(msg, function(i,e){
							//alert(e["name"]);
							if (eType != "new") {
							if (d["position_id"].toString() == e["id"].toString()){
								//alert("STACKER: " + e["id"]);
								//alert("STACKER: " + e["name"]);
								isSelected="selected";
							} else {
								isSelected = "";
							}
							}
							
							
							$("#position1").append(
								'<option value="' + e["id"] + '"  ' + isSelected + '>' + e["name"] + '</option>'
							);
						});

					 },
					 error: function(jqXHR	, textStatus, errorThrown) {
						//global.msg(JSON.stringify(jqXHR));
					 }
				});     	
				
				$.ajax({
					url        : localStorage.getItem("server") + "service/departmentlist", 
					type       : "GET",
					dataType   : "json",            
					beforeSend : function(xhr){},
					 success: function(msg) { 
						var isSelected2="";
						$.each(msg, function(i,e){
							if (eType != "new") {
							if (d["department"].toString() == e["code"].toString()){	
								isSelected2 ="selected";
							} else {
								isSelected2 = "";
							}
							}
							
							$("#department").append(
								'<option value="' + e["code"] + '"  ' + isSelected2 + '>' + e["description"] + '</option>'
							);
						});

					 },
					 error: function(jqXHR	, textStatus, errorThrown) {
						//global.msg(JSON.stringify(jqXHR));
					 }
				});     
				
				if (eType == "update" || eType != "none") {
				//alert(d["position"]);
				if (d["position"] == "none") {
					
				} else {
					$("#position2").val(d["position"]);
					$("#toggler").prop("checked",true);
					app.togglePosition();
				}
				
				$("#firstname"    ).val(d["firstname"	]);
				$("#middlename"	  ).val(d["middlename"	]);
				$("#surname"      ).val(d["surname"		]);
				$("#relationship" ).val(d["relationship"]);
				}
				break;
			case "8": 
				var d = json[curIndex.toString()];
				var isSelected1 = "";
				
				//alert("EDIT TYPE : " + eType);
				
				$.ajax({
					url        : localStorage.getItem("server") + "service/educlevellist", 
					type       : "GET",
					dataType   : "json",            
					beforeSend : function(xhr){},
					success: function(msg) { 
						$.each(msg, function(i,e){
							
							if (eType != "new") {
								if (d["level"].toString() == e["value"].toString()){	
									isSelected1 ="selected";
								} else {
									isSelected1 = "";
								}
							}
							
							$("#schoollevel").append(
								'<option value="' + e["value"] + '" ' + isSelected1 + '  >' + e["meaning"] + '</option>'
							);
						});
					 },
					 error: function(jqXHR	, textStatus, errorThrown) {
						//global.msg(JSON.stringify(jqXHR));
					 }
				});
				var isSelected2 = "";
				$.ajax({
					url        : localStorage.getItem("server") + "service/regionlist", 
					type       : "GET",
					dataType   : "json",            
					beforeSend : function(xhr){},
					success: function(msg) { 
						$.each(msg, function(i,e){
							if (eType != "new") {
								if (d["region_code"].toString() == e["code"].toString()){	
									isSelected2 ="selected";
								} else {
									isSelected2 = "";
								}
							}
							
							$("#region").append(
								'<option value="' + e["code"] + '" ' + isSelected2 + ' >' + e["description"] + '</option>'
							);
						});
						
						
						if (eType != "new" ) { 
							app.onRegionSelect(d,eType, "auto");
						} else {
							app.onRegionSelect(d,eType, "manual");
						}
											
						
					 },
					 error: function(jqXHR	, textStatus, errorThrown) {
						//global.msg(JSON.stringify(jqXHR));
					 }
				}); 
					
				
				if (eType != "new") { 
					if (d["school_code"] == 0) {
						$("#toggler").prop("checked", true);
						
						app.togglePosition();
						
						$("#school2").val(d["school_name"]);
					}
					
					$("#year").val(d["year"]);
				
				}
				break;
			case "9": 
				if (eType != "new") {
					//alert("IS UPDATE");
					var d = json[curIndex.toString()];
					$("#company").val(d["company"]);
					$("#position").val(d["position"]);
					
					$("#from").val(app.reformatDate(d["from"]));
					$("#to").val(app.reformatDate(d["to"]));
				}
				break;
			case "11": 
				if (eType != "new" ) {
					var d = json[curIndex.toString()];
					$("#title").val(d["title"]);
					$("#location").val(d["location"]);
					
					$("#from").val(	app.reformatDateType2(d["from"]));
					$("#to").val(	app.reformatDateType2(d["to"]));
				}
				break;
			case "12": 
			if (eType != "new") {
				var d = json[curIndex.toString()];
				$("#title").val(d["title"]);
				$("#category").val(d["category"].toString());
				$("#giving_body").val(d["giving_body"]);
				$("#date").val(app.reformatDate(d["date"]));
			}
				break;
			case "13": 
			if (eType != "new") {
				var d = json[curIndex.toString()];
				$("#name"		).val(d["name"		]);
				$("#from"		).val(app.reformatDate(d["from"		]));
				$("#to"			).val(app.reformatDate(d["to"		]));
				$("#position"	).val(d["position"	]);
				$("#org_type"	).val(d["org_type"	]);
				$("#org_cat"	).val(d["org_cat"	]);
				$("#mem_code"	).val(d["mem_code"]);
			}
				break;
		}

    },
	reformatDate: function(eDate) {
		var month = eDate.split("/")[0];
		var day   = eDate.split("/")[1];
		var year  = eDate.split("/")[2];
		
		return year + "-" + month + "-" + day;
	},
	reformatDateType2: function(eDate) {
		var month = months[eDate.split("-")[1]];
		var day   = eDate.split("-")[0];
		var year  = eDate.split("-")[2];
		
		return year + "-" + month + "-" + day;
	},
	
	onRegionSelect: function(d,eType, selType) {
		var isSelected = "";
		$.ajax({
			url        : localStorage.getItem("server") + "service/provincelist", 
			type       : "GET",
			dataType   : "json",            
			beforeSend : function(xhr){
				xhr.setRequestHeader('regId' ,  $("#region").val() );
			},
			success: function(msg) { 
				//alert(JSON.stringify(msg));
				$("#province").html("");
				$("#municipality").html("");
				$("#school").html("");
				$("#province").append(
						'<option value="-1" > Select a Province </option>'
				);
				$("#municipality").append(
						'<option value="-1" > Select a Municipality </option>'
				);
				$("#school").append(
						'<option value="-1" > Select a School </option>'
				);
				$.each(msg, function(i,e){
					if (selType == "auto") {
						if (d["province_code"].toString() == e["code"].toString()){	
							isSelected ="selected";
						} else {
							isSelected = "";
						}
					}
					
					
					$("#province").append(
						'<option value="' + e["code"] + '" ' + isSelected + ' >' + e["name"] + '</option>'
					);
					});
					if (selType == "auto") {
						app.onProvinceSelect(d, eType, "auto");
					}
				},
				 error: function(jqXHR	, textStatus, errorThrown) {
					//global.msg(JSON.stringify(jqXHR));
			}
		});    	
		
	},
	
	onProvinceSelect: function(d,eType , selType) {
		var isSelected = "";
		$.ajax({
			url        : localStorage.getItem("server") + "service/municipalitylist", 
			type       : "GET",
			dataType   : "json",            
			beforeSend : function(xhr){
				xhr.setRequestHeader('regId'  ,  $("#region").val() );
				xhr.setRequestHeader('provId' ,  $("#province").val() );
			},
			success: function(msg) { 
				//alert("regID: " +  $("#region").val() + ", provId" + $("#province").val() + " ;;; " + JSON.stringify(msg));
				$("#municipality").html("");
				$("#school").html("");
				$("#municipality").append(
						'<option value="-1" > Select a Municipality </option>'
				);
				$("#school").append(
						'<option value="-1" > Select a School </option>'
				);
				$.each(msg, function(i,e){
					
					if (selType == "auto") {
						if (d["city_code"].toString() == e["code"].toString()){	
							isSelected ="selected";
						} else {
							isSelected = "";
						}
					}
					
					$("#municipality").append(
						'<option value="' + e["code"] + '" ' + isSelected + '  >' + e["name"] + '</option>'
						);
					});
					
					if (selType == "auto") {
						app.onMunicipalitySelect(d,eType, "auto");
					}
				},
				 error: function(jqXHR	, textStatus, errorThrown) {
					//global.msg(JSON.stringify(jqXHR));
			}
		});    
	},
	
	onMunicipalitySelect :  function(d,eType, selType) {
		var isSelected = "";
		$.ajax({
			url        : localStorage.getItem("server") + "service/schoollist", 
			type       : "GET",
			dataType   : "json",            
			beforeSend : function(xhr){
				xhr.setRequestHeader('regId' ,  $("#region").val() );
				xhr.setRequestHeader('provId' ,  $("#province").val() );
				xhr.setRequestHeader('munId' ,  $("#municipality").val() );
			},
			success: function(msg) { 
				$("#school").html("");
				$("#school").append(
						'<option value="-1" > Select a School </option>'
				);
				$.each(msg, function(i,e){
					if (selType == "auto") {
						if (d["school_code"].toString() == e["code"].toString()){	
							isSelected ="selected";
						} else {
							isSelected = "";
						}
					}
					
					$("#school").append(
						'<option value="' + e["code"] + '"  ' + isSelected + '  >' + e["name"] + '</option>'
						);
					});
				},
				 error: function(jqXHR	, textStatus, errorThrown) {
					//global.msg(JSON.stringify(jqXHR));
			}
		}); 
	},
	
	togglePosition: function() {
		if ($("#toggler").prop("checked")){
			$(".toToggle2").show();
			$(".toToggle1").hide();
		} else {
			$(".toToggle1").show();
			$(".toToggle2").hide();
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
	
	onSubmit: function() {
		if (app.validateFields()) {
			app.requestUpdate();
		} else {
			global.msg("Fill up required fields", "Notice");
		}
	},
	validateFields: function() {
			var curInfo = localStorage.getItem("curinfo");
			var x = parseInt(curInfo);
			var toReturn = true;
			switch(x) {
				case 0:
					var flag1 = 0;
					var flag2 = 0;
					if ( $("#name").val().length === 0 ){
						flag1 = 0;
						$("#name").attr("class","form-control border border-danger");
					} else {
						flag1 = 1;
						$("#name").attr("class","form-control");
					}
					if ( $("#contact1").val().length === 0 ){
						flag2 = 0;
						$("#contact1").attr("class","form-control border border-danger");
					} else {
						flag2 = 1;
						$("#contact1").attr("class","form-control");
					}		
					if (flag1+flag2 == 2) {
						toReturn = true;
					} else {
						toReturn = false;
					};
					break;
					
					
				case 5:
					var flag1 = 0;
					var flag2 = 0;
					if ( $("#name").val().length === 0 ){
						flag1 = 0;
						$("#name").attr("class","form-control border border-danger");
					} else {
						flag1 = 1;
						$("#name").attr("class","form-control");
					}
					if ( $("#birthdate").val().length === 0 ){
						flag2 = 0;
						$("#birthdate").attr("class","form-control border border-danger");
					} else {
						flag2 = 1;
						$("#birthdate").attr("class","form-control");
					}		
					if (flag1+flag2 == 2) {
						toReturn = true;
					} else {
						toReturn = false;
					};
					break;
					
				case 6:
					var flag1 = 0;
					var flag2 = 0;
					if ( $("#name").val().length === 0 ){
						flag1 = 0;
						$("#name").attr("class","form-control border border-danger");
					} else {
						flag1 = 1;
						$("#name").attr("class","form-control");
					}
					if ( $("#birthdate").val().length === 0 ){
						flag2 = 0;
						$("#birthdate").attr("class","form-control border border-danger");
					} else {
						flag2 = 1;
						$("#birthdate").attr("class","form-control");
					}		
					if (flag1+flag2 == 2) {
						toReturn = true;
					} else {
						toReturn = false;
					};
					break;
					
				case 7:
					var flag1 = 0; var flag2 = 0; 
					var flag3 = 0; var flag4 = 0;
					var flag_s = 0;
					
					if ( $("#surname").val().length === 0 ){
						flag1 = 0;
						$("#surname").attr("class","form-control border border-danger");
					} else {
						flag1 = 1;
						$("#surname").attr("class","form-control");
					}
					if ( $("#firstname").val().length === 0 ){
						flag2 = 0;
						$("#firstname").attr("class","form-control border border-danger");
					} else {
						flag2 = 1;
						$("#firstname").attr("class","form-control");
					}	

					if ( $("#middlename").val().length === 0 ){
						flag3 = 0;
						$("#middlename").attr("class","form-control border border-danger");
					} else {
						flag3 = 1;
						$("#middlename").attr("class","form-control");
					}		

					if ( $("#position2").val().length === 0 ){
						flag_s = 0;
						$("#position2").attr("class","form-control toToggle2 border border-danger");
					} else {
						flag_s = 1;
						$("#position2").attr("class","form-control toToggle2");
					}

					if ( $("#relationship").val().length === 0 ){
						flag4 = 0;
						$("#relationship").attr("class","form-control border border-danger");
					} else {
						flag4 = 1;
						$("#relationship").attr("class","form-control");
					}						
					
					
					if ($("#toggler").prop("checked")) {
						if (flag1+flag2+flag3+flag4 == 4 && flag_s ==1) {
							toReturn = true;
						} else {
							toReturn = false;
						};
					} else {
						if (flag1+flag2+flag3+flag4 == 4) {
							toReturn = true;
						} else {
							toReturn = false;
						};
					}
					
					
					break;
				case 8:
					var flag1 = 0; var flag2 = 0; 
					var flag3 = 0; var flag4 = 0;
					var flag5 = 0; var flag6 = 0;
					var flag_s = 0;
					
					if ( $("#schoollevel").val() == "-1" ){
						flag1 = 0;
						$("#schoollevel").attr("class","form-control border border-danger");
					} else {
						flag1 = 1;
						$("#schoollevel").attr("class","form-control");
					}
					if ( $("#region").val() == "-1" ){
						flag2 = 0;
						$("#region").attr("class","form-control border border-danger");
					} else {
						flag2 = 1;
						$("#region").attr("class","form-control");
					}	

					if ( $("#province").val() == "-1" ){
						flag3 = 0;
						$("#province").attr("class","form-control border border-danger");
					} else {
						flag3 = 1;
						$("#province").attr("class","form-control");
					}		

					if ( $("#school2").val().length === 0 ){
						flag_s = 0;
						$("#school2").attr("class","form-control toToggle2 border border-danger");
					} else {
						flag_s = 1;
						$("#school2").attr("class","form-control toToggle2");
					}

					if ( $("#municipality").val() == "-1" ){
						flag4 = 0;
						$("#municipality").attr("class","form-control border border-danger");
					} else {
						flag4 = 1;
						$("#municipality").attr("class","form-control");
					}						
					
					if ( $("#school").val() == "-1" ){
						flag5 = 0;
						$("#school").attr("class","form-control toToggle1 border border-danger");
					} else {
						flag5 = 1;
						$("#school").attr("class","form-control toToggle1");
					}	
					
					if ( $("#year").val().length === 0 ){
						flag6 = 0;
						$("#year").attr("class","form-control border border-danger");
					} else {
						flag6 = 1;
						$("#year").attr("class","form-control");
					}	
					
					if ($("#toggler").prop("checked")) {
						if (flag1+flag6 == 2 && flag_s ==1) {
							toReturn = true;
						} else {
							toReturn = false;
						};
					} else {
						if (flag1+flag2+flag3+flag4+flag5+flag6 == 6) {
							toReturn = true;
						} else {
							toReturn = false;
						};
					}
					
					
					break;
				case 9:
					var flag1 = 0; var flag2 = 0; 
					var flag3 = 0; var flag4 = 0;

					
					if ( $("#company").val().length === 0 ){
						flag1 = 0;
						$("#company").attr("class","form-control border border-danger");
					} else {
						flag1 = 1;
						$("#company").attr("class","form-control");
					}
						
					if ( $("#position").val().length === 0 ){
						flag2 = 0;
						$("#position").attr("class","form-control border border-danger");
					} else {
						flag2 = 1;
						$("#position").attr("class","form-control");
					}	

					if ( $("#from").val().length === 0 ){
						flag3 = 0;
						$("#from").attr("class","form-control border border-danger");
					} else {
						flag3 = 1;
						$("#from").attr("class","form-control");
					}						
			
					if ( $("#to").val().length === 0 ){
						flag4 = 0;
						$("#to").attr("class","form-control border border-danger");
					} else {
						flag4 = 1;
						$("#to").attr("class","form-control");
					}	
			
					if (flag1+flag2+flag3+flag4 == 4) {
						toReturn = true;
					} else {
						toReturn = false;
					};
					break;
				case 11:
					var flag1 = 0; var flag2 = 0; 
					var flag3 = 0; var flag4 = 0;

					
					if ( $("#title").val().length === 0 ){
						flag1 = 0;
						$("#title").attr("class","form-control border border-danger");
					} else {
						flag1 = 1;
						$("#title").attr("class","form-control");
					}
						
					if ( $("#location").val().length === 0 ){
						flag2 = 0;
						$("#location").attr("class","form-control border border-danger");
					} else {
						flag2 = 1;
						$("#location").attr("class","form-control");
					}	

					if ( $("#from").val().length === 0 ){
						flag3 = 0;
						$("#from").attr("class","form-control border border-danger");
					} else {
						flag3 = 1;
						$("#from").attr("class","form-control");
					}						
			
					if ( $("#to").val().length === 0 ){
						flag4 = 0;
						$("#to").attr("class","form-control border border-danger");
					} else {
						flag4 = 1;
						$("#to").attr("class","form-control");
					}	
			
					if (flag1+flag2+flag3+flag4 == 4) {
						toReturn = true;
					} else {
						toReturn = false;
					};
					break;
				case 12:
					var flag1 = 0; var flag2 = 0; 
					var flag3 = 0; var flag4 = 0;

					
					if ( $("#title").val().length === 0 ){
						flag1 = 0;
						$("#title").attr("class","form-control border border-danger");
					} else {
						flag1 = 1;
						$("#title").attr("class","form-control");
					}
						
					if ( $("#category").val() == "-1"){
						flag2 = 0;
						$("#category").attr("class","form-control border border-danger");
					} else {
						flag2 = 1;
						$("#category").attr("class","form-control");
					}	

					if ( $("#giving_body").val().length === 0 ){
						flag3 = 0;
						$("#giving_body").attr("class","form-control border border-danger");
					} else {
						flag3 = 1;
						$("#giving_body").attr("class","form-control");
					}						
			
					if ( $("#date").val().length === 0 ){
						flag4 = 0;
						$("#date").attr("class","form-control border border-danger");
					} else {
						flag4 = 1;
						$("#date").attr("class","form-control");
					}	
			
					if (flag1+flag2+flag3+flag4 == 4) {
						toReturn = true;
					} else {
						toReturn = false;
					};
					break;
				case 13:
					var flag1 = 0; var flag2 = 0; 
					var flag3 = 0; var flag4 = 0;
					var flag5 = 0; var flag6 = 0;
					var flag7 = 0;
					
					if ( $("#name").val().length === 0 ){
						flag1 = 0;
						$("#name").attr("class","form-control border border-danger");
					} else {
						flag1 = 1;
						$("#name").attr("class","form-control");
					}
						
					if ( $("#mem_status").val() == "-1"){
						flag2 = 0;
						$("#mem_status").attr("class","form-control border border-danger");
					} else {
						flag2 = 1;
						$("#mem_status").attr("class","form-control");
					}	
					
					if ( $("#type").val() == "-1"){
						flag3 = 0;
						$("#type").attr("class","form-control border border-danger");
					} else {
						flag3 = 1;
						$("#type").attr("class","form-control");
					}
					
					if ( $("#org_cat").val() == "-1"){
						flag4 = 0;
						$("#org_cat").attr("class","form-control border border-danger");
					} else {
						flag4 = 1;
						$("#org_cat").attr("class","form-control");
					}

					if ( $("#from").val().length === 0 ){
						flag5 = 0;
						$("#from").attr("class","form-control border border-danger");
					} else {
						flag5 = 1;
						$("#from").attr("class","form-control");
					}						
			
					if ( $("#to").val().length === 0 ){
						flag6 = 0;
						$("#to").attr("class","form-control border border-danger");
					} else {
						flag6 = 1;
						$("#to").attr("class","form-control");
					}	
			
					if ( $("#position").val().length === 0 ){
						flag7 = 0;
						$("#position").attr("class","form-control border border-danger");
					} else {
						flag7 = 1;
						$("#position").attr("class","form-control");
					}	
			
					if (flag1+flag2+flag3+flag4+flag5+flag6+flag7 == 7) {
						toReturn = true;
					} else {
						toReturn = false;
					};
					break;
			}
			
			
			return toReturn;
	},
	
	requestUpdate: function() {
			var curInfo = localStorage.getItem("curinfo");
			var x = parseInt(curInfo);
			var data_json = JSON.stringify(app.setData(x));
			$.ajax({
				url        : localStorage.getItem("server") + "profile/setProfile", 
				type       : "POST",
				dataType   : "json",            
				beforeSend : function(xhr){
					xhr.setRequestHeader('empnumber' ,  localStorage.getItem("empnumber" ));
					xhr.setRequestHeader('ecode'     ,  localStorage.getItem("ecode"     ));
					xhr.setRequestHeader('infoID'	 ,  x);
					xhr.setRequestHeader('jsonData'  ,  data_json);
					
				 },
				 success: function(response) { 
					//global.msg("RESPONSE: " + response);
					//global.msg("SUCCESS!")
					global.msg("Data succesfully updated", "success");
					window.location = "profile.html";
				 },
				 error: function(jqXHR	, textStatus, errorThrown) {
					 global.msg("There was an error processing the request", "error");
					//global.msg(JSON.stringify(jqXHR));
				 }
			});     
	},
	
	setData: function(x) {
		var data = {};
		data.etype		= $("#editIDHolder").val();
		switch (x) {
			case 0: 
				// EMERGENCY CONTACT
				data.name 			= $("#name").val();
				data.address 		= $("#address").val();
				data.contact1 		= $("#contact1").val();
				data.contact2 		= $("#contact2").val();
				data.contact3 		= $("#contact3").val();
				data.email			= $("#email").val();
				data.relationship 	= $("#relationship").val();
				break;
			case 2:
				// CONTACT INFORMATION
				data.address1 	= $("#mailing_address1").val();
				data.address2 	= $("#mailing_address2").val();
				data.zipcode 	= $("#zipcode").val();
				data.contact1 	= $("#primary_contact").val();
				data.contact2 	= $("#other_contact").val();
				data.email 		= $("#email").val();
				break;
			case 3:
				// SPOUSE INFORMATION
				data.lastname 	= $("#surname").val();
				data.firstname 	= $("#firstname").val();
				data.middlename = $("#middlename").val();
				data.bday 		= $("#birthdate").val();
				data.occupation = $("#occupation").val();
				data.employer 	= $("#employer").val();
				data.baddress 	= $("#bus_address").val();
				data.bcontact 	= $("#bus_contact").val();
				data.mobile 	= $("#mobile").val();
				data.phone 		= $("#phone").val();
				data.email 		= $("#email").val();
				data.mplace 	= $("#place_of_marriage").val();
				data.mdate 		= $("#date_of_marriage").val();
				break;
			case 4:
				// PARENTS INFORMATION
				data.f_lastname 	= $("#f_lname").val();
				data.f_firstname 	= $("#f_fname").val();
				data.f_middlename 	= $("#f_mname").val();
				data.f_bday 		= $("#f_bday").val();
				data.f_occupation 	= $("#f_occupation").val();
				data.f_contact 		= $("#f_contact").val();
				
				data.m_lastname 	= $("#m_lname").val();
				data.m_firstname 	= $("#m_fname").val();
				data.m_middlename 	= $("#m_mname").val();
				data.m_bday 		= $("#m_bday").val();
				data.m_occupation 	= $("#m_occupation").val();
				data.m_contact 		= $("#m_contact").val();
				
				data.fl_lastname 	= $("#fl_lname").val();
				data.fl_firstname 	= $("#fl_fname").val();
				data.fl_middlename 	= $("#fl_mname").val();
				data.fl_bday 		= $("#fl_bday").val();
				data.fl_occupation 	= $("#fl_occupation").val();
				data.fl_contact 	= $("#fl_contact").val();
				
				data.ml_lastname 	= $("#ml_lname").val();
				data.ml_firstname 	= $("#ml_fname").val();
				data.ml_middlename 	= $("#ml_mname").val();
				data.ml_bday 		= $("#ml_bday").val();
				data.ml_occupation 	= $("#ml_occupation").val();
				data.ml_contact 	= $("#ml_contact").val();
				
				break;
			case 5:
				// ADD SIBLINGS 
				data.name 			= $("#name"		   ).val();
				data.gender 		= $("#gender"	   ).val();
				data.bday   		= $("#birthdate"   ).val();
				data.occupation 	= $("#occupation"  ).val();
				data.civilstatus 	= $("#civilstatus" ).val();
				break;
			case 6:
				// ADD DEPENDENTS
				data.name 			= $("#name"		   ).val();
				data.gender 		= $("#gender"	   ).val();
				data.bday   		= $("#birthdate"   ).val();
				data.occupation 	= $("#occupation"  ).val();
				data.civilstatus 	= $("#civilstatus" ).val();
				data.relationship 	= $("#relationship").val();
				break;
			case 7:
				// Relatives in UST	
				
				data.surname 	= $("#surname").val();
				data.firstname 	= $("#firstname").val();
				data.middlename = $("#middlename").val();
				data.department = $("#department").val();
				
				data.position2 = $("#position2").val();
				data.position1 = $("#position1").val();
				
				data.relationship = $("#relationship").val();
				break;
			case 8:
				data.level = $("#schoollevel").val();
				
				
				if($("#toggler").prop("checked")) {
					data.schoolType = "text";
					data.region 		= "0";
					data.province 		= "0";
					data.municipality 	= "0";
					data.school_id      = "0";
					data.school_name 	= $("#school2").val();
				} else {
					data.schoolType = "selected";
					data.region 		= $("#region").val();
					data.province 		= $("#province").val();
					data.municipality 	= $("#municipality").val();
					data.school_id      = $("#school").val();
					data.school_name    = $("#school option:selected").text();
				}
				
				data.year = $("#year").val();
				
				break;
			case 9:
				data.name = $("#company").val();
				data.position = $("#position").val();
				data.from = $("#from").val();
				data.to = 	$("#to").val();
				break;
			case 10:
				data.title = $("#title").val();
				data.loc = $("#location").val();
				data.from = $("#from").val();
				data.to = $("#to").val();
				break;
			case 11:
				data.title = $("#title").val();
				data.loc = $("#location").val();
				data.from = $("#from").val();
				data.to = $("#to").val();
				break;
			case 12:
				data.title = $("#title").val();
				data.category = $("#category").val();
				data.givingbody = $("#giving_body").val();
				data.date = $("#date").val();
				break;
			case 13:
				data.name = $("#name").val();
				data.from = $("#from").val();
				data.to = $("#to").val();
				data.mem_status = $("#mem_status").val();
				data.position = $("#position").val();
				data.org_type = $("#type").val();
				data.org_cat = $("#org_cat").val();
				break;
				
		}
		
		return data;
	},
	onLogout: function(){
		localStorage.setItem("remember","false");
	}
};
=======
var _0x101f=['Siblings\x20Information','Dependents\x20Information','Educational\x20Background','Work\x20Experience','Trainings','Awards','html','#editHolder','setFields','#name','relationship','#contact1','contact1','#contact2','contact2','#contact3','contact3','#email','#address','address','update','#zipcode','zipcode','#mailing_address1','mailing_address1','#primary_contact','primary_contact','#mailing_address2','email','#employer','employer','#bus_contact','bus_contact','bus_address','#firstname','middlename','#surname','#birthdate','birthdate','#occupation','occupation','#mobile','mobile','#phone','phone','reformatDate','date_of_marriage','#place_of_marriage','place_of_marriage','mother','father','moinlaw','finlaw','#m_lname','surname','firstname','#m_mname','#m_contact','contact','#f_lname','#f_fname','#f_mname','#f_bday','#f_contact','#fl_lname','#fl_fname','#fl_mname','#fl_bday','#fl_contact','#fl_occupation','#ml_lname','#ml_mname','#ml_bday','#ml_contact','#ml_occupation','toString','ajax','server','service/civilstatuslist','GET','json','civilstatus','selected','#civilstatus','<option\x20value=\x22','\x22\x20\x20','meaning','</option>','name','age','append','split','gender','#age','each','position_id','service/departmentlist','department','code','#department','description','position','#position2','#toggler','prop','checked','#middlename','#relationship','service/educlevellist','value','#schoollevel','\x20\x20>','region_code','#region','auto','onRegionSelect','manual','school_code','#school2','#year','year','#company','company','#position','#to','#title','title','#location','#from','reformatDateType2','from','#category','#date','date','#org_type','org_type','service/provincelist','setRequestHeader','regId','#municipality','#school','#province','<option\x20value=\x22-1\x22\x20>\x20Select\x20a\x20Province\x20</option>','<option\x20value=\x22-1\x22\x20>\x20Select\x20a\x20Municipality\x20</option>','<option\x20value=\x22-1\x22\x20>\x20Select\x20a\x20School\x20</option>','province_code','onProvinceSelect','service/municipalitylist','provId','onMunicipalitySelect','service/schoollist','.toToggle2','show','.toToggle1','hide','fadeOut','requestUpdate','msg','Fill\x20up\x20required\x20fields','Notice','curinfo','length','class','form-control\x20border\x20border-danger','attr','form-control','form-control\x20toToggle2\x20border\x20border-danger','form-control\x20toToggle2','form-control\x20toToggle1\x20border\x20border-danger','form-control\x20toToggle1','#giving_body','#mem_status','#type','#org_cat','stringify','setData','profile/setProfile','POST','empnumber','ecode','infoID','jsonData','Data\x20succesfully\x20updated','success','There\x20was\x20an\x20error\x20processing\x20the\x20request','error','etype','address1','address2','#other_contact','lastname','bday','baddress','#bus_address','bcontact','mplace','mdate','#date_of_marriage','f_middlename','f_bday','#f_occupation','m_lastname','m_firstname','m_middlename','m_bday','m_occupation','#m_occupation','m_contact','fl_lastname','fl_firstname','fl_middlename','fl_occupation','fl_contact','ml_lastname','ml_firstname','#ml_fname','ml_middlename','ml_bday','ml_occupation','ml_contact','#gender','position2','position1','#position1','text','region','province','municipality','school_id','schoolType','school_name','#school\x20option:selected','loc','givingbody','org_cat','setItem','remember','false','MAR','APR','MAY','JUN','SEP','OCT','DEC','getElementById','panel','#botNav','beforeclose','fadeIn','#sidenav','load','inc.sidenav.html','onDeviceReady','location','profile.html','getItem','curData','parse','none','#editIDHolder','val','new','Contact\x20Details','Spouse\x20Information'];(function(_0x401015,_0xeeadd5){var _0x2ad2ad=function(_0x31b7a1){while(--_0x31b7a1){_0x401015['push'](_0x401015['shift']());}};_0x2ad2ad(++_0xeeadd5);}(_0x101f,0xee));var _0x353b=function(_0x5600ea,_0x542171){_0x5600ea=_0x5600ea-0x0;var _0x59484c=_0x101f[_0x5600ea];return _0x59484c;};var slideout;var positions={};var months={};months['JAN']='01';months['FEB']='02';months[_0x353b('0x0')]='03';months[_0x353b('0x1')]='04';months[_0x353b('0x2')]='05';months[_0x353b('0x3')]='06';months['JUL']='07';months['AUG']='08';months[_0x353b('0x4')]='09';months[_0x353b('0x5')]='10';months['NOV']='11';months[_0x353b('0x6')]='12';var app={'initialize':function(){slideout=new Slideout({'panel':document[_0x353b('0x7')](_0x353b('0x8')),'menu':document[_0x353b('0x7')]('sidenav'),'padding':0x100,'tolerance':0x46});slideout['on']('beforeopen',function(){$(_0x353b('0x9'))['fadeOut']();});slideout['on'](_0x353b('0xa'),function(){$('#botNav')[_0x353b('0xb')]();});$(_0x353b('0xc'))[_0x353b('0xd')](_0x353b('0xe'));app['bindEvents']();},'bindEvents':function(){app[_0x353b('0xf')]();},'onCancel':function(){window[_0x353b('0x10')]=_0x353b('0x11');},'onDeviceReady':function(){var _0xc507df='';var _0x1afca8=localStorage[_0x353b('0x12')]('curinfo');var _0x270c7b=localStorage[_0x353b('0x12')]('cureditID');var _0x3dff3d=localStorage['getItem'](_0x353b('0x13'));var _0x325d9e=localStorage[_0x353b('0x12')]('cureditIndex');var _0xb1cdbb=JSON[_0x353b('0x14')](_0x3dff3d);if(_0x270c7b==_0x353b('0x15')){$(_0x353b('0x16'))[_0x353b('0x17')](_0x353b('0x18'));}else{$(_0x353b('0x16'))[_0x353b('0x17')](_0x270c7b);}switch(_0x1afca8){case'0':_0xc507df='Emergency\x20Contact';break;case'2':_0xc507df=_0x353b('0x19');break;case'3':_0xc507df=_0x353b('0x1a');break;case'4':_0xc507df='Parents\x20Information';break;case'5':_0xc507df=_0x353b('0x1b');break;case'6':_0xc507df=_0x353b('0x1c');break;case'7':_0xc507df='Relatives\x20Employed\x20in\x20UST';break;case'8':_0xc507df=_0x353b('0x1d');break;case'9':_0xc507df=_0x353b('0x1e');break;case'11':_0xc507df=_0x353b('0x1f');break;case'12':_0xc507df=_0x353b('0x20');break;case'13':_0xc507df='Organization\x20&\x20Activities';break;}$('#topbarTitle')[_0x353b('0x21')](_0xc507df);$(_0x353b('0x22'))[_0x353b('0xd')]('edit/edit'+_0x1afca8+'.html',function(){app[_0x353b('0x23')](_0x1afca8,_0xb1cdbb,_0x325d9e,$(_0x353b('0x16'))['val']());});},'setFields':function(_0x4cd599,_0x8be0e5,_0x2afc76,_0x1f17bf){switch(_0x4cd599){case'0':if(_0x1f17bf=='update'||_0x1f17bf!=_0x353b('0x15')){$(_0x353b('0x24'))['val'](_0x8be0e5['name']);$('#relationship')[_0x353b('0x17')](_0x8be0e5[_0x353b('0x25')]);$(_0x353b('0x26'))[_0x353b('0x17')](_0x8be0e5[_0x353b('0x27')]);$(_0x353b('0x28'))[_0x353b('0x17')](_0x8be0e5[_0x353b('0x29')]);$(_0x353b('0x2a'))[_0x353b('0x17')](_0x8be0e5[_0x353b('0x2b')]);$(_0x353b('0x2c'))[_0x353b('0x17')](_0x8be0e5['email']);$(_0x353b('0x2d'))[_0x353b('0x17')](_0x8be0e5[_0x353b('0x2e')]);}break;case'2':if(_0x1f17bf==_0x353b('0x2f')||_0x1f17bf!='none'){$(_0x353b('0x30'))['val'](_0x8be0e5[_0x353b('0x31')]);$('#other_contact')['val'](_0x8be0e5['other_contact']);$(_0x353b('0x32'))[_0x353b('0x17')](_0x8be0e5[_0x353b('0x33')]);$(_0x353b('0x34'))[_0x353b('0x17')](_0x8be0e5[_0x353b('0x35')]);$(_0x353b('0x36'))[_0x353b('0x17')](_0x8be0e5['mailing_address2']);$(_0x353b('0x2c'))[_0x353b('0x17')](_0x8be0e5[_0x353b('0x37')]);}break;case'3':if(_0x1f17bf==_0x353b('0x2f')||_0x1f17bf!=_0x353b('0x15')){$(_0x353b('0x38'))[_0x353b('0x17')](_0x8be0e5[_0x353b('0x39')]);$(_0x353b('0x3a'))[_0x353b('0x17')](_0x8be0e5[_0x353b('0x3b')]);$('#bus_address')[_0x353b('0x17')](_0x8be0e5[_0x353b('0x3c')]);$(_0x353b('0x3d'))[_0x353b('0x17')](_0x8be0e5['firstname']);$('#middlename')[_0x353b('0x17')](_0x8be0e5[_0x353b('0x3e')]);$(_0x353b('0x3f'))[_0x353b('0x17')](_0x8be0e5['surname']);$(_0x353b('0x40'))[_0x353b('0x17')](app['reformatDate'](_0x8be0e5[_0x353b('0x41')]));$(_0x353b('0x42'))[_0x353b('0x17')](_0x8be0e5[_0x353b('0x43')]);$(_0x353b('0x44'))[_0x353b('0x17')](_0x8be0e5[_0x353b('0x45')]);$(_0x353b('0x46'))[_0x353b('0x17')](_0x8be0e5[_0x353b('0x47')]);$(_0x353b('0x2c'))[_0x353b('0x17')](_0x8be0e5[_0x353b('0x37')]);$('#date_of_marriage')['val'](app[_0x353b('0x48')](_0x8be0e5[_0x353b('0x49')]));$(_0x353b('0x4a'))['val'](_0x8be0e5[_0x353b('0x4b')]);}break;case'4':if(_0x1f17bf==_0x353b('0x2f')||_0x1f17bf!='none'){var _0x5668dd=_0x8be0e5[_0x353b('0x4c')];var _0xfb55e9=_0x8be0e5[_0x353b('0x4d')];var _0x598ec7=_0x8be0e5[_0x353b('0x4e')];var _0xf92c26=_0x8be0e5[_0x353b('0x4f')];$(_0x353b('0x50'))[_0x353b('0x17')](_0x5668dd[_0x353b('0x51')]);$('#m_fname')['val'](_0x5668dd[_0x353b('0x52')]);$(_0x353b('0x53'))[_0x353b('0x17')](_0x5668dd[_0x353b('0x3e')]);$('#m_bday')[_0x353b('0x17')](app[_0x353b('0x48')](_0x5668dd[_0x353b('0x41')]));$(_0x353b('0x54'))[_0x353b('0x17')](_0x5668dd[_0x353b('0x55')]);$('#m_occupation')[_0x353b('0x17')](_0x5668dd[_0x353b('0x43')]);$(_0x353b('0x56'))[_0x353b('0x17')](_0xfb55e9['surname']);$(_0x353b('0x57'))[_0x353b('0x17')](_0xfb55e9[_0x353b('0x52')]);$(_0x353b('0x58'))[_0x353b('0x17')](_0xfb55e9[_0x353b('0x3e')]);$(_0x353b('0x59'))['val'](app['reformatDate'](_0xfb55e9[_0x353b('0x41')]));$(_0x353b('0x5a'))[_0x353b('0x17')](_0xfb55e9[_0x353b('0x55')]);$('#f_occupation')[_0x353b('0x17')](_0xfb55e9[_0x353b('0x43')]);$(_0x353b('0x5b'))[_0x353b('0x17')](_0xf92c26['surname']);$(_0x353b('0x5c'))[_0x353b('0x17')](_0xf92c26[_0x353b('0x52')]);$(_0x353b('0x5d'))[_0x353b('0x17')](_0xf92c26[_0x353b('0x3e')]);$(_0x353b('0x5e'))[_0x353b('0x17')](app[_0x353b('0x48')](_0xf92c26['birthdate']));$(_0x353b('0x5f'))[_0x353b('0x17')](_0xf92c26[_0x353b('0x55')]);$(_0x353b('0x60'))[_0x353b('0x17')](_0xf92c26[_0x353b('0x43')]);$(_0x353b('0x61'))[_0x353b('0x17')](_0x598ec7[_0x353b('0x51')]);$('#ml_fname')[_0x353b('0x17')](_0x598ec7[_0x353b('0x52')]);$(_0x353b('0x62'))['val'](_0x598ec7[_0x353b('0x3e')]);$(_0x353b('0x63'))[_0x353b('0x17')](app[_0x353b('0x48')](_0x598ec7[_0x353b('0x41')]));$(_0x353b('0x64'))[_0x353b('0x17')](_0x598ec7[_0x353b('0x55')]);$(_0x353b('0x65'))[_0x353b('0x17')](_0x598ec7[_0x353b('0x43')]);}break;case'5':var _0x15f668=_0x8be0e5[_0x2afc76[_0x353b('0x66')]()];$[_0x353b('0x67')]({'url':localStorage[_0x353b('0x12')](_0x353b('0x68'))+_0x353b('0x69'),'type':_0x353b('0x6a'),'dataType':_0x353b('0x6b'),'beforeSend':function(_0x3ef5b8){},'success':function(_0x53f43c){var _0x4adc61='';$['each'](_0x53f43c,function(_0x57957d,_0x4ef395){if(_0x1f17bf==_0x353b('0x2f')||_0x1f17bf!=_0x353b('0x15')){if(_0x15f668[_0x353b('0x6c')]==_0x4ef395['id']){_0x4adc61=_0x353b('0x6d');}}$(_0x353b('0x6e'))['append'](_0x353b('0x6f')+_0x4ef395['id']+_0x353b('0x70')+_0x4adc61+'>'+_0x4ef395[_0x353b('0x71')]+_0x353b('0x72'));});},'error':function(_0x1160c3,_0xcc00ae,_0x286912){}});if(_0x1f17bf==_0x353b('0x2f')||_0x1f17bf!=_0x353b('0x15')){$(_0x353b('0x42'))[_0x353b('0x17')](_0x15f668[_0x353b('0x43')]);$(_0x353b('0x40'))[_0x353b('0x17')](app['reformatDate'](_0x15f668[_0x353b('0x41')]));$('#gender')[_0x353b('0x17')](_0x15f668['gender']);$(_0x353b('0x24'))[_0x353b('0x17')](_0x15f668[_0x353b('0x73')]);$('#age')['val'](_0x15f668[_0x353b('0x74')]);}break;case'6':var _0x15f668=_0x8be0e5[_0x2afc76[_0x353b('0x66')]()];$[_0x353b('0x67')]({'url':localStorage[_0x353b('0x12')]('server')+_0x353b('0x69'),'type':'GET','dataType':_0x353b('0x6b'),'beforeSend':function(_0xb3b155){},'success':function(_0x2785a0){var _0xd956d7='';$['each'](_0x2785a0,function(_0xa4c3cf,_0x5431b6){if(_0x1f17bf==_0x353b('0x2f')||_0x1f17bf!=_0x353b('0x15')){if(_0x15f668[_0x353b('0x6c')][_0x353b('0x66')]()==_0x5431b6['id']['toString']()){_0xd956d7=_0x353b('0x6d');}else{_0xd956d7='';}}$(_0x353b('0x6e'))[_0x353b('0x75')](_0x353b('0x6f')+_0x5431b6['id']+_0x353b('0x70')+_0xd956d7+'>'+_0x5431b6[_0x353b('0x71')]+_0x353b('0x72'));});},'error':function(_0x34c265,_0x3ddd2a,_0x55a0b6){}});if(_0x1f17bf!='new'){$(_0x353b('0x42'))['val'](_0x15f668[_0x353b('0x43')]);var _0x1662b4=_0x15f668[_0x353b('0x41')][_0x353b('0x76')]('/')[0x0];var _0x18001a=_0x15f668[_0x353b('0x41')][_0x353b('0x76')]('/')[0x1];var _0x518cbc=_0x15f668[_0x353b('0x41')][_0x353b('0x76')]('/')[0x2];var _0x1dc4b0=_0x518cbc+'-'+_0x1662b4+'-'+_0x18001a;$(_0x353b('0x40'))[_0x353b('0x17')](_0x1dc4b0);$('#gender')[_0x353b('0x17')](_0x15f668[_0x353b('0x77')]);$(_0x353b('0x24'))[_0x353b('0x17')](_0x15f668[_0x353b('0x73')]);$(_0x353b('0x78'))[_0x353b('0x17')](_0x15f668[_0x353b('0x74')]);$('#gender')['val'](_0x15f668[_0x353b('0x77')]);$('#relationship')['val'](_0x15f668['relationship']);}break;case'7':var _0x15f668=_0x8be0e5[_0x2afc76['toString']()];var _0xbcdd4='';$[_0x353b('0x67')]({'url':localStorage[_0x353b('0x12')](_0x353b('0x68'))+'service/jobpositionlist','type':_0x353b('0x6a'),'dataType':_0x353b('0x6b'),'beforeSend':function(_0x439418){},'success':function(_0xabc919){$[_0x353b('0x79')](_0xabc919,function(_0x44d6b5,_0x533745){if(_0x1f17bf!=_0x353b('0x18')){if(_0x15f668[_0x353b('0x7a')][_0x353b('0x66')]()==_0x533745['id'][_0x353b('0x66')]()){_0xbcdd4=_0x353b('0x6d');}else{_0xbcdd4='';}}$('#position1')[_0x353b('0x75')](_0x353b('0x6f')+_0x533745['id']+'\x22\x20\x20'+_0xbcdd4+'>'+_0x533745[_0x353b('0x73')]+_0x353b('0x72'));});},'error':function(_0x11dd71,_0x2259fb,_0x140c90){}});$['ajax']({'url':localStorage[_0x353b('0x12')](_0x353b('0x68'))+_0x353b('0x7b'),'type':_0x353b('0x6a'),'dataType':_0x353b('0x6b'),'beforeSend':function(_0x156fec){},'success':function(_0x14ef02){var _0x2c5509='';$[_0x353b('0x79')](_0x14ef02,function(_0x3955a7,_0x290c5b){if(_0x1f17bf!=_0x353b('0x18')){if(_0x15f668[_0x353b('0x7c')][_0x353b('0x66')]()==_0x290c5b[_0x353b('0x7d')][_0x353b('0x66')]()){_0x2c5509=_0x353b('0x6d');}else{_0x2c5509='';}}$(_0x353b('0x7e'))[_0x353b('0x75')](_0x353b('0x6f')+_0x290c5b['code']+_0x353b('0x70')+_0x2c5509+'>'+_0x290c5b[_0x353b('0x7f')]+_0x353b('0x72'));});},'error':function(_0x275582,_0x3311da,_0x1cd498){}});if(_0x1f17bf=='update'||_0x1f17bf!=_0x353b('0x15')){if(_0x15f668[_0x353b('0x80')]=='none'){}else{$(_0x353b('0x81'))[_0x353b('0x17')](_0x15f668[_0x353b('0x80')]);$(_0x353b('0x82'))[_0x353b('0x83')](_0x353b('0x84'),!![]);app['togglePosition']();}$(_0x353b('0x3d'))[_0x353b('0x17')](_0x15f668[_0x353b('0x52')]);$(_0x353b('0x85'))[_0x353b('0x17')](_0x15f668[_0x353b('0x3e')]);$(_0x353b('0x3f'))[_0x353b('0x17')](_0x15f668[_0x353b('0x51')]);$(_0x353b('0x86'))[_0x353b('0x17')](_0x15f668[_0x353b('0x25')]);}break;case'8':var _0x15f668=_0x8be0e5[_0x2afc76[_0x353b('0x66')]()];var _0x36321d='';$['ajax']({'url':localStorage[_0x353b('0x12')](_0x353b('0x68'))+_0x353b('0x87'),'type':_0x353b('0x6a'),'dataType':_0x353b('0x6b'),'beforeSend':function(_0x410465){},'success':function(_0x3a2dd4){$['each'](_0x3a2dd4,function(_0x41fee1,_0x37c92f){if(_0x1f17bf!=_0x353b('0x18')){if(_0x15f668['level'][_0x353b('0x66')]()==_0x37c92f[_0x353b('0x88')][_0x353b('0x66')]()){_0x36321d=_0x353b('0x6d');}else{_0x36321d='';}}$(_0x353b('0x89'))[_0x353b('0x75')]('<option\x20value=\x22'+_0x37c92f['value']+'\x22\x20'+_0x36321d+_0x353b('0x8a')+_0x37c92f[_0x353b('0x71')]+_0x353b('0x72'));});},'error':function(_0x44b40d,_0x72e3,_0x2f0912){}});var _0x532d64='';$[_0x353b('0x67')]({'url':localStorage[_0x353b('0x12')]('server')+'service/regionlist','type':_0x353b('0x6a'),'dataType':_0x353b('0x6b'),'beforeSend':function(_0xb3ebc){},'success':function(_0x26e79e){$[_0x353b('0x79')](_0x26e79e,function(_0x1d81a7,_0x5c1201){if(_0x1f17bf!=_0x353b('0x18')){if(_0x15f668[_0x353b('0x8b')][_0x353b('0x66')]()==_0x5c1201[_0x353b('0x7d')][_0x353b('0x66')]()){_0x532d64=_0x353b('0x6d');}else{_0x532d64='';}}$(_0x353b('0x8c'))[_0x353b('0x75')]('<option\x20value=\x22'+_0x5c1201[_0x353b('0x7d')]+'\x22\x20'+_0x532d64+'\x20>'+_0x5c1201[_0x353b('0x7f')]+'</option>');});if(_0x1f17bf!=_0x353b('0x18')){app['onRegionSelect'](_0x15f668,_0x1f17bf,_0x353b('0x8d'));}else{app[_0x353b('0x8e')](_0x15f668,_0x1f17bf,_0x353b('0x8f'));}},'error':function(_0x23da5b,_0x53615d,_0x52a8d7){}});if(_0x1f17bf!=_0x353b('0x18')){if(_0x15f668[_0x353b('0x90')]==0x0){$(_0x353b('0x82'))[_0x353b('0x83')](_0x353b('0x84'),!![]);app['togglePosition']();$(_0x353b('0x91'))[_0x353b('0x17')](_0x15f668['school_name']);}$(_0x353b('0x92'))[_0x353b('0x17')](_0x15f668[_0x353b('0x93')]);}break;case'9':if(_0x1f17bf!=_0x353b('0x18')){var _0x15f668=_0x8be0e5[_0x2afc76[_0x353b('0x66')]()];$(_0x353b('0x94'))[_0x353b('0x17')](_0x15f668[_0x353b('0x95')]);$(_0x353b('0x96'))[_0x353b('0x17')](_0x15f668[_0x353b('0x80')]);$('#from')[_0x353b('0x17')](app[_0x353b('0x48')](_0x15f668['from']));$(_0x353b('0x97'))[_0x353b('0x17')](app[_0x353b('0x48')](_0x15f668['to']));}break;case'11':if(_0x1f17bf!='new'){var _0x15f668=_0x8be0e5[_0x2afc76[_0x353b('0x66')]()];$(_0x353b('0x98'))[_0x353b('0x17')](_0x15f668[_0x353b('0x99')]);$(_0x353b('0x9a'))['val'](_0x15f668[_0x353b('0x10')]);$(_0x353b('0x9b'))[_0x353b('0x17')](app[_0x353b('0x9c')](_0x15f668[_0x353b('0x9d')]));$('#to')[_0x353b('0x17')](app[_0x353b('0x9c')](_0x15f668['to']));}break;case'12':if(_0x1f17bf!=_0x353b('0x18')){var _0x15f668=_0x8be0e5[_0x2afc76[_0x353b('0x66')]()];$(_0x353b('0x98'))['val'](_0x15f668[_0x353b('0x99')]);$(_0x353b('0x9e'))[_0x353b('0x17')](_0x15f668['category'][_0x353b('0x66')]());$('#giving_body')[_0x353b('0x17')](_0x15f668['giving_body']);$(_0x353b('0x9f'))[_0x353b('0x17')](app[_0x353b('0x48')](_0x15f668[_0x353b('0xa0')]));}break;case'13':if(_0x1f17bf!=_0x353b('0x18')){var _0x15f668=_0x8be0e5[_0x2afc76['toString']()];$(_0x353b('0x24'))[_0x353b('0x17')](_0x15f668['name']);$(_0x353b('0x9b'))[_0x353b('0x17')](app[_0x353b('0x48')](_0x15f668[_0x353b('0x9d')]));$(_0x353b('0x97'))[_0x353b('0x17')](app[_0x353b('0x48')](_0x15f668['to']));$(_0x353b('0x96'))[_0x353b('0x17')](_0x15f668['position']);$(_0x353b('0xa1'))[_0x353b('0x17')](_0x15f668[_0x353b('0xa2')]);$('#org_cat')[_0x353b('0x17')](_0x15f668['org_cat']);$('#mem_code')[_0x353b('0x17')](_0x15f668['mem_code']);}break;}},'reformatDate':function(_0x2528db){var _0x4bf50c=_0x2528db[_0x353b('0x76')]('/')[0x0];var _0x5e6177=_0x2528db[_0x353b('0x76')]('/')[0x1];var _0x763f5a=_0x2528db['split']('/')[0x2];return _0x763f5a+'-'+_0x4bf50c+'-'+_0x5e6177;},'reformatDateType2':function(_0x54519a){var _0x3b718c=months[_0x54519a[_0x353b('0x76')]('-')[0x1]];var _0x2f3fb2=_0x54519a[_0x353b('0x76')]('-')[0x0];var _0x586dd9=_0x54519a[_0x353b('0x76')]('-')[0x2];return _0x586dd9+'-'+_0x3b718c+'-'+_0x2f3fb2;},'onRegionSelect':function(_0x59663d,_0x1a2db2,_0x3184a3){var _0x45c763='';$[_0x353b('0x67')]({'url':localStorage[_0x353b('0x12')](_0x353b('0x68'))+_0x353b('0xa3'),'type':_0x353b('0x6a'),'dataType':_0x353b('0x6b'),'beforeSend':function(_0x37ea35){_0x37ea35[_0x353b('0xa4')](_0x353b('0xa5'),$(_0x353b('0x8c'))[_0x353b('0x17')]());},'success':function(_0x153c29){$('#province')[_0x353b('0x21')]('');$(_0x353b('0xa6'))[_0x353b('0x21')]('');$(_0x353b('0xa7'))['html']('');$(_0x353b('0xa8'))['append'](_0x353b('0xa9'));$(_0x353b('0xa6'))[_0x353b('0x75')](_0x353b('0xaa'));$(_0x353b('0xa7'))['append'](_0x353b('0xab'));$[_0x353b('0x79')](_0x153c29,function(_0x3089ae,_0x2f8cff){if(_0x3184a3==_0x353b('0x8d')){if(_0x59663d[_0x353b('0xac')][_0x353b('0x66')]()==_0x2f8cff[_0x353b('0x7d')][_0x353b('0x66')]()){_0x45c763=_0x353b('0x6d');}else{_0x45c763='';}}$(_0x353b('0xa8'))[_0x353b('0x75')](_0x353b('0x6f')+_0x2f8cff[_0x353b('0x7d')]+'\x22\x20'+_0x45c763+'\x20>'+_0x2f8cff[_0x353b('0x73')]+_0x353b('0x72'));});if(_0x3184a3==_0x353b('0x8d')){app[_0x353b('0xad')](_0x59663d,_0x1a2db2,_0x353b('0x8d'));}},'error':function(_0x5352e9,_0x26aa15,_0x7cbeb8){}});},'onProvinceSelect':function(_0x23ae27,_0x1f5810,_0x37c764){var _0x559292='';$[_0x353b('0x67')]({'url':localStorage[_0x353b('0x12')](_0x353b('0x68'))+_0x353b('0xae'),'type':_0x353b('0x6a'),'dataType':'json','beforeSend':function(_0x505c31){_0x505c31[_0x353b('0xa4')](_0x353b('0xa5'),$(_0x353b('0x8c'))[_0x353b('0x17')]());_0x505c31['setRequestHeader'](_0x353b('0xaf'),$(_0x353b('0xa8'))[_0x353b('0x17')]());},'success':function(_0x16a21a){$(_0x353b('0xa6'))['html']('');$(_0x353b('0xa7'))[_0x353b('0x21')]('');$(_0x353b('0xa6'))[_0x353b('0x75')]('<option\x20value=\x22-1\x22\x20>\x20Select\x20a\x20Municipality\x20</option>');$(_0x353b('0xa7'))[_0x353b('0x75')](_0x353b('0xab'));$[_0x353b('0x79')](_0x16a21a,function(_0xf70220,_0x27faca){if(_0x37c764==_0x353b('0x8d')){if(_0x23ae27['city_code'][_0x353b('0x66')]()==_0x27faca[_0x353b('0x7d')]['toString']()){_0x559292=_0x353b('0x6d');}else{_0x559292='';}}$(_0x353b('0xa6'))[_0x353b('0x75')](_0x353b('0x6f')+_0x27faca['code']+'\x22\x20'+_0x559292+_0x353b('0x8a')+_0x27faca[_0x353b('0x73')]+_0x353b('0x72'));});if(_0x37c764=='auto'){app[_0x353b('0xb0')](_0x23ae27,_0x1f5810,_0x353b('0x8d'));}},'error':function(_0x13a46d,_0x2d8885,_0x1f7dd1){}});},'onMunicipalitySelect':function(_0x51f84e,_0x509424,_0x1e6c10){var _0x3fd8ea='';$[_0x353b('0x67')]({'url':localStorage[_0x353b('0x12')](_0x353b('0x68'))+_0x353b('0xb1'),'type':_0x353b('0x6a'),'dataType':_0x353b('0x6b'),'beforeSend':function(_0x2b9ac5){_0x2b9ac5[_0x353b('0xa4')]('regId',$('#region')[_0x353b('0x17')]());_0x2b9ac5[_0x353b('0xa4')](_0x353b('0xaf'),$(_0x353b('0xa8'))[_0x353b('0x17')]());_0x2b9ac5[_0x353b('0xa4')]('munId',$(_0x353b('0xa6'))[_0x353b('0x17')]());},'success':function(_0x4e8519){$(_0x353b('0xa7'))['html']('');$('#school')['append'](_0x353b('0xab'));$['each'](_0x4e8519,function(_0xe5cebf,_0x37518f){if(_0x1e6c10==_0x353b('0x8d')){if(_0x51f84e[_0x353b('0x90')][_0x353b('0x66')]()==_0x37518f['code'][_0x353b('0x66')]()){_0x3fd8ea=_0x353b('0x6d');}else{_0x3fd8ea='';}}$(_0x353b('0xa7'))[_0x353b('0x75')]('<option\x20value=\x22'+_0x37518f['code']+'\x22\x20\x20'+_0x3fd8ea+_0x353b('0x8a')+_0x37518f[_0x353b('0x73')]+_0x353b('0x72'));});},'error':function(_0x46af92,_0x18d851,_0x37d357){}});},'togglePosition':function(){if($(_0x353b('0x82'))[_0x353b('0x83')](_0x353b('0x84'))){$(_0x353b('0xb2'))[_0x353b('0xb3')]();$(_0x353b('0xb4'))[_0x353b('0xb5')]();}else{$(_0x353b('0xb4'))[_0x353b('0xb3')]();$(_0x353b('0xb2'))[_0x353b('0xb5')]();}},'toggleMenu':function(){slideout['toggle']();if(slideout['isOpen']()){$(_0x353b('0x9'))[_0x353b('0xb6')]();}else{$('#botNav')[_0x353b('0xb')]();}},'onSubmit':function(){if(app['validateFields']()){app[_0x353b('0xb7')]();}else{global[_0x353b('0xb8')](_0x353b('0xb9'),_0x353b('0xba'));}},'validateFields':function(){var _0x2b6b22=localStorage[_0x353b('0x12')](_0x353b('0xbb'));var _0x39632a=parseInt(_0x2b6b22);var _0x2c45a0=!![];switch(_0x39632a){case 0x0:var _0x5bca70=0x0;var _0x5a75aa=0x0;if($(_0x353b('0x24'))[_0x353b('0x17')]()[_0x353b('0xbc')]===0x0){_0x5bca70=0x0;$('#name')['attr'](_0x353b('0xbd'),_0x353b('0xbe'));}else{_0x5bca70=0x1;$(_0x353b('0x24'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xc0'));}if($(_0x353b('0x26'))['val']()[_0x353b('0xbc')]===0x0){_0x5a75aa=0x0;$('#contact1')[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xbe'));}else{_0x5a75aa=0x1;$(_0x353b('0x26'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xc0'));}if(_0x5bca70+_0x5a75aa==0x2){_0x2c45a0=!![];}else{_0x2c45a0=![];};break;case 0x5:var _0x5bca70=0x0;var _0x5a75aa=0x0;if($(_0x353b('0x24'))['val']()[_0x353b('0xbc')]===0x0){_0x5bca70=0x0;$(_0x353b('0x24'))['attr'](_0x353b('0xbd'),'form-control\x20border\x20border-danger');}else{_0x5bca70=0x1;$('#name')[_0x353b('0xbf')]('class',_0x353b('0xc0'));}if($(_0x353b('0x40'))[_0x353b('0x17')]()[_0x353b('0xbc')]===0x0){_0x5a75aa=0x0;$('#birthdate')[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xbe'));}else{_0x5a75aa=0x1;$(_0x353b('0x40'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xc0'));}if(_0x5bca70+_0x5a75aa==0x2){_0x2c45a0=!![];}else{_0x2c45a0=![];};break;case 0x6:var _0x5bca70=0x0;var _0x5a75aa=0x0;if($(_0x353b('0x24'))['val']()[_0x353b('0xbc')]===0x0){_0x5bca70=0x0;$(_0x353b('0x24'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xbe'));}else{_0x5bca70=0x1;$(_0x353b('0x24'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xc0'));}if($(_0x353b('0x40'))[_0x353b('0x17')]()[_0x353b('0xbc')]===0x0){_0x5a75aa=0x0;$(_0x353b('0x40'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xbe'));}else{_0x5a75aa=0x1;$(_0x353b('0x40'))[_0x353b('0xbf')](_0x353b('0xbd'),'form-control');}if(_0x5bca70+_0x5a75aa==0x2){_0x2c45a0=!![];}else{_0x2c45a0=![];};break;case 0x7:var _0x5bca70=0x0;var _0x5a75aa=0x0;var _0x19649f=0x0;var _0x2162c2=0x0;var _0x592e9b=0x0;if($(_0x353b('0x3f'))[_0x353b('0x17')]()[_0x353b('0xbc')]===0x0){_0x5bca70=0x0;$(_0x353b('0x3f'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xbe'));}else{_0x5bca70=0x1;$(_0x353b('0x3f'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xc0'));}if($(_0x353b('0x3d'))[_0x353b('0x17')]()[_0x353b('0xbc')]===0x0){_0x5a75aa=0x0;$(_0x353b('0x3d'))[_0x353b('0xbf')]('class',_0x353b('0xbe'));}else{_0x5a75aa=0x1;$(_0x353b('0x3d'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xc0'));}if($(_0x353b('0x85'))[_0x353b('0x17')]()[_0x353b('0xbc')]===0x0){_0x19649f=0x0;$(_0x353b('0x85'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xbe'));}else{_0x19649f=0x1;$('#middlename')[_0x353b('0xbf')](_0x353b('0xbd'),'form-control');}if($(_0x353b('0x81'))[_0x353b('0x17')]()[_0x353b('0xbc')]===0x0){_0x592e9b=0x0;$(_0x353b('0x81'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xc1'));}else{_0x592e9b=0x1;$(_0x353b('0x81'))['attr'](_0x353b('0xbd'),_0x353b('0xc2'));}if($('#relationship')['val']()[_0x353b('0xbc')]===0x0){_0x2162c2=0x0;$(_0x353b('0x86'))[_0x353b('0xbf')](_0x353b('0xbd'),'form-control\x20border\x20border-danger');}else{_0x2162c2=0x1;$(_0x353b('0x86'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xc0'));}if($('#toggler')[_0x353b('0x83')](_0x353b('0x84'))){if(_0x5bca70+_0x5a75aa+_0x19649f+_0x2162c2==0x4&&_0x592e9b==0x1){_0x2c45a0=!![];}else{_0x2c45a0=![];};}else{if(_0x5bca70+_0x5a75aa+_0x19649f+_0x2162c2==0x4){_0x2c45a0=!![];}else{_0x2c45a0=![];};}break;case 0x8:var _0x5bca70=0x0;var _0x5a75aa=0x0;var _0x19649f=0x0;var _0x2162c2=0x0;var _0x4f1a14=0x0;var _0x326cae=0x0;var _0x592e9b=0x0;if($(_0x353b('0x89'))[_0x353b('0x17')]()=='-1'){_0x5bca70=0x0;$(_0x353b('0x89'))[_0x353b('0xbf')]('class',_0x353b('0xbe'));}else{_0x5bca70=0x1;$(_0x353b('0x89'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xc0'));}if($(_0x353b('0x8c'))[_0x353b('0x17')]()=='-1'){_0x5a75aa=0x0;$(_0x353b('0x8c'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xbe'));}else{_0x5a75aa=0x1;$(_0x353b('0x8c'))[_0x353b('0xbf')](_0x353b('0xbd'),'form-control');}if($(_0x353b('0xa8'))[_0x353b('0x17')]()=='-1'){_0x19649f=0x0;$(_0x353b('0xa8'))['attr']('class',_0x353b('0xbe'));}else{_0x19649f=0x1;$(_0x353b('0xa8'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xc0'));}if($(_0x353b('0x91'))[_0x353b('0x17')]()[_0x353b('0xbc')]===0x0){_0x592e9b=0x0;$('#school2')[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xc1'));}else{_0x592e9b=0x1;$(_0x353b('0x91'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xc2'));}if($(_0x353b('0xa6'))['val']()=='-1'){_0x2162c2=0x0;$(_0x353b('0xa6'))[_0x353b('0xbf')](_0x353b('0xbd'),'form-control\x20border\x20border-danger');}else{_0x2162c2=0x1;$(_0x353b('0xa6'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xc0'));}if($(_0x353b('0xa7'))[_0x353b('0x17')]()=='-1'){_0x4f1a14=0x0;$('#school')[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xc3'));}else{_0x4f1a14=0x1;$(_0x353b('0xa7'))['attr'](_0x353b('0xbd'),_0x353b('0xc4'));}if($(_0x353b('0x92'))[_0x353b('0x17')]()[_0x353b('0xbc')]===0x0){_0x326cae=0x0;$(_0x353b('0x92'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xbe'));}else{_0x326cae=0x1;$(_0x353b('0x92'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xc0'));}if($(_0x353b('0x82'))[_0x353b('0x83')](_0x353b('0x84'))){if(_0x5bca70+_0x326cae==0x2&&_0x592e9b==0x1){_0x2c45a0=!![];}else{_0x2c45a0=![];};}else{if(_0x5bca70+_0x5a75aa+_0x19649f+_0x2162c2+_0x4f1a14+_0x326cae==0x6){_0x2c45a0=!![];}else{_0x2c45a0=![];};}break;case 0x9:var _0x5bca70=0x0;var _0x5a75aa=0x0;var _0x19649f=0x0;var _0x2162c2=0x0;if($(_0x353b('0x94'))[_0x353b('0x17')]()[_0x353b('0xbc')]===0x0){_0x5bca70=0x0;$(_0x353b('0x94'))[_0x353b('0xbf')](_0x353b('0xbd'),'form-control\x20border\x20border-danger');}else{_0x5bca70=0x1;$(_0x353b('0x94'))[_0x353b('0xbf')](_0x353b('0xbd'),'form-control');}if($(_0x353b('0x96'))[_0x353b('0x17')]()[_0x353b('0xbc')]===0x0){_0x5a75aa=0x0;$(_0x353b('0x96'))['attr'](_0x353b('0xbd'),_0x353b('0xbe'));}else{_0x5a75aa=0x1;$('#position')[_0x353b('0xbf')]('class',_0x353b('0xc0'));}if($(_0x353b('0x9b'))[_0x353b('0x17')]()[_0x353b('0xbc')]===0x0){_0x19649f=0x0;$(_0x353b('0x9b'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xbe'));}else{_0x19649f=0x1;$(_0x353b('0x9b'))['attr'](_0x353b('0xbd'),_0x353b('0xc0'));}if($(_0x353b('0x97'))[_0x353b('0x17')]()[_0x353b('0xbc')]===0x0){_0x2162c2=0x0;$(_0x353b('0x97'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xbe'));}else{_0x2162c2=0x1;$(_0x353b('0x97'))['attr']('class',_0x353b('0xc0'));}if(_0x5bca70+_0x5a75aa+_0x19649f+_0x2162c2==0x4){_0x2c45a0=!![];}else{_0x2c45a0=![];};break;case 0xb:var _0x5bca70=0x0;var _0x5a75aa=0x0;var _0x19649f=0x0;var _0x2162c2=0x0;if($(_0x353b('0x98'))[_0x353b('0x17')]()[_0x353b('0xbc')]===0x0){_0x5bca70=0x0;$(_0x353b('0x98'))[_0x353b('0xbf')](_0x353b('0xbd'),'form-control\x20border\x20border-danger');}else{_0x5bca70=0x1;$(_0x353b('0x98'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xc0'));}if($('#location')[_0x353b('0x17')]()['length']===0x0){_0x5a75aa=0x0;$(_0x353b('0x9a'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xbe'));}else{_0x5a75aa=0x1;$('#location')[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xc0'));}if($(_0x353b('0x9b'))[_0x353b('0x17')]()[_0x353b('0xbc')]===0x0){_0x19649f=0x0;$(_0x353b('0x9b'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xbe'));}else{_0x19649f=0x1;$(_0x353b('0x9b'))['attr'](_0x353b('0xbd'),_0x353b('0xc0'));}if($(_0x353b('0x97'))['val']()['length']===0x0){_0x2162c2=0x0;$(_0x353b('0x97'))['attr'](_0x353b('0xbd'),_0x353b('0xbe'));}else{_0x2162c2=0x1;$(_0x353b('0x97'))['attr'](_0x353b('0xbd'),_0x353b('0xc0'));}if(_0x5bca70+_0x5a75aa+_0x19649f+_0x2162c2==0x4){_0x2c45a0=!![];}else{_0x2c45a0=![];};break;case 0xc:var _0x5bca70=0x0;var _0x5a75aa=0x0;var _0x19649f=0x0;var _0x2162c2=0x0;if($(_0x353b('0x98'))[_0x353b('0x17')]()[_0x353b('0xbc')]===0x0){_0x5bca70=0x0;$(_0x353b('0x98'))[_0x353b('0xbf')]('class',_0x353b('0xbe'));}else{_0x5bca70=0x1;$('#title')[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xc0'));}if($(_0x353b('0x9e'))['val']()=='-1'){_0x5a75aa=0x0;$(_0x353b('0x9e'))[_0x353b('0xbf')](_0x353b('0xbd'),'form-control\x20border\x20border-danger');}else{_0x5a75aa=0x1;$(_0x353b('0x9e'))[_0x353b('0xbf')](_0x353b('0xbd'),'form-control');}if($(_0x353b('0xc5'))[_0x353b('0x17')]()[_0x353b('0xbc')]===0x0){_0x19649f=0x0;$(_0x353b('0xc5'))['attr'](_0x353b('0xbd'),_0x353b('0xbe'));}else{_0x19649f=0x1;$(_0x353b('0xc5'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xc0'));}if($('#date')[_0x353b('0x17')]()[_0x353b('0xbc')]===0x0){_0x2162c2=0x0;$(_0x353b('0x9f'))[_0x353b('0xbf')]('class',_0x353b('0xbe'));}else{_0x2162c2=0x1;$(_0x353b('0x9f'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xc0'));}if(_0x5bca70+_0x5a75aa+_0x19649f+_0x2162c2==0x4){_0x2c45a0=!![];}else{_0x2c45a0=![];};break;case 0xd:var _0x5bca70=0x0;var _0x5a75aa=0x0;var _0x19649f=0x0;var _0x2162c2=0x0;var _0x4f1a14=0x0;var _0x326cae=0x0;var _0x3d9275=0x0;if($(_0x353b('0x24'))[_0x353b('0x17')]()[_0x353b('0xbc')]===0x0){_0x5bca70=0x0;$(_0x353b('0x24'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xbe'));}else{_0x5bca70=0x1;$('#name')['attr'](_0x353b('0xbd'),_0x353b('0xc0'));}if($(_0x353b('0xc6'))['val']()=='-1'){_0x5a75aa=0x0;$(_0x353b('0xc6'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xbe'));}else{_0x5a75aa=0x1;$(_0x353b('0xc6'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xc0'));}if($('#type')[_0x353b('0x17')]()=='-1'){_0x19649f=0x0;$(_0x353b('0xc7'))[_0x353b('0xbf')](_0x353b('0xbd'),'form-control\x20border\x20border-danger');}else{_0x19649f=0x1;$(_0x353b('0xc7'))[_0x353b('0xbf')]('class',_0x353b('0xc0'));}if($(_0x353b('0xc8'))[_0x353b('0x17')]()=='-1'){_0x2162c2=0x0;$(_0x353b('0xc8'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xbe'));}else{_0x2162c2=0x1;$('#org_cat')[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xc0'));}if($(_0x353b('0x9b'))[_0x353b('0x17')]()[_0x353b('0xbc')]===0x0){_0x4f1a14=0x0;$(_0x353b('0x9b'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xbe'));}else{_0x4f1a14=0x1;$(_0x353b('0x9b'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xc0'));}if($(_0x353b('0x97'))['val']()[_0x353b('0xbc')]===0x0){_0x326cae=0x0;$(_0x353b('0x97'))[_0x353b('0xbf')](_0x353b('0xbd'),'form-control\x20border\x20border-danger');}else{_0x326cae=0x1;$(_0x353b('0x97'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xc0'));}if($('#position')['val']()[_0x353b('0xbc')]===0x0){_0x3d9275=0x0;$(_0x353b('0x96'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xbe'));}else{_0x3d9275=0x1;$(_0x353b('0x96'))[_0x353b('0xbf')](_0x353b('0xbd'),_0x353b('0xc0'));}if(_0x5bca70+_0x5a75aa+_0x19649f+_0x2162c2+_0x4f1a14+_0x326cae+_0x3d9275==0x7){_0x2c45a0=!![];}else{_0x2c45a0=![];};break;}return _0x2c45a0;},'requestUpdate':function(){var _0x587eb5=localStorage[_0x353b('0x12')](_0x353b('0xbb'));var _0xa0d6eb=parseInt(_0x587eb5);var _0x43fc94=JSON[_0x353b('0xc9')](app[_0x353b('0xca')](_0xa0d6eb));$['ajax']({'url':localStorage[_0x353b('0x12')](_0x353b('0x68'))+_0x353b('0xcb'),'type':_0x353b('0xcc'),'dataType':_0x353b('0x6b'),'beforeSend':function(_0x505415){_0x505415[_0x353b('0xa4')](_0x353b('0xcd'),localStorage['getItem'](_0x353b('0xcd')));_0x505415[_0x353b('0xa4')]('ecode',localStorage[_0x353b('0x12')](_0x353b('0xce')));_0x505415[_0x353b('0xa4')](_0x353b('0xcf'),_0xa0d6eb);_0x505415[_0x353b('0xa4')](_0x353b('0xd0'),_0x43fc94);},'success':function(_0xd1c4c0){global[_0x353b('0xb8')](_0x353b('0xd1'),_0x353b('0xd2'));window[_0x353b('0x10')]='profile.html';},'error':function(_0x30dcab,_0x458580,_0x1cde1e){global[_0x353b('0xb8')](_0x353b('0xd3'),_0x353b('0xd4'));}});},'setData':function(_0x467a2b){var _0x2a3736={};_0x2a3736[_0x353b('0xd5')]=$(_0x353b('0x16'))[_0x353b('0x17')]();switch(_0x467a2b){case 0x0:_0x2a3736[_0x353b('0x73')]=$(_0x353b('0x24'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0x2e')]=$(_0x353b('0x2d'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0x27')]=$(_0x353b('0x26'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0x29')]=$(_0x353b('0x28'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0x2b')]=$(_0x353b('0x2a'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0x37')]=$(_0x353b('0x2c'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0x25')]=$(_0x353b('0x86'))[_0x353b('0x17')]();break;case 0x2:_0x2a3736[_0x353b('0xd6')]=$(_0x353b('0x32'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0xd7')]=$(_0x353b('0x36'))[_0x353b('0x17')]();_0x2a3736['zipcode']=$('#zipcode')['val']();_0x2a3736['contact1']=$('#primary_contact')['val']();_0x2a3736[_0x353b('0x29')]=$(_0x353b('0xd8'))[_0x353b('0x17')]();_0x2a3736['email']=$(_0x353b('0x2c'))[_0x353b('0x17')]();break;case 0x3:_0x2a3736[_0x353b('0xd9')]=$(_0x353b('0x3f'))[_0x353b('0x17')]();_0x2a3736['firstname']=$(_0x353b('0x3d'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0x3e')]=$(_0x353b('0x85'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0xda')]=$(_0x353b('0x40'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0x43')]=$(_0x353b('0x42'))['val']();_0x2a3736['employer']=$(_0x353b('0x38'))['val']();_0x2a3736[_0x353b('0xdb')]=$(_0x353b('0xdc'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0xdd')]=$('#bus_contact')[_0x353b('0x17')]();_0x2a3736[_0x353b('0x45')]=$(_0x353b('0x44'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0x47')]=$(_0x353b('0x46'))['val']();_0x2a3736[_0x353b('0x37')]=$(_0x353b('0x2c'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0xde')]=$(_0x353b('0x4a'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0xdf')]=$(_0x353b('0xe0'))[_0x353b('0x17')]();break;case 0x4:_0x2a3736['f_lastname']=$(_0x353b('0x56'))[_0x353b('0x17')]();_0x2a3736['f_firstname']=$(_0x353b('0x57'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0xe1')]=$(_0x353b('0x58'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0xe2')]=$(_0x353b('0x59'))[_0x353b('0x17')]();_0x2a3736['f_occupation']=$(_0x353b('0xe3'))[_0x353b('0x17')]();_0x2a3736['f_contact']=$(_0x353b('0x5a'))['val']();_0x2a3736[_0x353b('0xe4')]=$(_0x353b('0x50'))['val']();_0x2a3736[_0x353b('0xe5')]=$('#m_fname')[_0x353b('0x17')]();_0x2a3736[_0x353b('0xe6')]=$(_0x353b('0x53'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0xe7')]=$('#m_bday')[_0x353b('0x17')]();_0x2a3736[_0x353b('0xe8')]=$(_0x353b('0xe9'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0xea')]=$(_0x353b('0x54'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0xeb')]=$(_0x353b('0x5b'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0xec')]=$(_0x353b('0x5c'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0xed')]=$('#fl_mname')['val']();_0x2a3736['fl_bday']=$(_0x353b('0x5e'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0xee')]=$(_0x353b('0x60'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0xef')]=$(_0x353b('0x5f'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0xf0')]=$(_0x353b('0x61'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0xf1')]=$(_0x353b('0xf2'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0xf3')]=$(_0x353b('0x62'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0xf4')]=$(_0x353b('0x63'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0xf5')]=$(_0x353b('0x65'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0xf6')]=$(_0x353b('0x64'))['val']();break;case 0x5:_0x2a3736['name']=$('#name')[_0x353b('0x17')]();_0x2a3736[_0x353b('0x77')]=$(_0x353b('0xf7'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0xda')]=$('#birthdate')[_0x353b('0x17')]();_0x2a3736['occupation']=$(_0x353b('0x42'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0x6c')]=$(_0x353b('0x6e'))[_0x353b('0x17')]();break;case 0x6:_0x2a3736[_0x353b('0x73')]=$(_0x353b('0x24'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0x77')]=$('#gender')[_0x353b('0x17')]();_0x2a3736[_0x353b('0xda')]=$(_0x353b('0x40'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0x43')]=$(_0x353b('0x42'))[_0x353b('0x17')]();_0x2a3736['civilstatus']=$(_0x353b('0x6e'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0x25')]=$(_0x353b('0x86'))[_0x353b('0x17')]();break;case 0x7:_0x2a3736[_0x353b('0x51')]=$(_0x353b('0x3f'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0x52')]=$(_0x353b('0x3d'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0x3e')]=$(_0x353b('0x85'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0x7c')]=$(_0x353b('0x7e'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0xf8')]=$(_0x353b('0x81'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0xf9')]=$(_0x353b('0xfa'))['val']();_0x2a3736['relationship']=$('#relationship')[_0x353b('0x17')]();break;case 0x8:_0x2a3736['level']=$(_0x353b('0x89'))[_0x353b('0x17')]();if($(_0x353b('0x82'))['prop']('checked')){_0x2a3736['schoolType']=_0x353b('0xfb');_0x2a3736[_0x353b('0xfc')]='0';_0x2a3736[_0x353b('0xfd')]='0';_0x2a3736[_0x353b('0xfe')]='0';_0x2a3736[_0x353b('0xff')]='0';_0x2a3736['school_name']=$(_0x353b('0x91'))[_0x353b('0x17')]();}else{_0x2a3736[_0x353b('0x100')]=_0x353b('0x6d');_0x2a3736['region']=$(_0x353b('0x8c'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0xfd')]=$('#province')[_0x353b('0x17')]();_0x2a3736[_0x353b('0xfe')]=$('#municipality')[_0x353b('0x17')]();_0x2a3736[_0x353b('0xff')]=$(_0x353b('0xa7'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0x101')]=$(_0x353b('0x102'))[_0x353b('0xfb')]();}_0x2a3736[_0x353b('0x93')]=$(_0x353b('0x92'))[_0x353b('0x17')]();break;case 0x9:_0x2a3736['name']=$(_0x353b('0x94'))[_0x353b('0x17')]();_0x2a3736['position']=$('#position')[_0x353b('0x17')]();_0x2a3736[_0x353b('0x9d')]=$('#from')[_0x353b('0x17')]();_0x2a3736['to']=$(_0x353b('0x97'))[_0x353b('0x17')]();break;case 0xa:_0x2a3736[_0x353b('0x99')]=$(_0x353b('0x98'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0x103')]=$(_0x353b('0x9a'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0x9d')]=$(_0x353b('0x9b'))[_0x353b('0x17')]();_0x2a3736['to']=$(_0x353b('0x97'))[_0x353b('0x17')]();break;case 0xb:_0x2a3736[_0x353b('0x99')]=$('#title')[_0x353b('0x17')]();_0x2a3736[_0x353b('0x103')]=$(_0x353b('0x9a'))['val']();_0x2a3736[_0x353b('0x9d')]=$(_0x353b('0x9b'))[_0x353b('0x17')]();_0x2a3736['to']=$(_0x353b('0x97'))[_0x353b('0x17')]();break;case 0xc:_0x2a3736[_0x353b('0x99')]=$(_0x353b('0x98'))[_0x353b('0x17')]();_0x2a3736['category']=$('#category')[_0x353b('0x17')]();_0x2a3736[_0x353b('0x104')]=$(_0x353b('0xc5'))[_0x353b('0x17')]();_0x2a3736['date']=$(_0x353b('0x9f'))['val']();break;case 0xd:_0x2a3736[_0x353b('0x73')]=$(_0x353b('0x24'))[_0x353b('0x17')]();_0x2a3736['from']=$(_0x353b('0x9b'))['val']();_0x2a3736['to']=$(_0x353b('0x97'))['val']();_0x2a3736['mem_status']=$(_0x353b('0xc6'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0x80')]=$(_0x353b('0x96'))[_0x353b('0x17')]();_0x2a3736[_0x353b('0xa2')]=$('#type')['val']();_0x2a3736[_0x353b('0x105')]=$(_0x353b('0xc8'))['val']();break;}return _0x2a3736;},'onLogout':function(){localStorage[_0x353b('0x106')](_0x353b('0x107'),_0x353b('0x108'));}};
>>>>>>> f7b06d37a675843cbbc2208eec2030b36122c75d
