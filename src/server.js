import http from "node:http"
import { json } from "./middlewares/json.js"
import { Database } from "./database.js"
import { randomUUID as UUid } from "node:crypto"


// const users = []
const database = new Database()

const handleRoutes = (async (req, res) => {

  const { method, url } = req

  await json(req, res)


  if (method === "GET" && url === "/task") {
    const task = database.select('task')

    return res.end(JSON.stringify(task))
  }

  if (method === "GET" && url === "/task") {
    const task = database.select('task')

    return res.end(JSON.stringify(task))
  }



  if (method === "POST" && url === "/task") {
    const { title, description } = req.body

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

  return res.writeHeader(404).end(JSON.stringify(task))

})

const app = http.createServer(handleRoutes)



app.listen(3333,
  () => console.log('servir is running on PORT 3333 🚀'))