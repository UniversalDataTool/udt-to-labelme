const fs = require('fs')

const base64Decode = async ({ base64string, filePathtoWrite }) => {
    const bitmap = new Buffer.from(base64string.toString(), 'base64');

    fs.writeFileSync(filePathtoWrite, bitmap)  
}

module.exports = base64Decode