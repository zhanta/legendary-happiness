module.exports = async (req, res) =>{
  req.session.destroy(() =>{
    res.redirect('/')
  }) 
}

// destroy all session data including user id