#!/usr/bin/env node
const argv = require('yargs').argv
const { labelme2Udt, udt2Labelme } = require('./index')
const fs = require('fs')
const path = require('path')

let outputFolder = path.relative(process.cwd(), 'output')
const inputFile = argv.input
if(argv.output) outputFolder =  path.relative(process.cwd(), argv.output)
if(!inputFile){
    console.log(' You need to give an input file to convert\n For example: npx udt-labelme-converter --input=my-precious-samples.json --output=where-i-want-to-see-my-output-files')
}else{
    const jsonFile = JSON.parse(fs.readFileSync(inputFile).toString())

    const jsonFileKeys = Object.keys(jsonFile)
    jsonFileKeys.map(jsonFileKey => jsonFileKey.toLowerCase())
    
    const isThereShapes = jsonFileKeys.includes('shapes')
    const isThereSamples = jsonFileKeys.includes('samples')
    const isThereVersion = jsonFileKeys.includes('version')
    const isThereFlags = jsonFileKeys.includes('flags')
    const isThereImagePath = jsonFileKeys.includes('imagePath')
    const isThereImageData = jsonFileKeys.includes('imageData')
    const isThereImageHeight = jsonFileKeys.includes('imageHeight')
    const isThereImageWidth = jsonFileKeys.includes('imageWidth')

    if(isThereSamples && !isThereShapes && !isThereVersion && !isThereFlags && (!isThereImagePath || !isThereImageData) && !isThereImageHeight && !isThereImageWidth){
        udt2Labelme({
            inputFile: jsonFile,
            outputFolder
        })
    }else if(isThereSamples){
        console.log("We're working on labelme conversion")
    }
}
