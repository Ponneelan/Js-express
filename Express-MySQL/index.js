const express = require('express');
const mysql = require('mysql');

const app = express();
var connection = mysql.createConnection({
    host: process.env.HOST_NAME,
    port: process.env.PORT,
    user: process.env.USER_NAME || 'user Name',
    password: process.env.PASSWORD || 'Password',
    database: process.env.DATABASE_NAME || 'Your DB Name'
});
connection.connect();

app.get('/getall',(req,res)=>{
    res.set('Content-Type', 'application/json');
    connection.query('select * from PortfolioMessage',(error,result)=>{
        if(error){
            console.log('error '+error);
        }else{
            console.log('result is '+ JSON.stringify(result));
        }
        connection.end();
        res.end(JSON.stringify(result));
    });
});

app.listen(3000, () => {
    console.log(`Server started on port ${3000}`);
});

