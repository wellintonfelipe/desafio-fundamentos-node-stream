import http from "node:http"

import { randomUUID as UUid } from "node:crypto"
import { Readable } from "node:stream"



function* run() {
  for (let i = 0; i <= 100; i++) {
    const data = {
      id: UUid(),
      name: `Wellinton Felipe ${i}`
    }
    yield data
  }
}

const hendler = (async (request, response) => {
  const readable = new Readable({

    read() {
      for (const data of run()) {
        console.log(`sending ${JSON.stringify(data)}` + "\n")
        this.push(null)
      }
    }
  })

  readable.pipe(response)

})

// hendler()

http.createServer(hendler)
  .listen(3000)
  .on('listener', () => console.log('server is runnig! 🚀'))


