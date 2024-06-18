import { randomUUID } from "node:crypto"
import { Readable } from "node:stream"

class SendDataInStream extends Readable {
  index = 1

  _read() {

    const i = this.index++



    setTimeout(() => {

      const data = [{
        id: randomUUID(),
        name: " Wellinton Felipe"
      }]

      if (i > 5) {
        console.log("Fim da Contagem")
        this.push(null)
      } else {
        const buf = Buffer
          .from(String(data.map(({ id, name }) => {
            return `${i}, ${name.toLocaleUpperCase()}, ${id}\n`
          })))
        this.push(buf)
      }
    }, 10)

  }
}

fetch('http://localhost:3002', {
  method: "POST",
  body: new SendDataInStream(),
  duplex: "half"
}).then(response => {
  return response.text()
}).then(data => data)