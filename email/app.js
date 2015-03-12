var express = require('express')
  , discover = require('./tools/discover')
  , http = require('http')
  , path = require('path')
  , logger = require('morgan')
  , bodyParser = require('body-parser')
  , debug = require('debug')
  , methodOverride = require('method-override')
  , log = debug('app:log')
  , error = debug('app:error')
  , app = express()
  , getReportingInfo = require('./tools/reporting')
  , report = require('./tools').report

discover.init.then(function(){
  app
  .set('port', process.env.PORT || 3000)
  .use(logger('dev'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(methodOverride('_method'))
  .use(getReportingInfo(report))
  .use('/api/v1/',require('./api/v1'))


  app.get('/', function(req, res){
    res.send('hello world')
  })

  console.log(discover.config)

  app.listen(app.get('port'),function(){
    console.log("Express server listening on port " + app.get('port'))
  })

},function(e){
  console.error(e)
})
