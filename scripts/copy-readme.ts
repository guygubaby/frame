import path from 'path'
import fs from 'fs'

const copyReadme = () => {
  const srcPath = path.join(__dirname, '../README.md')
  const cwd = process.cwd()
  const destPath = path.join(cwd, 'README.md')
  fs.copyFileSync(srcPath, destPath)
}

copyReadme()
