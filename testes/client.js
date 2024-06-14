import { stdout } from "node:process"
import { Readable } from "node:stream"

class SendDataInStream extends Readable {
  index = 1

  _read() {

    const i = this.index++

    const data = [{
      id: crypto.randomUUID(),
      name: 'Wellinton felipe'
    }]

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buf = Buffer
          .from(String(data.map(({ id, name }) => {
            return `${i} ${name.toLocaleUpperCase()} ${(id)}\n`
          })))

        this.push(buf)
      }
    }, 1000)

  }
}

fetch('http://localhost:3002', {
  method: "POST",
  body: new SendDataInStream(),
  duplex: "half"
})