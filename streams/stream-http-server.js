import http from "node:http"

const server = (req, res) => {

}


http.createServer(server)
  .listen(3334)
  .on('listening', () => console.log('Server is running. 🚀 '))