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
				$("#m_bday"		 ).val( mother["birthdate"  ] == null ?  "" : app.reformatDate(mother["birthdate"  ]));
				$("#m_contact"	 ).val( mother["contact"	]);
				$("#m_occupation").val( mother["occupation" ]);
				
				$("#f_lname"	 ).val( father["surname"	]);
				$("#f_fname"	 ).val( father["firstname"	]);
				$("#f_mname"	 ).val( father["middlename" ]);
				$("#f_bday"		 ).val( father["birthdate"  ] == null ?  "" : app.reformatDate( father["birthdate"	]));
				$("#f_contact"	 ).val( father["contact"	]);
				$("#f_occupation").val( father["occupation" ]);
				
				$("#fl_lname"	  ).val( fa_inlaw["surname"	   ]);
				$("#fl_fname"	  ).val( fa_inlaw["firstname"  ]);
				$("#fl_mname"	  ).val( fa_inlaw["middlename" ]);
				$("#fl_bday"	  ).val( fa_inlaw["birthdate"  ] == null ?  "" : app.reformatDate(fa_inlaw["birthdate"  ]));
				$("#fl_contact"	  ).val( fa_inlaw["contact"	   ]);
				$("#fl_occupation").val( fa_inlaw["occupation" ]);
				
				$("#ml_lname"	  ).val( mo_inlaw["surname"	   ]);
				$("#ml_fname"	  ).val( mo_inlaw["firstname"  ]);
				$("#ml_mname"	  ).val( mo_inlaw["middlename" ]);
				$("#ml_bday"	  ).val( mo_inlaw["birthdate"  ] == null ?  "" : app.reformatDate(mo_inlaw["birthdate"  ]));
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
