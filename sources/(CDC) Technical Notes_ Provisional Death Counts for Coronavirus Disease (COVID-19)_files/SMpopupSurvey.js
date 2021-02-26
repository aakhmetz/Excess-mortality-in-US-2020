/* Raw JS */
/* Raw JS */
/*
.Name: SMpopupSurvey.js
.SYNOPSIS
	Popup invite annual NCHS end of the year survey.

.Description:
    On script include run survey is launched after a 5 second delay.  Code should be 
	included in WCMS footer.  PresentPopup() derived from generated code from
	SurveyMonkey for this survey.
	
.PARAMETER 
    None
    
.EXAMPLE
	<script type="text/javascript"> src="/nchs/js/SMpopupSurvey.js"> </script> or
	/nchs/wcms-inc/localBodyBottom_TP4.html

.NOTES
    Author: jrd7
    Date:   190926

    Possible Future Enhancements:

    Change Log:
    Date    Name of Change       Auth   Description of Change
    190926  coded                jrd7   Version 1
	191010  refactored           jrd7   remove SM cookie delete reference only code
*/

function getCookie(name) {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
}

function createCookie (name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}


function PresentPopup() {
   (function (t, e, s, o) {
        var n, a, c;
        t.SMCX = t.SMCX ||
            [],e.getElementById(o) || 
	            (n=e.getElementsByTagName(s),
	             a=n[n.length-1],
	             c=e.createElement(s),
	             c.type="text/javascript",
	             c.async=!0,
	             c.id=o,
	             c.src="https://widget.surveymonkey.com/collect/website/js/tRaiETqnLgj758hTBazgd9U8Vj_2BTYCF5VptR3CHKNBsydn7rWmenQkaR1BwpuYOc.js",
	        a.parentNode.insertBefore(c,a))
		}
	)//end function(t,e,s,o)
    (window,document,"script","smcx-sdk");
}


/*
 * Delay 5 seconds, then launch the survey
 */
 function LaunchSurvey(DelayInMiliSeconds){
    
	var cookieActiveDuration=364 /*1 year*/ - 90; /*survey period at end of year in days*/
	
    /* uncomment when ready to display survey */
	

    if (DelayInMiliSeconds === undefined) {
		DelayInMiliSeconds=5000;
    }
	;
	if(getCookie('nchsSurveyOncePerYear') === undefined){
		createCookie('nchsSurveyOncePerYear',0,cookieActiveDuration);
	}
	else{
		var hitsInSurveyRealm = getCookie('nchsSurveyOncePerYear') 
		hitsInSurveyRealm++;
		createCookie('nchsSurveyOncePerYear', hitsInSurveyRealm, cookieActiveDuration);
		
		if(hitsInSurveyRealm==2){
			setTimeout(function() { PresentPopup(); }, DelayInMiliSeconds);
		}
	}
   /**/
 
}

LaunchSurvey(5000);


/* End Raw JS */

/* End Raw JS */
