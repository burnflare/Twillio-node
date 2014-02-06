var nodemailer = require("nodemailer");

var sms = module.exports;

var message = "This is my message to be sent"

sms.send = function sms_send(req, res) {
	res.json(200, {});
	var html = "Hey Vishnu,<br /><br />I've send an sms to the following people:<br />"
	req.models.sms.find({ }, function (err, smss) {
		smss.forEach(function (sms, i) {
			var accountSid = '';
			var authToken = "";
			var client = require('twilio')(accountSid, authToken);
  
			client.sms.messages.create({
			    body: sms.name + message,
			    to: sms.number,
			    from: "+1 720-408-2464"
			}, function(err, message) {
				console.log(message.sid);
			});
  		  	console.log(sms.name + sms.number);
			html += sms.name + " " + sms.number + "<br />";
			if (i>=smss.length-1) {
				console.log("Sending email");
				send_email(html);
			}
		});
	});
}

var transport = nodemailer.createTransport("SES", {
    AWSAccessKeyID: "AKIAICQBYX2IM4KJXFKA",
    AWSSecretKey: "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"
});


function send_email(messages, fn) {
	var payload = {
	    from: "SMS Server <noreply@vishnuprem.com>",
	    to: "vishnu@vishnuprem.com",
		cc: "vishnu@vishnuprem.com",
	    subject: "SMS Sent Receipt!",
	    html: messages + "<br /><br /><i>Vishnu's SMS sent</i>"
	}
	
	transport.sendMail(payload, function(error, response){
	    if(error){
	        console.log("email could not be sent" + error);
	    }else{
	        console.log("Email sent!");
	    }
	    transport.close(); 
	});
}
