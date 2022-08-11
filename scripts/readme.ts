import fs from "fs-extra";
import { globby } from "globby";
import debug from 'debug'
import path from 'path'
import { DifficultyColors, DifficultyRank, toBadgeLink } from "./third-party";
import { basePath, questionGlob } from './config'
const _debug = debug(`log:${path.basename(__filename)}`)

type Rank = typeof DifficultyRank[number]
type FilesByRank = {
  [key in Rank]?: string[];
};
const allQuestionsWithRank: FilesByRank = {};
async function getFilesByRank() {
  const packages = await globby(questionGlob);

  const fileWithRank = packages.reduce((acc: FilesByRank, cur: string) => {
    const level = cur.split("/")[1].split("-")[1] as Rank
    if (!acc[level]) acc[level] = [];
    acc[level]!.push(cur);
    return acc;
  }, allQuestionsWithRank);

  _debug(fileWithRank)
  return fileWithRank;
}

function genREADMECatalgory(data: FilesByRank) {
  let text = ''
  for (const [rank, filePathArr] of Object.entries(data)) {
    text += toBadgeLink(basePath, rank, String(filePathArr.length), DifficultyColors[rank]) + '<br />'
    
    filePathArr.map(i => {
      const [num, questionRank, questionName] = path.basename(i, '.ts').split('-')
      text += toBadgeLink(basePath + i, '', `${parseInt(num)}・${questionName}`, DifficultyColors[questionRank])
    })

    text += '<br />'.repeat(2)
  }
  return text
}
async function insertInfoReadme(filepath: string, replacedText: string) {
  if (!fs.existsSync(filepath)) return
  let text = await fs.readFile(filepath, 'utf-8')
  /* eslint-disable prefer-template */

  // [\s\S]* match any character, but .* will block with \n 
  text = text
    .replace(
      /<!-- Here with topic and answer list start -->[\s\S]*<!-- Here with topic and answer list end -->/,
      '<!-- Here with topic and answer list start -->'
      + '\n<p>'
      + replacedText
      + '</p>\n'
      + '<!-- Here with topic and answer list end -->',
    )

  /* eslint-enable prefer-template */
  await fs.writeFile(filepath, text, 'utf-8')
}

async function main() {
  const filePathsWithRank = await getFilesByRank();
  const text = genREADMECatalgory(filePathsWithRank)
  _debug(text)
  insertInfoReadme(path.resolve(__dirname, '../readme.md'), text)
}
main()