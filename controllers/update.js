const handleUpdate  = (req,res,db)=>{
	db('pages').where('pid',req.params.id).update({
		link:req.body.link
	}).returning("*").then(data=>{
		
		res.json(data[0]);
	}).catch(err=>res.status(400).json('Unable to update'))
}

module.exports = {
    handleUpdate:handleUpdate
}