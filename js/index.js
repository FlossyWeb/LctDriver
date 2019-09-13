
// getLocation & secureCall & Actived check
var lat = 0;
var lng = 0;
var idcourseUrg = $.sessionStorage.setItem('idcourseUrg', '');
var taxi = $.localStorage.getItem('taxi');
var tel = $.localStorage.getItem('tel');
var civil = $.localStorage.getItem('civil');
var nom = $.localStorage.getItem('nom');
var prenom = $.localStorage.getItem('prenom');
var email = $.localStorage.getItem('email');
var siret = $.localStorage.getItem('siret');
var station = $.localStorage.getItem('station');
var dep = $.localStorage.getItem('dep');
var mngid = $.localStorage.getItem('mngid');
var actived;
var openPdf;
var cameraOptions = new Object();

function active()
{
	var posting = $.post("https://www.lacentrale.taxi/appclient/active_app.php", { tel: tel, mngid: mngid, dep: dep}, function(data) {
		actived = data.active;
		// GET SHIT BACK !!
		$.localStorage.setItem('civil', data.civil);
		$.localStorage.setItem('nom', data.nom);
		$.localStorage.setItem('prenom', data.prenom);
		$.localStorage.setItem('taxi', data.taxi);
		$.localStorage.setItem('cpro', data.cpro);
		$.localStorage.setItem('tel', data.tel);
		$.localStorage.setItem('siret', data.siret);
		$.localStorage.setItem('imat', data.imat);
		$.localStorage.setItem('constructor', data.constructor);
		$.localStorage.setItem('model', data.model);
		$.localStorage.setItem('amex', data.amex);
		$.localStorage.setItem('email', data.email);
		$.localStorage.setItem('station', data.station);
		$.localStorage.setItem('city', data.city);
		$.localStorage.setItem('insee', data.insee);
		$.localStorage.setItem('dep', data.dep);
		$.localStorage.setItem('group', data.group);
		$.localStorage.setItem('mngid', data.mngid);
		$.localStorage.setItem('type', data.type);
		$.localStorage.setItem('cb', data.cb);
		$.localStorage.setItem('medic', data.medic);
		$.localStorage.setItem('animal', data.animal);
		$.localStorage.setItem('lang', data.lang);
		$.localStorage.setItem('passengers', data.passengers);
		$.localStorage.setItem('color', data.color);
	}, "json");
	posting.done(function( data ) {
		if($.localStorage.getItem('pass')=='true' && data.active)
		{
			//navigator.splashscreen.hide();
			$.mobile.loading( "show" );
			setTimeout(function(){
				document.location.href='home.html';
			}, 1000);
		}
		else if (!data.active) {
			var display = '<p style="color:red;"><b>Il semblerait que votre compte ne soit pas actif.<br>Si cela vous para&icirc;t anormal, veuillez...</b></p><a href="mailto:prestataires@lacentrale.taxi" class="ui-btn ui-btn-c ui-corner-all ui-shadow ui-icon-navigation ui-btn-icon-left">Nous contacter</a>';
			$("#returns").empty().append(display);
			setTimeout(function(){
				$( "#answer" ).popup( "open", { positionTo: "window" } );
			}, 1000);
			$("#modCbCollaps").collapsible( "expand" );			
		}
	});
}

