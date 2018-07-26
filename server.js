const express = require('express');
const hbs = require('hbs');
const fs = require('fs-extra');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getfullyear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamit', (text)=>{
    return text.toUpperCase();
});


app.set('view engine','hbs');

app.use((req,res, next)=>{
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    fs.appendFile('server-log', log + '\n',(err)=>{
        if(err){
            console.log('Unable to append to server-log')
        }
    });
    next();
});

// app.use((req,res,next)=>{
   
//         res.render('maintainance.hbs');
// });


app.use(express.static(__dirname + '/public'));

app.get('/about',(req, res)=>{
     res.render('about.hbs',{
        pageTitle: 'ABOUT PAGE',
        headerMsg:  'Welcome to the learning of Express and HBS template Engine!'
    });
});

app.get('/',(req, res)=>{
    res.render('home.hbs',{
        pageTitle: 'HOME PAGE',
        welcomeMsg: 'Welcome to the Ashu HBS',
        headerMsg:  'Welcome to the learning of Express and HBS template Engine!'
    });
});


app.listen(3000,()=>{
    console.log('Server is up on port 3000');
});

