import { Readable } from "node:stream"

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))

        this.push(buf)
      }
    }, 1000)
  }
}

//Somente pode enviar metedo POST.
fetch('http://localhost:3334', {
  // Só pode enviar metodos POST e PUT. 
  // Porque só esses metodos? 
  // ==> Os demais metodos não enviam corbo da requicição GET, etc...
  method: "POST",
  //Com isso posso enviar uma STREAM no corpo
  body: new OneToHundredStream(),
})