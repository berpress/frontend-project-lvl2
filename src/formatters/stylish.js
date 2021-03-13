// eslint-disable-next-line import/extensions
import _ from 'lodash';

const ADDED = 'add';
const DELETED = 'del';
const CHANGE = 'change';
const CHANGE_CHILD = 'changeChild';

const stringify = (value, replacer = ' ', spacesCount = 1, depthLine = 2) => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      if (currentValue === null) {
        return currentValue;
      }
      return currentValue.toString();
    }
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount + 2);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(value, depthLine);
};

function getLine(status, key, value, countSpace, currentIndent, depth) {
  let mark;
  switch (status) {
    case ADDED:
      mark = `${currentIndent}+`;
      return `${mark} ${key}: ${stringify(value, ' ', countSpace)}`;
    case DELETED:
      mark = `${currentIndent}-`;
      return `${mark} ${key}: ${stringify(value, ' ', countSpace)}`;
    case CHANGE:
      mark = `${currentIndent} `;
      // eslint-disable-next-line no-use-before-define
      return `${mark} ${key}: ${textDiff(value, depth + 2, countSpace)}`;
    case CHANGE_CHILD:
      mark = `${currentIndent}+`;
      // eslint-disable-next-line no-case-declarations
      const addLine = `${mark} ${key}: ${stringify(value.before, ' ', countSpace, depth + 2)}`;
      mark = `${currentIndent}-`;
      // eslint-disable-next-line no-case-declarations
      const removeLine = `${mark} ${key}: ${stringify(value.after, ' ', countSpace, depth + 2)}`;
      return [addLine, removeLine];
    default:
      mark = `${currentIndent} `;
      return `${mark} ${key}: ${stringify(value, ' ', countSpace)}`;
  }
}
// eslint-disable-next-line import/prefer-default-export
export function textDiff(diff, depth = 1, countSpace = 2) {
  const indentSize = depth * countSpace;
  const currentIndent = ' '.repeat(indentSize);
  const bracketIndent = ' '.repeat(indentSize - countSpace);
  const parts = Object.keys(diff).map(((key) => {
    const obj = diff[key];
    const { status, children: value } = obj;
    return getLine(status, key, value, countSpace, currentIndent, depth);
  }));
  const flattenArr = _.flatten(parts);
  return [
    '{',
    ...flattenArr,
    `${bracketIndent}}`,
  ].join('\n');
}
