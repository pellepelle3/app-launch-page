
// var consul = require('lsq-consul')({"host":"consul-1582ed30-1.lsqio.cont.tutum.io",port:49181})
//   , Promise = require('promise')
//   , config = {}


// var watch = consul.watch(consul.kv.get, { key: 'mexican' });

// watch.on('change', function(data, res) {
//   try{
//     config = JSON.parse(data.Value)
//     console.log("data: ",config)
//   }catch(e){
//     console.error("your config is not json")
//   }
// })

// watch.on('error', function(err) {
//   console.error('error:', err)
// })

// var init = new Promise(function(resolve,reject){
//   consul.kv.get({key:"mexican"},function(err,data){
//   if(err) return reject(err)
//   try{
//     config = JSON.parse(data.Value)
//     resolve(config)
//   }catch(e){
//     console.error("your config is not json")
//     reject(e)
//   }
//   })
// })

// module.exports = {
//       init:init
//     , consul:consul
//     , config:config
// }