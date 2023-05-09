const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const conncetion = mysql.createConnection({
    host: process.env.HOST_NAME,
    port: process.env.PORT,
    user: process.env.USER_NAME || 'user Name',
    password: process.env.PASSWORD || 'Password',
    database: process.env.DATABASE_NAME || 'Your DB Name'
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
        conncetion.end();
    });
});

app.get('/getUser/:id',(req,res)=>{
    res.set('Content-Type', 'application/json');
    let sql = `select * from PortfolioMessage where id = '${req.params.id}'`;
    conncetion.query(sql,(error,result)=>{
        if(error){
            result = {message:'error'}
            console.log('error '+error);
        }else{
            console.log('result is '+ JSON.stringify(result));
        }
        res.end(JSON.stringify(result));
        conncetion.end();
    });
});


app.post('/insert', (req, res) => {
    res.set('Content-Type', 'application/json');

    let sql = `INSERT INTO PortfolioMessage (name,email,summary,message,updated_by,created_by) VALUES('${req.query.name}','${req.query.email}','${req.query.summary}','${req.query.message}','${req.query.name}','${req.query.name}')`;

    conncetion.query(sql,(error, result) => {
        if (error) {
            console.log("error " + error);
            res.end(JSON.stringify({ Message: "error" }));
        } else {
            console.log("Result " + JSON.stringify(result));
            res.end(JSON.stringify(result));
        }
        conncetion.end();
    })
});

app.put('/update',(req,res)=>{
    res.set('Content-Type', 'application/json');
    let sql = `update PortfolioMessage set name = '${req.query.name}' where id = '${req.query.id}'`; 
    conncetion.query(sql,(error,result)=>{
        if(error){
            console.log("error " + error);
            res.end(JSON.stringify({ Message: "error" }));
        }else{
            console.log("Result " + JSON.stringify(result));
            res.end(JSON.stringify(result));
        }
        conncetion.end();

    })
});


app.listen(3000, () => {
    console.log(`Server started on http://localhost:3000`);
});