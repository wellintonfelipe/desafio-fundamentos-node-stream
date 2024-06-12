import http from "node:http"


const users = []
const handleRoutes = (async (req, res) => {
  req.pipe()
  const { method, url } = req
  /**
   * id
   * title
   * description
   * completed_at default NULL
   * created_at
   * update_at 
   */

  if (method === "GET" && url === "/users") {
    return res
      .setHeader('Content-Type', "aplication/json")
      .writeHeader(200)
      .end(JSON.stringify(users))
  }

  if (method === "POST" && url === "/users") {
    users.push({
      id: 1,
      name: "John Doe",
      email: 'joehdoe@example.com'
    })
    return res.writeHeader(201).end()
  }

  return res.writeHeader(404).end()



})

const app = http.createServer(handleRoutes)



app.listen(3333,
  () => console.log('servir is running on PORT 3333 🚀'))