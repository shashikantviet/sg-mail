var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname));

app.get('/' ,  function(req , res){
	res.sendFile(__dirname + '/form.html');

// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setSubstitutionWrappers('{{', '}}'); // Configure the substitution tag wrappers globally
const msg = {
  to: 'shashi.yadav@trekbin.com',
  from: 'sender@example.org',
  subject: 'Hello world',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
  templateId: '97d730c3-2812-4675-9252-3eaccc377b5c',
  substitutions: {
    name: 'Some One',
    city: 'Denver',
  },
};
sgMail.send(msg);

var schedule = require('node-schedule');
 
var j = schedule.scheduleJob('*/2 * * * *', function(){
  sgMail.send(msg);
});

sgMail.send(msg , function(err,json){
 if(err){
  return console.error(err);
 }
 console.log(json);
});


});

app.listen(port);
console.log("app is running on port :8080");