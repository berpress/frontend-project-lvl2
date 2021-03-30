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

const getChildData = (mark, name, children, depth) => {
  const removeLine = `${mark}- ${name}: ${stringify(children.after, depth)}`;
  const addLine = `${mark}+ ${name}: ${stringify(children.before, depth)}`;
  return [removeLine, addLine];
};

const renderTextDiff = (diff, depth = 1) => {
  const bracketIndent = indent(depth * spaceCount - 2);
  const parts = Object.keys(diff).flatMap(((key) => {
    const obj = diff[key];
    const { status, children, name } = obj;
    const mark = `${indent(depth * spaceCount - 1)}`;
    switch (status) {
      case 'add':
        return `${mark}+ ${name}: ${stringify(children, depth)}`;
      case 'del':
        return `${mark}- ${name}: ${stringify(children, depth)}`;
      case 'change':
        return `${indent(depth * spaceCount)}${name}: ${renderTextDiff(children, depth + 1)}`;
      case 'changeChild':
        return getChildData(mark, name, children, depth);
      default:
        return `${mark}  ${name}: ${stringify(children.value, depth)}`;
    }
  }));
  return [
    '{',
    ...parts,
    `${bracketIndent}}`,
  ].join('\n');
};

export default renderTextDiff;
