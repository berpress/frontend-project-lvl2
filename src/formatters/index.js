// eslint-disable-next-line import/extensions
import { buildAst } from '../ast.js';
// eslint-disable-next-line import/extensions
import { textDiff } from './stylish.js';
// eslint-disable-next-line import/extensions
import { plainDiff } from './plain.js';
// eslint-disable-next-line import/prefer-default-export,consistent-return
export function gendiff(fileFirst, fileSecond, format) {
  const diff = buildAst(fileFirst, fileSecond);
  if (format === 'stylish') {
    return textDiff(diff);
  } if (format === 'plain') {
    return plainDiff(diff);
  }
}
