var sms = module.exports;

var part1 = "Hi, please remember to complete your daily meditation and fill up the daily questionnaire. The link is sent to your email. Your participant number is ";
var part2 = ".";
// var part3 = " of meditation"

sms.send = function sms_send(req, res) {
	res.json(200, {});
	req.models.sms.find({ }, function (err, smss) {
		smss.forEach(function (sms, i) {
			var accountSid = 'AC5c1eb49f29087d8b125fcd4d57e7d162';
			var authToken = "42c9e857eb2e024f7bcd74ef64bd086f";
			var client = require('twilio')(accountSid, authToken);
  
  		  	// console.log(part1 + sms.name + part2 + sms.day + part3);
			client.sms.messages.create({
			    body: part1 + sms.name + part2,
			    to: sms.number,
			    from: "+1 720-408-2464"
			}, function(err, message) {
				console.log(message.sid);
			});
		});
	});
}

sms.plusOne = function sms_plusOne(req, res) {
	req.models.sms.find({ })
	res.send(200, {});
}
