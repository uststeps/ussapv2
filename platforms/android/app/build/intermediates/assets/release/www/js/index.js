var _0x13fa=['sys','Notification\x20Cancelled','getItem','remember','#rememberme','prop','checked','onLogin','hide','#currentVersion','html','empnumber','mypass','#empnumber','val','#password','validation','ajax','service/login','json','setRequestHeader','password','#loadingDiv','show','attr','readonly','#loginButton','disabled','removeAttr','validated','college_1','full_name','full_empnumber','employment_date','passwordValidator',':checked','parse','schedule-','notification-','cancelAll','log','notifications\x20cancelled\x20:\x20BEFORE\x20RE\x20SCHEDULED','toggleSwitch','location','initialsetup.html','profile.html','.alert','Invalid\x20Login','ERROR\x20AT\x20AJAX\x20LOGIN\x20:\x20','stringify','Employee\x20number\x20and\x20password\x20is\x20required.','length','which','keyCode','replace','index.html','Daily\x20Time\x20Record\x20Alert','each','split','amS','AM\x20TIME\x20IN','day','amE','pmS','PM\x20TIME\x20IN','PM\x20TIME\x20OUT','pmE','schedule','trigger','data','processor','service/serverdt','POST','date','getDTRRecord','sort','AJAX\x20ERROR\x20AT\x20serverdt\x20:\x20','#curdate-holder','attendance/dtr','type','OUT','DTR\x20Alert:\x2010\x20Minutes\x20before\x20AM\x20time\x20in','DTR\x20Alert:\x20Time\x20out\x20for\x20am\x20schedule','DTR\x20Alert:\x2010\x20Minutes\x20before\x20PM\x20time\x20in','DTR\x20Alert:\x20Time\x20out\x20for\x20pm\x20schedule','ecode','u9n4mT^a|X!545P','setItem','isEmu','true','showAlert','console','isBypass','false','curinfo','version','server','http://10.1.16.29:7101/restServiceUSSAP/resources/','6:00\x20am','6:30\x20am','7:00\x20am','7:30\x20am','8:00\x20am','8:30\x20am','9:00\x20am','9:30\x20am','10:00\x20am','11:30\x20am','12:00\x20pm','12:30\x20pm','2:00\x20pm','2:30\x20pm','3:00\x20pm','3:30\x20pm','4:00\x20pm','5:00\x20pm','5:30\x20pm','6:00\x20pm','6:30\x20pm','7:00\x20pm','7:30\x20pm','8:00\x20pm','9:00\x20pm','9:30\x20pm','10:30\x20pm','Tuesday','Wednesday','Thursday','Friday','Satruday','Sunday','JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC','addEventListener','backbutton','notification','confirm','app','exitApp','Cancel','Exit','plugins','local'];(function(_0x330b41,_0x2a362b){var _0x322e4c=function(_0x1323d3){while(--_0x1323d3){_0x330b41['push'](_0x330b41['shift']());}};_0x322e4c(++_0x2a362b);}(_0x13fa,0x187));var _0x48ac=function(_0x163fa3,_0x5e0708){_0x163fa3=_0x163fa3-0x0;var _0x3d9ca0=_0x13fa[_0x163fa3];return _0x3d9ca0;};localStorage['setItem'](_0x48ac('0x0'),_0x48ac('0x1'));localStorage[_0x48ac('0x2')](_0x48ac('0x3'),_0x48ac('0x4'));localStorage['setItem'](_0x48ac('0x5'),_0x48ac('0x6'));localStorage[_0x48ac('0x2')](_0x48ac('0x7'),'false');localStorage[_0x48ac('0x2')]('isRemember',_0x48ac('0x8'));localStorage[_0x48ac('0x2')](_0x48ac('0x9'),'0');localStorage[_0x48ac('0x2')](_0x48ac('0xa'),'3.1.0');localStorage[_0x48ac('0x2')](_0x48ac('0xb'),_0x48ac('0xc'));var jsn;var lastIndex;var timedata={'06:00':_0x48ac('0xd'),'06:30':_0x48ac('0xe'),'07:00':_0x48ac('0xf'),'07:30':_0x48ac('0x10'),'08:00':_0x48ac('0x11'),'08:30':_0x48ac('0x12'),'09:00':_0x48ac('0x13'),'09:30':_0x48ac('0x14'),'10:00':_0x48ac('0x15'),'10:30':'10:30\x20am','11:00':'11:00\x20am','11:30':_0x48ac('0x16'),'12:00':_0x48ac('0x17'),'12:30':_0x48ac('0x18'),'13:00':'1:00\x20pm','13:30':'1:30\x20pm','14:00':_0x48ac('0x19'),'14:30':_0x48ac('0x1a'),'15:00':_0x48ac('0x1b'),'15:30':_0x48ac('0x1c'),'16:00':_0x48ac('0x1d'),'16:30':'4:30\x20pm','17:00':_0x48ac('0x1e'),'17:30':_0x48ac('0x1f'),'18:00':_0x48ac('0x20'),'18:30':_0x48ac('0x21'),'19:00':_0x48ac('0x22'),'19:30':_0x48ac('0x23'),'20:00':_0x48ac('0x24'),'20:30':'8:30\x20pm','21:00':_0x48ac('0x25'),'21:30':_0x48ac('0x26'),'22:00':'10:00\x20pm','22:30':_0x48ac('0x27')};var days={'1':'Monday','2':_0x48ac('0x28'),'3':_0x48ac('0x29'),'4':_0x48ac('0x2a'),'5':_0x48ac('0x2b'),'6':_0x48ac('0x2c'),'7':_0x48ac('0x2d')};var months={'d01':_0x48ac('0x2e'),'d02':_0x48ac('0x2f'),'d03':_0x48ac('0x30'),'d04':_0x48ac('0x31'),'d05':_0x48ac('0x32'),'d06':_0x48ac('0x33'),'d07':_0x48ac('0x34'),'d08':_0x48ac('0x35'),'d09':_0x48ac('0x36'),'d10':_0x48ac('0x37'),'d11':_0x48ac('0x38'),'d12':_0x48ac('0x39')};var months2={'JAN':'01','FEB':'02','MAR':'03','APR':'04','MAY':'05','JUN':'06','JUL':'07','AUG':'08','SEP':'09','OCT':'10','NOV':'11','DEC':'12'};var app={'initialize':function(){document[_0x48ac('0x3a')](_0x48ac('0x3b'),function(_0x10be66){navigator[_0x48ac('0x3c')][_0x48ac('0x3d')]('Exit\x20application?',function(_0xb03ff){if(_0xb03ff==0x2){navigator[_0x48ac('0x3e')][_0x48ac('0x3f')]();};},'',[_0x48ac('0x40'),_0x48ac('0x41')]);},!![]);cordova[_0x48ac('0x42')][_0x48ac('0x3c')][_0x48ac('0x43')]['cancelAll'](function(_0x1f6415){global[_0x48ac('0x44')](_0x48ac('0x45'));},this);if(localStorage[_0x48ac('0x46')](_0x48ac('0x47'))==_0x48ac('0x4')){$(_0x48ac('0x48'))[_0x48ac('0x49')](_0x48ac('0x4a'),!![]);app[_0x48ac('0x4b')]();}else{}},'bindEvents':function(){},'onDeviceReady':function(){},'receivedEvent':function(_0xf8760d){},'onLogin':function(){$('.alert')[_0x48ac('0x4c')]();var _0x37fa02;var _0xb00877;$(_0x48ac('0x4d'))[_0x48ac('0x4e')](localStorage[_0x48ac('0x46')](_0x48ac('0xa')));if(localStorage[_0x48ac('0x46')](_0x48ac('0x47'))==_0x48ac('0x4')){_0x37fa02=localStorage[_0x48ac('0x46')](_0x48ac('0x4f'));_0xb00877=localStorage[_0x48ac('0x46')](_0x48ac('0x50'));}else{_0x37fa02=$(_0x48ac('0x51'))[_0x48ac('0x52')]();_0xb00877=$(_0x48ac('0x53'))['val']();}if(app[_0x48ac('0x54')]()){$[_0x48ac('0x55')]({'url':localStorage['getItem'](_0x48ac('0xb'))+_0x48ac('0x56'),'dataType':_0x48ac('0x57'),'type':'POST','beforeSend':function(_0x1f94f9){_0x1f94f9[_0x48ac('0x58')](_0x48ac('0x4f'),_0x37fa02);_0x1f94f9['setRequestHeader'](_0x48ac('0x59'),_0xb00877);_0x1f94f9['setRequestHeader']('ecode',localStorage[_0x48ac('0x46')]('ecode'));$(_0x48ac('0x5a'))[_0x48ac('0x5b')]();$(_0x48ac('0x51'))[_0x48ac('0x5c')](_0x48ac('0x5d'),_0x48ac('0x4'));$('#password')[_0x48ac('0x5c')](_0x48ac('0x5d'),_0x48ac('0x4'));$(_0x48ac('0x5e'))[_0x48ac('0x5c')](_0x48ac('0x5f'),_0x48ac('0x4'));},'success':function(_0x3d162e){$('#loadingDiv')['hide']();$(_0x48ac('0x51'))[_0x48ac('0x60')](_0x48ac('0x5d'));$(_0x48ac('0x53'))[_0x48ac('0x60')]('readonly');$(_0x48ac('0x5e'))[_0x48ac('0x60')]('disabled');if(_0x3d162e[_0x48ac('0x61')]=='true'){localStorage[_0x48ac('0x2')](_0x48ac('0x4f'),_0x37fa02);localStorage['setItem'](_0x48ac('0x62'),_0x3d162e[_0x48ac('0x62')]);localStorage[_0x48ac('0x2')]('college_2',_0x3d162e['college_2']);localStorage['setItem'](_0x48ac('0x63'),_0x3d162e[_0x48ac('0x63')]);localStorage['setItem'](_0x48ac('0x64'),_0x3d162e['full_empnumber']);localStorage[_0x48ac('0x2')](_0x48ac('0x65'),_0x3d162e[_0x48ac('0x65')]);localStorage['setItem'](_0x48ac('0x50'),_0xb00877);localStorage[_0x48ac('0x2')](_0x48ac('0x66'),_0xb00877);if($(_0x48ac('0x48'))['is'](_0x48ac('0x67'))){localStorage[_0x48ac('0x2')](_0x48ac('0x47'),_0x48ac('0x4'));}else{localStorage[_0x48ac('0x2')](_0x48ac('0x47'),_0x48ac('0x8'));};jsn=JSON[_0x48ac('0x68')](localStorage[_0x48ac('0x46')](_0x48ac('0x69')+localStorage[_0x48ac('0x46')](_0x48ac('0x4f'))));if(localStorage[_0x48ac('0x46')](_0x48ac('0x6a')+localStorage['getItem'](_0x48ac('0x4f')))==_0x48ac('0x4')){cordova[_0x48ac('0x42')]['notification'][_0x48ac('0x43')][_0x48ac('0x6b')](function(_0x549131){console[_0x48ac('0x6c')](_0x48ac('0x6d'));},this);app[_0x48ac('0x6e')]();}if(_0x3d162e['initial']==_0x48ac('0x4')){window[_0x48ac('0x6f')]=_0x48ac('0x70');}else{window['location']=_0x48ac('0x71');};}else{$('#loadingDiv')[_0x48ac('0x4c')]();$(_0x48ac('0x51'))[_0x48ac('0x60')](_0x48ac('0x5d'));$(_0x48ac('0x53'))[_0x48ac('0x60')](_0x48ac('0x5d'));$(_0x48ac('0x5e'))[_0x48ac('0x60')](_0x48ac('0x5f'));$(_0x48ac('0x72'))['html'](_0x48ac('0x73'));$(_0x48ac('0x72'))[_0x48ac('0x5b')]();}},'error':function(_0x2759e4,_0x2d3f51,_0x4698c6){global[_0x48ac('0x44')](_0x48ac('0x74')+JSON[_0x48ac('0x75')](_0x2759e4));$(_0x48ac('0x5a'))[_0x48ac('0x4c')]();$(_0x48ac('0x51'))['removeAttr']('readonly');$('#password')['removeAttr'](_0x48ac('0x5d'));$(_0x48ac('0x5e'))[_0x48ac('0x60')](_0x48ac('0x5f'));$(_0x48ac('0x72'))[_0x48ac('0x4e')]('There\x20was\x20an\x20error\x20connecting\x20to\x20the\x20server.');$(_0x48ac('0x72'))[_0x48ac('0x5b')]();}});}else{$(_0x48ac('0x72'))[_0x48ac('0x4e')](_0x48ac('0x76'));$(_0x48ac('0x72'))[_0x48ac('0x5b')]();}return![];},'validation':function(){if(localStorage['getItem'](_0x48ac('0x47'))=='true'){return!![];}else{if($(_0x48ac('0x51'))[_0x48ac('0x52')]()[_0x48ac('0x77')]==0x0){return![];}if($(_0x48ac('0x53'))[_0x48ac('0x52')]()[_0x48ac('0x77')]==0x0){return![];}return!![];}},'isNumber':function(_0x143ad8){var _0x3e708d=_0x143ad8[_0x48ac('0x78')]?_0x143ad8[_0x48ac('0x78')]:_0x143ad8[_0x48ac('0x79')];if(_0x3e708d!=0x2e&&_0x3e708d>0x1f&&(_0x3e708d<0x30||_0x3e708d>0x39))return![];return!![];},'onLogout':function(){window[_0x48ac('0x6f')][_0x48ac('0x7a')](_0x48ac('0x7b'));},'toggleSwitch':function(){var _0x447ef1=0x1;var _0x4d8db3=[];var _0x42f610=0x0;var _0x101a64=0x0;var _0xaba3bd=_0x48ac('0x7c');$[_0x48ac('0x7d')](jsn,function(_0x45e30a,_0x504512){var _0x5ca425=0x0;var _0x12497d=0x0;if(_0x504512['amS'][_0x48ac('0x7e')](':')[0x1]==0x0){_0x5ca425=parseInt(_0x504512['amS'][_0x48ac('0x7e')](':')[0x0])-0x1;_0x12497d=0x32;}else{_0x5ca425=parseInt(_0x504512['amS'][_0x48ac('0x7e')](':')[0x0]);_0x12497d=parseInt(_0x504512[_0x48ac('0x7f')][_0x48ac('0x7e')](':')[0x1])-0xa;}_0x4d8db3[_0x101a64++]={'id':_0x101a64,'title':_0xaba3bd,'text':_0x48ac('0x80'),'trigger':{'count':0x5a0,'every':{'weekday':parseInt(_0x504512[_0x48ac('0x81')]),'hour':_0x5ca425,'minute':_0x12497d,'second':0x0}},'data':{'processor':!![],'sort':0x1}};_0x4d8db3[_0x101a64++]={'id':_0x101a64,'title':_0xaba3bd,'text':'AM\x20TIME\x20OUT','trigger':{'count':0x5a0,'every':{'weekday':parseInt(_0x504512[_0x48ac('0x81')]),'hour':parseInt(_0x504512['amE'][_0x48ac('0x7e')](':')[0x0]),'minute':parseInt(_0x504512[_0x48ac('0x82')][_0x48ac('0x7e')](':')[0x1]),'second':0x1}},'data':{'processor':!![],'sort':0x2}};var _0x392cac=0x0;var _0x3e50c4=0x0;if(_0x504512[_0x48ac('0x83')][_0x48ac('0x7e')](':')[0x1]==0x0){_0x392cac=parseInt(_0x504512['pmS'][_0x48ac('0x7e')](':')[0x0])-0x1;_0x3e50c4=0x32;}else{_0x392cac=parseInt(_0x504512[_0x48ac('0x83')][_0x48ac('0x7e')](':')[0x0]);_0x3e50c4=parseInt(_0x504512[_0x48ac('0x83')][_0x48ac('0x7e')](':')[0x1])-0xa;}_0x4d8db3[_0x101a64++]={'id':_0x101a64,'title':_0xaba3bd,'text':_0x48ac('0x84'),'trigger':{'count':0x5a0,'every':{'weekday':parseInt(_0x504512[_0x48ac('0x81')]),'hour':_0x392cac,'minute':_0x3e50c4,'second':0x0}},'data':{'processor':!![],'sort':0x3}};_0x4d8db3[_0x101a64++]={'id':_0x101a64,'title':_0xaba3bd,'text':_0x48ac('0x85'),'trigger':{'count':0x5a0,'every':{'weekday':parseInt(_0x504512[_0x48ac('0x81')]),'hour':parseInt(_0x504512['pmE'][_0x48ac('0x7e')](':')[0x0]),'minute':parseInt(_0x504512[_0x48ac('0x86')][_0x48ac('0x7e')](':')[0x1]),'second':0x0}},'data':{'processor':!![],'sort':0x4}};});cordova[_0x48ac('0x42')][_0x48ac('0x3c')]['local'][_0x48ac('0x87')](_0x4d8db3);cordova[_0x48ac('0x42')]['notification']['local']['on'](_0x48ac('0x88'),function(_0x3bf084){if(_0x3bf084[_0x48ac('0x89')][_0x48ac('0x8a')]){$[_0x48ac('0x55')]({'url':localStorage[_0x48ac('0x46')](_0x48ac('0xb'))+_0x48ac('0x8b'),'type':_0x48ac('0x8c'),'dataType':_0x48ac('0x57'),'beforeSend':function(_0x34c77e){_0x34c77e[_0x48ac('0x58')](_0x48ac('0x0'),localStorage[_0x48ac('0x46')](_0x48ac('0x0')));},'success':function(_0x2308cf){var _0x16159f=_0x2308cf[_0x48ac('0x8d')][_0x48ac('0x7e')]('/')[0x2];var _0x1cf357=_0x2308cf[_0x48ac('0x8d')]['split']('/')[0x0];var _0x390ebe=_0x2308cf[_0x48ac('0x8d')][_0x48ac('0x7e')]('/')[0x1];var _0x28784c=_0x16159f+'-'+_0x1cf357+'-'+_0x390ebe;var _0xe00146=_0x390ebe+'-'+months['d'+_0x1cf357]+'-'+_0x16159f;app[_0x48ac('0x8e')](_0x2308cf[_0x48ac('0x8d')],_0x3bf084[_0x48ac('0x89')][_0x48ac('0x8f')]);},'error':function(_0x30eda5,_0x1b6ac8,_0x241f53){global[_0x48ac('0x44')](_0x48ac('0x90')+JSON['stringify'](_0x30eda5));}});}});localStorage['setItem'](_0x48ac('0x6a')+localStorage[_0x48ac('0x46')](_0x48ac('0x4f')),_0x48ac('0x4'));},'getDTRRecord':function(_0x1fceb9,_0x3adc35){var _0x19070c=_0x1fceb9[_0x48ac('0x7e')]('/')[0x2];var _0x4524fb=_0x1fceb9['split']('/')[0x0];var _0x50c506=_0x1fceb9[_0x48ac('0x7e')]('/')[0x1];$(_0x48ac('0x91'))['html'](_0x50c506+'-'+months['d'+_0x4524fb]+'-'+_0x19070c);$[_0x48ac('0x55')]({'url':localStorage['getItem'](_0x48ac('0xb'))+_0x48ac('0x92'),'type':_0x48ac('0x8c'),'dataType':_0x48ac('0x57'),'beforeSend':function(_0x12b5aa){_0x12b5aa[_0x48ac('0x58')]('ecode',localStorage[_0x48ac('0x46')]('ecode'));_0x12b5aa[_0x48ac('0x58')](_0x48ac('0x4f'),localStorage['getItem'](_0x48ac('0x4f')));_0x12b5aa[_0x48ac('0x58')]('pdate',_0x1fceb9);},'success':function(_0x3e71b5){var _0x1d5cc5=0x0;var _0x3e5bd5=![];var _0x3a34c1='';var _0xa13403=![];var _0x2f15a3=![];var _0x4313cb=![];var _0x2347d0=![];$[_0x48ac('0x7d')](_0x3e71b5,function(_0x24788e,_0x18f85d){if(_0x1d5cc5==0x0){if(_0x24788e==0x0){_0xa13403=!![];_0x1d5cc5++;}}else if(_0x1d5cc5==0x1){if(_0x3e71b5[_0x24788e][_0x48ac('0x93')]==_0x48ac('0x94')){_0x2f15a3=!![];_0x1d5cc5++;}}else if(_0x1d5cc5==0x2){if(_0x3e71b5[_0x24788e][_0x48ac('0x93')]=='IN'){_0x4313cb=!![];_0x1d5cc5++;}}else if(_0x1d5cc5==0x3){if(_0x3e71b5[_0x24788e][_0x48ac('0x93')]=='OUT'){_0x2347d0=!![];_0x1d5cc5++;}}});if(_0x3adc35==0x1&&_0xa13403==![]){_0x3e5bd5=!![];_0x3a34c1=_0x48ac('0x95');}else if(_0x3adc35==0x2&&_0x2f15a3==![]){_0x3e5bd5=!![];_0x3a34c1=_0x48ac('0x96');}else if(_0x3adc35==0x3&&_0x4313cb==![]){_0x3e5bd5=!![];_0x3a34c1=_0x48ac('0x97');}else if(_0x3adc35==0x4&&_0x2347d0==![]){_0x3e5bd5=!![];_0x3a34c1=_0x48ac('0x98');}if(_0x3e5bd5){cordova['plugins'][_0x48ac('0x3c')][_0x48ac('0x43')][_0x48ac('0x87')]({'id':0x3e7,'title':'DTR\x20Reminder','text':_0x3a34c1,'foreground':!![],'data':{'processor':![]}});}},'error':function(_0x35f197,_0x207bbb,_0x287d78){}});}};