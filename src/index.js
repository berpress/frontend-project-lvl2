import { buildAst } from './ast.js';
import textDiff from './formatters/stylish.js';
import plainDiff from './formatters/plain.js';
import jsonFormat from './formatters/json.js';

const genDiff = (fileFirst, fileSecond, format = 'stylish') => {
  const diff = buildAst(fileFirst, fileSecond);
  if (format === 'stylish') {
    return textDiff(diff);
  } if (format === 'plain') {
    return plainDiff(diff);
  } if (format === 'json') {
    return jsonFormat(diff);
  }
  throw new Error('Check file format');
};

export default genDiff;
