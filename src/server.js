import http from "node:http"
import { json } from "./middlewares/json.js"
import { routes } from "./routes.js"


// const users = []

const handleRoutes = (async (req, res) => {

  const { method, url, file } = req

  console.log(file)

  await json(req, res)


  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    req.params = { ...routeParams.groups }

    return route.handler(req, res)
  }

  return res.writeHeader(404).end()
})

const app = http.createServer(handleRoutes)

app.listen(3333,
  () => console.log('servir is running on PORT 3333 🚀'))