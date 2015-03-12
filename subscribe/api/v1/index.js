var express = require('express')
  , api = express.Router()
  , request = require('request')
  , config = require('../../config.json')
  , mcapi = require('mailchimp-api')
  , mc = new mcapi.Mailchimp(config.api.mailchimp.token)


api.get('/', function(req, res) {
  res.send('Hello from APIv1 root route.')
})

api.post('/demo/subscribe',function(req,res){
  
  if(!req.body.email || !req.body.source ){
     res.status(409)  
     return res.send({result:'Please make sure your email has been entered correctly.',error:true})
  }
  mc.lists.subscribe({ id: config.api.mailchimp.lists.demo, email: { email:req.body.email }, merge_vars: { SOURCE: req.body.source, TEAMSIZE: req.body.teamsize|| ""}, double_optin:false, send_welcome:false }, 
    function(data) {
      request.post('http://localhost:3003/api/v1/subscribe/thankyou'
      ,{json:req.body}
      , function (error, response, body) {
        if(error) console.error("Can not reach email service")
      })
      request.post('http://localhost:3002/api/v1/add/subscriber/demo'
      ,{json:req.body}
      , function (error, response, body) {
        if(error) console.error("Can not reach report service")
      })
      res.send({result:"Thanks for signing up! We'll keep you up to date."})
      console.log("successfully subscribed "+req.body.email)
    },
    function(error) {
      if (error.error) {
        if (error.code == 214)    {res.send({result:"Thanks for signing up! We'll keep you up to date."}); }
        else if(error.code == -100) { res.status(409);  res.send({result:'Please make sure your email has been entered correctly.',error:true}); }
        else { res.status(409);  res.send({result:'Please make sure your email has been entered correctly.',error:true}); }        

      } else { res.status(409); res.send({result:'There was an error subscribing your email, please try again.',error:true}); }      
    });
})

module.exports = api