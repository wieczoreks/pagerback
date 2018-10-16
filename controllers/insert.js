const handleInsert  = (req,res,db)=>{
	db('pages')
	.returning('*')
	.insert({	
		link:req.body.link,
		tvalue:req.body.tvalue
	}).then(data=>{
	
	res.json(data[0]);
	}).catch(err=>res.status(400).json('Unable add pages'))
}
module.exports = {
    handleInsert:handleInsert
}