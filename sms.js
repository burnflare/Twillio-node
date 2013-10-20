var sms = module.exports;

sms.send = function sms_send(req, res) {
	res.json(200, {});
	req.models.sms.find({ }, function (err, smss) {
		smss.forEach(function (sms, i) {
			var accountSid = 'AC5c1eb49f29087d8b125fcd4d57e7d162';
			var authToken = "42c9e857eb2e024f7bcd74ef64bd086f";
			var client = require('twilio')(accountSid, authToken);
  
  		  	console.log(sms.number);
			client.sms.messages.create({
			    body: "Dear user " + sms.name,
			    to: sms.number,
			    from: "+1 720-408-2464"
			}, function(err, message) {
				console.log(message);
			});
		});
	});
}