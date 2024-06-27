import fs from 'fs/promises';

export async function importFileCSV(req, res) {
  const pathname = new URL("src/upload/file.csv", import.meta.url);

  try {
    const fileData = await fs.readFile(pathname, "utf-8");

    const lines = fileData.trim().split('\n');
    const headers = lines[0].split(',').map(header => header.trim());

    const tasksArray = lines.slice(1).map(line => {
      const values = line.split(',').map(value => value.trim());
      const task = headers.reduce((acc, header, index) => {
        acc[header] = values[index];
        return acc;
      }, {});
      return task;
    });

    const buffers = tasksArray.map(task => JSON.stringify(task));

    req.file = buffers


    return buffers;

  } catch (error) {
    console.error("Error reading or processing file:", error);
  }
}


importFileCSV()