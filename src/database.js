import fs from "node:fs/promises"

//{"users": [...usuarios]}


//caminho para o arquivo
const databasePath = new URL("../db.json", import.meta.url)

export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, "utf-8")
      .then(data => {
        this.#database = JSON.parse(data)
      }).catch(() => {
        this.#persist()
      })
  }

  #persist() {
    //criar o arquivos db.json
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table) {
    const data = this.#database[table] ?? []

    return data
  }
  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()


    return data
  }

  /** 
  id: 'd5108adb-6eaf-49ee-b11d-960078eaa43c',
  title: 'Verificar e-mail',
  description: '1fee3b4e-da18-4921-b4fe-5313d4bbaa71, atualização',
  updated_at: '2024-06-26T22:01:56.365Z' 
   * 
   */

  update(table, id, data) {
    const rowIndex = this.#database[table]
      .findIndex(row => row.id === id)

    const { completed_at, create_at } = this.#database[table][rowIndex]
    console.log(completed_at, create_at)

    if (rowIndex > -1) {

      const Params = this.#database[table][rowIndex] = {
        id,
        title: data.title,
        description: data.description,
        completed_at,
        create_at,
        update_at: new Date()
      }

      console.log(Params)
      this.#persist()
    }
  }


  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }

  complete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)
    if (rowIndex > -1) {
      const task = this.#database[table][rowIndex]
      //= { id, completed_at: new Date() }
      task.completed_at = task.completed_at ? null : new Date
      task.completed_at = new Date()
      this.#persist()
      console.log(task)

    }
  }
}