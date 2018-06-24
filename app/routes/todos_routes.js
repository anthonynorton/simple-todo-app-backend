const ObjectId = require('mongodb').ObjectId

module.exports = (app, db) => {
  app.get('/todos', async (req, res) => {
    console.log('Reached!')
    const todosCollection = db.collection('todos')
    const todos = await todosCollection.find(
      async (err, result) => await result.toArray()
    )
    res.send(todos)
  })

  // Post a todo
  app.post('/todos', (req, res) => {
    const todos = db.collection('todos')
    const todo = {
      completed: req.body.completed === 'true' ? true : false,
      title: req.body.title,
    }
    todos.insert(todo, (err, result) => {
      if (!err) {
        res.send(result.ops[0])
      } else {
        res.send({ msg: 'An error has occured.', error: err })
      }
    })
  })

  app.get('/todos/:id', (req, res) => {
    const id = req.params.id
    const details = { _id: new ObjectId(id) }
    const todos = db.collection('todos')
    todos.findOne(details, (err, item) => {
      if (!err) {
        res.send(item)
      } else {
        res.send({ msg: 'An error has occured.', error: err })
      }
    })
  })

  app.put('/todos/:id', (req, res) => {
    const id = req.params.id
    const todo = {
      completed: req.body.completed === 'true' ? true : false,
      title: req.body.title,
    }
    const details = { _id: new ObjectId(id) }
    const todos = db.collection('todos')
    console.log(todo)
    todos.update(details, todo, (err, result) => {
      if (!err) {
        res.send(Object.assign({}, todo, { id }))
      } else {
        res.send({ msg: 'An error has occured.', error: err })
      }
    })
  })

  /***************************************************************************/
  /* The id is not working in the delete handler. FIGURE IT OUT              */
  /***************************************************************************/
  app.delete('/todos/:id', (req, res) => {
    const id = req.params.id
    const details = { _id: new ObjectId(id) }
    const todos = db.collection('todos')
    todos.remove(details, (err, item) => {
      if (!err) {
        res.send({ msg: `Todo with id ${id} was deleted.`, deleted: [id] })
      } else {
        res.send({ msg: 'An error has occured.', error: err })
      }
    })
  })
}
