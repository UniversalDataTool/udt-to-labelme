var fs = require("fs")
const path = require("path")
const probe = require("probe-image-size")

const base64Encode = async (filePath) => {
  // read binary data
  const imagePath = path.resolve(filePath)
  const bitmap = await fs.promises.readFile(imagePath)

  // convert binary data to base64 encoded string
  const bitMapOfImage = bitmap.toString("base64")

  return {
    imageData: bitMapOfImage,
    dimensions: probe.sync(bitmap),
  }
}

module.exports = base64Encode
