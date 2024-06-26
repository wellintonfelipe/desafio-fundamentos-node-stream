export async function json(req, res) {

  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch (error) {
    //se o corpo da requisição vier vazio
    req.body = null
  }

  res
    .setHeader('Content-Type', "aplication/json")
}