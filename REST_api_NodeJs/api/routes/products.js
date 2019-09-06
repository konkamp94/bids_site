const express = require('express');
const db = require('../../dbconnect.js');
const router = express.Router();
const checkauth = require('../middleware/checkauth');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({storage : storage});

router.get('/:page',(req,res,next) =>{
	console.log(req.params.page);
	let pages;
	new Promise((resolve,reject)=>{
			db.query("SELECT COUNT(item_id) as count FROM Items WHERE enddate>NOW() AND bought=0",(err,result,fields) =>{
			if(err){
				reject(err);
			}
			resolve(result);
		 })
	})
	.then((result)=>{
		console.log(result[0].count);
		console.log("mod3 "+ result[0].count%3);
		console.log("div3 "+ result[0].count/3);
		if(result[0].count%3===0){

			 pages = Math.trunc(result[0].count/3);
			 console.log(pages);
		}
		else{
			pages = Math.trunc(result[0].count/3) + 1;
			console.log(pages);
		}


		  let promise =new Promise((resolve,reject) =>{
			      db.query("SELECT * FROM Items WHERE bought=0 AND enddate>NOW() LIMIT 3 OFFSET ?",[req.params.page*3],(err,result,fields) =>{
					if(err){
						reject(err);
					}
					resolve(result);
				  })
		  })
		  .then( 

			  	(result) => {
			  		for(let i = 0;i<result.length;i++){
			  		console.log(result[i]);
			  	    let date = new Date(result[i].started);
			  	    let enddate = new Date(date);
	  				enddate.setDate(enddate.getDate() + result[i].ends);
			  	     console.log(enddate);
			  	     strend = enddate.toString();
			  	     let expired = strend.slice(0,24);
			  	     console.log(expired);
			  	     result[i].expired = expired;
			  	     // if(enddate>new Date() && result[i].bought===0){
			  	     // 		result[i].state = 'open';
			  	     // }
			  	     // else{
			  	     // 	 result[i].state = 'closed';
			  	     // }
			  	 	}
			  		res.status(200).json({
					message:'Handling GET Requests to /products',
					result : result,
					pages : pages
					});
								
			    }
	    	)	
			.catch((err) => {
				console.log("Error is : " + err);
			});
	
	})
	.catch((error)=>{
		console.log(error);
	});

});

