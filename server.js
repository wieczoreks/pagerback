const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const app = express();
const cors = require("cors");
const knex = require('knex');
const cheerio = require('cheerio');
const rq = require("request");
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const insert = require('./controllers/insert.js');
const refresh =require('./controllers/refresh.js');
const load = require('./controllers/load.js');
const deletePages = require('./controllers/delete.js');
const update = require('./controllers/update.js');

const db = knex({
	client: 'pg',
	connection: {
	  host : '127.0.0.1',
	  user : 'postgres',
	  password : 'pupu',
	  database : 'postgres',
	  port:"5432"
	}
  });

app.use(bodyParser.json())
app.use(cors())
app.use(express.static(__dirname+"/public"))

app.post("/signin",(req,res)=> signin.handleSignIn(req,res,db,bcrypt));
app.post("/register",(req,res)=>register.handleRegister(req,res,db,bcrypt));
app.get('/refresh',(req,res)=> refresh.handleRefresh(req,res,db,rq,cheerio));
app.get('/pages',(req,res) =>load.handleLoad(req,res,db));
app.post("/pages",(req,res) =>insert.handleInsert(req,res,db))
app.put('/pages/:id',(req,res) =>update.handleUpdate(req,res,db))
app.delete('/pages/:id',(req,res) =>deletePages.handleDelete(req,res,db))

// USER PROFILE
// app.get("/profile/:id",(req,res)=>{
// const {id} = req.params;
// let found = false;

// database.users.forEach(user=>{
// 	if(user.id===id){
// 		found = true;
// 		return res.json(user)
// 	} 
	
// })
// if(!found){
// 	res.status("404").json("No such user");
// }

// });



app.listen(3001,() =>{
	console.log("app is running on port 3001")
});
