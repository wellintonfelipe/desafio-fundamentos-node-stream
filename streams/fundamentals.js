// Netflix & Spotify
// process.stdin.pipe(process.stdout)

import { Readable, Writable, Transform } from "node:stream"

//Ler dados de uma Stream
class OneTohundredStream extends Readable {
  index = 1

  _read() {
    setTimeout(() => {
      const i = this.index++

      if (i >= 10) {
        this.push(null) // ==> Quando não a mais nada a ser lidos
      } else {
        const buf = Buffer.from(String(i + '\n'))
        this.push(buf)
      }
    }, 1000)
  }
}

// Transforme Streams servem para trasformar um dado em outro

class InverseNumber extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString() * -1)
    const buf = Buffer.from(String(transformed))

    callback(null, buf)
  }
}

//Lendo dados de uma stream
class MultiplyTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.error(Number(chunk.toString()) * 10)

    callback()
  }
}



new OneTohundredStream() // ==> Lendo dados de uma Stream
  .pipe(new InverseNumber) //==> Tranformando dados de uma stream
  .pipe(new MultiplyTenStream) // ==> Escrevendo dados de uma stream