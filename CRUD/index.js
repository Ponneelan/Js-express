const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.json());

// console.log(process.env.HOST_NAME,process.env.PORT,process.env.USER_NAME,process.env.PASSWORD,process.env.DATABASE_NAME);

const conncetion = mysql.createConnection({
    host: process.env.HOST_NAME,
    port: process.env.PORT,
    user: process.env.USER_NAME || 'User Name',
    password: process.env.PASSWORD || 'Psssword',
    database: process.env.DATABASE_NAME || 'DB Name'
});

conncetion.connect();

app.get('/getall',(req,res)=>{
    res.set('Content-Type', 'application/json');
    conncetion.query('select * from PortfolioMessage',(error,result)=>{
        if(error){
            result = {message:'error'}
            console.log('error '+error);
        }else{
            console.log('result is '+ JSON.stringify(result));
        }
        res.end(JSON.stringify(result));
    });
});

app.get('/getUser/:id',(req,res)=>{
    res.set('Content-Type', 'application/json');
    let sql = `select * from PortfolioMessage where id = ?`;
    conncetion.query(sql,[req.params.id],(error,result)=>{
        if(error){
            result = {message:'error'}
            console.log('error '+error);
        }else{
            console.log('result is '+ JSON.stringify(result));
        }
        res.end(JSON.stringify(result));
    });
});


app.post('/insert', (req, res) => {
    res.set('Content-Type', 'application/json');

    let sql = `INSERT INTO PortfolioMessage (name,email,summary,message,updated_by,created_by) VALUES(?,?,?,?,?,?)`;
    conncetion.query(sql,[req.body.name,req.body.email,req.body.summary,req.body.message,req.body.name,req.body.name],(error, result) => {
        if (error) {
            console.log("error " + error);
            res.end(JSON.stringify({ Message: "error" }));
        } else {
            console.log("Result " + JSON.stringify(result));
            res.end(JSON.stringify(result));
        }
    })
});

app.put('/update',(req,res)=>{
    res.set('Content-Type', 'application/json');
    let sql = `update PortfolioMessage set name = ? where id = ?`; 
    conncetion.query(sql,[req.body.name,req.body.id],(error,result)=>{
        if(error){
            console.log("error " + error);
            res.end(JSON.stringify({ Message: "error" }));
        }else{
            console.log("Result " + JSON.stringify(result));
            res.end(JSON.stringify(result));
        }

    })
});


app.listen(3000, () => {
    console.log(`Server started on http://localhost:3000`);
});