const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if(!password || !email) {
    return res.status(400).json('incorrect field submission')
  }
  db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data=>{
      const isValid = bcrypt.compareSync(password, data[0].hash)
      if(isValid) {
        return db.select('*').from('users')
        .where('email', '=', email)
        .then(user=>{
          res.json(user[0])
        })
        .catch(()=>res.status(400).json('unable to get user'))
      }
    })
    .catch(()=>res.status(400).json('signin unsuccessful'))
}

module.exports = {
  handleSignin: handleSignin
}
