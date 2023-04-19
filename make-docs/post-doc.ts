import * as fs from 'fs'
import * as process from 'process'

const cwd = process.cwd()
if (!cwd.endsWith('/make-docs')) {
  throw Error('Please run this script from the make-docs directory')
}

const moves: Array<(s: string) => string> = [
  (s) => s.replace(/classes\/(.*Api.md)/, 'entrypoints/$1'),
  (s) => s.replace(/classes\/(.*Builder.md)/, 'builders/$1'),
  (s) => s.replace(/classes\/(.*Filter.md)/, 'filters/$1'),
  (s) => s.replace(/interfaces\/(.*Api.md)/, 'apis/$1'),
]

function fixLinks(line: string): string {
  return moves.reduce((s, f) => s
      .replace(/\((.+?\.md)([)#])/g, (match, link, end) => `(${f(link)}${end}`)
    , line)
    .replace(/\((.+?)\.md([)#])/g, "($1$2")
}

function extract(lines: string[], startOfBlock: string, newStartOfBlock: string, endOfBlock: string = '### ', matcher: (s: string) => boolean = () => true) {
  return lines.reduce(({inBlock, content}, line) => {
    if (line === startOfBlock) {
      return {inBlock: true, content: content + newStartOfBlock + '\n'}
    } else if (inBlock) {
      if (line.startsWith(endOfBlock)) {
        return {inBlock: false, content}
      } else {
        return {inBlock, content: matcher(line) ? content + fixLinks(line) + '\n' : content}
      }
    } else {
      return {inBlock: false, content}
    }
  }, {inBlock: false, content: ''});
}

function scanAndRunRecursively(dir: string) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      throw err
    }
    files.forEach(async (filename) => {
      const fullpath = `${dir}/${filename}`
      if (filename !== 'node_modules') {
        if (fs.lstatSync(fullpath).isDirectory()) {
          scanAndRunRecursively(fullpath)
        } else if (
          fs.lstatSync(fullpath).isFile()
        ) {
          if (filename === 'modules.md') {
            // Read the file line by line and accumulate changes in newFile
            const fileContent = fs.readFileSync(fullpath, 'utf8')
            const lines = fileContent.split('\n')
            const header = extract(lines, '# @icure/medical-device-sdk', '# Package @icure/medical-device-sdk')
            const classes = extract(lines, '### Classes', '### Domain classes', '### ', (s) => !s.match(/.*Api.md/) && !s.match(/.*Builder.md/) && !s.match(/.*Filter.md/))
            const filters = extract(lines, '### Classes', '### Filters', '### ', (s) => !!s.match(/.*Filter.md/))
            const builders = extract(lines, '### Classes', '### Builders', '### ', (s) => !!s.match(/.*Builder.md/))
            const entryPoints = extract(lines, '### Classes', '### Entry points APIs', '###', (s) => !!s.match(/.*Api.md/))
            const apis = extract(lines, '### Interfaces', '### APIs', '###', (s) => !!s.match(/.*Api.md/))
            const interfaces = extract(lines, '### Interfaces', '### Interfaces', '###', (s) => !s.match(/.*Api.md/))
            const functions = extract(lines, '### Functions', '### Utility functions', '## ')
            const functionsDocumentation = extract(lines.concat('##END##'), '## Functions', '### Utility Functions Documentation', '##END##')

            const newFile = header.content + '\n\n' + entryPoints.content + '\n\n' + builders.content + '\n\n' + apis.content + '\n\n' + interfaces.content + '\n\n' + classes.content + '\n\n' + filters.content + '\n\n' + functions.content + '\n\n' + functionsDocumentation.content

            fs.writeFileSync(fullpath, newFile, 'utf8')
          } else {
            const newPath = moves.reduce((s, f) => f(s), fullpath)

            if (fullpath !== newPath) {
              fs.mkdirSync(newPath.replace(/\/[^\/]+$/, ''), {recursive: true})
            }

            if (filename.match(/.*Api.md/)) {
              fs.writeFileSync(newPath, fs.readFileSync(fullpath, 'utf8')
                  .replace(/# Interface: (.+)/, "# SDK API: $1")
                  .split('\n').map(fixLinks).join('\n')
                , 'utf8')
            } else {
              fs.writeFileSync(newPath, fs.readFileSync(fullpath, 'utf8')
                  .replace(/\((.+?)\.md\)/g, "($1)")
                  .split('\n').map(fixLinks).join('\n')
                , 'utf8')
            }

            if (fullpath !== newPath) {
              fs.unlinkSync(fullpath)
            }

          }
        }
      }
    })
  })
}

;[`../docs`].forEach((module) => {
  scanAndRunRecursively(`${cwd}/${module}`)
})
