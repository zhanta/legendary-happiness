const express = require('express')

const app = new express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload') 

const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const expressSession = require('express-session');
const logoutController = require('./controllers/logout')

const validateMiddleware = require("./middleware/validateMiddleware");
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const flash = require('connect-flash');

const profileController = require('./controllers/getProfile')

app.use(fileUpload()) 

mongoose.connect('mongodb://localhost:27017/mydatabase', {useNewUrlParser: true});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine','ejs')

app.use(express.static('public'))

app.listen(5000, ()=>{
    console.log('App listening on port  ...')    
})

app.use('/posts/store',validateMiddleware) 

app.use(expressSession({
    secret: 'keyboard cat' 
})) 

global.loggedIn = null;

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId; 
    next()   
});

app.use(flash());

app.get('/posts/new',authMiddleware, newPostController)
app.get('/',homeController)
app.get('/post/:id',getPostController)        
app.post('/posts/store', authMiddleware, storePostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.post('/users/login',redirectIfAuthenticatedMiddleware, loginUserController) 
app.get('/auth/logout', logoutController)
app.use((req, res) => res.render('notfound'));
app.get('/profile', profileController)


// const express =  require('express');
// const ejs = require('ejs');
// const app = new express();
// const path = require('path');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const BlogPost = require('./models/BlogPost.js')
// const fileUpload = require('express-fileupload')

// app.use(fileUpload()) 

// mongoose.connect('mongodb://localhost:27017/webserver', {useNewUrlParser: true});

// app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({extended:true}));

// app.set('view engine', 'ejs');

// app.use(express.static('public'));

// const valMiddleWare = (req,res,next)=>{    
//     if(req.files == null || req.body.title == null || req.body.body == null){        
//         return res.redirect('/posts/new')
//     }    
//     next()
// }

// app.use('/posts/store',valMiddleWare) 

// app.get('/',async (req,res)=>{    
//     console.log("home starting...")
//     const blogposts = await BlogPost.find({})         
//     res.render('index',{
//         blogposts
//     });
// })

// app.get('/', (req,res)=> {
//     res.render('index');
// });
// app.get('/post', (req,res)=> {
//     res.render('post');
// });

// app.get('/auth', (req,res)=> {
//     res.render('auth');
// })

// app.get('/reg', (req,res)=> {
//     res.render('reg');
// });

// app.get('/profile', (req,res)=> {
//     res.render('profile');
// });

// app.get('/posts/new', (req,res)=> {
//     res.render('create');
// })

// app.get('/post/:id',async (req,res)=>{        
//     const blogpost = await BlogPost.findById(req.params.id)
//     console.log(blogpost)
//     res.render('post',{
//         blogpost
//     });    
// })

// app.post('/posts/store', (req,res)=>{ 
//     let image = req.files.image;  
//     image.mv(path.resolve(__dirname,'public/img',image.name),async (error)=>{
//         await BlogPost.create({
//             ...req.body,
//             image: '/img/' + image.name
//         })
//         res.redirect('/')
//     })            
// })


// app.listen(2020, () => {
//     console.log('App is listening');
// });
