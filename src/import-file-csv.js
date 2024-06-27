import fs from 'node:fs/promises'

export async function importFileCSV(req, res) {
  const pathname = new URL("src/upload/file.csv", import.meta.url)

  const fileJSON = await fs.readFile(pathname, "utf-8")
    .then(data => data)

  const lines = fileJSON.trim().split('\n');

  const headers = lines[0].split(',');
  console.log(headers + "\n")

  const tasksArray = lines.slice(1).map(line => {
    const values = line.split(',');
    const task = {};

    headers.forEach((header, index) => {
      task[header.trim()] = values[index].trim();
    });

    return task
  });

  const buffers = []

  for (const chunk of tasksArray) {
    buffers.push(chunk)
  }



  req.file = buffers
}
