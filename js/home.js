var taxi = $.localStorage.getItem('taxi');
var tel = $.localStorage.getItem('tel');
var pwd = $.localStorage.getItem('pwd');
var email = $.localStorage.getItem('email');
var civil = $.localStorage.getItem('civil');
var nom = $.localStorage.getItem('nom');
var prenom = $.localStorage.getItem('prenom');
var siret = $.localStorage.getItem('siret');
var cpro = $.localStorage.getItem('cpro');
var station = $.localStorage.getItem('station');
var city = $.localStorage.getItem('city');
var dep = $.localStorage.getItem('dep');
var group = $.localStorage.getItem('group');
var mngid = $.localStorage.getItem('mngid');
var pass = $.localStorage.getItem('pass');
var accessHash = $.localStorage.getItem('accessHash');
var type = $.localStorage.getItem('type');
var cb = $.localStorage.getItem('cb');
var medic = $.localStorage.getItem('medic');
var animal = $.localStorage.getItem('animal');
var passengers = $.localStorage.getItem('passengers');
var color = $.localStorage.getItem('color');
var lang = $.localStorage.getItem('lang');
var idcourse = $.localStorage.setItem('idcourse', '');
var idcourseUrg = $.sessionStorage.setItem('idcourseUrg', '');
var dispo = 1;
var rdv = $.sessionStorage.setItem('rdv', '');
var dest = $.sessionStorage.setItem('dest', '');
var com = $.sessionStorage.setItem('com', '');
var cell = $.sessionStorage.setItem('cell', '');
var cmd = $.sessionStorage.setItem('cmd', 0);
var query_string = $.sessionStorage.setItem('query_string', '');
var delay = 10;
var pollingTime = 2000;
var getBackPollingTime = 2000;
var geoFailedAlertOnce = false;
var getSome = false;
var gotSome = false;
var AppRatePrompted = false;
var openPdf;
var cameraOptions = new Object();	
var pageFirstCreation = true;

// Lecteur audio
var my_media = null;
var sound = $.sessionStorage.setItem('sound', 'ON');

// localNotifications
var notificationId = 1;
var badgeNumber = 0;
var badgeNumber1 = 0;
var badgeNumber2 = 0;
var notifyOnce = true;

// Detect wether it is an App or WebApp
var app;
var appVersion = "1.0.0";
var devicePlatform;
		
// getLocation & secureCall
var lat = 0;
var lng = 0;
var previousLat = 0;
var previousLng = 0;
var geoCounter = 0;

//opendata vars
var api_key = "307464f4-81ba-4d22-9b6c-23376ce4cf9e";
var insee = $.localStorage.getItem('insee');
//var ads = $.localStorage.getItem('taxi');
var cpro = $.localStorage.getItem('cpro');
var imat = $.localStorage.getItem('imat');
//var taxi_id = $.localStorage.getItem('taxi_id');
var taxi_id = '';
var constructor = $.localStorage.getItem('constructor');
var model = $.localStorage.getItem('model');
var type_ = $.localStorage.getItem('type_');
//var birthdate = $.localStorage.getItem('birthdate');
//var tpmr = $.localStorage.getItem('tpmr');
var amex = $.localStorage.getItem('amex');
var openStatus;
var openDataInit=false;
var openDataGo=false;
var stillCheckingHail = true;
var countCheckingHail = 0;
var geoserver='geoloc.api.taxi';

var mobileDemo = { 'center': '43.615945,3.876743', 'zoom': 10 };

if($.localStorage.getItem('pass')!='true')
{
	document.location.href='index.html';
}
$.post("https://www.lacentrale.taxi/appclient/open_login_app.php", { tel: tel, mngid: mngid, log: tel, pass: pwd, dep: dep, version: appVersion}, function(data) {
	/*
	if(data.done) {
		//"insee"=>$insee, "ads"=>$ads, "cpro"=>$cpro, "imat"=>$imat, "constructor"=>$constructor, "model"=>$model, "type_"=>$type_, "birthdate"=>$birthdate
		insee = data.insee;
		ads = data.ads;
		cpro = data.cpro;
		imat = data.imat;
		constructor = data.constructor;
		model = data.model;
		type_ = data.type_;
		birthdate = data.birthdate;
		accessHash = data.accessHash;
		$.localStorage.setItem('insee', data.insee);
		$.localStorage.setItem('ads', data.ads);
		$.localStorage.setItem('cpro', data.cpro);
		$.localStorage.setItem('imat', data.imat);
		$.localStorage.setItem('constructor', data.constructor);
		$.localStorage.setItem('model', data.model);
		$.localStorage.setItem('type_', data.type_);
		$.localStorage.setItem('birthdate', data.birthdate);
		$.localStorage.setItem('accessHash', data.accessHash);
	}
	//else alert('Pas de correspondance dans la table opendata_interface !!', alertDismissed, 'LaCentrale.Taxi Erreur', 'OK');
	else { // Not in le.taxi so we pop... 
		setTimeout(function(){
			$( "#leTaxiPopFirst" ).popup( "open", { positionTo: "window" } );
		}, 2000);
	}
	*/
	if (data.badid)
	{
		$.localStorage.setItem('pass', 0);
		document.location.href='index.html';
	}
	/*
	if (data.visa == 'NOW') {
		if(data.done) {
			setTimeout(function(){
				$( "#visaExpPop" ).popup( "open", { positionTo: "window" } );
			}, 2000);
		}
		else {
			navigator.notification.alert("Votre carte bancaire expire ce mois-ci, veuillez la mettre à jour dès que possible\nVous pouvez le faire à tout moment dans \"mon compte\"=>\"Modifier CB\".", alertDismissed, 'LaCentrale.Taxi', 'OK');
		}
	}
	*/
}, "json").done(function(data) { 
	/*
	if(data.done) {
		$.post("https://www.lacentrale.taxi/appclient/open_enroll_app.php", { tel: tel, insee: insee, dep: dep, mngid: mngid, ads: ads, cpro: cpro, imat: imat}, function(data) {
			if(data.taxi_id!='') {
				openDataInit=true;
				openDataGo=true;
			}
			taxi_id = data.taxi_id;
			$.localStorage.setItem('taxi_id', data.taxi_id);
			openStatus = data.status;
			$("#openSwitch").val(1).flipswitch( "refresh" );
			//dispoCheck();
			//Dispo_On();
		}, "json");
	}
	*/
	setTimeout('reloadVars()', 2000); // Wait a little bit to reloadVars as it's all async...
});
function reloadVars() {
	taxi = $.localStorage.getItem('taxi');
	tel = $.localStorage.getItem('tel');
	pwd = $.localStorage.getItem('pwd');
	email = $.localStorage.getItem('email');
	civil = $.localStorage.getItem('civil');
	nom = $.localStorage.getItem('nom');
	prenom = $.localStorage.getItem('prenom');
	siret = $.localStorage.getItem('siret');
	cpro = $.localStorage.getItem('cpro');
	station = $.localStorage.getItem('station');
	city = $.localStorage.getItem('city');
	dep = $.localStorage.getItem('dep');
	group = $.localStorage.getItem('group');
	mngid = $.localStorage.getItem('mngid');
	pass = $.localStorage.getItem('pass');
	accessHash = $.localStorage.getItem('accessHash');
	type = $.localStorage.getItem('type');
	cb = $.localStorage.getItem('cb');
	//medic = $.localStorage.getItem('medic');
	animal = $.localStorage.getItem('animal');
	passengers = $.localStorage.getItem('passengers');
	color = $.localStorage.getItem('color');
	lang = $.localStorage.getItem('lang');
	insee = $.localStorage.getItem('insee');
	//ads = $.localStorage.getItem('ads');
	cpro = $.localStorage.getItem('cpro');
	imat = $.localStorage.getItem('imat');
	//taxi_id = $.localStorage.getItem('taxi_id');
	constructor = $.localStorage.getItem('constructor');
	model = $.localStorage.getItem('model');
	//type_ = $.localStorage.getItem('type_');
	//birthdate = $.localStorage.getItem('birthdate');
	//tpmr = $.localStorage.getItem('tpmr');
	amex = $.localStorage.getItem('amex');
}
		
