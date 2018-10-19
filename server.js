const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

//create an app
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//register middleware
app.use((req, res, next) => {
    var currentTime = new Date().toString();
    var log = `${currentTime}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err){
            console.log('Unable to append to server.log');
        }
    });
    
    next(); //to exit from middleware
});
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });
//order of middleware is important 
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//get(url, return function - what to get back)
app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'John',
    //     likes: ['Beer', 'Wine']
    // })
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMsg: 'Welcome to the weirdos page!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});



//binds the app to a port
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});