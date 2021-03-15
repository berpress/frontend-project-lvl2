function getValueType(value) {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
}
// eslint-disable-next-line import/prefer-default-export
export function plainDiff(diff, path = []) {
  const lines = Object
    .entries(diff)
  // eslint-disable-next-line array-callback-return,consistent-return
    .map(([key, val]) => {
      const newPath = [...path, key];
      if (val.status !== 'same') {
        switch (val.status) {
          case 'add':
            return `Property '${newPath.join('.')}' was added with value: ${getValueType(val.children)}\n`;
          case 'del':
            return `Property '${newPath.join('.')}' was removed\n`;
          case 'changeChild':
            return `Property '${newPath.join('.')}' was updated. From ${getValueType(val.children.after)} to ${getValueType(val.children.before)}\n`;
          default:
            return plainDiff(val.children, newPath);
        }
      }
    });
  return lines.join('');
}

export function render(diff) { return plainDiff(diff).slice(0, -1); }
