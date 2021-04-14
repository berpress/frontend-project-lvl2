const spaceCount = 2;

const indent = (level) => (' '.repeat(level * spaceCount));

const stringify = (value, depth) => {
  const iter = (currentValue, currentDepth) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      return `${currentValue}`;
    }
    const bracketIndent = indent(currentDepth * spaceCount);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${indent((currentDepth + 1) * spaceCount)}${key}: ${iter(val, currentDepth + 1)}`);
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(value, depth);
};

const getChildDiffText = (mark, name, obj, depth) => {
  const removeLine = `${mark}- ${name}: ${stringify(obj.value1, depth)}`;
  const addLine = `${mark}+ ${name}: ${stringify(obj.value2, depth)}`;
  return [removeLine, addLine];
};

const renderTextDiff = (ast, depth = 1) => {
  const bracketIndent = indent(depth * spaceCount - 2);
  const parts = Object.keys(ast).flatMap(((key) => {
    const obj = ast[key];
    const {
      type, children, name, value2, value1,
    } = obj;
    const mark = `${indent(depth * spaceCount - 1)}`;
    switch (type) {
      case 'add':
        return `${mark}+ ${name}: ${stringify(value2, depth)}`;
      case 'del':
        return `${mark}- ${name}: ${stringify(value1, depth)}`;
      case 'change':
        return `${indent(depth * spaceCount)}${name}: ${renderTextDiff(children, depth + 1)}`;
      case 'changeChild':
        return getChildDiffText(mark, name, obj, depth);
      case 'same':
        return `${mark}  ${name}: ${stringify(value1, depth)}`;
      default:
        throw new Error('Unknown type');
    }
  }));
  return [
    '{',
    ...parts,
    `${bracketIndent}}`,
  ].join('\n');
};

export default renderTextDiff;
