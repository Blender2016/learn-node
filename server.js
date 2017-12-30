const express = require("express");
const fs = require("fs");   //import express library to use.
const hbs = require("hbs");

var app = express();     // to make express app.

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err){
            console.log("Unabe to writing data to a file.");
        }
    });
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });

hbs.registerPartials(__dirname + '/views/partials'); // partials allows you to reuse templates in another places by calling these partials .
app.set("view engine","hbs"); // To tell express whitch template engine to use [handlebars].
app.use(express.static(__dirname + '/public')); //expressjs builtin middleware to load and render assets files .

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.get('/',(req,res)=>{
   res.render('home.hbs',{
       pageTitle:'Home Page',
       welcomeMessage:"Hello, User !"
   });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'ABout Page',
    });
});

app.listen(3000, function() {
    console.log("The frontend server is running on port 3000!");
});

