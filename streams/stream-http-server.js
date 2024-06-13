import http from "node:http"
import { Transform } from "node:stream"

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {

    //transformando um pedaço (chunk), em uma numero negativo
    const transformed = Number(chunk.toString()) * -1
    //Transformando o numero em um texto
    const buf = Buffer.from(String(transformed))

    //primeiro parametro é um erro; ex: ==> new Error('Ivalide value')
    //segundo parametro e o dado

    console.log(buf)
    callback(null, buf)
  }
}
//req => ReadableStream ler dados
//res => WritebleStream escrever dados

const server = (req, res) => {
  return req
    .pipe(new InverseNumberStream)
    .pipe(res)
}


http.createServer(server)
  .listen(3334)
  .on('listening', () => console.log('Server is running. 🚀 '))