const handleDelete = (req,res,db)=>{
	db('pages').where('pid',req.params.id).del().returning('*')
	.then(data=>{
	res.json("Deleted successfully");
	}).catch(err=>res.status(400).json('Unable to delete'))
}
module.exports =  {
    handleDelete:handleDelete
}