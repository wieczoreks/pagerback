const handleLoad  = (req,res,db)=>{
    db('pages').select('*').orderBy('tvalue',"asc")
    .then(pages=>{
        res.json(pages);
    });
}
module.exports =  {
    handleLoad:handleLoad
}