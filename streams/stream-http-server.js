import http from "node:http"
import { Transform } from "node:stream"

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {

    //transformando um pedaço (chunk), em uma numero negativo
    const transformed = Number(chunk.toString()) * -1

    console.log(transformed)

    //Transformando o numero em um texto
    const buf = Buffer.from(String(transformed))

    //primeiro parametro é um erro; ex: ==> new Error('Ivalide value')
    //segundo parametro são os dados
    callback(null, buf)
  }
}
//req => ReadableStream ler dados
//res => WritebleStream escrever dados

const server = async (req, res) => {
  const buffers = []
  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()
  console.log(fullStreamContent)

  // return req
  //   .pipe(new InverseNumberStream())
  //   .pipe(res)
}


http.createServer(server)
  .listen(3334)
  .on('listening', () => console.log('Server is running. 🚀 '))