router.post('/search',(req,res,next)=>{
		let search_query;
		console.log(req.body);
		if(req.body.category==="" && req.body.min ==="" && req.body.max ==="" && req.body.country===""){
			search_query = "SELECT * FROM Items WHERE bought=0 AND enddate>NOW() AND name LIKE '%" + req.body.search + "%'";
			console.log("to query einai"+ search_query);
		}
		else if(req.body.category!=='' && req.body.min ==="" && req.body.max ==="" && req.body.country!==""){
			search_query = "SELECT * FROM Items i INNER JOIN (SELECT * FROM item_category WHERE category_id ="+req.body.category+") c on i.item_id = c.item_id WHERE bought=0 AND enddate>NOW() AND name LIKE '%" + req.body.search + "%'"+"AND i.country LIKE '%" + req.body.country + "%'";
		}
		else if(req.body.category!=='' && req.body.min ==="" && req.body.max ==="" && req.body.country===""){
			search_query = "SELECT * FROM Items i INNER JOIN (SELECT * FROM item_category WHERE category_id ="+req.body.category+") c on i.item_id = c.item_id WHERE i.bought=0 AND i.enddate>NOW() AND i.name LIKE '%" + req.body.search + "%'";
			console.log(search_query);
		}
		else if(req.body.category!=='' && req.body.min !=="" && req.body.max ==="" && req.body.country===""){
			search_query = "SELECT * FROM Items i INNER JOIN (SELECT * FROM item_category WHERE category_id ="+req.body.category+") c on i.item_id = c.item_id WHERE i.bought=0 AND i.enddate>NOW() AND i.name LIKE '%" + req.body.search + "%' AND i.buy_price>="+req.body.min+"";
		}
		else if(req.body.category!=='' && req.body.min !=="" && req.body.max ==="" && req.body.country!==""){
			search_query = "SELECT * FROM Items i INNER JOIN (SELECT * FROM item_category WHERE category_id ="+req.body.category+") c on i.item_id = c.item_id WHERE i.bought=0 AND i.enddate>NOW() AND i.name LIKE '%" + req.body.search + "%' AND i.buy_price>="+req.body.min+" AND i.country LIKE '%" + req.body.country + "%'";
		}
		else if(req.body.category!=='' && req.body.min ==="" && req.body.max !=="" && req.body.country===""){
			search_query = "SELECT * FROM Items i INNER JOIN (SELECT * FROM item_category WHERE category_id ="+req.body.category+") c on i.item_id = c.item_id WHERE i.bought=0 AND i.enddate>NOW() AND i.name LIKE '%" + req.body.search + "%' AND i.buy_price<="+req.body.max+"";
		}
		else if(req.body.category!=='' && req.body.min ==="" && req.body.max !=="" && req.body.country!==""){
			search_query = "SELECT * FROM Items i INNER JOIN (SELECT * FROM item_category WHERE category_id ="+req.body.category+") c on i.item_id = c.item_id WHERE i.bought=0 AND i.enddate>NOW() AND i.name LIKE '%" + req.body.search + "%' AND i.buy_price<="+req.body.max+" AND i.country LIKE '%" + req.body.country + "%'";
		}
		else if(req.body.category!=='' && req.body.min !=="" && req.body.max !=="" && req.body.country===""){
			search_query = "SELECT * FROM Items i INNER JOIN (SELECT * FROM item_category WHERE category_id ="+req.body.category+") c on i.item_id = c.item_id WHERE i.bought=0 AND i.enddate>NOW() AND i.name LIKE '%" + req.body.search + "%' AND i.buy_price<="+req.body.max+" AND i.buy_price>="+req.body.min+"";
		}
		else if(req.body.category!=='' && req.body.min !=="" && req.body.max !=="" && req.body.country!==""){
			search_query = "SELECT * FROM Items i INNER JOIN (SELECT * FROM item_category WHERE category_id ="+req.body.category+") c on i.item_id = c.item_id WHERE i.bought=0 AND i.enddate>NOW() AND i.name LIKE '%" + req.body.search + "%' AND i.buy_price<="+req.body.max+" AND i.buy_price>="+req.body.min+" AND i.country LIKE '%" + req.body.country + "%'";
			console.log(search_query);
		}

		new Promise((resolve,reject)=>{
			db.query(search_query,(err,result,fields) =>{
			if(err){
				reject(err);
			}
			resolve(result);
		 	})
		})
		.then((result)=>{
				res.status(200).json({
					message:'Handling POST Requests with search to /products/search',
					result : result,
				});
		})
		.catch((err)=>{
			console.log(err);
		});
		
});


