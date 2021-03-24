import { buildAst } from '../ast.js';
import { textDiff } from './stylish.js';
import { plainDiff } from './plain.js';
import jsonFormat from './json.js';

export const genDiff = (fileFirst, fileSecond, format = 'stylish') => {
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
