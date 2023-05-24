import fs from 'fs'
import path from 'path'

export const del = (dir: string) => {
  return new Promise((resolve, reject) => {   
  
    fs.unlink(path.join(process.cwd(), 'src', 'images', dir), err => {

      if (err) reject(err)
      
      resolve('delete')

    })

  })
}