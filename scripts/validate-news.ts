import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { isValidSourceUrl } from './core'

const newsDirectory = path.resolve('content/news')
const files = (await readdir(newsDirectory)).filter((file) => file.endsWith('.md')).sort()
const failures: string[] = []

for (const file of files) {
  const filePath = path.join(newsDirectory, file)
  const raw = await readFile(filePath, 'utf8')
  const match = raw.match(/^---\s*([\s\S]*?)\s*---/)
  if (!match) {
    failures.push(`${file}: frontmatter manquante`)
    continue
  }

  const metadata = parseFrontmatter(match[1])
  const body = raw.slice(match[0].length)
  if (!metadata.source?.trim()) failures.push(`${file}: source manquante`)
  if (!metadata.sourceUrl || !isValidSourceUrl(metadata.sourceUrl)) failures.push(`${file}: sourceUrl HTTP(S) manquante ou invalide`)
  if (metadata.sourceUrl && !body.includes(metadata.sourceUrl)) failures.push(`${file}: le lien sourceUrl n'est pas présent dans le corps de la news`)
}

if (failures.length > 0) {
  console.error('✗ Validation des news échouée :')
  for (const failure of failures) console.error(`  - ${failure}`)
  process.exitCode = 1
} else {
  console.log(`✓ ${files.length} news validée(s) : source et lien officiel présents.`)
}

function parseFrontmatter(frontmatter: string) {
  const values: Record<string, string> = {}
  for (const line of frontmatter.split('\n')) {
    const separator = line.indexOf(':')
    if (separator < 0) continue
    const key = line.slice(0, separator).trim()
    const value = line.slice(separator + 1).trim().replace(/^'(.*)'$/, '$1').replaceAll("''", "'")
    values[key] = value
  }
  return values
}