router.post('/',checkauth,upload.single('image'),(req,res,next) =>{

			let today = new Date();
    let promise =new Promise((resolve,reject) =>{
     	   	let path = `http://localhost:3000/`+ req.file.filename;
     	   
     	    let enddate = new Date(today);
     	    // console.log(enddate);
     	    enddate.setDate(enddate.getDate() + parseInt(req.body.duration));
     	    // console.log(req.body.duration);
     	    // console.log(enddate);
  	      db.query(`INSERT INTO items (name,image,first_bid,currently,location,country,description,number_of_bids,buy_price,started,ends,enddate,user_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
	      [req.body.name,path,req.body.start_bid,req.body.start_bid,req.body.location,req.body.country,req.body.description,0,req.body.buy,today,req.body.duration,enddate,req.body.user_id],
	      (err,result,fields) =>{
			if(err){
				reject(err);
			}

			resolve(result);
		 })
	      
  	})
	.then( 

		  	(result) => {
		  			// 		res.status(201).json({
							// message:'Handling POST Requests to /products',
							// message2: 'success',
							// createduser : "Product" + req.body.name +" Created"
							// })
					        	    console.log(result.insertId);
					        		new Promise((resolve,reject)=>{
					        			
					        			for(let i=0;i<req.body.categories.length;i++){

									 		  db.query(`INSERT INTO item_category (category_id,item_id) VALUES (?,?)`,[req.body.categories[i],result.insertId],

										      (err,result2,fields) =>{
												if(err){
													reject(err);
												}

												resolve(result);
											 })
									 	}
				      				 })
					        		.then((result2)=>{
			        			 				res.status(201).json({
												message:'Handling POST Requests to /products',
												message2: 'success',
												createduser : "Product" + req.body.name +" Created"
												});
					        		})
					        		.catch((error)=>{
					        			console.log("3promise "+error);
					        		});


	})
    .catch((error)=>{
    		console.log(error);
    })
							
																    
	
});

router.get('/:productId',(req,res,next) =>{

	const id = req.params.productId;
	if(id ==='special'){
		res.status(200).json({
			message : 'this is the special id',
			id: id	
		});
	}
	else{
		res.status(200).json({
			message : 'this is not a special id',
			id: id	
		});
	}

});
router.patch('/:productId',checkauth,(req,res,next) =>{
	console.log(req.body.bid);
	console.log(req.body.user_id);
	let bought = 0;
	new Promise((resolve,reject)=>{
			db.query("SELECT currently,buy_price,user_id FROM items WHERE item_id= ? AND enddate > NOW() AND bought=0 ",[req.params.productId],(err,result,fields) =>{
					if(err){
						 reject(err);
					}
					resolve(result);
	})
	})
	.then((result)=>{
				
			if(result.length!==0){	
				if(req.body.user_id !== result[0].user_id){

					console.log(result[0].currently,req.body.bid);
					if((result[0].currently<req.body.bid && req.body.bid<=result[0].buy_price)){
							
							if(req.body.bid===result[0].buy_price.toString()){
						    		bought = 1;
						    		console.log(bought);
						    		new Promise((resolve,reject)=>{
						    			db.query(`CALL create_conn(?,?) `,
												 [req.body.user_id,result[0].user_id],(err,result,fields)=>{
						    				     		if(err){
						    				     			reject(err);
						    				     		}
						    				     		resolve(result);
						    				     });
						    		})
						    		.then((result)=>{
						    				console.log("connection is done");
						    		})
						    		.catch((err)=>{
						    				console.log(err);
						    		});
						    }
						    new Promise((resolve,reject)=>{
						    	db.query("UPDATE items SET currently= ?,number_of_bids = number_of_bids + 1,bought=?,last_bidder=? WHERE item_id= ?",[req.body.bid,bought,req.body.user_id,req.params.productId],(err,result,fields) =>{
										if(err){
											reject(err);
										}
										resolve(result)

			    				});
						    })
						    .then((result)=>{

						    		new Promise((resolve,reject)=>{

		    								db.query("INSERT INTO bids (bidder_id,time,amount) VALUES(?,?,?)",[req.body.user_id,new Date(),req.body.bid],(err,result2,fields) =>{
														if(err){
															reject(err);
														}
														resolve(result2)
											});
						    		})
						    		.then((result2)=>{
						    					 new Promise((resolve,reject)=>{
						    					 		db.query("INSERT INTO items_bids (item_id,bid_id) VALUES(?,?)",[req.params.productId,result2.insertId],(err,result3,fields) =>{
																if(err){
																	reject(err);
																}
																resolve(result3)
														});
						    					 })
						    					 .then((result3)=>{
						    					 		 res.status(200).json({
																message : 'Update product with id = ' + req.params.productId+ 'last bid is now ' + req.body.bid,
																id: req.params.productId
														 });	
						    					 })
						    					 .catch((error)=>{
						    					 		console.log("result3 "+ error);
						    					 })
						    					
						    		})
						    		.catch((error)=>{
						    				console.log("result2 " +error);
						    		});

						    	
						    })
						    .catch((err)=>{
						    	throw err;
						    })
					}
					else{
						return res.status(406).json({

						message : 'small or same as the last bid or bigger than buy_price'
						});
						
					}

            }
            else{
            	return res.status(405).json({

				message : 'you cant bid or buy your own product'
				});
            }
        }
        else{
        	return res.status(404).json({

				message : 'the duration of the bid is expired or the product have been bought'
				});
        }
	})
	.catch((err)=>{
	     throw err;
	});




});
router.delete('/:productId',(req,res,next) =>{

	const id = req.params.productId;
	
		res.status(200).json({
			message : 'Delete Product with id',
			id: id	
		});
	
});

module.exports = router;