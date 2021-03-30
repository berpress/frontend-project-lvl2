import path from 'path';
import { buildAst } from './ast.js';
import renderTextDiff from './formatters/stylish.js';
import renderPlainDiff from './formatters/plain.js';
import renderJsonDiff from './formatters/json.js';
import parseFile from './parsers.js';
import { readFile } from './files.js';

const genDiff = (firstFilePath, secondFilePath, format = 'stylish') => {
  const firstExtname = path.extname(firstFilePath);
  const secondExtname = path.extname(secondFilePath);
  const firstParseData = parseFile(firstExtname, readFile(firstFilePath));
  const secondParseData = parseFile(secondExtname, readFile(secondFilePath));
  const diff = buildAst(firstParseData, secondParseData);
  switch (format) {
    case 'plain':
      return renderPlainDiff(diff);
    case 'json':
      return renderJsonDiff(diff);
    case 'stylish':
      return renderTextDiff(diff);
    default:
      throw new Error('Check file format');
  }
};

export default genDiff;
