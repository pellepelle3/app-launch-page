var express = require('express')
  , api = express.Router()
  , request = require('request')
  , config = require('../../config.json')
  , sendgrid = require('sendgrid')
  , sg  = sendgrid(config.api.sendgrid.apiUser, config.api.sendgrid.apiKey)

api.get('/', function(req, res) {
  res.send('Hello from APIv1 root route.')
})

api.post('/subscribe/thankyou',function(req,res){
  sg.send({
    to:       req.body.email,
    from:     'i@lsq.io',
    subject:  'Thanks for subscribing (LSQ)',
    text:     'We would like to thank you for subscribing to our newsletter and participating in our live demo visit us at http://www.lsq.io'
  }, function(err, json) {
    if (err) { return console.error(err); }
    console.log(json);
    res.send("sent thank you email to "+req.body.email)
  })
})

module.exports = api