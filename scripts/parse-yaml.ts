import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import type { Nullable } from '@bryce-loskie/utils'
import YAML from 'yaml'

interface IEasingItem {
  name: string
  css: Nullable<string>
  math: string
}

const HEADER = `
import type { BezierDefinition } from 'motion'

/** 
* This file is generated from  https://github.com/ai/easings.net/blob/master/src/easings.yml
* 
* Live preview: https://easings.net/en#
**/
`

const parseYaml = (yamlFilePath: string) => {
  const raw = readFileSync(yamlFilePath, 'utf8')
  const res = YAML.parse(raw) as IEasingItem[]
  return res.map((item) => {
    const { name, css, math } = item
    const newCss = css === 'no' ? null : css?.split(/[()]/)[1]
    return {
      name,
      css: newCss ?? null,
      math,
    }
  }).filter(item => item.css)
    .reduce((acc, item) => {
      acc[item.name] = item.css!.split(', ').map(item => parseFloat(item))
      return acc
    }, {} as Record<string, number[]>)
}

const bootstrap = () => {
  const baseFolder = resolve(process.cwd(), 'packages/core', 'src/easing')
  const yamlFileName = 'easings.yml'
  const presetsFileName = 'presets.ts'

  const yamlFilePath = resolve(baseFolder, yamlFileName)
  const presetsFilePath = resolve(baseFolder, presetsFileName)

  const easings = parseYaml(yamlFilePath)
  writeFileSync(presetsFilePath, `${HEADER} export const EasingPresets: Record<string, BezierDefinition> = ${JSON.stringify(easings, null, 2)}`)
}

bootstrap()
