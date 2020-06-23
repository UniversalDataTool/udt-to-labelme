const axios = require("axios")
const fs = require("fs")
const splitURL = require("../split-url/index.js")

const downloadImage = async (url, dest) => {
  const splittedUrl = splitURL(url)

  const writer = fs.createWriteStream(dest)

  const response = await axios({
    method: "get",
    url,
    responseType: "stream",
  })

  response.data.pipe(writer)

  await new Promise((resolve, reject) => {
    writer.on("finish", resolve)
    writer.on("error", reject)
  })

  return dest
}

module.exports = downloadImage
