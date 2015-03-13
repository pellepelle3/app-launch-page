var express = require('express')
  , lsq = require('lsq')
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

lsq.config.get().then(function(config){
  app
  .set('port', process.env.PORT || 3000)
  
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(methodOverride('_method'))
  .use(getReportingInfo(report))
  .use('/api/v1/',require('./api/v1'))

//.use(logger('dev'))
  app.get('/', function(req, res){
    res.send('hello world')
  })

  app.get('/health',function(req,res){
    res.send('ok')
  })

  console.log(config)

  app.listen(app.get('port'),function(){
    console.log("Express server listening on port " + app.get('port'))
  })

},function(e){
  console.error(e)
})
