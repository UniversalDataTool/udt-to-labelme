const base64Encode = require("./utils/base-64-encode/index.js")
const downloadImage = require("./utils/download-image/index.js")
const fs = require("fs")

const main = async ({ inputFile, outputFolder }) => {
  let imageWidth
  let imageHeight
  const udtJSON = inputFile

  if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder)

  console.log("\n===========Converting process started===========")

  for (const sample of udtJSON["samples"]) {
    try {
      const newLabelmeJSON = {
        version: "4.5.0",
        flags: {},
        shapes: [],
        imagePath: "",
        imageData: "",
        imageHeight: "",
        imageWidth: "",
      }

      const fileName = sample.cutomId
        ? sample.customId.split("/").slice(-1)[0]
        : sample.imageUrl.split("/").slice(-1)[0]
      const fileNameWithoutExtension = fileName.split(".png")[0]

      const imageUrl = sample.imageUrl
      const localImagePath = await downloadImage(
        imageUrl,
        `${outputFolder}/${fileName}`
      )
      const fullImagePath = "./" + localImagePath

      newLabelmeJSON.imagePath = fullImagePath

      const { imageData, dimensions } = await base64Encode(fullImagePath)
      newLabelmeJSON.imageData = imageData
      imageWidth = dimensions.width
      imageHeight = dimensions.height

      for (const annotation of sample.annotation) {
        let newLabelmeJSONFormattedPoints = []

        let regionType = annotation.regionType
        const classification =
          annotation.classification || annotation.labels
            ? annotation.classification
              ? annotation.classification
              : annotation.labels[0]
            : "undefined"

        switch (regionType) {
          case "polygon":
            newLabelmeJSONFormattedPoints = annotation.points.map((point) => [
              point.x,
              point.y,
            ])
            newLabelmeJSONFormattedPoints = newLabelmeJSONFormattedPoints.map(
              (point) => {
                // x
                point[0] = point[0] * imageWidth
                // y
                point[1] = point[1] * imageHeight

                return point
              }
            )
            break

          case "bounding-box":
            const { centerX: cx, centerY: cy, width: w, height: h } = annotation
            newLabelmeJSONFormattedPoints = [
              [cx - w / 2, cy - h / 2],
              [cx + w / 2, cy - h / 2],
              [cx + w / 2, cy + h / 2],
              [cx - w / 2, cy + h / 2],
            ].map(([x, y]) => [x * imageWidth, y * imageHeight])
            regionType = "polygon"
            break

          default:
            break
        }
        newLabelmeJSON.shapes.push({
          label: classification ? classification : "undefined",
          points: newLabelmeJSONFormattedPoints,
          shape_type: regionType,
          group_id: null,
          flags: {},
        })
        newLabelmeJSON.imageWidth = imageWidth
        newLabelmeJSON.imageHeight = imageHeight
        await fs.promises.writeFile(
          `${outputFolder}/${fileNameWithoutExtension}.json`,
          JSON.stringify(newLabelmeJSON)
        )
        console.log("Successfully converted: " + fileNameWithoutExtension)
      }
    } catch (e) {
      console.log("error with sample")
      console.log(e.stack)
      console.log(e.toString())
      process.exit(1)
    }
  }
  console.log(
    `\n===========All files successfully converted===========\n You can find the converted files in ${outputFolder}`
  )
}

const udt2Labelme = main
module.exports = udt2Labelme