////////////////////////////////////////////////////////////
//$(document).on( 'pagebeforecreate', '#directions_map', function() {
$( '#directions_map' ).live( 'pagebeforeshow',function(event){
	$("#infos_map").empty();
	idcourse = $.sessionStorage.getItem('idcourse');
	var rdv = $.sessionStorage.getItem('rdv');
	var dest = $.sessionStorage.getItem('dest');
	var prix = $.sessionStorage.getItem('prix');
	var com = $.sessionStorage.getItem('com');
	var cell = $.sessionStorage.getItem('cell');
	var cmd = $.sessionStorage.getItem('cmd');
	//document.getElementById('to').value = rdv;
	$('#to').val(rdv);
	$('#finaldest').val(dest);

	var infos = '<p>';
	if (cell != '')
	{
		infos += '<a data-ajax="false" href="tel:' + cell + '" class="ui-btn ui-btn-c ui-corner-all ui-shadow ui-icon-phone ui-btn-icon-left">Joindre le client</a>';
	}
	/*
	if (prix != '')
	{
		infos += '<b>Tarif : ' + prix + ' &euro;</b></br>';
	}
	*/
	if (com != '')
	{
		infos += '<b>Infos RDV : ' + com + '</b></br>';
	}
	if (idcourse != '')
	{
		infos += 'N&deg; de course : <b>' + idcourse + '</b>';
	}
	infos += '</p>';
	$("#infos_map").append(infos);		
	if (rdv != '')
	{
		$.post("https://www.lacentrale.taxi/appclient/in_app_calls.php", { map: 'true', cmd: cmd, rdv: rdv, com: com, idcourse: idcourse, cell: cell, pass: pass, dep: dep }, function(data){
			$("#infos_map").append(data);
			$("#infos_map").trigger('create');
			//navigator.notification.alert(data);
		});
	}
	var addrVtc;
	$('#infos_drive').empty();
	$.get('https://api-adresse.data.gouv.fr/reverse/', {lat: lat, lon: lng, type: ''}, function(data) {
		//alert(data.features[0].properties.label+' - '+data.features[0].properties.postcode);
		if(data.features[0].properties.label!='baninfo') {
			// Reverse geocoding is OK...
			addrVtc = data.features[0].properties.label;
			$('#from').val(addrVtc);
			if(rdv!='') {
				let joinClientBtn = '<a href="'+encodeURI('https://www.google.com/maps/dir/?api=1&origin='+addrVtc+'&destination='+rdv+'&travelmode=driving')+'" target="_blank" onClick="" class="ui-btn ui-btn-a ui-corner-all ui-shadow ui-icon-navigation ui-btn-icon-left">Rejoindre le client</a>';
				$('#infos_drive').append(joinClientBtn);
			}
		}
	}, "json");
	if(rdv!=''&& dest!='') {
		let driveClientBtn = '<a href="'+encodeURI('https://www.google.com/maps/dir/?api=1&origin='+rdv+'&destination='+dest+'&travelmode=driving')+'" target="_blank" onClick="" class="ui-btn ui-btn-b ui-corner-all ui-shadow ui-icon-navigation ui-btn-icon-left">Le mener &agrave; destination</a>';
		$('#infos_drive').append(driveClientBtn);
	}
});
$('#directions_map').live('pagecreate', function() {
	/*
	demo.add('directions_map', function() {
		$('#map_canvas_1').gmap({'center': mobileDemo.center, 'zoom': mobileDemo.zoom, 'disableDefaultUI':true, 'callback': function() {
			var self = this;
			self.set('getCurrentPosition', function() {
				self.refresh();
				self.getCurrentPosition( function(position, status) {
					if ( status === 'OK' ) {
						var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
						self.get('map').panTo(latlng);
						self.search({ 'location': latlng }, function(results, status) {
							if ( status === 'OK' ) {
								$('#from').val(results[0].formatted_address);
								var rdv = $.sessionStorage.getItem('rdv');
								var gmapLink = '<a href="https://www.google.com/maps/dir/?api=1&origin='+results[0].formatted_address+'&destination='+rdv+'&travelmode=driving" target="_blank" onClick="" class="ui-btn ui-btn-c ui-corner-all ui-shadow ui-icon-navigation ui-btn-icon-left">Ouvrir dans Maps</a>';
								//var gmapLink = '<a href="#" onClick="openSomeUrl(\'http://maps.google.com/maps?daddr='+rdv+'&saddr='+results[0].formatted_address+'&directionsmode=driving\')" class="ui-btn ui-btn-c ui-corner-all ui-shadow ui-icon-navigation ui-btn-icon-left">Ouvrir dans Maps</a>';
								setTimeout(function() { 
									$("#infos_map").append(gmapLink);
								}, 1000);
								if (rdv != '')
								{
									$('#submit').trigger('click');
								}
							}
						});
					} else {
						navigator.notification.alert('Unable to get current position', alertDismissed, 'LaCentrale.Taxi Erreur', 'OK');
					}
				},{enableHighAccuracy:true, maximumAge:Infinity});
			});
			$('#submit').click(function() {
				self.displayDirections({ 'origin': $('#from').val(), 'destination': $('#to').val(), 'travelMode': google.maps.DirectionsTravelMode.DRIVING }, { 'panel': document.getElementById('directions')}, function(response, status) {
					( status === 'OK' ) ? $('#results_gps').show() : $('#results_gps').hide();
				});
				return false;
			});
		}});
	}).load('directions_map');
	*/
});
$('#directions_map').live('pageshow', function() {
	//demo.add('directions_map', $('#map_canvas_1').gmap('get', 'getCurrentPosition')).load('directions_map');
});
$('#toolate').live('pagecreate', function() {
	idcourse = $.sessionStorage.getItem('idcourse');
	var late = '<p style="color:#F00; font-size: large;"><b>D&eacute;sol&eacute; mais la course ' + idcourse + ' &agrave; &eacute;t&eacute; prise par un chauffeur.</b></p>';
	$("#late_cont").empty().append(late);			
});
$('#delayPop').live( 'pagebeforeshow',function(event) {
	$("#delayConf").hide("fast");
	//$('select#delay').selectmenu('refresh', true);
});
$('#delayPop').live( 'pagecreate',function(event) {
	var ok = setInterval( function () {
		var str = "Temps d'approche : ";
		$("select#delay option:selected").each(function () {
			str += $(this).text();
		});
		// Getting delay list value
		delay = document.getElementById('delay').value;
		$("#delayConf").html(str);
		$("#delayConf").show("fast");
	}, 1000);
});
$( '#planning' ).live( 'pagebeforeshow',function(event){
	$.mobile.loading( "show" );
	$.post("https://www.lacentrale.taxi/appclient/in_app_calls.php", { planning: 'true', tel: tel, pass: pass, dep: dep, mngid: mngid }, function(data){
		$("#plan_cont").empty().append(data);
		$("#plan_cont").trigger('create');
	}).always(function() { $.mobile.loading( "hide" ); });
});
$( '#cmd' ).live( 'pagebeforeshow',function(event){
	refreshCmd();
});
$( '#history' ).live( 'pagebeforeshow',function(event){
	$.mobile.loading( "show" );
	$.post("https://www.lacentrale.taxi/appclient/in_app_calls.php", { history: 'true', tel: tel, pass: pass, dep: dep, mngid: mngid }, function(data){
		if (data != 0)
		{
			$("#hist_cont").empty().append(data);
			$("#hist_cont").trigger('create');
			setTimeout(function() {
				if(getRandomInt(1, 3) == 3 && !AppRatePrompted && app) {
					AppRatePrompted = true;
					//AppRate.promptForRating();
				}
			}, 1000);
		}
	}).always(function() { $.mobile.loading( "hide" ); });
});
$( '#infos' ).live( 'pagebeforeshow',function(event){
	$.mobile.loading( "show" );
	$.post("https://www.lacentrale.taxi/appclient/in_app_calls.php", { infos: 'true', pass: pass, dep: dep }, function(data){
		$("#infos_cont").empty().append(data);
		$("#infos_cont").trigger('create');
	}).always(function() { $.mobile.loading( "hide" ); });
});
$('#manage').live('pagecreate', function() {
	//Mod Form...
	var dec_nom = $('#nom').html(nom).text();
	var dec_prenom = $('#prenom').html(prenom).text();
	//var dec_station = $('#station').html(station).text();
	$('#login').val(tel);
	//$('#civil').val(civil).selectmenu( "refresh" );
	$('#civil').val(civil);
	$('#nom').val(dec_nom);
	$('#prenom').val(dec_prenom);
	$('#taxi').val(taxi);
	$('#tel').val(tel);
	$('#email').val(email);
	$('#confirmail').val(email);
	$('#cpro').val(cpro);
	$('#station').val(station);
	$('#siret').val(siret);
	$('#imat').val(imat);
	$('#constructor').val(constructor);
	$('#model').val(model);
	$('#log').val(tel);
	if(type!=null) $('#type').val(type).selectmenu( "refresh" );
	if(cb!=null) $('#cb').val(cb).flipswitch( "refresh" );
	//if(amex!=null) $('#amex').val(amex).flipswitch( "refresh" );
	//if(medic!=null) $('#medic').val(medic).flipswitch( "refresh" );
	if(animal!=null) $('#animal').val(animal).flipswitch( "refresh" );
	if(passengers!=null) $('#passengers').val(passengers).slider("refresh");;
	if(color!=null) $('#color').val(color).selectmenu( "refresh" );
	if(lang!=null) { //array("en", "ge", "sp", "it", "ru", "cn", "ab");
		var langTab= lang.split(", ");
		for (i = 0; i < langTab.length; i++) {
			switch(langTab[i]) {
				case "en": 
					$('#checkbox1').prop("checked", true).checkboxradio( "refresh" );
					break;
				case "sp": 
					$('#checkbox2').prop("checked", true).checkboxradio( "refresh" );
					break;
				case "it": 
					$('#checkbox3').prop("checked", true).checkboxradio( "refresh" );
					break;
				case "ru": 
					$('#checkbox4').prop("checked", true).checkboxradio( "refresh" );
					break;
				case "ge": 
					$('#checkbox5').prop("checked", true).checkboxradio( "refresh" );
					break;
				case "cn": 
					$('#checkbox6').prop("checked", true).checkboxradio( "refresh" );
					break;
				case "ab": 
					$('#checkbox7').prop("checked", true).checkboxradio( "refresh" );
					break;
			}
		}
	}
	if($('#station').val().length==5) {
		$.post("https://www.lacentrale.taxi/appserver/open_get_insee.php", { zip: $('#station').val(), pass: true }, function(data){
			$("#cityBox").empty().append(data).trigger('create');
			//$('#city').val(city).selectmenu( "refresh" );
			$('#insee').val(insee).selectmenu( "refresh" );
		});
	}
	$('#station').change(function () {
		if($(this).val().length==5) {
			$.post("https://www.lacentrale.taxi/appserver/open_get_insee.php", { zip: $(this).val(), pass: true }, function(data){
				$("#cityBox").empty().append(data).trigger('create');
				//$('#insee').val(insee).selectmenu( "refresh" );
			});
		}
	});
	/*
	//Le.Taxi Form...
	$.post("https://www.lacentrale.taxi/appserver/open_get_insee.php", { zip: station, pass: pass, accessHash: accessHash }, function(data){
		$("#inseeBox").empty().append('<label for="insee">Commune de stationnement: </label>'+data).trigger('create');
		//$("#inseeBox").trigger('create');
		$('#insee').val(insee).selectmenu( "refresh" );
	});
	$('#imat').val(imat);
	$('#constructor').val(constructor);
	$('#model').val(model);
	$('#birthdate').val(birthdate);
	$('#tpmr').val(tpmr).selectmenu( "refresh" );
	$('#amex').val(amex).selectmenu( "refresh" );
	$('#whoLeTaxi').val(tel);
	$.post("https://www.lacentrale.taxi/appclient/advertising.php", { tel: tel, pass: pass, dep: dep, mngid: mngid }, function(data){
		$("#myAdvertising").empty().append(data);
	});
	*/
	// Billing infos
	$.post("https://www.lacentrale.taxi/appclient/billing.php", { taxi: taxi, pass: pass, dep: dep, mngid: mngid }, function(data){
		$("#billing").empty().append(data);
	});
	// Rating infos
	$.post("https://www.lacentrale.taxi/appclient/myrates.php", { tel: tel, pass: pass, dep: dep, mngid: mngid }, function(data){
		$("#myRates").empty().append(data);
	});
});
function getRandomInt(min, max) {
	/*
	* Returns a random integer between min (inclusive) and max (inclusive)
	* Using Math.round() will give you a non-uniform distribution!
	*/
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function successOpenPdf() {
  console.log('Success');
}
function errorOpenPdf(code) {
  if (code === 1) {
	console.log('No file handler found');
  } else {
	console.log('Undefined error');
  }
}
function dc() {
	Dispo_Off();
	$.mobile.loading( "show" );
	$.localStorage.clear();
	$.sessionStorage.clear();
	$.localStorage.setItem('pass', 0);
	setTimeout(function(){
		document.location.href="index.html";
	}, 1000);
}
function getLocation()
{
	if (navigator.geolocation)
	{
		//var watchId = navigator.geolocation.watchPosition(get_coords, showError, { maximumAge: 30000, timeout: 5000, enableHighAccuracy: true });
		if (navigator.userAgent.toLowerCase().match(/android/)) {
			navigator.geolocation.getCurrentPosition(get_coords, showError,{enableHighAccuracy:true, maximumAge:0, timeout: 30000});
		}
		else {
			navigator.geolocation.getCurrentPosition(get_coords, showError,{enableHighAccuracy:true, maximumAge:0, timeout: 10000});
		}
	}
	else {
		if(app) navigator.notification.alert("Localisation impossible, veuillez v&eacute;rifier l'&eacute;tat de votre connection ainsi que la disponibilit&eacute; des services de localisation dans les réglages de votre appareil.", alertDismissed, 'LaCentrale.Taxi', 'OK');
		else alert("Localisation impossible, veuillez v&eacute;rifier l'&eacute;tat de votre connection ainsi que la disponibilit&eacute; des services de localisation dans les réglages de votre appareil.");
	}
}
function showError(error)
{
	var x=document.getElementById("ePopResults");
	var geoAlert="";
	switch(error.code) 
	{
		case error.PERMISSION_DENIED:
		  x.innerHTML="<strong>Vous avez refus&eacute; l&rsquo;acc&egrave;s &agrave; la G&eacute;olocalisation.</strong>"
		  geoAlert="Vous avez refusé l'accès à la Géolocalisation, vous pouvez modifier cela dans les réglages.";
		  break;
		case error.POSITION_UNAVAILABLE:
		  x.innerHTML="<strong>G&eacute;olocalisation indisponible, veuillez regarder dans l&rsquo;aide ou activer le service dans les reglages de votre appareil.</strong>"
		  geoAlert="Géolocalisation indisponible, veuillez regarder dans l'aide ou activer le service dans les reglages de votre appareil.";
		  break;
		case error.TIMEOUT:
			  x.innerHTML="<strong>La demande de G&eacute;olocalisation a expir&eacute;, veuillez v&eacute;rifier l'&eacute;tat de votre connection ainsi que la disponibilit&eacute; des services de localisation (user location request timed out).</strong>"
			  geoAlert="La demande de Géolocalisation a expiré, veuillez vérifier l'état de votre connection ainsi que la disponibilité des services de localisation (user location request timed out).";
		  break;
		case error.UNKNOWN_ERROR:
		  x.innerHTML="<strong>Erreur inconnue de G&eacute;olocalisation (unknown error occurred).</strong>"
		  geoAlert="Erreur inconnue de Géolocalisation (unknown error occurred).";
		  break;
		default:
		  x.innerHTML="<strong>Erreur de G&eacute;olocalisation, red&eacute;marrage du smartphone n&eacute;c&eacute;ssaire.</strong>"
		  geoAlert="Erreur de Géolocalisation, libre à vous d'activer le service de géolocalisation pour cette app dans les réglages.";
	}
	if (error.code == error.TIMEOUT) {
		// Fall back to low accuracy and any cached position available...
		navigator.geolocation.getCurrentPosition(get_coords, function(){
			//$( "#errorPop" ).popup( "open", { positionTo: "window" } );
			getLocation(); // We got out of the loop so we get back in !
			if(!geoFailedAlertOnce) {
				geoFailedAlertOnce = true;
				if(app) navigator.notification.alert(geoAlert, alertDismissed, 'LaCentrale.Taxi', 'OK');
				else alert(geoAlert);
			}
		},{enableHighAccuracy:false, maximumAge:10000, timeout: 60000});
	}
	else {
		getLocation(); // We got out of the loop so we get back in !
		//$( "#errorPop" ).popup( "open", { positionTo: "window" } );
		if(app) navigator.notification.alert(geoAlert, alertDismissed, 'LaCentrale.Taxi', 'OK');
		else alert(geoAlert);
	}
}			  
function get_coords(position) 
{
	lat = position.coords.latitude;
	lng = position.coords.longitude;
	/*
	geoCounter++;
	var stampDot = new Date().getTime() / 1000; // float timestamp in seconds
	var stamp = parseInt(stampDot); // timestamp in seconds
	var geoHash = sha1(stamp+"montaxi"+taxi_id+lat+lng+"phone"+"0"+"2"+api_key); //sha1(concat(timestamp, operator, taxi, lat, lon, device, status, version, api_key))
	var payload = '{"timestamp":"'+stamp+'","operator":"montaxi","taxi":"'+taxi_id+'","lat":"'+lat+'","lon":"'+lng+'","device":"phone","status":"0","version":"2","hash":"'+geoHash+'"}';
	//var payload = 'JSON.stringify({"timestamp":"'+stamp+'","operator":"montaxi","taxi":"'+taxi_id+'","lat":"'+lat+'","lon":"'+lng+'","device":"phone","status":"0","version":"2","hash":"'+geoHash+'"})';
	//alert(JSON.stringify(payload));
	if (openDataInit && openDataGo && app) {
		udptransmit.sendMessage(payload);
	}
	*/
	//if((lat!=previousLat) && (lng!=previousLng) && (geoCounter==1)) {
	if((lat!=previousLat) && (lng!=previousLng)) {
		$.post("https://www.lacentrale.taxi/appclient/insert_app_cab_geoloc.php?lat="+lat+"&lng="+lng, { tel: tel, pass: pass, dep: dep }, function(data) {
			//alert('Sent:'+lat+' , '+lng);
		});
	}
	previousLat = lat;
	previousLng = lng;
	//if(geoCounter==6) geoCounter = 0;
	setTimeout('getLocation()', 30000); // Every thirty seconds you check geolocation...
}
//
function UDPTransmissionSuccess(success) {
	//alert('UDPTransmissionSuccess: '+success);
}

function UDPTransmissionError(error) {
	//alert('UDPTransmissionError: '+error);
}
function update()
{
	//dispo = $.sessionStorage.getItem('dispo');
	if(dispo == 1) {
		$.ajax({
			type: "POST",
			url: "https://www.lacentrale.taxi/appserver/open_get_app_drive_lp.php",
			data: { taxi: taxi, tel: tel, email: email, dispo: dispo, pass: pass, dep: dep, mngid: mngid, group: group, lat: lat, lng: lng, nodelay: true, gotSome: getSome, version: appVersion },
			dataType: "json",
			cache: false,
			timeout: 60000 // in milliseconds
		}).done(function(data) {
			getSome = data.gotSome;
			//$("#screen_job").empty().append(data.gotSome+' - '+data.snippet+'<br>');
			if (data.gotSome>0)
			{
				$("#screen_job").empty().append(data.snippet);
				$("#warn").empty().append('<a href="#jobs_taker"><img src="visuels/Alerte_course_flat.png" width="100%"/></a>');
				$("#warn_home").empty().append('<a href="#jobs_taker"><img src="visuels/Alerte_course_flat.png" width="100%"/></a>');
				//document.getElementById("play").play();
				//navigator.notification.beep(2);
				setTimeout( function () {
					if ($.sessionStorage.getItem('sound') != 'OFF') {
						playAudio('sounds/ring.mp3');
						navigator.vibrate(3000);
					}
				}, 100);
				//pollingTime = 2000;  // Time to play the sound
				if(notifyOnce) {
					notifyOnce = false;
					badgeNumber1=1;
					badgeNumber = badgeNumber1+badgeNumber2;
					cordova.plugins.notification.local.schedule({
						id: 1,
						title: "Notification de course LaCentrale.Taxi",
						text: "Une course immédiate est disponible !",
						led: { color: '#0069B4', on: 500, off: 500 },
						badge: badgeNumber,
						data: { data:data.gotSome }
					});
				}
				gotSome = true;
			}
			else
			{
				$("#screen_job").empty().append('<br><p><b>En attente de courses...</b></p><br>');
				$("#warn").empty().append('<a href="#jobs_taker"><img src="visuels/Aucune_course_flat.png" width="100%"/></a>');
				$("#warn_home").empty().append('<a href="#jobs_taker"><img src="visuels/Aucune_course_flat.png" width="100%"/></a>');
				//document.getElementById("play").pause();
				//stopAudio();
				//pollingTime = getBackPollingTime;
				if (gotSome) {
					badgeNumber1=1;
					badgeNumber = badgeNumber1+badgeNumber2;
					cordova.plugins.notification.local.schedule({
						id: 1,
						title: "Vous avez manqué une course LaCentrale.Taxi",
						text: "Une course immédiate était disponible !",
						led: { color: '#0069B4', on: 500, off: 500 },
						badge: badgeNumber,
						data: { data:data.gotSome }
					});
					gotSome = false;
				}
				else {
					if(app) cordova.plugins.notification.local.clear(1, function() {});
				}
			}
		}).always(function(data) {
			update();
		});
	}
	else {
		setTimeout('update()', pollingTime);
	}
}
function checkCmd() {
	$.post("https://www.lacentrale.taxi/appserver/get_app_bookings.php", { taxi: taxi, tel: tel, email: email, dispo: dispo, pass: pass, dep: dep, mngid: mngid, group: group, zip: station, ring: pass }, function(data){
		if (data.badge != 0)
		{
			$('.orders').addClass('badge');
			//$('.ordersjob').addClass('badge');
			$('.orders').empty().append(data.badge);
			//$('.ordersjob').empty().append(data.badge);
			navigator.notification.beep(2);
			navigator.vibrate(1000);
			$("#screen_bookings").empty().append(data.snippet);
			$("#screen_bookings").trigger('create');
			//badgeNumber2=data.badge;
			badgeNumber2=1;
			badgeNumber = badgeNumber1+badgeNumber2;
			if(parseInt(data.badge)>1) { var showing=data.badge+" courses en commande sont disponibles !";}
			else { var showing="Une course en commande est disponible !";}
			cordova.plugins.notification.local.schedule({
				id: 2,
				title: "Notification de course LaCentrale.Taxi",
				text: showing,
				led: { color: '#0069B4', on: 500, off: 500 },
				badge: badgeNumber,
				data: { number:data.badge }
			});
		}
		else {
			cordova.plugins.notification.local.clear(2, function() {
				//alert("done");
			});
			$('.orders').removeClass('badge');
			//$('.ordersjob').removeClass('badge');
			$('.orders').empty();
			//$('.ordersjob').empty();
		}
	}, "json").always(function() {
		setTimeout('checkCmd()', 300000);
	});
}
function refreshCmd() {
	$.mobile.loading( "show" );
	$("#screen_bookings").empty();
	$.post("https://www.lacentrale.taxi/appserver/get_app_bookings.php", { taxi: taxi, tel: tel, email: email, dispo: dispo, pass: pass, dep: dep, mngid: mngid, group: group, zip: station }, function(data){
		if (data.badge != 0)
		{
			$("#screen_bookings").append(data.snippet);
			$("#screen_bookings").trigger('create');
			$('.orders').addClass('badge');
			//$('.ordersjob').addClass('badge');
			$('.orders').empty().append(data.badge);
			//$('.ordersjob').empty().append(data.badge);
		}
		else {
			$('.orders').removeClass('badge');
			//$('.ordersjob').removeClass('badge');
			$('.orders').empty();
			//$('.ordersjob').empty();
		}
	}, "json").always(function() { $.mobile.loading( "hide" ); });
}
function refreshCmdBackground() {
	$("#screen_bookings").empty();
	$.post("https://www.lacentrale.taxi/appserver/get_app_bookings.php", { taxi: taxi, tel: tel, email: email, dispo: dispo, pass: pass, dep: dep, mngid: mngid, group: group, zip: station }, function(data){
		if (data.badge != 0)
		{
			$("#screen_bookings").append(data.snippet);
			$("#screen_bookings").trigger('create');
			$('.orders').addClass('badge');
			//$('.ordersjob').addClass('badge');
			$('.orders').empty().append(data.badge);
			//$('.ordersjob').empty().append(data.badge);
		}
		else {
			$('.orders').removeClass('badge');
			//$('.ordersjob').removeClass('badge');
			$('.orders').empty();
			//$('.ordersjob').empty();
		}
	}, "json");
}
function dispoCheck()
{
	$.post("https://www.lacentrale.taxi/appclient/open_dispo_app.php?check=1", { taxi: taxi, tel: tel, pass: pass, dep: dep, taxi_id: taxi_id, opendata: openDataGo}, function(data){ 
		var display = '';
		if (data.dispo == 1)
		{
			display = '<a href="#home" onClick="Dispo_Off()" style=""><img src="visuels/DispoOn_flat.png" width="100%"/></a>';
		}
		else {
			display = '<a href="#jobs_taker" onClick="Dispo_On()" style=""><img src="visuels/DispoOff_flat.png" width="100%"/></a>';
		}
		$("#dispo").empty().append(display);
		$("#dispo_jobs").empty().append(display);
		$("#dispo_cmd").empty().append(display);
		$.sessionStorage.setItem('dispo', data.dispo);
		dispo = data.dispo;
		//navigator.notification.alert(data.dispo);
	}, "json").always(function(data) {
		setTimeout('dispoCheck()', 60000); // Every minutes you check dispo for real or oldies...
	});
}
function Dispo_On()
{
	$.post("https://www.lacentrale.taxi/appclient/open_dispo_app.php?dispo=1", { taxi: taxi, tel: tel, pass: pass, dep: dep, taxi_id: taxi_id, opendata: openDataGo }).done(function(data) {
		$("#dispo").empty().append('<a href="#home" onClick="Dispo_Off()"><img src="visuels/DispoOn_flat.png" width="100%"/></a>');
		$("#dispo_jobs").empty().append('<a href="#jobs_taker" onClick="Dispo_Off()"><img src="visuels/DispoOn_flat.png" width="100%"/></a>');
		$("#dispo_cmd").empty().append('<a href="#cmd" onClick="Dispo_Off()"><img src="visuels/DispoOn_flat.png" width="100%"/></a>');
		$.sessionStorage.setItem('dispo', '1');
		dispo = 1;
	});
}
function Dispo_Off()
{
	$.post("https://www.lacentrale.taxi/appclient/open_dispo_app.php?dispo=0", { taxi: taxi, tel: tel, pass: pass, dep: dep, taxi_id: taxi_id, opendata: openDataGo }).done(function(data) {
		$("#dispo").empty().append('<a href="#home" onClick="Dispo_On()"><img src="visuels/DispoOff_flat.png" width="100%"/></a>');
		$("#dispo_jobs").empty().append('<a href="#jobs_taker" onClick="Dispo_On()"><img src="visuels/DispoOff_flat.png" width="100%"/></a>');
		$("#dispo_cmd").empty().append('<a href="#cmd" onClick="Dispo_On()"><img src="visuels/DispoOff_flat.png" width="100%"/></a>');
		$.sessionStorage.setItem('dispo', '0');
		dispo = 0;
	}); 
}
function onComing()
{
	// Pass Dispo_Off to our system but not in the open so it stays in onComing status
	$.post("https://www.lacentrale.taxi/appclient/open_dispo_app.php?dispo=0", { taxi: taxi, tel: tel, pass: pass, dep: dep, taxi_id: taxi_id }).done(function(data) {
		$("#dispo").empty().append('<a href="#home" onClick="Dispo_On()"><img src="visuels/DispoOff_flat.png" width="100%"/></a>');
		$("#dispo_jobs").empty().append('<a href="#jobs_taker" onClick="Dispo_On()"><img src="visuels/DispoOff_flat.png" width="100%"/></a>');
		$("#dispo_cmd").empty().append('<a href="#cmd" onClick="Dispo_On()"><img src="visuels/DispoOff_flat.png" width="100%"/></a>');
		$.sessionStorage.setItem('dispo', '0');
		dispo = 0;
	}); 
}
function Sound_On()
{
	$("#sound").empty().append('<button class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-btn-inline" onClick="Sound_Off()"><img src="visuels/sound_on.png" width="24px"></button>');
	//$("#player").empty().append('<audio id="play" loop="loop" preload="auto" style="display:none" ><source src="sounds/ring.mp3" type="audio/mpeg" />Your browser does not support the audio element.</audio>');
	$.sessionStorage.setItem('sound', 'ON');
}
function Sound_Off()
{
	$("#sound").empty().append('<button class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-btn-inline" onClick="Sound_On()"><img src="visuels/sound_off.png" width="24px"></button>');
	//$("#player").empty();
	$.sessionStorage.setItem('sound', 'OFF');
}
function footer()
{
	$.post("https://www.lacentrale.taxi/appclient/footer_app.php", { dep: dep, no_marquee: true }, function(data) {
		for (i=0; i<9; i++) {
			$('#footer_cont' + i).empty().append(data);
		}
	}).done(function(){
		$('.marquee').marquee({
			//speed in milliseconds of the marquee
			duration: 5000,
			//gap in pixels between the tickers
			gap: 50,
			//time in milliseconds before the marquee will start animating
			delayBeforeStart: 0,
			//'left' or 'right'
			direction: 'left',
			//true or false - should the marquee be duplicated to show an effect of continues flow
			duplicated: true
		});
	});
}
function addCalendar(date, rdv, com, idcourse, cell)
{
	var a = date.split(",");
	var startDate = new Date(a[0],a[1]-1,a[2],a[3],a[4],a[5]);
	var diff = 60; // difference in minutes
	var endDate = new Date(startDate.getTime() + diff*60000);
	var title = "Course en commande";
	var eventLocation = rdv;
	var notes = 'Infos RDV : ' + com + ' - Identifiant de la course : ' + idcourse + ' - Tel client : ' + cell;
	//var success = function(message) { navigator.notification.alert("AJOUT EVENEMENT AU CALENDRIER: " + JSON.stringify(message)); };
	var success = function(message) { navigator.notification.alert("EVENEMENT AJOUTE AU CALENDRIER", alertDismissed, 'LaCentrale.Taxi', 'OK'); };
	var error = function(message) { navigator.notification.alert("Erreur: " + message, alertDismissed, 'LaCentrale.Taxi Erreur', 'OK'); };
	// create
	window.plugins.calendar.createEvent(title,eventLocation,notes,startDate,endDate,success,error);
}
function histoMap(rdv, dest, idcourse, com, cell, prix)
{
	$.sessionStorage.setItem('rdv', rdv);
	$.sessionStorage.setItem('dest', dest);
	$.sessionStorage.setItem('prix', prix);
	$.sessionStorage.setItem('idcourse', idcourse);
	$.sessionStorage.setItem('com', com);
	$.sessionStorage.setItem('cell', cell);
	$.sessionStorage.setItem('cmd', 0);
	$.mobile.pageContainer.pagecontainer("change", "#directions_map", { transition: "slide"} );
}
function planMap(rdv, dest, idcourse, com, cell, prix)
{
	$.sessionStorage.setItem('rdv', rdv);
	$.sessionStorage.setItem('dest', dest);
	$.sessionStorage.setItem('prix', prix);
	$.sessionStorage.setItem('idcourse', idcourse);
	$.sessionStorage.setItem('com', com);
	$.sessionStorage.setItem('cell', cell);
	$.sessionStorage.setItem('cmd', 1);
	$.mobile.pageContainer.pagecontainer("change", "#directions_map", { transition: "slide"} );
}
function justify(when, rdv, comments, destadd, cell)//justify(\''.$when.'\', \''.$rdv.'\', \''.$comments.'\', \''.$destadd.'\', \''.$cell.'\
{
	$.post("https://www.lacentrale.taxi/appclient/justify.php", { when: when, rdv: rdv, comments: comments, destadd: destadd, cell: cell, dep: dep, pass: pass, email: email }, function(data){
		$.mobile.loading( "show" );
		navigator.notification.alert(data, alertDismissed, 'LaCentrale.Taxi', 'OK');
		//window.plugins.childBrowser.showWebPage('https://www.lacentrale.taxi', { showLocationBar: true });
	}).always(function() { $.mobile.loading( "hide" ); });
}
function reporting_customer(rdv_rc, idcourse_rc, hail_id_rc, operator_rc, cell_rc)
{
	var comRate = $("#leComRate").val();
	$.post("https://www.lacentrale.taxi/appclient/open_reporting.php", { rdv: rdv_rc, idcourse: idcourse_rc, hail_id: hail_id_rc, operator: operator_rc, cell: cell_rc, dep: dep, tel: tel, mngid: mngid, comments: comRate}, function(data){ 
		if(app) navigator.notification.alert('Votre remarque a bien été prise en compte, Merci.', alertDismissed, 'LaCentrale.Taxi', 'OK');
		else alert('Votre remarque a bien &eacute;t&eacute; prise en compte, Merci.');
	});
}
function showRepCusto() {
	$('#reporting_customer_cont').slideToggle('slow');
}
function showIncident() {
	$('#incident_cont').slideToggle('slow');
}
// diaryCall for direct job that open #delay
function delayCall(query_string)
{
	stopAudio();
	$.sessionStorage.setItem('query_string', query_string);
	var delayAddr = $.urlParam('rdv', 'www.my.url?'+query_string); // PageToGo
	$("#delayAddr").empty().append("<p><b>Lieu de prise en charge: "+delayAddr+"</b></p>");
	$.mobile.pageContainer.pagecontainer("change", "#delayPop", { transition: "slide"} );
	cordova.plugins.notification.local.clear(1, function() {
		//alert("done");
	});
}
// Cancels direct jobs...
function cancelCall(query_string)
{
	$.mobile.loading( "show" );
	dep = $.localStorage.getItem('dep');
	$.post("https://www.lacentrale.taxi/appserver/open_diary_app_dcvp.php?dep="+dep, query_string, function(data){ 
		$.mobile.pageContainer.pagecontainer("change", "#jobs_taker", { transition: "slide"} );
	}, "json").always(function() { $.mobile.loading( "hide" ); });
	cordova.plugins.notification.local.clear(1, function() {
		// Cleaning direct job notification
	});
}
function directCall()
{
	$.mobile.loading( "show" );
	gotSome = false;
	// Getting query_string using sessionStorage
	var dataDiary = $.sessionStorage.getItem('query_string');
	// Modifying the link 2 diary
	//var link2diary = document.getElementById('link2diary');
	query_string = dataDiary + '&delay=' + delay;
	$.sessionStorage.setItem('query_string', query_string);
	dep = $.localStorage.getItem('dep');
	$.post("https://www.lacentrale.taxi/appserver/open_diary_app_dcvp.php?dep="+dep, query_string, function(data){ 
		switch (data.location) {
			 case '#directions_map':
				//navigator.notification.alert('in direction case');
				$.sessionStorage.setItem('rdv', data.rdv);
				$.sessionStorage.setItem('dest', data.dest);
				$.sessionStorage.setItem('prix', data.prix);
				$.sessionStorage.setItem('idcourse', data.idcourse);
				$.sessionStorage.setItem('com', data.com);
				$.sessionStorage.setItem('cell', data.cell);
				$.sessionStorage.setItem('cmd', 0);
				$.mobile.pageContainer.pagecontainer("change", "#directions_map", { transition: "slide"} );
				/*
				setTimeout( function () {
					checkCustomerConfirm(dep, query_string);
				}, 30000);
				*/
				Dispo_Off();
				 
				 break;
			 case '#toolate':
				$.mobile.pageContainer.pagecontainer("change", "#toolate", { transition: "slide"} );
				$.sessionStorage.setItem('idcourse', data.idcourse);
				 
				 break;
			 default: 
				$.mobile.pageContainer.pagecontainer("change", "#home", { transition: "slide"} );
				 
				 break;
		}					
	}, "json").always(function() { Sound_On();});
	cordova.plugins.notification.local.clear(1, function() {
		// Cleaning direct job notification
	});
}
function openCall(query_string)
{
	$.mobile.loading( "show" );
	gotSome = false;
	$.sessionStorage.setItem('query_string', query_string);
	dep = $.localStorage.getItem('dep');
	stopAudio();
	$.post("https://www.lacentrale.taxi/appserver/open_diary_app_dcvp.php?dep="+dep, query_string, function(data){ 
		switch (data.location) {
			 case '#directions_map':
				//navigator.notification.alert('in direction case');
				$.sessionStorage.setItem('rdv', data.rdv);
				$.sessionStorage.setItem('idcourse', data.idcourse);
				$.sessionStorage.setItem('com', data.com);
				$.sessionStorage.setItem('cell', data.cell);
				$.sessionStorage.setItem('cmd', 0);
				$.mobile.pageContainer.pagecontainer("change", "#directions_map", { transition: "slide"} );
				setTimeout( function () {
					checkCustomerConfirm(dep, query_string);
				}, 30000);
				//Dispo_Off();
				 
				 break;
			 case '#toolate':
				$.mobile.pageContainer.pagecontainer("change", "#toolate", { transition: "slide"} );
				$.sessionStorage.setItem('idcourse', data.idcourse);
				 
				 break;
			 default: 
				$.mobile.pageContainer.pagecontainer("change", "#home", { transition: "slide"} );
				 
				 break;
		}					
	}, "json").always(function() { Sound_On();});
	cordova.plugins.notification.local.clear(1, function() {
		// Cleaning direct job notification
	});
}
// Diary call when accepting cmd jobs or refusing jobs
function diaryCall(query_string)
{
	$.mobile.loading( "show" );
	dep = $.localStorage.getItem('dep');
	$.post("https://www.lacentrale.taxi/appserver/bookings_app_dcvp.php?dep="+dep, query_string, function(data){ 
		switch (data.location) {
			 case '#directions_map':
				//navigator.notification.alert('in direction case');
				$.sessionStorage.setItem('rdv', data.rdv);
				$.sessionStorage.setItem('dest', data.dest);
				$.sessionStorage.setItem('prix', data.prix);
				$.sessionStorage.setItem('idcourse', data.idcourse);
				$.sessionStorage.setItem('com', data.com);
				$.sessionStorage.setItem('cell', data.cell);
				$.sessionStorage.setItem('cmd', 1);
				$.mobile.pageContainer.pagecontainer("change", "#directions_map", { transition: "slide"} );
				var number = data.cell;
				var message = "Le Taxi "+taxi+" viendra vous chercher à l'heure prévue.";
				var intent = ""; //leave empty for sending sms using default intent
				var success = function () {
				};
				var error = function (e) {
				};
				//sms.send(number, message, intent, success, error);
				
				 break;
			 case '#toolate':
				$.mobile.pageContainer.pagecontainer("change", "#toolate", { transition: "slide"} );
				$.sessionStorage.setItem('idcourse', data.idcourse);
				 
				 break;
			 default: 
				$.mobile.pageContainer.pagecontainer("change", "#home", { transition: "slide"} );
				 
				 break;
		}					
	}, "json").always(function() { 
		Sound_On();
		refreshCmdBackground();
	});
	cordova.plugins.notification.local.clear(2, function() {
		// Cleaning cmd notification
	});
}
function checkCustomerConfirm(d, q)
{
	$.post("https://www.lacentrale.taxi/appserver/open_status.php?dep=" + d + "&check=0" , q, function(data){ 
		if (data != 0)
		{
			stillCheckingHail = false;
			if(app) navigator.notification.alert(data, alertDismissed, 'LaCentrale.Taxi', 'OK');
			else alert(data);
			$.mobile.pageContainer.pagecontainer("change", "#home", { transition: "slide"} );
			cordova.plugins.notification.local.schedule({
				id: 1,
				title: data,
				text: data,
				led: { color: '#0069B4', on: 500, off: 500 },
				badge: 1,
				data: { data:data }
			});
		}
		else {
			onComing();
		}
	}).always(function(data) {
		countCheckingHail = 0; // Reset
		setTimeout( function () {
			checkHail(d, q);
		}, 30000);
	});
}
function checkHail(d, q)
{
	$.post("https://www.lacentrale.taxi/appserver/open_status.php?dep=" + d + "&check=0" , q, function(data){ 
		if (data != 0)
		{
			stillCheckingHail = false;
			if(app) navigator.notification.alert(data, alertDismissed, 'LaCentrale.Taxi', 'OK');
			else alert(data);
			cordova.plugins.notification.local.schedule({
				id: 1,
				title: data,
				text: data,
				led: { color: '#0069B4', on: 500, off: 500 },
				badge: 1,
				data: { data:data }
			});
		}
		else {
			stillCheckingHail = true;
		}
	}).always(function(data) {
		countCheckingHail++;
		// Will be checking for incident_customer or else every 30 seconds...
		setTimeout( function () {
			if(stillCheckingHail && countCheckingHail<60) {
				checkHail(d, q);
			}
		}, 30000);
	});
}
function stopCheckHail()
{
	stillCheckingHail = false;
	countCheckingHail=60;
	Dispo_Off();
}
function callIncident(irdv, ihail, iop, icell, istatus)
{
	var incident_taxi_reason = $('#incident_taxi_reason').val();
	$.post("https://www.lacentrale.taxi/appserver/open_incident_reason.php" , { rdvpoint: irdv, hail_id: ihail, operator: iop, cell: icell, status: istatus, incident_taxi_reason: incident_taxi_reason, db: 'true', dep: dep}, function(data){ 
		if (data.ok)
		{
			var number = icell;
			var message = "Le Taxi "+taxi+" ne pourra venir vous chercher à cause d'un incident.";
			//var intent = ""; //leave empty for sending sms using default intent
			var options = {
				replaceLineBreaks: false, // true to replace \n by a new line, false by default
				android: {
					intent: 'INTENT'  // send SMS with the native android SMS messaging
					//intent: '' // send SMS without open any other app
				}
			};
			var success = function () {
			};
			var error = function (e) {
				if(app) navigator.notification.alert("L'incident a été déclaré toutefois, votre appareil semble ne pas gérer les sms, veuillez contacter le client pour l'avertir SVP.", alertDismissed, 'LaCentrale.Taxi', 'OK');
				else alert("L'incident a été déclaré toutefois, votre appareil semble ne pas gérer les sms, veuillez contacter le client pour l'avertir SVP.");
			};
			//sms.send(number, message, options, success, error);
			//$.mobile.pageContainer.pagecontainer("change", "#home", { transition: "slide"} );
			//return false;
		}
		else {
			if(app) navigator.notification.alert("Erreur: L'incident n'a pas été déclaré.", alertDismissed, 'LaCentrale.Taxi', 'OK');
			else alert("Erreur: L'incident n'a pas été déclaré.");
		}
	}, "json");
}
// Urgence call => Danger zone
function getLocationOnce()
{
	if (navigator.geolocation)
	{
		$.mobile.loading( "show" );
		if (navigator.userAgent.toLowerCase().match(/android/)) {
			navigator.geolocation.getCurrentPosition(secureCall, showError,{enableHighAccuracy:false, maximumAge:0});
		}
		else {
			navigator.geolocation.getCurrentPosition(secureCall, showError,{enableHighAccuracy:true, maximumAge:0});
		}
	}
	else {
		navigator.notification.alert("Localisation impossible.", alertDismissed, 'LaCentrale.Taxi Erreur', 'OK');
	}
}
function secureCall(position)
{			
	lat = position.coords.latitude;
	lng = position.coords.longitude;
	var rdvpoint = lat + ', ' + lng;
	var helpname = civil + ' ' + nom + ' ' + prenom;
	var myDate = new Date();
	idcourseUrg = myDate.getTime();
	$.sessionStorage.setItem('idcourseUrg', idcourseUrg);
	
	$.post("https://www.lacentrale.taxi/appclient/secure_xml.php", { lat: lat, lng: lng, dep: dep, pass: pass}, function(xml){
																							 
		var i = 0; // We need to make any numreq unique on that one !!
		$(xml).find('marker').each(function(){
			var name = $(this).attr('name');
			var address = $(this).attr('address');
			var lat2 = $(this).attr('lat');
			var lng2 = $(this).attr('lng');
			var timestamp = $(this).attr('timestamp');
			var distance = $(this).attr('distance');
			var num_reqUrg = idcourseUrg + i;
			//var title = $(this).find('title').text(); To get nodes inside
			//$('<div id='+name+'></div>').html('<p><b>'+name+' - '+address+' - '+lat+' - '+lng+' - '+timestamp+' - '+distance+'</b></p>').appendTo('#secureResults');
			//$('#secureResults').append('<p><b>'+name+' - '+address+' - '+lat+' - '+lng+' - '+timestamp+' - '+distance+'</b></p>');
			
			$.post("https://www.lacentrale.taxi/appclient/secure.php", { taxi: name, tel: address, rdvpoint: rdvpoint, helptaxi: taxi, helpname: helpname, helptel: tel, idcourse: idcourseUrg, num_req: num_reqUrg, dep: dep, pass: pass}, function(data){
				//$('#secureResults').append(data);
			});
			i++;
		});
		check_answer();
		//navigator.notification.alert('Geoloc results :' + lat + ' - ' + lng);
		//$('#results').append('<p><b>'+name+' - '+address+' - '+lat+' - '+lng+' - '+timestamp+' - '+distance+'</b></p>');
		
	}, "xml");
}
function check_answer()
{
	$.mobile.pageContainer.pagecontainer("change", "#urgency", { transition: "slide"} );
	idcourseUrg = $.sessionStorage.getItem('idcourseUrg');
	sec = setInterval( function () {
		$.post("https://www.lacentrale.taxi/appclient/status.php?idcourse=" + idcourseUrg + "&check=1" , { dep: dep}, function(data){ 
			if (data != 0)
			{
				$('#urgencyResults').empty().append(data);
			}
		}); 
	}, 6000);
	return false;
}
function stopSecureCall()
{
	idcourseUrg = $.sessionStorage.getItem('idcourseUrg');
	$.post("https://www.lacentrale.taxi/appclient/secure.php", { taxi: '', tel: '', rdvpoint: '', helptaxi: taxi, helpname: '', helptel: tel, idcourse: idcourseUrg, dep: dep, pass: pass, stopcall: 'true'}, function(data){
		$.mobile.pageContainer.pagecontainer("change", "#home", { transition: "slide"} );
	});
	//$.sessionStorage.setItem('idcourseUrg', false);
	clearInterval(sec);
}
function openSomeUrl(url)
{
	//window.plugins.childBrowser.showWebPage('https://www.lacentrale.taxi/redir.php', { showLocationBar: true });
	window.open(url,'_blank','location=false,enableViewportScale=yes,closebuttoncaption=Fermer');
}
function taximedia()
{
	//window.plugins.childBrowser.showWebPage('https://www.lacentrale.taxi/redir.php', { showLocationBar: true });
	window.open('https://www.lacentrale.taxi/','_blank','location=false,enableViewportScale=yes,closebuttoncaption=Fermer');
}
function help()
{
	//window.plugins.childBrowser.showWebPage('http://lacentrale.taxi/client/help.html', { showLocationBar: true });
	//window.open('https://www.lacentrale.taxi/client/help.html','_blank','location=false,enableViewportScale=yes,closebuttoncaption=Fermer');
	window.open('https://www.lacentrale.taxi','_blank','location=false,enableViewportScale=yes,closebuttoncaption=Fermer');
}
function cgv()
{
	//window.plugins.childBrowser.showWebPage('https://www.lacentrale.taxi/client/docs/CGUV.pdf', { showLocationBar: true });
	window.open('https://www.lacentrale.taxi/client/docs/CGUV.pdf','_blank','location=false,enableViewportScale=yes,closebuttoncaption=Fermer');
}
function alertDismissed()
{
	// Do Nothing...
}
// Checks App or Browser
app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1 && document.URL.indexOf("localhost") != 7;
if ( app ) {
	// PhoneGap application
	// Attendre que PhoneGap soit prêt	    //
	document.addEventListener("deviceready", onDeviceReady, false);

	// PhoneGap est prêt
	function onDeviceReady() {
		document.addEventListener("resume", onResume, false);
		document.addEventListener("pause", onPause, false);
		navigator.splashscreen.hide();
		StatusBar.overlaysWebView(false);
		StatusBar.backgroundColorByHexString("#0069B4");
		// prevent device from sleeping
		window.powermanagement.acquire();
		//window.powermanagement.acquire();
		//Functions to call only at app first load
		devicePlatform = device.platform;
		$.post("https://www.lacentrale.taxi/appclient/polling.php", {version: appVersion, os: devicePlatform}, function(data) {
			pollingTime = data.polling;
			getBackPollingTime = data.polling;
			// Initialising UDP Connexion once...
			//udptransmit.initialize(data.udpserver, 80);
			//udptransmit.initialize("geoloc.dev.api.taxi", 80);
			//udptransmit.initialize("geoloc.test.api.taxi", 80);
			//udptransmit.initialize("geoloc.api.taxi", 80);
			if(data.pop=='OK') { // App update here for iOS devices...
				openSomeUrl('https://www.lacentrale.taxi/updates/');
				//openSomeUrl('itms-services://?action=download-manifest&amp;url=https://www.lacentrale.taxi/updates/'+data.filename);
			}
		}, "json").always(function(data) {
			setTimeout('update()', 2000);
		}).fail(function (jqXHR, textStatus, errorThrown) {
			//udptransmit.initialize(geoserver, 80);
		});
		//udptransmit.initialize(geoserver, 80);
		openPdf = cordova.plugins.disusered.open;
		cameraOptions = {
				quality: 60,
				destinationType: navigator.camera.DestinationType.FILE_URI,
				sourceType: navigator.camera.PictureSourceType.CAMERA
		}
		// For iOS => backgroundtask
		//backgroundtask.start(bgFunctionToRun);
		
		// For Android And Apple Enterprise apps => Enable background mode
		cordova.plugins.backgroundMode.enable();
		cordova.plugins.backgroundMode.setDefaults({
			title:  'App toujours en fonction, nous vous informons des courses en cours...',
			ticker: 'App toujours en fonction, nous vous informons des courses en cours...',
			text:   'Nous vous informons des courses en cours...'
		});
		/*
		// Called when background mode has been activated or deactivated
		cordova.plugins.backgroundMode.onactivate = function () {
			//Sound_Off();
			//cordova.plugins.notification.local.clear(3, function() {});
			var now = new Date().getTime(),
				_30_min_from_now = new Date(now + 30*60*1000);// Dans 30 minutes
			cordova.plugins.notification.local.schedule({
				title: "Vous devriez revenir sur LaCentrale.Taxi",
				text: "Ne manquez pas de course !",
				at: _30_min_from_now,
				led: { color: '#0069B4', on: 500, off: 500 }
			});
		}
		cordova.plugins.backgroundMode.ondeactivate = function() {
			// Sadly this event is fired anytime the backgroundMode is deactivated including when the app is just pushed back from back to foreground !! Sad but true ;-)
			//navigator.notification.alert("Bon retour sur l'application.", backFromBackGround, 'LaCentrale.Taxi', 'Relancer');
		}
		*/
		cordova.plugins.notification.local.on("click", function (notification, state) {
			//alert(notification.id + " was clicked");
			if(notification.id=='1') $.mobile.pageContainer.pagecontainer("change", "#jobs_taker", { transition: "slide"} );
		}, this);
		/*
		if (typeof window.udptransmit == 'undefined') {
			alert("udpTransmit is undefined !!");
		}
		*/
		//getLocation(); // Launching getLocation anyway !!
		// Efficient and batterie saving geolocation...
		/* USING Plugin V3.X */
		// BackgroundGeolocation is highly configurable. See platform specific configuration options 
		BackgroundGeolocation.configure({
			locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER, // ACTIVITY_PROVIDER, DISTANCE_FILTER_PROVIDER OR RAW_PROVIDER
			desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
			stationaryRadius: 100,
			distanceFilter: 100,
			activityType: 'AutomotiveNavigation',
			debug: false,
			interval: 30000,
			fastestInterval: 10000,
			activitiesInterval: 30000,
			saveBatteryOnBackground : false,
			stopOnStillActivity : false,
			stopOnTerminate : false,
			//url: globals.serverAddress,
			//httpHeaders: {
			//  'X-FOO': 'bar'
			//},
			// customize post properties
			//postTemplate: {
			//  lat: '@latitude',
			//  lng: '@longitude',
			//  foo: 'bar' // you can also add your own properties
			//},
			startForeground: true,
			notificationTitle: 'LaCentrale.Taxi',
			notificationText: 'Suivi de votre position',
			notificationIconColor: '#0069B4'
		});
		BackgroundGeolocation.on('location', function(location) {
			// handle your locations here
			// to perform long running operation on iOS
			// you need to create background task
			lat = location.latitude;
			lng = location.longitude;
			BackgroundGeolocation.startTask(function(taskKey) {
				// execute long running task
				// eg. ajax post location
				//$("#returnsGeoloc").append("geoloc launch:"+lat+", "+lng);
				$.post("https://www.lacentrale.taxi/appclient/insert_app_cab_geoloc.php?lat="+lat+"&lng="+lng, { tel: tel, pass: pass, dep: dep }, function(data) {
					//alert('Sent:'+lat+' , '+lng);
				});
				// IMPORTANT: task has to be ended by endTask
				BackgroundGeolocation.endTask(taskKey);
			});
		});
		BackgroundGeolocation.on('background', function() {
			// you can also reconfigure service (changes will be applied immediately)
			BackgroundGeolocation.configure({ locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER });
		});
		BackgroundGeolocation.on('foreground', function() {
			BackgroundGeolocation.configure({ locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER });
		});
		/*
		BackgroundGeolocation.on('stationary', function(stationaryLocation) {
			// handle stationary locations here
		});
		BackgroundGeolocation.on('error', function(error) {
			console.log('[ERROR] BackgroundGeolocation error:', error.code, error.message);
		});
		BackgroundGeolocation.on('start', function() {
			console.log('[INFO] BackgroundGeolocation service has been started');
		});
		BackgroundGeolocation.on('stop', function() {
			console.log('[INFO] BackgroundGeolocation service has been stopped');
		});
		BackgroundGeolocation.on('abort_requested', function() {
			console.log('[INFO] Server responded with 285 Updates Not Required');
			// Here we can decide whether we want stop the updates or not.
			// If you've configured the server to return 285, then it means the server does not require further update.
			// So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
			// But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
		});
		BackgroundGeolocation.on('http_authorization', () => {
			console.log('[INFO] App needs to authorize the http requests');
		});
		*/
		BackgroundGeolocation.on('error', function(error) {
			//if(isApp) navigator.notification.alert('BackgroundGeolocation error', App.alertDismissed, 'LaCentrale.Taxi', 'OK');
			//else alert('BackgroundGeolocation error');
			navigator.notification.confirm('Erreur de Géolocalisation, voulez-vous aller dans les réglages afin d\'activer le service de géolocalisation pour cette app ?', 'LaCentrale.Taxi', function() {
				BackgroundGeolocation.showAppSettings();
			});
		});
		BackgroundGeolocation.on('authorization', function(status) {
			if (status !== BackgroundGeolocation.AUTHORIZED) {
				// we need to set delay or otherwise alert may not be shown
				setTimeout(function() {
					/*
					var showSettings = confirm('Erreur de Géolocalisation, voulez-vous aller dans les réglages afin d\'activer le service de géolocalisation pour cette app ?');
					if (showSetting) {
					  return BackgroundGeolocation.showAppSettings();
					}
					*/
					navigator.notification.confirm('Erreur de Géolocalisation, voulez-vous aller dans les réglages afin d\'activer le service de géolocalisation pour cette app ?', 'LaCentrale.Taxi', function() {
						BackgroundGeolocation.showAppSettings();
					});
				}, 1000);
			}
		});
		// Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app. 
		BackgroundGeolocation.start();
		checkCmd();
		cordova.plugins.notification.local.clearAll(function() {
			//alert("All notifications cleared");
		}, this);
		/*
		//AppRate.locales.getLocale('fr');
		AppRate.preferences = {
			openStoreInApp: false,
			displayAppName: 'LaCentrale.Taxi Chauffeur',
			usesUntilPrompt: 6,
			promptAgainForEachNewVersion: false,
			storeAppURL: {
				ios: '954025129',
				android: 'market://details?id=com.taxibleuservices.mytaxicorp'
			},
			customLocale: {
				title: "Notez LaCentrale.Taxi Chauffeur",
				message: "Si vous aimez utiliser LaCentrale.Taxi Chauffeur, n’oubliez pas de voter sur l’App Store. Cela ne prend qu’une minute. Merci d’avance pour votre soutien !",
				cancelButtonLabel: "Non, merci",
				laterButtonLabel: "Plus tard",
				rateButtonLabel: "Votez"
			}
		};
		*/
	}
}
function onResume() {
	setTimeout(function() {
		$.post("https://www.lacentrale.taxi/client/active_app.php", { tel: tel, mngid: mngid, dep: dep}, function(data) {});
		if((navigator.network.connection.type == Connection.NONE) || !window.jQuery){
			$("body").empty().append('<img src="no_network.png" width="'+screen.width+'" height="'+screen.height+'" onClick="window.location.reload()" />');
		}
		cordova.plugins.notification.local.clearAll(function() {
			//alert("All notifications cleared");
		}, this);
		//Sound_On();
	}, 500);// iOS Quirks
}
function onPause() {
	//Sound_Off();
}
function bgFunctionToRun() {
	update();
	//getLocation();
	checkCmd();
}
function backFromBackGround() {
	document.location.href='home.html';
}
$.urlParam = function(name, url){
	// Get parameters from an URL
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(url);
	//For current URL
	//var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (results==null){
	   return null;
	}
	else{
	   return results[1] || 0;
	}
}
// Get params from url when called from url the scheme...
function handleOpenURL(url) {
	setTimeout(function() {
		//alert("received url: " + url);
		toApp = $.urlParam('to', url); // PageToGo
		if(toApp=='history') {
			//alert(toApp);
			$.mobile.pageContainer.pagecontainer("change", "#"+toApp, { transition: "slide"} );
		}
	}, 600);
}
var scanSuccess = function (result) {
	var textFormats = "QR_CODE DATA_MATRIX";
	var productFormats = "UPC_E UPC_A EAN_8 EAN_13";
	if (result.cancelled) { return; }
	if (textFormats.match(result.format)) {                
		var scanVal = result.text;
		if (scanVal.indexOf("http") === 0) {
			setTimeout(function() { 
				//window.plugins.childBrowser.showWebPage(result.text, { showLocationBar: true }); 
				window.open(result.text,'_blank','location=yes,enableViewportScale=yes,closebuttoncaption=Fermer');
			}, 500);
		} else {
			navigator.notification.alert(
					result.text,
					function (){},
					'Valeur du scan:',
					'OK'
				);
		}
	} else if (productFormats.match(result.format)) {
		var searchUrl = "https://www.google.fr/#q=" + result.text;
		setTimeout(function() { window.open(searchUrl,'_blank','location=yes,enableViewportScale=yes,closebuttoncaption=Fermer'); }, 500);
		//setTimeout(function() { window.plugins.childBrowser.showWebPage(searchUrl, { showLocationBar: true }); }, 500);
	} else { navigator.notification.alert("Format du scan: " + result.format + 
			  " NON SUPPORTE. Valeur du scan: " + result.text, alertDismissed, 'LaCentrale.Taxi Erreur', 'OK');
	}
}
function goScan ()
{
	cordova.plugins.barcodeScanner.scan(
		scanSuccess, 
		function (error) {
			navigator.notification.alert("Scan Erreur: " + error, alertDismissed, 'LaCentrale.Taxi Erreur', 'OK');
		}
	);
}
var renameUpload = '';
function getImage(rename, btn) {
	if(mngid!==null && tel!==null) renameUpload = rename+'_'+mngid+'_'+tel;
	else renameUpload = rename+'_0_inconnu';
	$(btn).addClass('ui-btn-a');
	navigator.camera.getPicture(uploadPhoto, onGetPictureError, cameraOptions);
}
function onGetPictureError(err){ alert(error); }
function uploadPhoto(imageURI) {
	var options = new FileUploadOptions();
	options.fileKey = "file";
	options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
	options.mimeType = "image/jpeg";

	var params = new Object();
	params.pwd = "letMeUpload@LaCentrale.Taxi";
	params.rename = renameUpload;
	
	options.params = params;
	options.chunkedMode = false;

	$.mobile.loading( "show" );
	var ft = new FileTransfer();
	/*
	ft.onprogress = function(progressEvent) {
		if (progressEvent.lengthComputable) {
			loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
		} else {
			loadingStatus.increment();
		}
	};
	*/
	ft.upload(imageURI, "https://www.lacentrale.taxi/upload.php",
		function (result) {
			$.mobile.loading( "hide" );
			navigator.notification.alert("Le document a bien été envoyé.", alertDismissed, 'LaCentrale.Taxi', 'OK');
		},
		function (error) {
			$.mobile.loading( "hide" );
			navigator.notification.alert('Une erreur est survenue: '+JSON.stringify(error), alertDismissed, 'LaCentrale.Taxi', 'OK');
		}, options
	);
}
/*
function contactPick()
{
	var successCallbackPick = function(result){
		setTimeout(function(){
			//navigator.notification.alert(result.name + " " + result.phoneNumber);
			var number = result.phoneNumber;
			$('#telShare').val(number);
		},500);
	};
	var failedCallbackPick = function(result){
		setTimeout(function(){
			//navigator.notification.alert(result);
		},500);
	}
	window.plugins.contactNumberPicker.pick(successCallbackPick,failedCallbackPick);
}
// UDP init Success/Error Handlers...
function UDPTransmitterInitializationSuccess(success) {
	//navigator.notification.alert('UDP INIT SUCCESS: '+success, alertDismissed, 'LaCentrale.Taxi', 'OK');
}
function UDPTransmitterInitializationError(error) {
	navigator.notification.alert('UDP INIT ERROR: '+error, alertDismissed, 'LaCentrale.Taxi Erreur', 'OK');
}
*/
function myTaxiDown()
{
	//window.open(url,'_blank','location=yes,enableViewportScale=yes,closebuttoncaption=Fermer');
	if(app) window.open('lacentraletaxiclient://?from=driver', '_system');
	else window.open('https://www.lacentrale.taxi/apps/client/', '_blank');
}
function Share()
{
	var number = $('#telShare').val();
	var message = "Téléchargez l'app LaCentrale.Taxi en suivant ce lien : https://www.lacentrale.taxi/stores.php?app=cvclient";
	var intent = ""; //leave empty for sending sms using default intent
	var success = function () {
		//navigator.notification.alert('Message sent successfully');
		$('#smsReturn').empty().append('Message envoy&eacute; avec succ&egrave;s, Merci');
		$( "#popSms" ).popup( "open", { positionTo: "window" } );
	};
	var error = function (e) {
		//navigator.notification.alert('Message Failed:' + e); 
		$('#smsReturn').empty().append('Probl&egrave;me lors de l&rsquo;envoi du message: ' + e);
		$( "#popSms" ).popup( "open", { positionTo: "window" } );
	};
	//sms.send(number, message, intent, success, error);
}
function ShareArt()
{
	var number = $('#telShare').val();
	var message = "Téléchargez l'app LaCentrale.Taxi Chauffeur en suivant ce lien : https://www.lacentrale.taxi/stores.php?app=cvdriver";
	var intent = ""; //leave empty for sending sms using default intent
	var success = function () {
		//navigator.notification.alert('Message sent successfully');
		$('#smsReturn').empty().append('Message envoy&eacute; avec succ&egrave;s, Merci');
		$( "#popSms" ).popup( "open", { positionTo: "window" } );
	};
	var error = function (e) {
		//navigator.notification.alert('Message Failed:' + e); 
		$('#smsReturn').empty().append('Probl&egrave;me lors de l&rsquo;envoi du message: ' + e);
		$( "#popSms" ).popup( "open", { positionTo: "window" } );
	};
	//sms.send(number, message, intent, success, error);
}
function SharePro()
{
	var number = $('#telShare').val();
	var message = "Téléchargez l'app LaCentrale.Taxi Business sur les sores en suivant ce lien : https://www.lacentrale.taxi/stores.php?app=pro  ou rendez-vous sur le WebService en suivant ce lien :  https://www.lacentrale.taxi/pro/";
	var intent = ""; //leave empty for sending sms using default intent
	var success = function () {
		//navigator.notification.alert('Message sent successfully');
		$('#smsReturn').empty().append('Message envoy&eacute; avec succ&egrave;s, Merci');
		$( "#popSms" ).popup( "open", { positionTo: "window" } );
	};
	var error = function (e) {
		//navigator.notification.alert('Message Failed:' + e); 
		$('#smsReturn').empty().append('Probl&egrave;me lors de l&rsquo;envoi du message: ' + e);
		$( "#popSms" ).popup( "open", { positionTo: "window" } );
	};
	//sms.send(number, message, intent, success, error);
}
function goToSection(jumpPage, jumpSection)
{
	//goToSection('#manage', '#shareCollaps')
	$.mobile.pageContainer.pagecontainer("change", jumpPage, { transition: "slide"} );
	$(jumpSection).collapsible( "expand" );
}
function contactShare()
{
	var successCallbackPick = function(result){
		setTimeout(function(){
			//navigator.notification.alert(result.name + " " + result.phoneNumber);
			var number = result.phoneNumber;
			var message = "Téléchargez l'app LaCentrale.Taxi en suivant ce lien : https://www.lacentrale.taxi/stores.php?app=cvclient";
			var intent = ""; //leave empty for sending sms using default intent
			var success = function () {
				//navigator.notification.alert('Message sent successfully');
				$('#smsReturn').empty().append('Message envoy&eacute; avec succ&egrave;s, Merci');
				$( "#popSms" ).popup( "open", { positionTo: "window" } );
			};
			var error = function (e) {
				//navigator.notification.alert('Message Failed:' + e); 
				$('#smsReturn').empty().append('Probl&egrave;me lors de l&rsquo;envoi du message: ' + e);
				$( "#popSms" ).popup( "open", { positionTo: "window" } );
			};
			//sms.send(number, message, intent, success, error);
		},500);
	};
	var failedCallbackPick = function(result){
		setTimeout(function(){
			//navigator.notification.alert(result);
		},500);
	}
	window.plugins.contactNumberPicker.pick(successCallbackPick,failedCallbackPick);
}
function playAudio(src) {
	if (my_media == null) {
		// Create Media object from src
		//var path = window.location.pathname;
		//path = path.substring(0, path.lastIndexOf('/') + 1) + src;
		// Need to unescape if path have '%20' component
		var path = decodeURI(cordova.file.applicationDirectory) + 'www/' + src;
		// iOS need to remove file://
		if (device.platform.toLowerCase() == 'ios') {
			path = path.replace('file://', '');
		}
		my_media = new Media(path, playOnSuccess, playOnError);
	}
	// Play audio
	my_media.play();
} 
// Stop audio
function stopAudio() {
	if (my_media) {
		my_media.stop();
	}
}
// onSuccess Callback
function playOnSuccess() {
	//console.log("playAudio():Audio Success");
}
// onError Callback 
function playOnError(error) {
	//navigator.notification.alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
}
function modPay() {
	var cardNumber = $('#cbnum').val();
	var exp = $('#cbexpa').val()+'-'+$('#cbexpm').val();
	var cardNetwork = $('#brand').val();
	var cvv = $('#cbval').val();
	$('#modPay').prop('disabled', true).addClass('ui-disabled');
	$.mobile.loading( "show" );
	$.post('https://www.lacentrale.taxi/payzen/updateIndent.php', {cardNumber: cardNumber, exp: exp, cardNetwork: cardNetwork, cvv: cvv, civil: civil, nom: nom, prenom: prenom, tel: tel, email: email, cardIdent: siret, station: station}, function(data){
	}, "json").done(function(data) { 
		var display = '';
		if (data.sniffed == 'OK')
		{
			display = '<p><b>la modification de votre carte bancaire &agrave; bien &eacute;t&eacute; prise en compte, merci.</b></p>';
			$.localStorage.setItem('siret', data.identId);
		}
		/*
		else if (!data.signed)
		{
			display += '<p style="color:red;"><b>Il y a un probl&egrave;me technique avec l&rsquo;enregistrement de la carte bancaire.</b></p>';
		}*/
		else {
			display += '<p style="color:red;"><b>Il y a un probl&egrave;me avec l&rsquo;enregistrement de la carte bancaire, il faut une carte VALIDE de type CB, VISA ou MASTERCARD.<br>'+data.showError+'</b></p>';
		}
		$("#returnsVisa").empty().append(display);
		$("#returnsBox").popup( "open", { positionTo: "window" } );
	}).always(function () {
		//$('#mod_collaps').collapsible( "collapse" );
		$.mobile.loading( "hide" );
		$('#modPay').prop('disabled', false).removeClass('ui-disabled');
	});
}
$('#home').live("swiperight", function() {
	//$.mobile.pageContainer.pagecontainer("change", "#home", { transition: "slide", reverse: true} );
	$("#homepanel_poper").trigger('click');
});
$('#home .ui-content').live("swipeleft", function() {
	$.mobile.pageContainer.pagecontainer("change", "#jobs_taker", { transition: "slide"} );
});
$('#jobs_taker').live("swiperight", function() {
	$.mobile.pageContainer.pagecontainer("change", "#home", { transition: "slide", reverse: true} );
});
$('#jobs_taker .ui-content').live("swipeleft", function() {
	$.mobile.pageContainer.pagecontainer("change", "#history", { transition: "slide"} );
});
$('#history').live("swiperight", function() {
	$.mobile.pageContainer.pagecontainer("change", "#jobs_taker", { transition: "slide", reverse: true} );
});
$('#history .ui-content').live("swipeleft", function() {
	$.mobile.pageContainer.pagecontainer("change", "#home", { transition: "slide"} );
});
$('#cmd').live("swiperight", function() {
	$.mobile.pageContainer.pagecontainer("change", "#home", { transition: "slide", reverse: true} );
});
$('#cmd .ui-content').live("swipeleft", function() {
	$.mobile.pageContainer.pagecontainer("change", "#planning", { transition: "slide"} );
});
$('#planning').live("swiperight", function() {
	$.mobile.pageContainer.pagecontainer("change", "#cmd", { transition: "slide", reverse: true} );
});
$('#planning .ui-content').live("swipeleft", function() {
	$.mobile.pageContainer.pagecontainer("change", "#home", { transition: "slide"} );
});
$('#directions_map').live("swiperight", function() {
	$("#mapPanel_poper").trigger('click');
});		
$(document).on( 'pagecreate', function() {
	if(pageFirstCreation) { // Avoid this event to trigger those function any time we switch pages
		$( "body>[data-role='panel']" ).panel().enhanceWithin();
		$('.expends').click(function () {
			$(this).next('div').slideToggle('slow');
			//$.mobile.silentScroll($(this).next('div').offset().top);
		});
		if(!app) {
			getLocation();
			$.post("https://www.lacentrale.taxi/appclient/polling.php", {}, function(data) {
				pollingTime = data.polling;
				getBackPollingTime = data.polling;
			}, "json").always(function(data) {
				setTimeout('update()', 2000);
			});
		}
		if (navigator.userAgent.toLowerCase().match(/android/)) {
			$("#player").empty().append('<audio id="play" loop="loop" preload="auto" style="display:none" ><source src="/android_asset/www/sounds/ring.mp3" type="audio/mpeg" />Your browser does not support the audio element.</audio>');
		}
		else {
			$("#player").empty().append('<audio id="play" loop="loop" preload="auto" style="display:none" ><source src="sounds/ring.mp3" type="audio/mpeg" />Your browser does not support the audio element.</audio>');
		}
		//Dispo_On();
		//dispoCheck();
		footer();		
		/*
		dep = $.localStorage.getItem('dep');
		$('#depMod').val(dep);
		$('#depLeTaxi').val(dep);
		$('#depPwd').val(dep);
		$('#openSwitch').change(function(){
			if ($(this).val()==1) {
				openDataGo=true;
				if(!openDataInit) { // Probably cab is not registered @le.taxi => open register form
					openDataGo=false;
					$(this).val(0).flipswitch( "refresh" );
					goToSection('#manage', '#leTaxiCollaps');
				}
				else Dispo_On();
			}
			else {
				openDataGo=false;
				$.post("https://www.lacentrale.taxi/appclient/open_dispo_app.php?dispo=0", { taxi: taxi, tel: tel, pass: pass, dep: dep, taxi_id: taxi_id, opendata: true, getout: true }); 
			}
		});
		*/
		pageFirstCreation = false;
	}
});
$(document).ready(function(){
	$.validator.addMethod(
		"regex",
		function(value, element, regexp) {
			var check = false;
			var re = new RegExp(regexp);
			return this.optional(element) || re.test(value);
		},""	  
	);
	
	$.validator.addMethod('phone', function (value) {
		return /^(01|02|03|04|05|06|07|08|09)[0-9]{8}$/.test(value);
	}, 'le N&deg; de t&eacute;l&eacute;phone et une s&eacute;rie de 10 chiffres sans espace commen&ccedil;ant par 0');
	
	$.validator.addMethod('siret', function (value) {
		return /^[0-9]{14}$/.test(value);
	}, 'Le N&deg; SIRET doit corresondre &agrave; 14 chiffres sans espace.');

	$.validator.addMethod('cp', function (value) {
		return /^[0-9]{5}$/.test(value);
	}, 'Le Code Postal fait 5 chiffres sans espace.');

	$("#modmy").validate({
		rules: {
		 login: {
		   required: true,
		   phone: true
		 },
		 civil: "required",
		 nom: "required",
		 prenom: "required",
		 cpro: "required",
		 insee: "required",
		 siret: {
		   required: true,
		   siret: true
		 },
		 imat: "required",
		 constructor: "required",
		 model: "required",
		 tel: {
		   required: true,
		   phone: true
		 },
		 station: {
		   required: true,
		   cp: true
		 },
		 email: {
		   required: true,
		   email: true
		 },
		 confirmail: {
		   required: true,
		   email: true,
		   equalTo: '#email'
		 }
		},
		messages: {
		 login: {
		   required: "Ce champs est obligatoire"
		 },
		 civil: "Ce champs est obligatoire",
		 nom: "Ce champs est obligatoire",
		 prenom: "Ce champs est obligatoire",
		 cpro: "Le N&deg; de Carte Professionelle est obligatoire",
		 insee: "La ville est obligatoire",
		 siret: {
		   required: "Le num&eacute;ro SIRET est obligatoire"
		 },
		 imat: "Ce champs est obligatoire",
		 constructor: "Ce champs est obligatoire",
		 model: "Ce champs est obligatoire",
		 tel: {
		   required: "Le T&eacute;l&eacute;phone est obligatoire"
		 },
		 station: {
		   required: "Ce champs est obligatoire"
		 },
		 email: {
		   required: "Nous avons besoin de votre email afin de vous contacter",
		   email: "Votre email doit &ecirc;tre au format nom@domaine.com"
		 },
		 confirmail: {
		   required: "L&rsquo;email ci dessus n&rsquo;a pas &eacute;t&eacute; confirm&eacute;",
		   email: "Votre email doit &ecirc;tre au format nom@domaine.com",
		   equalTo: "Cette adresse n&rsquo;est pas identique &agrave; la pr&eacute;c&eacute;dante."
		 }
		}
		/* Put errors below fields
		,
		errorPlacement: function(error, element) {
			error.appendTo( element.parent().next('em') );
			error.appendTo( element.parent().parent().next('em') ); // selectBoxes
		}
		*/
		// Form submission if every thing is ok
		,
		submitHandler: function (form) {
			$('#mod_collaps input[type=submit]').button('disable');
			$.mobile.loading( "show" );
			// Subs some data
			let query = $("#modmy").serialize();
			let getCity = $( "#insee option:selected" ).text();
			query = query + "&city=" + getCity;
			$.post("https://www.lacentrale.taxi/appclient/login_app.php", query, function(data) {
				// GET SHIT BACK !!
				$.localStorage.setItem('civil', data.civil);
				$.localStorage.setItem('nom', data.nom);
				$.localStorage.setItem('prenom', data.prenom);
				$.localStorage.setItem('taxi', data.taxi);
				$.localStorage.setItem('tel', data.tel);
				$.localStorage.setItem('cpro', data.cpro);
				$.localStorage.setItem('siret', data.siret);
				$.localStorage.setItem('email', data.email);
				$.localStorage.setItem('station', data.station);
				$.localStorage.setItem('city', data.city);
				$.localStorage.setItem('insee', data.insee);
				$.localStorage.setItem('dep', data.dep);
				$.sessionStorage.setItem('pwd', data.pwd);
				$.sessionStorage.setItem('modmy', data.modmy);
				$.localStorage.setItem('type', data.type);
				$.localStorage.setItem('cb', data.cb);
				$.localStorage.setItem('medic', data.medic);
				$.localStorage.setItem('animal', data.animal);
				$.localStorage.setItem('passengers', data.passengers);
				$.localStorage.setItem('color', data.color);
				$.localStorage.setItem('lang', data.lang);
				$.localStorage.setItem('imat', data.imat);
				$.localStorage.setItem('constructor', data.constructor);
				$.localStorage.setItem('model', data.model);
				$.localStorage.setItem('amex', data.amex);
			}, "json").done(function(data) { 
				setTimeout('reloadVars()', 2000); // Wait a little bit to reloadVars as it's all async...
				$('#login').val(data.tel);
				$('#civil').val(data.civil);
				$('#nom').val(data.nom);
				$('#prenom').val(data.prenom);
				//$('#taxi').val(data.taxi);
				$('#tel').val(data.tel);
				$('#cpro').val(data.cpro);
				$('#siret').val(data.siret);
				$('#email').val(data.email);
				$('#confirmail').val(data.email);
				$('#station').val(data.station);
				$('#insee').val(data.insee).selectmenu( "refresh" );
				$('#type').val(data.type).selectmenu( "refresh" );
				$('#cb').val(data.cb).flipswitch( "refresh" );
				//$('#medic').val(data.medic).flipswitch( "refresh" );
				//$('#amex').val(data.amex).flipswitch( "amex" );
				$('#animal').val(data.animal).flipswitch( "refresh" );
				$('#passengers').val(data.passengers).slider("refresh");;
				$('#color').val(data.color).selectmenu( "refresh" );
				$('#imat').val(data.imat);
				$('#constructor').val(data.constructor);
				$('#model').val(data.model);
				var langTab= data.lang.split(", ");
				for (i = 0; i < langTab.length; i++) {
					switch(langTab[i]) {
						case "en": 
							$('#checkbox1').prop("checked", true).checkboxradio( "refresh" );
							break;
						case "sp": 
							$('#checkbox2').prop("checked", true).checkboxradio( "refresh" );
							break;
						case "it": 
							$('#checkbox3').prop("checked", true).checkboxradio( "refresh" );
							break;
						case "ru": 
							$('#checkbox4').prop("checked", true).checkboxradio( "refresh" );
							break;
						case "ge": 
							$('#checkbox5').prop("checked", true).checkboxradio( "refresh" );
							break;
						case "cn": 
							$('#checkbox6').prop("checked", true).checkboxradio( "refresh" );
							break;
						case "ab": 
							$('#checkbox7').prop("checked", true).checkboxradio( "refresh" );
							break;
					}
				}
				var display = '';
				var alertMe = '';
				if (data.modmy)
				{
					display = '<p><b>la modification de vos informations personnelles &agrave; bien &eacute;t&eacute; prise en compte, merci. Le cas &eacute;ch&eacute;ant vous devrez d&eacute;poser de nouveaux justificatifs</b></p>';
					alertMe = 'la modification de vos informations personnelles à bien été prise en compte, merci. Le cas échéant vous devrez déposer de nouveaux justificatifs';
				}
				else {
					display = '<p style="color:red;"><b>la modification de vos informations personnelles n&rsquo;&agrave; pas &eacute;t&eacute; prise en compte, aucune modification faite en base de donn&eacute;e.</b></p>';
					alertMe = "la modification de vos informations personnelles n'a pas été prise en compte, aucune modification faite en base de donnée.";
				}
				$.mobile.loading( "hide" );
				$('#mod_collaps').collapsible( "collapse" );
				$('#mod_collaps input[type=submit]').button('enable');
				$("#returns").empty().append(display);
				navigator.notification.alert(alertMe, alertDismissed, 'LaCentrale.Taxi', 'OK');
			});
		}
	});
	/*
	$("#letaxiForm").validate({
		rules: {
		 insee: {
		   required: true,
		   cp: true
		 },
		 imat: "required",
		 constructor: "required",
		 model: "required",
		 birthdate: "required",
		},
		messages: {
		 insee: {
		   required: "Ce champs est obligatoire"
		 },
		 imat: "Ce champs est obligatoire",
		 constructor: "Ce champs est obligatoire",
		 model: "Ce champs est obligatoire",
		 birthdate: "Ce champs est obligatoire",
		}
		// Form submission if every thing is ok
		,
		submitHandler: function (form) {
			$('#leTaxiCollaps input[type=submit]').button('disable');
			$.mobile.loading( "show" );
			// Adding the accessHash var to posting data (so that it does not show in code using an hidden input)
			var dataLeTaxi = $('#letaxiForm').serializeArray();
			dataLeTaxi.push({name: 'accessHash', value: accessHash});
			var imatCheck = $('#imat').val();
			if(imatCheck.length>6) {
				// Subs some data
				$.post("https://www.lacentrale.taxi/appserver/open_register.php", dataLeTaxi, function(data) {
					// GET SHIT BACK !!
					$.localStorage.setItem('insee', data.insee);
					$.localStorage.setItem('imat', data.imat);
					$.localStorage.setItem('constructor', data.constructor);
					$.localStorage.setItem('model', data.model);
					$.localStorage.setItem('birthdate', data.birthdate);
					$.localStorage.setItem('ads', data.taxi);
					$.localStorage.setItem('tpmr', data.tpmr);
					$.localStorage.setItem('amex', data.amex);
				}, "json").done(function(data) { 
					setTimeout('reloadVars()', 2000); // Wait a little bit to reloadVars as it's all async...
					$('#insee').val(data.insee);
					$('#imat').val(data.imat);
					$('#constructor').val(data.constructor);
					$('#model').val(data.model);
					$('#birthdate').val(data.birthdate);
					$('#tpmr').val(data.tpmr);
					$('#amex').val(data.amex);
					var display = '';
					var alertMe = '';
					if (data.ok)
					{
						display = '<p><b>la modification de vos informations personnelles &agrave; bien &eacute;t&eacute; prise en compte, merci.</b></p>';
						alertMe = 'la modification de vos informations personnelles à bien été prise en compte, merci.';
						// In case Licence plate or any key has changed we have to re-enroll because taxi_id may have changed then !
						$.post("https://www.lacentrale.taxi/appclient/open_enroll_app.php", { tel: tel, insee: insee, dep: dep, mngid: mngid, ads: taxi, cpro: cpro, imat: imat}, function(data) {
							taxi_id = data.taxi_id;
							$.localStorage.setItem('taxi_id', data.taxi_id);
							openStatus = data.status;
							openDataInit=true;
							$("#openSwitch").val(1).flipswitch( "refresh" );
							//dispoCheck();
							//Dispo_On();
						}, "json");
					}
					else {
						display = '<p style="color:red;"><b>la modification de vos informations personnelles n&rsquo;&agrave; pas &eacute;t&eacute; prise en compte, aucune modification faite en base de donn&eacute;e.</b></p>';
						alertMe = "la modification de vos informations personnelles n'a pas été prise en compte, aucune modification faite en base de donnée.";
					}
					$.mobile.loading( "hide" );
					$('#leTaxiCollaps').collapsible( "collapse" );
					$('#leTaxiCollaps input[type=submit]').button('enable');
					$("#returns").empty().append(display);
					navigator.notification.alert(alertMe, alertDismissed, 'LaCentrale.Taxi', 'OK');
				});
			}
			else {
				// Imat is not quite like it !
				$.mobile.loading( "hide" );
				$('#leTaxiCollaps').collapsible( "collapse" );
				$('#leTaxiCollaps input[type=submit]').button('enable');
				$("#returns").empty().append("L&rsquo;immatriculation fournie ne semble pas valide (AB123YZ ou AB-123-YZ), veuillez corriger SVP.");
				navigator.notification.alert("L'immatriculation fournie ne semble pas valide (AB123YZ ou AB-123-YZ), veuillez corriger SVP.", alertDismissed, 'LaCentrale.Taxi', 'OK');
			}
		}
	});
	*/
	$("#change").submit(function(event) {
		// stop form from submitting normally
		event.preventDefault();
		// Subs some data
		$.post("https://www.lacentrale.taxi/appclient/login_app.php", $("#change").serialize(), function(data) {
			// GET SHIT BACK !!
			var display = '';
			var alertMe = '';
			if (data.changed)
			{
				display = '<p><b>Voici les informations d&rsquo;identification qui vous permettront d&rsquo;acc&egrave;der &agrave; votre compte :<br><span style="color:#09F;">Identifiant = ' + data.tel + '<br>Mot de passe = ' + data.pwd + '</span><br>Vous les recevrez dans quelques instants &agrave; cet email : <span style="color:#09F;">' + data.email + '</span>, merci.<br></b></p>';
				alertMe = "Vous recevrez vos nouveaux identifiants dans quelques instants à cet email : " + data.email + ", merci.";
			}
			else {
				display = '<p style="color:red;"><b>la modification de vos informations personnelles n&rsquo;&agrave; pas &eacute;t&eacute; prise en compte, l&rsquo;identifiant fourni ne figurant pas dans notre base de donn&eacute;e.</b></p>';
				alertMe = "la modification de vos identifiants n'a pas été faite, l'identifiant fourni ne figurant pas dans notre base de donnée.";
			}
			$("#returns").empty().append(display);
			navigator.notification.alert(alertMe, alertDismissed, 'LaCentrale.Taxi', 'OK');
		}, "json");
	});
});
