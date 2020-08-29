var fs = require('fs')

const jsonifyText = text => {
  const cleaned = text
    .toString()
    .split("\n")
    .filter(Boolean)
    .map(item => item.split(/:(.+)/).filter(Boolean))

  const structured = {
    data: cleaned.reduce((acc, cur) => ([
      ...acc,
      {
        name: cur[0],
        url: cur[1]
      }
    ]), [])
  }

  return JSON.stringify(structured)
}

try {
  const filename = process.argv.slice(2).toString()

  if (!filename) {
    throw 'need filename param'
  }

  fs.readFile(filename, (err, data) => fs.writeFileSync(filename.replace('.txt', '.json'), jsonifyText(data)))

} catch (err) {
  console.error(err)
}
