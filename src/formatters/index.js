// eslint-disable-next-line import/extensions
import { buildAst } from '../ast.js';
// eslint-disable-next-line import/extensions
import { textDiff } from './stylish.js';
// eslint-disable-next-line import/extensions
import { render } from './plain.js';
// eslint-disable-next-line import/extensions
import jsonFormat from './json.js';
// eslint-disable-next-line import/prefer-default-export,consistent-return
export function genDiff(fileFirst, fileSecond, format = 'stylish') {
  const diff = buildAst(fileFirst, fileSecond);
  if (format === 'stylish') {
    return textDiff(diff);
  } if (format === 'plain') {
    return render(diff);
  } if (format === 'json') {
    return jsonFormat(diff);
  }
}
