import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

function copyReadme() {
  const srcPath = path.join(__dirname, '../README.md')
  const cwd = process.cwd()
  const destPath = path.join(cwd, 'README.md')
  fs.copyFileSync(srcPath, destPath)
}

copyReadme()
