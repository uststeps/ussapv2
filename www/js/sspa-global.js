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
	instrument: null,
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
		
		
       
  
    },
    
    bindEvents: function() {
       app.onDeviceReady();		   
    },
	
    initializeEvalTool: function(){
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
		

	app.loadEvaluationTool(0,0);
		
    },
	navigateCoverage: function(year, cpid){
		var data = {
			empnumber : empnumber,
			deptid : parseInt(localStorage.getItem("college_2")),
			year : year,
			cpid : cpid
		};
		$.ajax({
            url   : localStorage.getItem("server") + "sspa/request", 
            type       : "POST",
            dataType   : "json",            
            beforeSend : function(xhr){
				xhr.setRequestHeader("request", "coverageNavigate");
                xhr.setRequestHeader('ecode'  , localStorage.getItem("ecode") 	);
				xhr.setRequestHeader("data"	  , JSON.stringify(data));
            },
            success: function(msg) { 
				//console.log(JSON.stringify(msg));
				if (msg.found == "true"){
					app.populateCoverageList(msg.CoveragePeriods);
				} else {
					alert("No coverage period found");
				}
			},
            error: function(jqXHR	, textStatus, errorThrown) {
                alert(JSON.stringify(jqXHR));
            }
		});    
		
	},
	
	printEvaluationResult:function(){
		var options = {
            documentSize: 'A4',
            type: 'base64'
        }
		//alert("will try to fetch file");
		window.resolveLocalFileSystemURL(cordova.file.applicationDirectory + "www/printlayout/sspaevaltool.txt", app.gotFile , app.onFail);

	},
	gotFile: function(fileEntry){
		fileEntry.file(function(file) {
			var reader = new FileReader();

			reader.onloadend = function(e) {
				
				var toPrintHTML = this.result;
				
				var data = {
					empnumber : empnumber
				};
				//alert("trying for ajax");
				$.ajax({
					url   : localStorage.getItem("server") + "sspa/request", 
					type       : "POST",
					dataType   : "json",            
					beforeSend : function(xhr){
						xhr.setRequestHeader("request", "printLayout");
						xhr.setRequestHeader('ecode'  , localStorage.getItem("ecode") 	);
						xhr.setRequestHeader("data"	  , JSON.stringify(data));
					},
					success: function(msg) { 
						//alert("ajax success");
						toPrintHTML = toPrintHTML.replace("IDdivevaluationtool", msg.categoryContent);
						toPrintHTML = toPrintHTML.replace("IDtbodyratingscale",msg.ratingScale);
						let options = {
							documentSize: 'A4',
							type: 'share'
						}
						 
						pdf.fromData(toPrintHTML, options)
							.then((base64)=>'ok')   // it will
							.catch(
							(err)=>console.err(err)
							);
						
						//alert("got past from data");
						
					},
					error: function(jqXHR	, textStatus, errorThrown) {
						alert(JSON.stringify(jqXHR));
					}
				});    
				
				
				
				
				
			}
			//alert("will try to read file");
			reader.readAsText(file);
		});
		
		//alert("DONE");
	},
	onFail: function(e){
		console.log("FileSystem Error");
		console.dir(e);
	},
	
	processPerformanceView: function(performance) {
		$("#kraTable").html(
			'<h5 class="text-dkyellow p-3 mb-0 "><strong>Key Result Areas (KRA)</strong></h5>' + 
			'<div class="line"></div>"'
		);
		$.each(performance,function( index, perf){
			
			var construct = "";
			
			$.each(perf.kpi, function(kpiId, kpi) {
				construct = construct + '<tr  class="w-100">' + 
				'<td class="w-100">' + 
					'<span class="text-dark">Accomplishment of task</span>' + 
					'<br/><small>Remarks: \'' + kpi.indicator + '\'</small>' + 
				'</td>' + 
				'<td  class="w-100">' + 
					'<span class="text-dark">Actual</span><br/>  ' + kpi.actual + 
					'<br/>' + 
					'<span class="text-dark">Target</span><br/>  ' + kpi.target + 
				'</td>' + 
			'</tr>'
				
			});
			
			
			
			$("#kraTable").append(
				'<dt class=" col-12 p-2	 m-0 ">' + 
				'<h5 class="text-dark">Administrative Efficiency</h5>' + 
				'<table class="table table-bordered w-100" style="width:100% !important;">' + 
					'<tbody>' + 
						 construct +
					'</tbody>' + 
				'</table>' + 
				'</dt>'
			
			);
			
		});
		
	},
	processEvaluationResults: function(commitStatus){
		var instruments = commitStatus.instrument;
		$("#evaluationToolTable").html(
			'<h5 class="text-dkyellow p-3 mb-0 "><strong>Evaluation Tool</strong></h5>' + 
			'<div class="line"></div>'
		);
		$.each(instruments,function( catIndex, category){
			
			var constructorString = '<dl class="row p-0 m-0" >' + '<dt class="col-12 p-0 pt-2 text-dark" style="background-color:#fcf8e3;" align="left"><span class="p-2"><b>' + category.text + '</b></span></dt>';
			$.each(category.questions, function(qId, qst){
				constructorString = constructorString + '<dt class="col-10 p-2 text-dark" align="left"><b>' + qst.textA + ' (' + qst.percentage + '%)</b><br/><small>' + qst.textB + '</small></dt><dt class="col-2 bg bg-light p-0" align="center"><button class="btn btn-link text-dark w-100 mt-4">' + qst.response.value + '</button></dt>';
			});
			$("#evaluationToolTable").append(
				constructorString + 
				'</dl>'
			);
		});
		
		$("#evaluationToolTable").append(
			'<dl class="row p-0 m-0" >' + 
				'<dt class="col-10 p-0 text-dark bg bg-light pt-2"  align="right">Total<br/><small>Performance Equivalent</small></dt>' +
				'<dt class="col-2 p-0 text-dark bg bg-light pt-2"  align="center">' + commitStatus.meanpoint.totalpoints + '<br/><small>' + commitStatus.meanpoint.qualitativeRating + '</small></dt>' + 
			'</dl>'
		);
		

	},
	processCommitStatus: function(evaluatee,commits, scomponents){
		
		
		$("#evaluatorCommitName").html(evaluatee.evaluatorName + "<br/><small>Evaluation</small>");
		$("#deptheadCommitName").html(evaluatee.deptheadName + "<br/><small>Department Head</small>");
		$("#evaluateeCommitName").html(evaluatee.name + "<br/><small>Evaluatee</small>");
		
		// EVALUATOR CONSTRUCTOR
		var evaluatorConstruct = "";
		if (commits.evaluator.flag==commits.ID_ER_NOACTIONYET) {
			
			evaluatorConstruct = evaluatorConstruct + '<p><strong class="text-danger">You can now start your evaluation.</strong></p>';
			if (scomponents.schedule.flag == 1 ) {
				evaluatorConstruct = evaluatorConstruct+'<hr/><button type="button" class="btn btn-sm btn-success" onclick="loadEdit()">Start Evaluation</button>';
			}
			
		}
		if (commits.evaluator.flag==commits.ID_ER_DONE){
			var evaluatorConstruct = "";
			if (commits.depthead.flag != commits.ID_DH_DISAGREED){
				evaluatorConstruct = evaluatorConstruct + ' <p><strong class="text-success">Done</strong><br/><small class="text-muted">(' + commits.evaluator.date + ')</small></p>';
				if (commits.evaluator.remarks != null) {
					evaluatorConstruct = evaluatorConstruct+' <small><strong>Remarks for Evaluatee:</strong><br/>' + commits.evaluator.remarks + '</small>';
				}
				
			} 
			if (commits.depthead.flag == commits.ID_DH_DISAGREED) {
				evaluatorConstruct = evaluatorConstruct + '<p><strong class="text-danger">Your department head has disagreed with your evaluation. Please redo your evaluation again.</strong></p>';
			} 
			if (commits.evaluator.flag == commits.ID_ER_CONTINUELATER) {
				evaluatorConstruct = evaluatorConstruct + '<p><strong class="text-danger">Your evaluation is not yet finished.</strong></p>';
				if (scomponents.schedule.flag == 1){
                    evaluatorConstruct = evaluatorConstruct + '<hr/><button type="button" class="btn btn-sm btn-primary" onclick="loadEdit()">Continue Evaluation</button>';
				}
			}
			if (commits.evaluator.flag == commits.ID_ER_REVOKED) {
				evaluatorConstruct = evaluatorConstruct + ' <p><strong class="text-danger">You have revoked your evaluation. Please edit your evaluation again.</strong></p>';
				if (scomponents.schedule.flag == 1){
                    evaluatorConstruct = evaluatorConstruct + '<hr/><button type="button"  class="btn btn-sm btn-primary" onclick="loadEdit()">Edit Evaluation</button>';
				}
			}

		}

		
		//DEPT HEAD CONSTRUCT 
		var deptHeadConstruct = "";
		if (commits.evaluator.flag == commits.ID_ER_DONE){
			
			if (commits.depthead.flag == commits.ID_DH_NOACTIONYET) {
				$("#deptheadCommitStat").html("No Action Yet");
			}
			if (commits.depthead.flag == commits.ID_DH_REVOKED){
				deptHeadConstruct = deptHeadConstruct + ' <p><strong>Revoked</strong><br/><small class="text-muted">(' + commits.depthead.date + ')</small></p>';
			}
			if (commits.depthead.flag == commits.ID_DH_AGREED) {
				deptHeadConstruct = deptHeadConstruct + ' <p><strong class="text-success">Agreed</strong><br/><small class="text-muted">(' + commits.depthead.date + ')</small></p>';
				if (commits.depthead.remarks != null) {
					deptHeadConstruct = deptHeadConstruct+' <small><strong>Remarks for Evaluatee:</strong><br/>' + commits.depthead.remarks + '</small>';
				}
			}
			if (commits.depthead.flag == commits.ID_DH_DISAGREED){
				deptHeadConstruct =deptHeadConstruct + ' <p><strong class="text-success">Disagree</strong><br/><small class="text-muted">(' + commits.depthead.date + ')</small></p>';
			}	
		}
		
		//EVALUATEE CONSTRUCT
		var evaluateeHeadConstruct ="";
		if (  commits.depthead.flag == commits.ID_DH_AGREED  ) {
				
			if (commits.evaluatee.flag == commits.ID_EE_NOACTIONYET){
				evaluateeHeadConstruct = evaluateeHeadConstruct + "No Action Yet";
			}
			if (commits.evaluatee.flag == commits.ID_EE_AGREED) {
				evaluateeHeadConstruct = evaluateeHeadConstruct + ' <p><strong class="text-success">Agreed</strong><br/><small class="text-muted">(' + commits.evaluatee.date + ')</small></p>';
			}
			if (commits.evaluatee.flag == commits.ID_EE_DISAGREED) {
				evaluateeHeadConstruct = evaluateeHeadConstruct + ' <p><strong class="text-danger">Disagreed</strong><br/><small class="text-muted">(' + commits.evaluatee.date + ')</small></p>';
			}	
			if (commits.evaluatee.remarks != null){
				evaluateeHeadConstruct = evaluateeHeadConstruct+' <small><strong>Remarks for Evaluatee:</strong><br/>' + commits.evaluatee.remarks + '</small>';
			}
		}


		$("#evaluatorCommitStat").html(evaluatorConstruct);
		$("#deptheadCommitStat" ).html(deptHeadConstruct);
		$("#evaluateeCommitStat").html(evaluateeHeadConstruct);
		
	},
	
	populateComponentList: function(components, sComp, compViewFlag) {

		
		var actualComponents = {};
		var compIndex = 0;
		$.each(components, function(i, comp) {
			if (
				comp.id==sComp.ID_EVALUATION_TOOL ||
				(comp.id ==sComp.ID_PERFORMANCE_REPORT && compViewFlag.KraKpiSummary == 1 )
			) {
				var action = (comp.id == sComp.ID_PERFORMANCE_REPORT ? 'sspa-performancereportview' : (comp.id == sComp.ID_PERFORMANCE_SUMMARY ? 'sspa-performancesummaryview' : (comp.id == sComp.ID_EVALUATION_TOOL ? 'sspa-myevalresults' : 'none')));
				
				
				var buttonActions = null;
				
				var buttonComponent = {
					empnumber : empnumber ,
					id     : comp.id ,
					name   : comp.name,
					from   : comp.schedule.from,
					to 	   : comp.schedule.to,
					action : action, 
					status : null
				};
				if (comp.schedule.from != null) {
					if (comp.schedule.openFlag == 1) {
						buttonComponent.status = "OPEN FROM " + comp.schedule.from + " to " + comp.schedule.to ;
					} else {
						buttonComponent.status = "CLOSED";
					}
				} else {
					buttonComponent.status = "(Schedule N/A)"; 
				}
				actualComponents[compIndex.toString()] = buttonComponent;
				compIndex++;
			} 
		});
		
		// draw buttons in COMPONENTS //
		$("#componentHolder").html("");
		$.each( actualComponents, function(k,aComp) {
			$("#componentHolder").append(
				'<button type="button" onclick="app.onComponentSelect(\'' + aComp.action + '\')" class="btn btn-light w-100 only-button from-button"><b>' +  aComp.name + '</b><br/>' + 
				'<center>'  + 
				'<small class="text-success">' + 
				aComp.from + '<br/>' + 'to' + '<br/>' + aComp.to +
				'</small></center></button>'
			);
		});

		
	},
	
	loadEvaluationTool: function(Inputyear,inputCpid){
				$("#nameholder"	).html(localStorage.getItem("full_name"));
		
		
	 
	 
			var dpDownloaded = false;
			var dpDownloader=setInterval(function() {
				if (!dpDownloaded) {
					var fileTransfer = new FileTransfer();
					var uri = "http://digitalpix.ust.edu.ph/employee/" + localStorage.getItem("full_empnumber") + "p.jpg";
					// WILL DOWNLOAD THE FILE IF NOT FOUND
					fileTransfer.download(
						uri,
						cordova.file.dataDirectory  +  localStorage.getItem("full_empnumber")  +"p.jpg"	,
						function(entry) {
							$("#dpHolder").attr("src",entry.toURL());
							$("#evaluateeDp").attr("src",entry.toURL());
							dpDownloaded = true;
							clearInterval(dpDownloader);
						},
						function(error) {
						},
						true,
						{
							headers: {
								"referrer" : "https://supportstaff.ust.edu.ph",
								"referer"  : "https://supportstaff.ust.edu.ph"
							}
						}
					);		
				}					
					
			},500);
	 

	
	
		var data = {
			empnumber : empnumber,
			deptid : parseInt(localStorage.getItem("college_2")),
			year : Inputyear,
			cpid : inputCpid
		};
	
		 $.ajax({
            url   : localStorage.getItem("server") + "sspa/request", 
            type       : "POST",
            dataType   : "json",            
            beforeSend : function(xhr){
				xhr.setRequestHeader("request", "initialize");
                xhr.setRequestHeader('ecode'  ,  localStorage.getItem("ecode") 	);
				xhr.setRequestHeader("data"	  , JSON.stringify(data));
            },
            success: function(msg) { 
				console.log(JSON.stringify(msg));
                $("#loadingGif").show();
				$("#jobposition").html(msg["evaluatee"]["jobposition"]);
				$("#rank").html(msg["evaluatee"]["rank"]);
				$("#department").html(msg["evaluatee"]["deptName"]);
				
				if (msg["evaluatee"]["division"] != null) {
				$("#division").html(msg["evaluatee"]["division"]);
				}
				$("#datehired").html(msg["evaluatee"]["dateHired"]);
				
				var departmentHead = msg["evaluatee"]["deptheadName"];
				var departmentPosition = msg["evaluatee"]["deptheadPosition"] == null ? "Position N/A" : msg["evaluatee"]["deptheadPosition"];
				var deptheadContent = departmentHead + '<br/><small class="text-muted">' + departmentPosition + "</small>";
				
				var evaluator = msg["evaluatee"]["evaluatorName"];
				var evaluatorPosition = msg["evaluatee"]["evaluatorPosition"] == null ? "Position N/A" : msg["evaluatee"]["evaluatorPosition"];
				var evaluatorContent = evaluator + '<br/><small class="text-muted">' + evaluatorPosition + "</small>";
				
				
				// CoverageNavigationButton
				// NEWER AND OLDER COVERAGE Button
				var olderButton =  '<button type="button" onclick="app.navigateCoverage(' + (msg.selectedCoverage.year - 5) + ', ' + msg.selectedCoverage.id + ' )" class="btn btn-light w-100 only-button from-button"><i class="fas fa-chevron-left"></i>&nbsp; Older</button>';
				var newerButton =  ' <button type="button" onclick="app.navigateCoverage(' + (msg.selectedCoverage.year + 5) + ', ' + msg.selectedCoverage.id + ' )" class="btn btn-light w-100 only-button from-button">Newer &nbsp;<i class="fas fa-chevron-right"></i></button>';
				
				$("#CoverageNavigationMenu").html(
					olderButton + 
					newerButton
				);
				
				
				
				$("#departmenthead").html(deptheadContent);
				$("#evaluator").html(evaluatorContent);
				
				app.populateCoverageList(msg.coverageList);
				
				var evaluatorDpDownloaded = false;
				var t=setInterval(function() {
					
					if (!evaluatorDpDownloaded) {
						var fileTransferEvaluator = new FileTransfer();
						var uri = "http://digitalpix.ust.edu.ph/employee/" + msg.evaluatee.evaluatorId + "p.jpg"
						// WILL DOWNLOAD THE FILE IF NOT FOUND
						fileTransferEvaluator.download(
							uri,
							cordova.file.dataDirectory  +  msg.evaluatee.evaluatorId  +"p.jpg"	,
							function(entry) {
								$("#evaluatorDp").attr("src",entry.toURL());
								evaluatorDpDownloaded = true;
								clearInterval(t);
								
							},
							function(error) {
							},
							true,
							{
								headers: {
									"referrer" : "https://supportstaff.ust.edu.ph",
									"referer"  : "https://supportstaff.ust.edu.ph"
								}
							}
						);
					}					
					
				},500);
				
				
				var deptheadDpDownloaded = false;
				var deptheadDpDownloader=setInterval(function() {
					
					if (!deptheadDpDownloaded) {
						var fileTransferEvaluator = new FileTransfer();
						var uri = "http://digitalpix.ust.edu.ph/employee/" + msg.evaluatee.deptheadId + "p.jpg"
						// WILL DOWNLOAD THE FILE IF NOT FOUND
						fileTransferEvaluator.download(
							uri,
							cordova.file.dataDirectory  +  msg.evaluatee.deptheadId  +"p.jpg"	,
							function(entry) {
								$("#deptHeadDp").attr("src",entry.toURL());
								deptheadDpDownloaded = true;
								clearInterval(deptheadDpDownloader);
								
							},
							function(error) {
							},
							true,
							{
								headers: {
									"referrer" : "https://supportstaff.ust.edu.ph",
									"referer"  : "https://supportstaff.ust.edu.ph"
								}
							}
						);
					}					
					
				},500);
				
				
				
				
				$("#loadingGif").hide();
				$("#employeeInfoHolder").show();
				
				
				// POPULATE DATA

				app.populateComponentList(msg.componentList,msg.scomponent,msg.viewFlags);
				app.processCommitStatus(msg.evaluatee, msg.commitStatus, msg.scomponent);
				app.processEvaluationResults(msg.commitStatus);
				app.processPerformanceView(msg.performanceView);
				
				
				
				if (msg.commitStatus.strength!=null) $("#dapStr").html(msg.commitStatus.strength);
				if (msg.commitStatus.areasImprovement!=null) $("#dapAfi").html(msg.commitStatus.areasImprovement);
				if (msg.commitStatus.actionPlan!=null) $("#dapAp").html(msg.commitStatus.actionPlan);
				if (msg.commitStatus.byWhen!=null) $("#dapWhen").html(msg.commitStatus.byWhen);
				if (msg.commitStatus.recommendedTraining!=null) $("#dapTraining").html(msg.commitStatus.recommendedTraining);
				
				app.instrument = msg.commitStatus.instrument;
				
				
            },
            error: function(jqXHR	, textStatus, errorThrown) {
                alert(JSON.stringify(jqXHR));
            }
		});    
	},
	onComponentSelect: function(action) {
		if (action=="sspa-performancereportview"){
			$(".forTOOL").hide();
			$(".forKRA").show();
		} else {
			
			$(".forTOOL").show();
			$(".forKRA").hide();
		}
	},
	populateEvaluateeList: function() {
		
	},
	populateCoverageList: function(coverageList) {
		$("#coverageListHolder").hide();
		$("#CoverageListLoading").show();
		
		$("#coverageListHolder").html("");
		$.each(coverageList, function(index, coverage) {
			var buttonConstruct = '<dt class="col-12" align="center">' +
				'<button onclick="app.loadEvaluationTool('+coverage.year+','+coverage.id+')" class="btn btn-primary w-100" style="background-color:#337ab7 !important;border-color:#337ab7 !important">' +
					coverage["dateFrom"] + " - " + coverage["dateTo"] + 
				'</button>' +
			'</dt>';
			
			$("#coverageListHolder").append(buttonConstruct);
			
		});
		
		$("#coverageListHolder").show();
		$("#CoverageListLoading").hide();
		
		
	},
	
    onDeviceReady: function() {

    },
	
	
	setEmployeeInformation: function() {
		
		
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
