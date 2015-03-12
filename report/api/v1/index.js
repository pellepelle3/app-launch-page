var express = require('express')
  , api = express.Router()
  , request = require('request')
  , config = require('../../config.json')
  , Keen    = require('keen.io')
  , keenClient  = Keen.configure(config.api.keenio.config)

api.get('/', function(req, res) {
  res.send('Hello from APIv1 root route.')
})

api.post('/add/subscriber/demo',function(req,res){
  keenClient.addEvent("newSubscriber", req.body, function(err, data) {
      if (err) console.error("Oh no, an error!",err)
      
      res.send({result:"success"})
    })
})

module.exports = api