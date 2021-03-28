import { buildAst } from './ast.js';
import textDiff from './formatters/stylish.js';
import plainDiff from './formatters/plain.js';
import jsonDiff from './formatters/json.js';
import parseFile from './parsers.js';

const genDiff = (firstFilePath, secondFilePath, format = 'stylish') => {
  const diff = buildAst(parseFile(firstFilePath), parseFile(secondFilePath));
  switch (format) {
    case 'plain':
      return plainDiff(diff);
    case 'json':
      return jsonDiff(diff);
    case 'stylish':
      return textDiff(diff);
    default:
      throw new Error('Check file format');
  }
};

export default genDiff;
