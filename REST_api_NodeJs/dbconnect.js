const mysql = require('mysql');
const db = mysql.createConnection({

  host : 'localhost',
  user : 'root',
  password : '',
  database : 'bids_site'

});

db.connect((err) => {

  if(err){
    throw err;
  }
  else{
    console.log("mysql Connected...");
  }

});

module.exports = db;