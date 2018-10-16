const handleRefresh = (req,res,db,rq,cheerio)=> {
    db.select("link").from('pages').then((data) => {
                 let result = [];
                 data.map((url,index) => {
                 result.push(url.link)
                 return result
               })
              
               let arraysForPromise = result.map(url=>{        
                   return new Promise(function(resolve, reject) {      
                   rq(url, function (err, resp, body) {
                                if (err) {return reject(err);}
                                let $ = cheerio.load(body);
                                let value = $('body').text().length;
                                resolve({tvalue: +value, link: url});
                        });
                        });
                    });
               Promise.all(arraysForPromise).then(values=> {
                            
                           return values
                        }).then(datas=>{               
                           let testArray = datas.map(data1=>{
                           return new Promise(function(resolve, reject) {
                               let result10 = db('pages').returning("*").where('link','=',data1.link,)
                               .update({tvalue: data1.tvalue}).orderBy('tvalue',"asc");
                               resolve(result10)   
                           })  
                           })
                       Promise.all(testArray).then(val=>{
                           let resultingArray = []
                           val.map(val10=>{
                           resultingArray.push(val10[0])
                           })
                           res.json(resultingArray)
                       })  
                           })
                        }).catch(err=>{
               res.json("Unable to get data")
       })
    }
       module.exports={
        handleRefresh:handleRefresh
       }