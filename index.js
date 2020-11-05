const express =  require('express');
const ejs = require('ejs');
const app = new express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//mongoose.connect('mongodb://localhost:27017/webserver', {useNewUrlParser: true});

//app.use(bodyParser.json());

//app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req,res)=> {
    //res.sendFile(path.resolve(__dirname,'/home/zhanta/Рабочий стол/Projects/web_server/views/index.html'))
    res.render('index');
});
app.get('/post', (req,res)=> {
    //res.sendFile(path.resolve(__dirname,'/home/zhanta/Рабочий стол/Projects/web_server/views/index.html'))
    res.render('post');
});

app.get('/auth', (req,res)=> {
    //res.sendFile(path.resolve(__dirname,'/home/zhanta/Рабочий стол/Projects/web_server/views/index.html'))
    res.render('auth');
})

app.get('/reg', (req,res)=> {
    //res.sendFile(path.resolve(__dirname,'/home/zhanta/Рабочий стол/Projects/web_server/views/index.html'))
    res.render('reg');
});
app.get('/newpost', (req,res)=> {
    //res.sendFile(path.resolve(__dirname,'/home/zhanta/Рабочий стол/Projects/web_server/views/index.html'))
    res.render('newpost');
})

app.listen(2020, () => {
    console.log('App is listening');
});
