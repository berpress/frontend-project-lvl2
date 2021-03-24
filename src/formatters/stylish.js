import _ from 'lodash';

const indent = (level) => ('  '.repeat(level));

const stringify = (value, depth) => {
  const iter = (currentValue, currentDepth) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      return currentValue;
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

const getChildData = (mark, name, children, depth) => {
  const removeLine = `${mark}- ${name}: ${stringify(children.after, depth)}`;
  const addLine = `${mark}+ ${name}: ${stringify(children.before, depth)}`;
  return [removeLine, addLine];
};

// eslint-disable-next-line import/prefer-default-export
export const textDiff = (diff, depth = 1) => {
  const bracketIndent = indent(depth * 2 - 2);
  const parts = Object.keys(diff).map(((key) => {
    const obj = diff[key];
    const { status, children, name } = obj;
    const mark = `${indent(depth * 2 - 1)}`;
    switch (status) {
      case 'add':
        return `${mark}+ ${name}: ${stringify(children, depth)}`;
      case 'del':
        return `${mark}- ${name}: ${stringify(children, depth)}`;
      case 'change':
        return `${indent(depth * 2)}${name}: ${textDiff(children, depth + 1)}`;
      case 'changeChild':
        return getChildData(mark, name, children, depth);
      default:
        return `${mark}  ${name}: ${stringify(children.value, depth)}`;
    }
  }));
  const flattenArr = _.flatten(parts);
  return [
    '{',
    ...flattenArr,
    `${bracketIndent}}`,
  ].join('\n');
};
