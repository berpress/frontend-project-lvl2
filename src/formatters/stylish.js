// eslint-disable-next-line import/extensions
import _ from 'lodash';

const ADDED = 'add';
const DELETED = 'del';
const CHANGE = 'change';
const CHANGE_CHILD = 'changeChild';

const indent = (level) => ('  '.repeat(level));

const stringify = (value, depth) => {
  const iter = (currentValue, currentDepth) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      if (currentValue === null) {
        return currentValue;
      }
      return currentValue.toString();
    }
    const bracketIndent = indent(currentDepth * 2);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${indent(currentDepth + 1)}${indent(currentDepth + 1)}${key}: ${iter(val, currentDepth + 1)}`);
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(value, depth);
};

// eslint-disable-next-line import/prefer-default-export
export function textDiff(diff, depth = 1, countSpace = 2) {
  const bracketIndent = indent(depth * 2 - 2);
  const parts = Object.keys(diff).map(((key) => {
    const obj = diff[key];
    const { status, children: value } = obj;
    const mark = `${indent(depth * 2 - 1)}`;
    switch (status) {
      case ADDED:
        return `${mark}+ ${key}: ${stringify(value, depth, countSpace)}`;
      case DELETED:
        return `${mark}- ${key}: ${stringify(value, depth, countSpace)}`;
      case CHANGE:
        // eslint-disable-next-line no-case-declarations
        const mark2 = `${indent(depth * 2)}`;
        // eslint-disable-next-line no-use-before-define
        return `${mark2}${key}: ${textDiff(value, depth + 1, countSpace)}`;
      case CHANGE_CHILD:
        // eslint-disable-next-line no-case-declarations
        const removeLine = `${mark}- ${key}: ${stringify(value.after, depth, countSpace)}`;
        // eslint-disable-next-line no-case-declarations
        const addLine = `${mark}+ ${key}: ${stringify(value.before, depth, countSpace)}`;
        return [removeLine, addLine];
      default:
        return `${mark}  ${key}: ${stringify(value, depth, countSpace)}`;
    }
  }));
  const flattenArr = _.flatten(parts);
  return [
    '{',
    ...flattenArr,
    `${bracketIndent}}`,
  ].join('\n');
}
