import fs from 'fs'
import path from 'path'

import { sort } from './utils';

// Where the maps are located
const mapsDirectory = path.join(process.cwd(), 'data/maps')

export function getAllMapIds() {
  const fileNames = fs.readdirSync(mapsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: { id: '1' }
  //   },
  //   {
  //     params: { id: '2' }
  //   }
  // ]
  return fileNames.map(fileName => ({
    params: {
      id: fileName.replace(/\.json$/, '')
    }
  }))
}

export function getMapData(id) {
  const fullPath = path.join(mapsDirectory, `${id}.json`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Convert the string into a POJO
  const jsonResult = JSON.parse(fileContents)

  // Combine the data with the id
  return { id, ...jsonResult }
}

export function getSortedMapsData() {
  // Get file names under /maps
  const fileNames = fs.readdirSync(mapsDirectory)

  const allMapsData = fileNames.map(fileName => {
    // Remove ".json" from file name to get id and make it a number
    const id = Number(fileName.replace(/\.json$/, ''))

    // Read JSON file as string
    const fullPath = path.join(mapsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Convert the string into a POJO
    const jsonResult = JSON.parse(fileContents)

    // Combine the data with the id
    return { id, ...jsonResult }
  })

  // Sort maps by id
  return sort(allMapsData, { by: 'id' })
}
