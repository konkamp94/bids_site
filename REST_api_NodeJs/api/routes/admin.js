const express = require('express');
const db = require('../../dbconnect.js');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkauth_admin = require('../middleware/checkauth_admin');

	
	router.post('/login',(req,res,next)=>{
			let user_id = req.body.username;
			let password = req.body.password;
			if(user_id==="administrator"){
					new Promise((resolve,reject) => {
							db.query("SELECT password FROM users WHERE user_id = " + db.escape(user_id),(err,result,fields)=>{
								if(err){
									reject(err);
								}
								console.log(result);
								resolve(result);
							});
					})
					.then((result)=>{
							 bcrypt.compare(password,result[0].password,(err,resultpass)=>{
							 	console.log(resultpass);
						 		if(err){
						 			console.log(err);
						 			return res.status(401).json({
						 				message : 'Unauthorized'
						 				
						 			});
						 		}
						 		if(resultpass){
						 			const token = jwt.sign({
						 					admin:"admin is in"
						 				},process.env.JWT_KEY,{
						 					expiresIn :'1h'
						 				})
						 			return res.status(201).json({
						 				message : 'hello administrator',
						 				token : token
						 				
						 			});
						 		}
						 		else{
						 			return res.status(401).json({
						 				message : 'Unauthorized'
						 			});
						 		}
						 	});
					})
					.catch((error)=>{
						console.log(error);
					});
			}
			else{
				return res.status(401).json({
						 				message : 'Unauthorized'
						 			});
			}
	});

	router.post('/pending',checkauth_admin,(req,res,next)=>{
			new Promise((resolve,reject)=>{
				db.query("SELECT user_id,name,surname,email,phone,address,city,country,afm FROM users WHERE approved=0",(err,result,fields)=>{
						if(err){
							reject(err);
						}
						resolve(result);

				});
			})
			.then((result)=>{
				  res.status(200).json({
				  	 result : result
				  })
			})
			.catch((error)=>{
				console.log(error);
			});
	});

	router.post('/approved',checkauth_admin,(req,res,next)=>{
				new Promise((resolve,reject)=>{
				db.query("SELECT user_id,name,surname,email,phone,address,city,country,afm FROM users WHERE approved=1 AND user_id<>'administrator'",(err,result,fields)=>{
						if(err){
							reject(err);
						}
						resolve(result);

				});
			})
			.then((result)=>{
				  res.status(200).json({
				  	 result : result
				  })
			})
			.catch((error)=>{
				console.log(error);
			});
	});

	router.post('/approve',checkauth_admin,(req,res,next)=>{
		new Promise((resolve,reject)=>{
			db.query("UPDATE users SET approved = ? WHERE user_id=?",[1,req.body.username],(err,result,fields)=>{
					if(err){
					   reject(err);
					}
				    resolve(result);
			}); 
		})
		.then((result)=>{
			res.status(201).json({
				message :"user "+ req.body.username +" has been approved"
			});
		})
		.catch((error)=>{
			console.log(error);
		});
	});

	router.post('/delete',checkauth_admin,(req,res,next)=>{
		new Promise((resolve,reject)=>{
			db.query("DELETE FROM users WHERE user_id=?",[req.body.username],(err,result,fields)=>{
				if(err){
					reject(err);
				}
				resolve(result);
			});
		})
		.then((result)=>{
			res.status(201).json({
				message :"user "+ req.body.username +" has been deleted"
			});
		})
		.catch((error)=>{
			console.log(error);
		});
	});

module.exports = router;