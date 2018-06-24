const noteRoutes = require('./note_routes')
const todosRoutes = require('./todos_routes')

module.exports = (app, db) => {
  noteRoutes(app, db)
  todosRoutes(app, db)
}
