var nodemailer = require("nodemailer");

var sms = module.exports;

var part1 = "Hi, please remember to complete your daily meditation and fill up the daily questionnaire. The link is sent to your email. Your participant number is ";
var part2 = ".";
// var part3 = " of meditation"

sms.send = function sms_send(req, res) {
	res.json(200, {});
	var html = "Hey Vishnu & Brenda,<br /><br />I've send an sms to the following people:<br />"
	req.models.sms.find({ }, function (err, smss) {
		smss.forEach(function (sms, i) {
			var accountSid = '';
			var authToken = "";
			var client = require('twilio')(accountSid, authToken);
  
			client.sms.messages.create({
			    body: part1 + sms.name + part2,
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
	    to: "scoblue@gmail.com",
		cc: "vishnu@vishnuprem.com",
	    subject: "SMS Sent Receipt!",
	    html: messages + "<br /><br /><i>Vishnu Boyfrain</i>"
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
