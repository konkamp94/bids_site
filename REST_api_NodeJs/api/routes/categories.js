const express = require('express');
const db = require('../../dbconnect.js');
const router = express.Router();
const checkauth = require('../middleware/checkauth');


router.get('/',(req,res,next) =>{


	    new Promise((resolve,reject)=>{

	    			db.query("SELECT * FROM category",(err,result,fields) =>{
									if(err){
										reject(err);
									}
									resolve(result);

		    				});

	    })
	    .then((result)=>{
	    			res.status(200).json({
			         //message : 'Handing GET at /categories',
			         result : result
				    });
	    })
	    .catch((error)=>{
	    	console.log(error);
	    });

});



module.exports = router;