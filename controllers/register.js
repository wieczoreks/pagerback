
const  handleRegister = (req,res,db,bcrypt)=>{
if(!req.body.password ||!req.body.email||!req.body.name){
  return  res.status(400).json("Fields can not be empty")
}

	const hash = bcrypt.hashSync(req.body.password)
	db.transaction(trx=>{
		trx.insert({
			hash:hash,
			email:req.body.email
		}).into('login').returning('email')
		.then(loginEmail=>{
			return trx('users')
			.returning('*')
			.insert({	
				name:req.body.name,
				email:loginEmail[0],
				joined:new Date()
			})
			.then(user=>{
				
			res.json(user[0]);
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err=>res.status(400).json('Unable to register'))
	
}
module.exports = {
    handleRegister:handleRegister
}