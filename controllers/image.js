const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries=>{
    res.json(entries[0].entries)
  })
  .catch(()=>res.status(400).json("unable to update entry"))
}

module.exports = {
  handleImage: handleImage,
}
