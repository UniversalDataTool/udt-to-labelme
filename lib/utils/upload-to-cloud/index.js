const uploadToCloud = async ({ filePath }) => {
    const remoteURL = `https://files.universaldatatool.com/a`
  
    const axios = require("axios")
  
    const fsFileBuffer = require("fs").readFileSync(filePath)
  
    const uploadedFileURL = await axios
      .put(remoteURL, fsFileBuffer)
      .then((response) => {
          if (response.status === 200) {
              return response.data
          }
      }).then((imageUrl) => {
          const downloadableUrl = imageUrl.replace(
              "universaldatatool.com/",
              "universaldatatool.com/get/"
          )
  
          return downloadableUrl
      })
  
      return uploadedFileURL
  }
  
  module.exports = uploadToCloud