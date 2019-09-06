const express = require('express');
const db = require('../../dbconnect.js');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkauth = require('../middleware/checkauth');

	router.post('/signup',(req,res,next) =>{

			let user_id = req.body.username;
			let email = req.body.email;
			let promise1 = new Promise((resolve,reject) => {
					db.query("SELECT user_id FROM users WHERE user_id = " + db.escape(user_id),(err,result,fields) =>{
					if(err){
						reject(err);
					}
					console.log("input: " + user_id + "result: " + result);
					console.log(result.length);
					console.log(result);
					resolve(result);
				 });	
			})
			let promise2 = new Promise((resolve,reject) =>{
					db.query("SELECT email FROM users WHERE email = " + db.escape(email),(err,result,fields) =>{
						if(err){
							reject(err);
						}
						console.log("input: " + email + "result: " + result.email);
						console.log(result.length);
						console.log(result);
						resolve(result);
					 });
			})
			Promise.all([promise1,promise2])
			.then( 

				  	(values) => {
				  					console.log(values);
									if(values[0].length<1 && values[1].length < 1){
										           bcrypt.hash(req.body.password,10,(err,hash)=>{
														if(err){
															return res.status(500).json({
																error: err
															});
														}
														else{

														    let promise =new Promise((resolve,reject) =>{
															      db.query(`INSERT INTO users (user_id,password,name,surname,email,phone,address,city,country,afm,approved) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
															      [req.body.username,hash,req.body.name,req.body.surname,req.body.email,req.body.phone,req.body.address,req.body.city,req.body.country,req.body.taxid,0],
															      (err,result,fields) =>{
																	if(err){
																		reject(err);
																	}

																	resolve(result);
																 })
															      
														  	})
															.then( 

																  	(result) => {
																  					res.status(201).json({
																					message:'Handling POST Requests to /users/signup',
																					message2: 'success',
																					createduser : "User " + req.body.username +" Created"
																					});
																					
																      }
														       )
															.catch((err) => {
																console.log("Error is big: " + err);
															});//promise
													
														}
													});
									}
									else{
										res.status(201).json({
											message:'Handling POST Requests to /users/signup',
											message2: 'reject',
											message3: 'There is another User with the same username or email'
										});
					  				}
				      }
		       )
			.catch((err) => {
				console.log("Error is : " + err);
			});

	});
	router.post('/login', (req,res,next) => {

			let user_id = req.body.username;
			let password = req.body.password;
			console.log(password);
			let promise =new Promise((resolve,reject) => {
				db.query("SELECT user_id,password,email,approved FROM users WHERE user_id = " + db.escape(user_id),(err,result,fields)=>{
						if(err){
							reject(err);
						}
						console.log(result);
						resolve(result);
				});
			})
			.then((user)=>{
					if(user.length<1){
						  return res.status(401).json(
						  {
						  	   message : 'Unauthorized',
						  	   
						  });
					}
					else{
						 bcrypt.compare(password,user[0].password,(err,resultpass)=>{

						 		if(err){
						 			console.log(err);
						 			return res.status(401).json({
						 				message : 'Unauthorized',
						 				approved : user[0].approved
						 			});
						 		}

						 		if(resultpass && user[0].approved===1){

						 				const token = jwt.sign({
						 					user_id : user[0].user_id,
						 					email : user[0].email	
						 				},process.env.JWT_KEY,{
						 					expiresIn :'1h'
						 				})
						 				return res.status(200).json({
						 				message : 'You are logged in',
						 				username : user[0].user_id,
						 				token : token
						 			});
						 		}
						 		else{
						 			return res.status(401).json({
						 				message : 'Unauthorized',
						 				approved : user[0].approved
						 			});
						 		}
						 });
					}


			})
			.catch( (err) =>{
						console.log("Error is : " + err);
			});

	});
	router.post('/myoffers',checkauth,(req,res,next) =>{
				let user_id = req.body.user_id;
				let page 
				new Promise((resolve,reject)=>{
					db.query(`SELECT * FROM items WHERE items.user_id =` + db.escape(user_id),(err,result,fields) =>{
						if(err){
							reject(err);
						}
						resolve(result);
					})
				})
				.then((result)=>{
					    console.log(result);
						res.status(201).json({
								message:'Handling GET Requests to /users/myoffers',
								result: result
						});
				})
				.catch((err)=>{
					console.log(err);
				});
	});
	router.post('/userAvail',(req,res,next) =>{
					
				let user_id = req.body.username;
				let promise =new Promise((resolve,reject) =>{
				      db.query("SELECT user_id FROM users WHERE user_id = " + db.escape(user_id),(err,result,fields) =>{
						if(err){
							reject(err);
						}
						console.log("input: " + user_id + "result: " + result);
						console.log(result.length);
						resolve(result);
					 })
			  	})
				.then( 

					  	(result) => {
										if(result.length<1){
											res.status(201).json({
													message:'Handling POST Requests to /users/userAvail',
													message2: 'yes'
												});
										}
										else{
											res.status(201).json({
												message:'Handling POST Requests to /users/userAvail',
												message2: 'no'
											});
										}
					      }
			       )
				.catch((err) => {
					console.log("Error is : " + err);
				});

	});
	//////////////
	router.post('/emailAvail',(req,res,next) =>{

				let email = req.body.email;
				let promise =new Promise((resolve,reject) =>{
				      db.query("SELECT user_id FROM users WHERE email = " + db.escape(email),(err,result,fields) =>{
						if(err){
							reject(err);
						}
						console.log("input: " + email + "result: " + result);
						console.log(result.length);
						resolve(result);
					 })
			  	})
				.then( 

					  	(result) => {
										if(result.length<1){
											res.status(201).json({
													message:'Handling POST Requests to /users/emailAvail',
													message2: 'yes'
												});
										}
										else{
											res.status(201).json({
												message:'Handling POST Requests to /users/emailAvail',
												message2: 'no'
											});
										}
					      }
			       )
				.catch((err) => {
					console.log("Error is : " + err);
				});
	});

	router.post('/inbox_conn',checkauth,(req,res,next)=>{
			console.log(req.body.username);
			new Promise((resolve,reject)=>{
					db.query("SELECT user_id_1,user_id_2 FROM user_connection WHERE ?=user_id_1 OR ?=user_id_2",[req.body.username,req.body.username],(err,result,fields)=>{
							if(err){
								reject(err);
							}
							resolve(result);

					});

			})
			.then((result)=>{
				let conn_array = [];
					for(let i=0;i<result.length;i++){
						 if(result[i].user_id_1===req.body.username){
						 	  conn_array[i] = result[i].user_id_2;
						 }
						 else{
						 	conn_array[i] = result[i].user_id_1;
						 }
					}
					res.status(201).json({
								message:'Handling POST Requests to /users/inbox_conn',
							    connections : conn_array
					});
			})
			.catch((err)=>{
				console.log(err);
			});



	});

	router.post('/messages',checkauth,(req,res,next)=>{
			console.log(req.body.username,req.body.user_conn,req.body.page);
			new Promise((resolve,reject)=>{
					db.query("SELECT message,mes_date,sender,receiver FROM messages WHERE (sender=? AND receiver=?) OR (sender=? AND receiver =?) ORDER BY mes_date DESC LIMIT 30 OFFSET ?",[req.body.username,req.body.user_conn,req.body.user_conn,req.body.username,req.body.page*30],(err,result,fields)=>{
					     if(err){
					     	reject(err);
					     }
					     resolve(result);
					});
			})
			.then((result)=>{
					res.status(201).json({
								message:'Handling POST Requests to /users/messages',
							    messages : result 
					});
			})
			.catch((err)=>{
				console.log(err);
			});

	});

	router.post('/sendmessage',checkauth,(req,res,next)=>{
			console.log(req.body.username,req.body.user_conn,req.body.message);
			new Promise((resolve,reject)=>{
				db.query("INSERT INTO messages (message,mes_date,sender,receiver) VALUES (?,NOW(),?,?)",[req.body.message,req.body.username,req.body.user_conn],(err,result,fields)=>{
					if(err){
						reject(err);
					}
					resolve(result);
				});
			})
			.then((result)=>{
				res.status(201).json({
								message:'Handling POST Requests to /users/sendmessage',
							    message_saved : "message_saved" 
					});
			})
			.catch((err)=>{
				console.log(err);
			});

	});


module.exports = router;