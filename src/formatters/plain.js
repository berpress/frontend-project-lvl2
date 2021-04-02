const stringify = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const render = (ast, path = []) => {
  const lines = ast.map((value) => {
    const {
      type, children, name, after, before,
    } = value;
    const newPath = [...path, name];
    switch (type) {
      case 'add':
        return `Property '${newPath.join('.')}' was added with value: ${stringify(after)}\n`;
      case 'del':
        return `Property '${newPath.join('.')}' was removed\n`;
      case 'changeChild':
        return `Property '${newPath.join('.')}' was updated. From ${stringify(after)} to ${stringify(before)}\n`;
      case 'same':
        return '';
      default:
        return render(children, newPath);
    }
  });
  return lines.join('');
};

const renderPlainDiff = (diff) => render(diff).slice(0, -1); // Need for "green" hexlet tests

export default renderPlainDiff;
