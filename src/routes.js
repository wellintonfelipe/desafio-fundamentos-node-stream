import { randomUUID as UUid } from "node:crypto"
import { Database } from "./database.js"
import { buildRoutePath } from "./utils/build-route-path.js"


// Query Parameters
// Route Parametes
// Request Body
const database = new Database()

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/task"),
    handler: (req, res) => {
      const users = database.select('task')

      return res.end(JSON.stringify(users))
    }
  },
  {
    method: "POST",
    path: buildRoutePath("/task"),
    handler: (req, res) => {
      const { title, description } = req.body
      if (!title || !description) {
        return res.writeHeader(500).end('Title and Description is required!\n')
      }

      const task = {
        id: UUid(),
        title,
        description,
        completed_at: null,
        create_at: new Date(),
        updated_at: new Date()
      }

      database.insert('task', task)

      return res.writeHeader(201).end()
    }
  },
  {
    method: "PUT",
    path: buildRoutePath("/task/:id"),
    handler: (req, res) => {

      const { id } = req.params
      const { title, description } = req.body

      if (!title || !description) {
        return res.writeHeader(500).end('Title and Description is required!\n')
      }


      database.update("task", id, {
        title,
        description,
        updated_at: new Date()
      })

      return res.writeHeader(201).end()
    }
  },
  {
    method: "DELETE",
    path: buildRoutePath("/task/:id"),
    handler: (req, res) => {
      const { id } = req.params

      database.delete("task", id)

      return res.writeHeader(204).end()
    }
  },

  // ==> se a task for completada

  {


    method: "PATCH",
    path: buildRoutePath("/task/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params

      database.complete("task", id)

      return res.writeHeader(201).end()

    }
  }
]