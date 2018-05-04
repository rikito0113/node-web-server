// 1, get module
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// process.env => an object that stores all of our environment variable as a key value pairs
const port = process.env.PORT || 3000;

// 2, making new express app
var app = express();

// this is gonna take the directry you wanna use for all your handlebar partial files
// we gonna be specifying that directory as the first and only arguments 
hbs.registerPartials(__dirname + '/views/partials');
 
app.set('view engine','hbs');




// request object: 
// on request object, we have access to everything about request
// ex) HTTP method, path query parameters anything that comes from the client whether that client an app a browser or iphone
// its all gonna be available in that request object
app.use((req,res,next)=> {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    //console.log(`${now}: ${req.method} ${req.url}`);
    console.log(log);
    fs.appendFile('server.log',log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });

// app.use -> takes the middleware function you wanna use
app.use(express.static(__dirname + '/public'));


// 
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});




// call the method
// 3, setting up all of our HTTP route handlers
// {app.get} let us set up handler for an http get request 
// (2arguments) -> url, function(to run) = tells express what to send back to the person who made the request
// function needs 2arguments => request, response 
app.get('/', (req,res) => {

    // 1, [request] stores tons of information about the request coming in
    // 2, [response] has a bunch of methods available to you (you can respond in whatever way you like)
    //    -> ex) you can customize what data you send back 

    //res.send('Hello express');

    // if you wanna send json file (passing in a object)
    // res.send({
    //     name: 'Rikito',
    //     like: [
    //         'Hiking',
    //         'Cities'
    //     ]
    // });

    res.render('home.hbs',{
        welcome: 'Welcome',
        pageTitle: 'Home Page',
        //currentYear: new Date().getFullYear(),
        currentMonth: new Date().getMonth(),
        currentDay: new Date().getDay(),
        currentHour: new Date().getHours(),
        currentMinute: new Date().getMinutes(),
        currentSecond: new Date().getSeconds()
    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page',
        welcome: 'some text here'
        //currentYear: new Date().getFullYear()
    });
});

app.get('/projects', (req,res) => {
    res.render('projects.hbs',{
        pageTitle: 'Projects Page',
        welcome: 'welcome projects page'
    });
});

app.get('/bad',(req,res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port,()=>{
    // this function is optional*
    console.log(`Server is running on port ${port}`);
});