// Urgence call => Danger zone
function showError(error)
{
	var x=document.getElementById("results");
	switch(error.code) 
	{
		case error.PERMISSION_DENIED:
		  x.innerHTML="Vous avez refus&eacute; l&rsquo;acc&egrave;s &agrave; la G&eacute;olocalisation."
		  break;
		case error.POSITION_UNAVAILABLE:
		  x.innerHTML="G&eacute;olocalisation indisponible, veuillez regarder dans l&rsquo;aide ou activer le service dans les reglages de votre appareil."
		  break;
		case error.TIMEOUT:
		  x.innerHTML="La demande de G&eacute;olocalisation a expir&eacute;(user location request timed out)."
		  break;
		case error.UNKNOWN_ERROR:
		  x.innerHTML="Erreur inconnue de G&eacute;olocalisation (unknown error occurred)."
		  break;
	}
}			  
function getLocationOnce()
{
	if (navigator.geolocation)
	{
		$.mobile.loading( "show" );
		navigator.geolocation.getCurrentPosition(secureCall, showError,{enableHighAccuracy:true, maximumAge:0});
		//var watchId = navigator.geolocation.watchPosition(get_coords, showError);
		//navigator.geolocation.getAccurateCurrentPosition(get_coords, showError, {maxWait:30000});
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
	var idcourseUrg = myDate.getTime();
	$.sessionStorage.setItem('idcourseUrg', idcourseUrg);
	
	$.post("https://www.lacentrale.taxi/appclient/secure_xml.php", { lat: lat, lng: lng, dep: dep, pass: 'true'}, function(xml){
																							 
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
			
			$.post("https://www.lacentrale.taxi/appclient/secure.php", { taxi: name, tel: address, rdvpoint: rdvpoint, helptaxi: taxi, helpname: helpname, helptel: tel, idcourse: idcourseUrg, num_req: num_reqUrg, dep: dep, pass: 'true'}, function(data){
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
	var idcourseUrg = $.sessionStorage.getItem('idcourseUrg');
	sec = setInterval( function () {
		$.post("https://www.lacentrale.taxi/appclient/status.php?idcourse=" + idcourseUrg + "&check=1" , { dep: dep}, function(data){ 
			if (data != 0)
			{
				//cancel(idcourse);
				//$('#dblinks').append($('<input id="stop" type="hidden" value="1" />'));
				//var box = navigator.notification.alert(data);
				$('#urgencyResults').empty().append(data);
			}
		});
	}, 6000);
	return false;
}
function stopSecureCall()
{
	var idcourseUrg = $.sessionStorage.getItem('idcourseUrg');
	$.post("https://www.lacentrale.taxi/appclient/secure.php", { taxi: '', tel: '', rdvpoint: '', helptaxi: taxi, helpname: '', helptel: tel, idcourse: idcourseUrg, dep: dep, pass: 'true', stopcall: 'true'}, function(data){
		$.mobile.pageContainer.pagecontainer("change", "#portal", { transition: "slide"} );
	});
	//$.sessionStorage.setItem('idcourseUrg', false);
	clearInterval(sec);
}
function footer()
{
	$.post("https://www.lacentrale.taxi/appclient/footer_app.php", { dep: dep }, function(data) {
		$("#footer_cont").empty().append(data);
	});
}
function alertDismissed()
{
	// Do Nothing...
}
function modPay() {
	var cardNumber = $('#cbnum2').val();
	var exp = $('#cbexpa2').val()+'-'+$('#cbexpm2').val();
	var cardNetwork = $('#brand2').val();
	var cvv = $('#cbval2').val();
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
		$("#returns").empty().append(display);
		$( "#answer" ).popup( "open", { positionTo: "window" } );
	}).always(function () {
		$.mobile.loading( "hide" );
		$('#modPay').prop('disabled', false).removeClass('ui-disabled');
	});
}

// Checks App or Browser
app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1 && document.URL.indexOf("localhost") != 7;
if ( app ) {
	// Attendre que PhoneGap soit prêt	    //
	document.addEventListener("deviceready", onDeviceReady, false);

	// PhoneGap est prêt
	function onDeviceReady() {
		if((navigator.network.connection.type == Connection.NONE) || !window.jQuery){
			$("body").empty().append('<img src="no_network.png" width="'+screen.width+'" height="'+screen.height+'" onClick="window.location.reload()" />');
		}
		StatusBar.overlaysWebView(false);
		StatusBar.backgroundColorByHexString("#0069B4");
		openPdf = cordova.plugins.disusered.open;
		cameraOptions = {
				quality: 60,
				destinationType: navigator.camera.DestinationType.FILE_URI,
				sourceType: navigator.camera.PictureSourceType.CAMERA
		}
	}
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
var renameUpload = '';
function getImage(rename, btn) {
	tel = $.localStorage.getItem('tel');
	mngid = $.localStorage.getItem('mngid');
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
function bankInfo()
{
	//window.plugins.childBrowser.showWebPage('https://goo.gl/CbeKmR', { showLocationBar: true });
	window.open('https://goo.gl/CbeKmR','_blank','location=false,enableViewportScale=yes,closebuttoncaption=Fermer');
}
function openSomeUrl(url)
{
	//window.plugins.childBrowser.showWebPage('http://www.lacentrale.taxi/redir.php', { showLocationBar: true });
	window.open(url,'_blank','location=false,enableViewportScale=yes,closebuttoncaption=Fermer');
}
function resetApp()
{
	$.mobile.loading( "show" );
	$.localStorage.clear();
	$.sessionStorage.clear();
	setTimeout(function(){
		document.location.href="index.html";
	}, 1000);
}

$(document).on( 'pagecreate', function() {

	active();
	footer();

	// First thing we hide unnecessary forms
	var step = $.localStorage.getItem('regStep');
	var valtel = $.localStorage.getItem('tel');
	var valdep = $.localStorage.getItem('dep');
	if (step == '1') {
		$('#RegNameStep').fadeOut();
		$('#RegCabStep').fadeIn();
		$('#RegCbStep').fadeOut();
		$('#telcab').val(valtel);
		$('#telcb').val(valtel);
		$('#depcab').val(valdep);
		$('#depcb').val(valdep);
	}
	else if (step == '2') {
		$('#RegNameStep').fadeOut();
		$('#RegCabStep').fadeOut();
		$('#RegCbStep').fadeIn();
		$('#telcb').val(valtel);
		$('#depcb').val(valdep);
	}
	else if (step == 'DONE') {
		$('#RegNameStep').fadeOut();
		$('#RegCabStep').fadeOut();
		$('#RegCbStep').fadeOut();
		$('#done').show();
		//$('#done').append('<p><b>Vous &ecirc;tes d&eacute;j&agrave; enregistr&eacute;, vous pouvez vous connecter ci-dessous avec vos identifiants.<br><ul>Sinon veuillez nous communiquer les justificatifs suivant : <li> Extrait Kbis de moins de 3 mois</li><li> Carte Nationale d&rsquo;Identit&eacute; (recto-verso)</li><li> Carte Pro Taxi (recto-verso).</li><li> Permis de conduire (recto-verso)</li><li> Certificat d&rsquo;aptitude &agrave; la conduite d&eacute;livr&eacute; par la Pr&eacute;fecture</li><li> Attestation d&rsquo;inscription au registre des transports avec chauffeur</li><li> Photo du macaron Taxi accol&eacute; sur le pare-brise de votre v&eacute;hicule</li><li> Photo du v&eacute;hicule</li><li> Carte grise du v&eacute;hicule (recto-verso)</li><li> Attestation d&rsquo;assurance du v&eacute;hicule</li><li> Attestation RCP : Responsabilit&eacute; Civile Professionnelle pour le transport de personnes à titre on&eacute;reux.</li></ul></b></p><a href="#" onClick="openSomeUrl(\'https://goo.gl/ZxTY8D\')" class="ui-btn ui-btn-icon-left ui-icon-plus ui-shadow-icon ui-corner-all">D&eacute;posez vos justificatifs</a>');
	}
	else {
		//$('#RegNameStep').fadeIn();
		$('#RegCabStep').fadeOut();
		$('#RegCbStep').fadeOut();
	}
	//$("#cb").val(1).flipswitch( "refresh" );
	if($('#areaCode').val().length==5) {
		$.post("https://www.lacentrale.taxi/appserver/open_get_insee.php", { zip: $('#areaCode').val(), pass: true }, function(data){
			$("#cityBox").empty().append(data).trigger('create');
			//$("#cityBox").trigger('create');
			//$('#insee').val(insee).selectmenu( "refresh" );
		});
	}
	$('#areaCode').change(function () {
		if($(this).val().length==5) {
			$.post("https://www.lacentrale.taxi/appserver/open_get_insee.php", { zip: $(this).val(), pass: true }, function(data){
				$("#cityBox").empty().append(data).trigger('create');
				//$("#cityBox").trigger('create');
				//$('#insee').val(insee).selectmenu( "refresh" );
			});
		}
	});
	$("#login").submit(function(event) {
		// stop form from submitting normally 
		event.preventDefault();
		// Subs some data 
		$.post("https://www.lacentrale.taxi/appclient/login_app.php", $("#login").serialize(), function(data) {
			// GET SHIT BACK !!
			$.localStorage.setItem('civil', data.civil);
			$.localStorage.setItem('nom', data.nom);
			$.localStorage.setItem('prenom', data.prenom);
			$.localStorage.setItem('taxi', data.taxi);
			$.localStorage.setItem('cpro', data.cpro);
			$.localStorage.setItem('tel', data.tel);
			$.localStorage.setItem('siret', data.siret);
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
			$.localStorage.setItem('station', data.station);
			$.localStorage.setItem('city', data.city);
			$.localStorage.setItem('insee', data.insee);
			$.localStorage.setItem('email', data.email);
			$.localStorage.setItem('dep', data.dep);
			$.localStorage.setItem('group', data.group);
			$.localStorage.setItem('pwd', data.pwd);
			$.localStorage.setItem('mngid', data.mngid);
			$.localStorage.setItem('pass', data.pass);
			$.localStorage.setItem('accessHash', data.accessHash);
			$.sessionStorage.setItem('badid', data.badid);
			$.sessionStorage.setItem('banned', data.banned);
			//navigator.notification.alert(data.nom + ' - ' + data.prenom + ' - ' + data.taxi);
			//var display = $.localStorage.getItem('nom') + ' - ' + $.localStorage.getItem('prenom') + ' - ' + $.localStorage.getItem('taxi');
			if(data.pass)
			{ // IDENTIFIED SO GETS IN...
				$.mobile.loading( "show" );
				window.location='home.html';
				//document.location.href='home.html';
			}
			else {
				var display = '';
				if (data.badid)
				{
					display = 'Les identifiant et mot de passe fournis ne sont pas corrects.<p style="color:red;"><b>ATTENTION ! Vous devez respecter le type des lettres qui composent votre mot de passe (majuscules ou minuscules).</b></p>';
				}
				if (data.banned)
				{
					display = data.civil + ' ' + data.nom + ' ' + data.prenom + ' Votre compte &agrave;  soit &eacute;t&eacute; d&eacute;sactiv&eacute;, soit jamais activ&eacute;.<p style="color:red;"><b>Si nla situation perdure, vous pouvez nous contacter afin d&rsquo;activer ou de r&eacute;activer votre compte.</b></p>';
				}
				$("#returns").empty().append(display);
				$( "#answer" ).popup( "open", { positionTo: "window" } );
			}
		}, "json");
	});
		
	$("#loginCb").submit(function(event) {
		// stop form from submitting normally 
		event.preventDefault();
		// Subs some data 
		$.post("https://www.lacentrale.taxi/appclient/login_app.php", $("#loginCb").serialize(), function(data) {
			// GET SHIT BACK !!
			$.localStorage.setItem('civil', data.civil);
			$.localStorage.setItem('nom', data.nom);
			$.localStorage.setItem('prenom', data.prenom);
			$.localStorage.setItem('taxi', data.taxi);
			$.localStorage.setItem('cpro', data.cpro);
			$.localStorage.setItem('tel', data.tel);
			$.localStorage.setItem('siret', data.siret);
			$.localStorage.setItem('station', data.station);
			$.localStorage.setItem('email', data.email);
			$.localStorage.setItem('dep', data.dep);
			$.localStorage.setItem('group', data.group);
			$.localStorage.setItem('pwd', data.pwd);
			$.localStorage.setItem('mngid', data.mngid);
			$.localStorage.setItem('pass', data.pass);
			$.localStorage.setItem('accessHash', data.accessHash);
			$.sessionStorage.setItem('badid', data.badid);
			// ModCardVars...
			civil = data.civil;
			nom = data.nom;
			prenom = data.prenom;
			tel = data.tel;
			email = data.email;
			siret = data.siret;
			station = data.station;
			var display = '';
			if (data.badid)
			{
				display = 'Les identifiant et mot de passe fournis ne sont pas corrects.<p style="color:red;"><b>ATTENTION ! Vous devez respecter le type des lettres qui composent votre mot de passe (majuscules ou minuscules).</b></p>';
				$("#returns").empty().append(display);
				$( "#answer" ).popup( "open", { positionTo: "window" } );
			}
			else {
				$('#modCbLogin').hide();
				$('#modCbShow').show();
			}
		}, "json");
	});
		
});
function finishUpload() {
	$("#log_collaps").collapsible( "expand" );
	$('#finishUpload').attr('disable', true);
	$.mobile.loading( "show" );
	// Subs some data
	$.post("https://www.lacentrale.taxi/appclient/register_app_final.php", {tel: $.localStorage.getItem('tel')}, function(data) {
		if (data.ok=="ok")
		{
			if(app) navigator.notification.alert("Votre demande d'inscription au service lacentrale.taxi a bien été prise en compte. L'instruction de votre dossier est normalement très rapide. Vous recevrez prochainement vos identifiants de connexion par mail. Dans cette attente, l'équipe lacentrale.taxi vous souhaite une excellente journée.", alertDismissed, 'LaCentrale.Taxi', 'OK');
			else alert("Votre demande d'inscription au service lacentrale.taxi a bien été prise en compte. L'instruction de votre dossier est normalement très rapide. Vous recevrez prochainement vos identifiants de connexion par mail. Dans cette attente, l'équipe lacentrale.taxi vous souhaite une excellente journée.");
		}
		else {
			if(app) navigator.notification.alert("Erreur inconnue.", alertDismissed, 'LaCentrale.Taxi', 'OK');
			else alert("Erreur inconnue.");
		}
	}, "json").always(function () {
		// reenable the inputs
		$('#finishUpload').attr('disable', false);
		$.mobile.loading( "hide" );
	}).fail(function (jqXHR, textStatus, errorThrown) {
		if (app) navigator.notification.alert('Erreur inconnue, le serveur ou la connexion internet sont indisponibles. ' + textStatus+', '+ errorThrown, alertDismissed, 'LaCentrale.Taxi Erreur', 'OK');
		else alert('Erreur inconnue, le serveur ou la connexion internet sont indisponibles. ' + textStatus+', '+ errorThrown, alertDismissed);
	});
}
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

	$.validator.addMethod('cbnum', function (value) {
		return /^[0-9]{16}$/.test(value);
	}, 'Le N&deg; CB doit corresondre &agrave; 16 chiffres sans espace.');
	
	$.validator.addMethod('cp', function (value) {
		return /^[0-9]{5}$/.test(value);
	}, 'Le Code Postal fait 5 chiffres sans espace.');

	$("#RegNameStep").validate({
		rules: {
		 civil: "required",
		 nom: "required",
		 prenom: "required",
		 insee: "required",
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
		 }
		 ,
		 confirmail: {
		   required: true,
		   email: true,
		   equalTo: '#email'
		 }
		},
		messages: {
		 civil: "La soci&eacute;t&eacute; est obligatoire",
		 nom: "Le Nom est obligatoire",
		 prenom: "Le Pr&eacute;nom est obligatoire",
		 insee: "La ville est obligatoire",
		 tel: {
		   required: "Le T&eacute;l&eacute;phone est obligatoire"
		 },
		 station: {
		   required: "Le Code Postal de la commune de stationnement est obligatoire"
		 },
		 email: {
		   required: "Nous avons besoin de votre email afin de vous contacter",
		   email: "Votre email doit &ecirc;tre au format nom@domaine.com"
		 }
		 ,
		 confirmail: {
		   required: "L&rsquo;email ci dessus n&rsquo;a pas &eacute;t&eacute; confirm&eacute;",
		   email: "Votre email doit &ecirc;tre au format nom@domaine.com",
		   equalTo: "Cette adresse n&rsquo;est pas identique &agrave; la pr&eacute;c&eacute;dante."
		 }
		}
		// Put errors below fields
		,
		errorPlacement: function(error, element) {
			error.appendTo( element.parent().next('em') );
			error.appendTo( element.parent().parent().next('em') ); // selectBoxes
		}
		// Show errors sum up on top of form
		,
		invalidHandler: function(event, validator) {
			// 'this' refers to the form
			var errors = validator.numberOfInvalids();
			if (errors) {
				var message = errors == 1
				? 'Erreur: Un champs obligatoire est incorrect. Un message plus pr&eacute;cis figure sous celui-ci.'
				: 'Erreur: ' + errors + ' champs obligatoires sont incorrects. Un message plus pr&eacute;cis figure sous ceux-ci.';
				$("div.error span").html(message);
				$("div.error").show();
			} else {
				$("div.error").hide();
			}
		}		
		// Form submission if every thing is ok
		,
		submitHandler: function (form) {
			$('input[type=submit]#subNameStep').button('disable');
			$.mobile.loading( "show" );
			// Subs some data
			let query = $("#RegNameStep").serialize();
			let getCity = $( "#insee option:selected" ).text();
			query = query + "&city=" + getCity;
			$.post("https://www.lacentrale.taxi/appclient/register_app_name.php", query, function(data) {
				// GET SHIT BACK !!
				$.localStorage.setItem('civil', data.civil);
				$.localStorage.setItem('nom', data.nom);
				$.localStorage.setItem('prenom', data.prenom);
				$.localStorage.setItem('tel', data.tel);
				$.localStorage.setItem('station', data.station);
				$.localStorage.setItem('city', data.city);
				$.localStorage.setItem('insee', data.insee);
				$.localStorage.setItem('dep', data.dep);
				$.localStorage.setItem('email', data.email);
				$.localStorage.setItem('group', data.group);
				$.localStorage.setItem('pwd', data.pwd);
				$.sessionStorage.setItem('telexist', data.telexist);
				//navigator.notification.alert(data.taxi + ' - ' + data.siret + ' - ' + data.email + ' - ' + data.tel + ' - ' + data.subscribed + ' - ' + data.telexist + ' - ' + data.cabexist + ' - ' + data.sirexist);
			}, "json").done(function(data) {
				var display = '';
				if (data.subscribed)
				{
					$.localStorage.setItem('regStep', '1');
					$.mobile.silentScroll(0);
					$('#telcab').val(data.tel);
					$('#telcb').val(data.tel);
					$('#depcab').val(data.dep);
					$('#depcb').val(data.dep);
					$('#RegNameStep').fadeOut();
					$('#RegCabStep').fadeIn();
					display = '<p style="color:green;"><b>Merci, vous &ecirc;tes pr&ecirc;t &agrave; passer &agrave; l&rsquo;&eacute;tape suivante.</b></p>';
					$("div.error span").empty(); // If Step is OK we empty error handler to prevent previous errors to show during next steps.
				}
				else {
					display = '<p style="color:red;"><b>Vous n&rsquo;avez pas correctement rempli le formulaire d&rsquo;inscription. Nous vous prions de modifier les informations suivantes, si vous d&eacute;sirez  acc&egrave;der &agrave; ce service, d&eacute;sol&eacute;.</b></p>';
					if (data.telexist)
					{
						display += '<p style="color:red;"><b>Le num&eacute;ro de t&eacute;l&eacute;phone fourni est d&eacute;j&agrave; associ&eacute; &agrave; un compte.</b></p>';
					}
				}
				$("#returns").empty().append(display);
				$( "#answer" ).popup( "open", { positionTo: "window" } );
			}).always(function () {
				// reenable the inputs
				$('input[type=submit]#subNameStep').button('enable');
				$.mobile.loading( "hide" );
			}).fail(function (jqXHR, textStatus, errorThrown) {
				if (app) navigator.notification.alert('Erreur inconnue, le serveur ou la connexion internet sont indisponibles. ' + textStatus+', '+ errorThrown, alertDismissed, 'LaCentrale.Taxi Erreur', 'OK');
				else alert('Erreur inconnue, le serveur ou la connexion internet sont indisponibles. ' + textStatus+', '+ errorThrown, alertDismissed);
			});
		} // submitHandler Ends
	});
	$("#RegCabStep").validate({
		rules: {
		 taxi: "required",
		 cpro: "required"
		},
		messages: {
		 taxi: "Le N&deg; de taxi / ADS est obligatoire",
		 cpro: "Le N&deg; de Carte Professionelle est obligatoire"
		}
		// Put errors below fields
		,
		errorPlacement: function(error, element) {
			error.appendTo( element.parent().next('em') );
			error.appendTo( element.parent().parent().next('em') ); // selectBoxes
		}
		// Show errors sum up on top of form
		,
		invalidHandler: function(event, validator) {
			// 'this' refers to the form
			var errors = validator.numberOfInvalids();
			if (errors) {
				var message = errors == 1
				? 'Erreur: Un champs obligatoire est incorrect. Un message plus pr&eacute;cis figure sous celui-ci.'
				: 'Erreur: ' + errors + ' champs obligatoires sont incorrects. Un message plus pr&eacute;cis figure sous ceux-ci.';
				$("div.error span").html(message);
				$("div.error").show();
			} else {
				$("div.error").hide();
			}
		}		
		// Form submission if every thing is ok
		,
		submitHandler: function (form) {
			$('input[type=submit]#subCabStep').button('disable');
			$.mobile.loading( "show" );
			// Subs some data
			$.post("https://www.lacentrale.taxi/appclient/register_app_cab.php", $("#RegCabStep").serialize(), function(data) {
				// GET SHIT BACK !!
				$.localStorage.setItem('taxi', data.taxi);
				$.localStorage.setItem('cpro', data.cpro);
				//$.localStorage.setItem('tel', data.tel);
				//$.localStorage.setItem('dep', data.dep);
				$.sessionStorage.setItem('subscribed', data.subscribed);
			}, "json").done(function(data) {
				var display = '';
				if (data.subscribed)
				{
					$.localStorage.setItem('regStep', '2');
					$.mobile.silentScroll(0);
					//$('#telcb').val(data.tel);
					//$('#depcb').val(data.dep);
					$('#RegCabStep').fadeOut();
					$('#RegCbStep').fadeIn();
					display = '<p style="color:green;"><b>Merci, vous &ecirc;tes pr&ecirc;t &agrave; passer &agrave; l&rsquo;&eacute;tape finale.</b></p>';
					$("div.error span").empty(); // If Step is OK we empty error handler to prevent previous errors to show during next steps.
				}
				else {
					display = '<p style="color:red;"><b>Il y a un probl&egrave;me technique, d&eacute;sol&eacute;.</b></p>';
				}
				$("#returns").empty().append(display);
				$( "#answer" ).popup( "open", { positionTo: "window" } );
			}).always(function () {
				// reenable the inputs
				$('input[type=submit]#subCabStep').button('enable');
				$.mobile.loading( "hide" );
			}).fail(function (jqXHR, textStatus, errorThrown) {
				if (app) navigator.notification.alert('Erreur inconnue, le serveur ou la connexion internet sont indisponibles. ' + textStatus+', '+ errorThrown, alertDismissed, 'LaCentrale.Taxi Erreur', 'OK');
				else alert('Erreur inconnue, le serveur ou la connexion internet sont indisponibles. ' + textStatus+', '+ errorThrown, alertDismissed);
			});
		} // submitHandler Ends
	});
	$("#RegCbStep").validate({
		rules: {
		 siret: {
		   required: true,
		   siret: true
		 },
		 imat: "required",
		 constructor: "required",
		 model: "required",
		 cgv: "required"
		},
		messages: {
		 siret: {
		   required: "Le num&eacute;ro SIRET est obligatoire"
		 },
		 imat: "Ce champs est obligatoire",
		 constructor: "Ce champs est obligatoire",
		 model: "Ce champs est obligatoire",
		 cgv: "Vous devez acceper les CGUV"
		}
		// Put errors below fields
		,
		errorPlacement: function(error, element) {
			error.appendTo( element.parent().next('em') );
			error.appendTo( element.parent().parent().next('em') ); // selectBoxes
		}
		// Show errors sum up on top of form
		,
		invalidHandler: function(event, validator) {
			// 'this' refers to the form
			var errors = validator.numberOfInvalids();
			if (errors) {
				var message = errors == 1
				? 'Erreur: Un champs obligatoire est incorrect. Un message plus pr&eacute;cis figure sous celui-ci.'
				: 'Erreur: ' + errors + ' champs obligatoires sont incorrects. Un message plus pr&eacute;cis figure sous ceux-ci.';
				$("div.error span").html(message);
				$("div.error").show();
			} else {
				$("div.error").hide();
			}
		}		
		// Form submission if every thing is ok
		,
		submitHandler: function (form) {
			$('input[type=submit]#subCbStep').button('disable');
			$.mobile.loading( "show" );
			// Subs some data
			$.post("https://www.lacentrale.taxi/appclient/register_app_cb.php", $("#RegCbStep").serialize(), function(data) {
				// GET SHIT BACK !!
				$.localStorage.setItem('mngid', data.mngid);
				$.localStorage.setItem('civil', data.civil);
				$.localStorage.setItem('nom', data.nom);
				$.localStorage.setItem('prenom', data.prenom);
				$.localStorage.setItem('taxi', data.taxi);
				$.localStorage.setItem('cpro', data.cpro);
				$.localStorage.setItem('tel', data.tel);
				$.localStorage.setItem('siret', data.siret);
				$.localStorage.setItem('imat', data.imat);
				$.localStorage.setItem('constructor', data.constructor);
				$.localStorage.setItem('model', data.model);
				$.localStorage.setItem('amex', data.amex);
				$.localStorage.setItem('station', data.station);
				$.localStorage.setItem('city', data.city);
				$.localStorage.setItem('insee', data.insee);
				$.localStorage.setItem('email', data.email);
				$.localStorage.setItem('group', data.group);
				$.localStorage.setItem('pwd', data.pwd);
				$.localStorage.setItem('dep', data.dep);
				$.sessionStorage.setItem('subscribed', data.subscribed);
				$.sessionStorage.setItem('telexist', data.telexist);
				$.sessionStorage.setItem('cabexist', data.cabexist);
				$.sessionStorage.setItem('sirexist', data.sirexist);
				//navigator.notification.alert(data.taxi + ' - ' + data.siret + ' - ' + data.email + ' - ' + data.tel + ' - ' + data.subscribed + ' - ' + data.telexist + ' - ' + data.cabexist + ' - ' + data.sirexist);
			}, "json").done(function(data) {
				var display = '';
				if (data.subscribed && data.payzen)
				{
					$.localStorage.setItem('regStep', 'DONE');
					$.mobile.silentScroll(0);
					$('#RegCbStep').fadeOut();
					$('#done').show();
					/*
					display = '<p><b>' + data.civil + ' ' + data.nom + ' ' + data.prenom + ', vous avez bien cr&eacute;&eacute; votre compte et vous serez averti de son activation par un futur message.<br><span style="color:#09F;">Afin de finaliser votre inscription, vous recevrez dans quelques instants un message explicatif &agrave; cet adresse : ' + data.email + '</span>, merci.<br></b></p>';
					$("#returns").empty().append(display);
					$( "#answer" ).popup( "open", { positionTo: "window" } );
					*/
					//$('#reg_collaps').collapsible( "collapse" );
					//$('#log_collaps').collapsible( "expand" );
					//openSomeUrl('https://goo.gl/ZxTY8D');
					/*
					display = '<p><b>' + data.civil + ' ' + data.nom + ' ' + data.prenom + ' Voici les informations d&rsquo;identification qui vous permettront d&rsquo;acc&egrave;der &agrave; votre compte :<br><span style="color:#09F;">Identifiant = ' + data.tel + '<br>Mot de passe = ' + data.pwd + '</span><br>Vous les recevrez dans quelques instants &agrave; cet email : <span style="color:#09F;">' + data.email + '</span>, merci.<br></b></p>';
					// Automatically logs registered user in...
					var log = data.tel;
					var pwd = data.pwd;
					var dep = data.dep;
					$.post("https://www.lacentrale.taxi/appclient/login_app.php", { log: log, pass: pwd, dep: dep}, function(data) {
						// GET SHIT BACK !!
						$.localStorage.setItem('civil', data.civil);
						$.localStorage.setItem('nom', data.nom);
						$.localStorage.setItem('prenom', data.prenom);
						$.localStorage.setItem('taxi', data.taxi);
						$.localStorage.setItem('cpro', data.cpro);
						$.localStorage.setItem('tel', data.tel);
						$.localStorage.setItem('siret', data.siret);
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
						$.localStorage.setItem('station', data.station);
						$.localStorage.setItem('email', data.email);
						$.localStorage.setItem('dep', data.dep);
						$.localStorage.setItem('group', data.group);
						$.localStorage.setItem('pwd', data.pwd);
						$.localStorage.setItem('mngid', data.mngid);
						$.localStorage.setItem('pass', data.pass);
						if(data.pass)
						{ // IDENTIFIED SO GETS IN...
							setTimeout(function(){
								window.location='home.html';
							},2000);
							//document.location.href='home.html';
						}
					}, "json");
					*/
				}
				else {
					//display = '<p style="color:red;"><b>Vous n&rsquo;avez pas correctement rempli le formulaire d&rsquo;inscription. Nous vous prions de modifier les informations suivantes, si vous d&eacute;sirez  acc&egrave;der &agrave; ce service, d&eacute;sol&eacute;.</b></p>';
					display = '<p style="color:red;"><b>Probl&egrave;me rencontr&eacute;, soit vous n&rsquo;avez pas correctement rempli le formulaire d&rsquo;inscription, soit il y a un souci technique. Nous vous prions de prendre connaissance des informations suivantes:</b></p>';
					if (data.telexist)
					{
						display += '<p style="color:red;"><b>Le num&eacute;ro de t&eacute;l&eacute;phone fourni n&rsquo;est associ&eacute; &agrave; aucun compte, Veuillez R&eacute;initialiser SVP.</b></p>';
						display += '<button onClick="resetApp()" class="ui-btn ui-btn-icon-left ui-icon-alert ui-shadow-icon ui-corner-all">R&eacute;initialiser</button>';
						$("#returns").empty().append(display);
						$( "#answer" ).popup( "open", { positionTo: "window" } );
					}
					else if (data.sniffed == 'KO')
					{
						display += '<p style="color:red;"><b>Il y a un probl&egrave;me avec l&rsquo;enregistrement de la carte bancaire, il faut une carte VALIDE de type CB, VISA ou MASTERCARD.<br>'+data.showError+'</b></p>';
						$("#returns").empty().append(display);
						$( "#answer" ).popup( "open", { positionTo: "window" } );
					}
					/*
					else if (!data.signed)
					{
						display += '<p style="color:red;"><b>'+data.showError+'<br>Si cette erreur se r&eacute;p&egrave;te et que les informations transmises sont justes, veuillez R&eacute;initialiser SVP.</b></p>';
						display += '<button onClick="resetApp()" class="ui-btn ui-btn-icon-left ui-icon-alert ui-shadow-icon ui-corner-all">R&eacute;initialiser</button>';
						$("#returns").empty().append(display);
						$( "#answer" ).popup( "open", { positionTo: "window" } );
					}
					*/
					else {
						display += '<p style="color:red;"><b>'+data.showError+'<br>Si cette erreur se r&eacute;p&egrave;te veuillez R&eacute;initialiser SVP.</b></p>';
						display += '<button onClick="resetApp()" class="ui-btn ui-btn-icon-left ui-icon-alert ui-shadow-icon ui-corner-all">R&eacute;initialiser</button>';
						$("#returns").empty().append(display);
						$( "#answer" ).popup( "open", { positionTo: "window" } );
					}
				}
			}).always(function () {
				// reenable the inputs
				$('input[type=submit]#subCbStep').button('enable');
				$.mobile.loading( "hide" );
			}).fail(function (jqXHR, textStatus, errorThrown) {
				if (app) navigator.notification.alert('Erreur inconnue, le serveur ou la connexion internet sont indisponibles. ' + textStatus+', '+ errorThrown, alertDismissed, 'LaCentrale.Taxi Erreur', 'OK');
				else alert('Erreur inconnue, le serveur ou la connexion internet sont indisponibles. ' + textStatus+', '+ errorThrown, alertDismissed);
			});
		} // submitHandler Ends
	});
	$("#forget").validate({
		rules: {
		 login: {
		   required: true,
		   phone: true
		 },
		 //dep: "required",
		 mail: {
		   required: true,
		   email: true
		 }
		},
		messages: {
		 login:  {
		   required: "l&rsquo;identifiant est obligatoire.",
		   email: "l&rsquo;identifiant est un num&eacute;ro de t&eacute;l&eacute;phone sans espace."
		 },
		 //dep: "Le d&eacute;partement est obligatoire",
		 mail: {
		   required: "Nous avons besoin de votre email afin de vous contacter",
		   email: "Votre email doit &ecirc;tre au format nom@domaine.com"
		 }
		}
		// Form submission if every thing is ok
		,
		submitHandler: function (form) {
			$.post("https://www.lacentrale.taxi/appclient/forget_app.php", $("#forget").serialize(), function(data) {
				//navigator.notification.alert($("#change").serialize());
				// GET SHIT BACK !!
				var display = '';
				if (data.sent)
				{
					display = '<p><b>Voici les informations d&rsquo;identification qui vous permettront d&rsquo;acc&egrave;der &agrave; votre compte :<br><span style="color:#09F;">Identifiant = ' + data.tel + '<br>Mot de passe = ' + data.pwd + '</span><br>Vous les recevrez dans quelques instants &agrave; cet email : <span style="color:#09F;">' + data.email + '</span>, merci.<br></b></p>';
				}
				else {
					display = '<p style="color:red;"><b>Nous ne pouvons divulguer vos informations personnelles car l&rsquo;identifiant ou l&rsquo;adresse mail fourni ne figure pas dans notre base de donn&eacute;e.</b></p>' + data.tel + ' - ' + data.email;
				}
				$("#returns").empty().append(display);
				$( "#answer" ).popup( "open", { positionTo: "window" } );
			}, "json").fail(function (jqXHR, textStatus, errorThrown) {
				if (app) navigator.notification.alert('Erreur inconnue, le serveur ou la connexion internet sont indisponibles. ' + textStatus+', '+ errorThrown, alertDismissed, 'LaCentrale.Taxi Erreur', 'OK');
				else alert('Erreur inconnue, le serveur ou la connexion internet sont indisponibles. ' + textStatus+', '+ errorThrown, alertDismissed);
			});
		} // submitHandler Ends
		/* Put errors below fields
		,
		errorPlacement: function(error, element) {
			error.appendTo( element.parent().next('em') );
		}
		*/
	});
	/*
	$('input[name="tel"]').rules("add", { required: true, regex: "^(01|02|03|04|05|06|07|08|09)[0-9]{8}$", messages: { regex: "le N&deg; de t&eacute;l&eacute;phone doit corresondre &agrave; 10 chiffres sans espace", required: "Ce champs est obligatoire" } })
	$('input[name="siret"]').rules("add", { required: true, regex: "^[0-9]{14}$", messages: { regex: "Le N&deg; SIRET doit corresondre &agrave; 14 chiffres sans espace", required: "Ce champs est obligatoire" } })
	*/
});

