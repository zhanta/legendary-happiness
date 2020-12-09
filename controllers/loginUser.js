const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = async (req, res) =>{
    const { username, password } = req.body;

    User.findOne({username:username}, (error,user) => {      
      if (user){ 
        bcrypt.compare(password, user.password, (error, same) =>{
          if(same){ 
            req.session.userId = user._id          
            res.redirect('/')
          }
          else{
            errors: req.flash('validationErrors')
            res.redirect('/auth/login')  
          }
        })
      }
      else{
        errors: req.flash('validationErrors')
        res.redirect('/auth/login')
      }
    })
}
  