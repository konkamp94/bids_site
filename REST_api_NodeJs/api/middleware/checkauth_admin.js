const jwt = require('jsonwebtoken');
module.exports = (req,res,next) =>{
	try{
		const token = req.headers.authorization.split(" ")[1];
		const simple_decoded = jwt.decode(token);
		console.log(token);
		console.log(simple_decoded);
		if(simple_decoded.admin==='admin is in'){
		const decoded =jwt.verify(token,process.env.JWT_KEY);
		req.user_data = decoded;
		next();
		}
	}
	catch(error){
			return res.status(401).json({

				message : 'Auth Failed'
			})
	}


}