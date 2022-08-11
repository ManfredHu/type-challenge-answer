import fs from "fs-extra";
import { globby } from "globby";
import debug from 'debug'
import path from 'path'
import { answerBasePath, basePath, questionBasePath, questionGlob } from './config'
const _debug = debug(`log:${path.basename(__filename)}`)

async function getFilesContent() {
  let files = await globby(questionGlob);
  _debug(files)

  let text: string = '// ❌ The following code is automatically generated, please do not modify it\n'
  
  const testUtilsContent = fs.readFileSync(path.resolve(__dirname, '../questions/test-utils.ts'), 'utf8')
  text += testUtilsContent + '\n'

  for (let file of files) {
    let content = await fs.readFile(file, 'utf-8')
    
    // macth like below
    // ============= Your Code Here =============
    // 👉 will be catch by the pattern 
    // 👉 will be catch by the pattern
    // 
    // other comment, the above notes are used to extract the answer.
    const reg = /(\/\/ =* Your Code Here =*\n)([\s\S]*?)(\n(\/\/))/g
    const rst = reg.exec(content)
    if (rst?.[2]) {
      text += `
// ============= ${file} =============
// Question: ${questionBasePath}${path.basename(file, '.ts')}/README.md
// Answer: ${answerBasePath}${file}
${rst[2]}`
    }
  }
  _debug(text)
  fs.writeFile(path.resolve(__dirname, '../dist/index.d.ts'), text, { flag: 'w+' }, err => {
    console.error(err)
  })
}
async function main() {
  const filePathsWithRank = await getFilesContent();
   
}
main()