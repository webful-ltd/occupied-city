import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const repoRoot = path.resolve(__dirname, '..')

// Usage:
//   node scripts/extract-citydata.mjs [path/to/services.js] [path/to/cities-data.js]
const servicesPath = path.resolve(
  repoRoot,
  process.argv[2] || path.join('src', 'js', 'services.js')
)
const outPath = path.resolve(
  repoRoot,
  process.argv[3] || path.join('src', 'js', 'cities-data.js')
)

const src = fs.readFileSync(servicesPath, 'utf8')

const anchor = src.indexOf('_getAll: function()')
if (anchor === -1) throw new Error('Could not locate _getAll: function()')

const sub = src.slice(anchor)
const returnIdx = sub.indexOf('return {')
if (returnIdx === -1) throw new Error('Could not locate return { within _getAll')

const braceStart = anchor + returnIdx + 'return '.length // points at the opening '{'

// Find the end of the returned object literal by scanning braces.
// We ignore braces inside strings/comments to avoid false positives.
let i = braceStart
let depth = 0
let inSingle = false
let inDouble = false
let inTemplate = false
let inLineComment = false
let inBlockComment = false
let prev = ''

for (; i < src.length; i++) {
  const ch = src[i]
  const next = i + 1 < src.length ? src[i + 1] : ''

  // handle comment states
  if (inLineComment) {
    if (ch === '\n') inLineComment = false
    prev = ch
    continue
  }
  if (inBlockComment) {
    if (ch === '*' && next === '/') {
      inBlockComment = false
      i++
      prev = ''
      continue
    }
    prev = ch
    continue
  }

  // enter comments (only if not in a string)
  if (!inSingle && !inDouble && !inTemplate) {
    if (ch === '/' && next === '/') {
      inLineComment = true
      i++
      prev = ''
      continue
    }
    if (ch === '/' && next === '*') {
      inBlockComment = true
      i++
      prev = ''
      continue
    }
  }

  // handle string states
  if (inSingle) {
    if (ch === "'" && prev !== '\\') inSingle = false
    prev = ch
    continue
  }
  if (inDouble) {
    if (ch === '"' && prev !== '\\') inDouble = false
    prev = ch
    continue
  }
  if (inTemplate) {
    if (ch === '`' && prev !== '\\') inTemplate = false
    prev = ch
    continue
  }

  // not in string/comment: toggle strings
  if (ch === "'") {
    inSingle = true
    prev = ch
    continue
  }
  if (ch === '"') {
    inDouble = true
    prev = ch
    continue
  }
  if (ch === '`') {
    inTemplate = true
    prev = ch
    continue
  }

  // count braces
  if (ch === '{') depth++
  if (ch === '}') {
    depth--
    if (depth === 0) {
      i++ // include closing brace
      break
    }
  }

  prev = ch
}

if (depth !== 0) throw new Error('Brace scan failed to find end of object literal')

const objLiteral = src.slice(braceStart, i)

const out = `// City dataset extracted from the legacy AngularJS CityData._getAll()\n//\n// Intentionally kept as a plain object export to minimize maintenance churn.\n\nconst citiesData = ${objLiteral}\n\nexport default citiesData\n`

fs.writeFileSync(outPath, out, 'utf8')

const hasManchester = out.includes('Manchester')
console.log(
  `Wrote ${outPath} (${out.length} chars) from ${servicesPath} (Manchester: ${hasManchester})`
)
