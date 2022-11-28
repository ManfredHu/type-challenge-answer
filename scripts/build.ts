import fs from "fs-extra";
import { globby } from "globby";
import debug from "debug";
import path from "path";
import {
  answerBasePath,
  basePath,
  questionBasePath,
  questionGlob,
} from "./config";
const _debug = debug(`log:${path.basename(__filename)}`);

async function getFilesContent() {
  let files = await globby(questionGlob);
  _debug(files);

  let text: string =
    "// ❌ The following code is automatically generated, please do not modify it\n";

  const testUtilsContent = fs.readFileSync(
    path.resolve(__dirname, "../questions/test-utils.ts"),
    "utf8"
  );
  text += testUtilsContent + "\n";

  for (let file of files) {
    let content = await fs.readFile(file, "utf-8");

    // macth like below
    // ============= Your Code Here =============
    // 👉 will be catch by the pattern
    // 👉 will be catch by the pattern
    // @answer-end
    // other comment, the above notes are used to extract the answer.
    const reg =
      /(\/\/\s*=*\s*Your Code Here\s*=*\s*\n)([\s\S]*?)(\n(\/\/\s+@answer-end))/g;
    const rst = reg.exec(content);
    if (rst?.[2]) {
      text += `
// ============= ${file} =============
// Question: ${questionBasePath}${path.basename(file, ".ts")}/README.md
// Answer: ${answerBasePath}${file}
${rst[2]}`;
    } else if (!/hello-world/.test(file)) {
      console.warn("not match: " + file);
    }
  }
  _debug(text);
  fs.writeFile(
    path.resolve(__dirname, "../dist/index.d.ts"),
    text,
    { flag: "w+" },
    (err) => {
      if (err) {
        console.error('something err: ', err);
      } else {
        console.log('build success');
      }
    }
  );
}
async function main() {
  const filePathsWithRank = await getFilesContent();
  _debug('filePathsWithRank', filePathsWithRank)
}
main();
