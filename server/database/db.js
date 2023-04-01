const mysql = require('mysql');
const config=require('../config.json')
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'master_project'
// })
const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
})

connection.connect(function(err){
  if(err) throw err;
})

module.exports=connection
