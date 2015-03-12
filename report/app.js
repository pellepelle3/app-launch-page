var express = require('express')
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



app.listen(app.get('port'))
console.log("Express server listening on port " + app.get('port'))

