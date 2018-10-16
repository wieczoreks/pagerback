const handleSignIn = (req,res,db,bcrypt)=>{
    if(!req.body.password ||!req.body.email){
        return  res.status(400).json("Fields can not be empty")
      }
    
    db.select('email','hash').from('login')
	.where('email','=',req.body.email)
	.then(data=>{
		if(bcrypt.compareSync(req.body.password,data[0].hash)){
			return db.select('*').from('users')
			.where('email','=',req.body.email)
			.then(user=>{
				res.json(user[0]);
			})
			.catch(err=>res.status(400).json('Unable to get user'))
			
		} else {
			res.status(400).json('Bad email or password');
		}
		
	})
	.catch(err=>res.status(400).json('Bad email or password'))
}

module.exports ={
handleSignIn :handleSignIn
}