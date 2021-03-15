function getValueType(value) {
  if (typeof value === 'object' && value !== null) {
    return '[complex object]';
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
        let pathStr;
        switch (val.status) {
          case 'add':
            pathStr = newPath.join('.');
            return `Property ${pathStr} was added with value: ${getValueType(val.children)}\n`;
          case 'del':
            pathStr = newPath.join('.');
            return `Property ${pathStr} was removed\n`;
          case 'changeChild':
            pathStr = newPath.join('.');
            return `Property ${pathStr} was updated. From ${getValueType(val.children.after)} to ${getValueType(val.children.before)}\n`;
          default:
            return plainDiff(val.children, newPath);
        }
      }
    });
  return lines.join('');
}
