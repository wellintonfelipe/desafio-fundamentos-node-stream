import { Transform, pipeline } from "node:stream"
import axios from "axios"



async function consumer() {
  const url = "https://watch.brplayer.site/watch?v=GTSR0FDQ"
  const response = await axios({
    url,
    method: "get",
    responseType: "stream"
  })

  const buf = Buffer.from(String(response.data))
  return buf
}

const stream = await consumer()

stream()