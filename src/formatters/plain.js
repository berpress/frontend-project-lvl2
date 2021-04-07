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
        return `Property '${newPath.join('.')}' was added with value: ${stringify(after)}`;
      case 'del':
        return `Property '${newPath.join('.')}' was removed`;
      case 'changeChild':
        return `Property '${newPath.join('.')}' was updated. From ${stringify(after)} to ${stringify(before)}`;
      case 'change':
        return render(children, newPath);
      default:
        return '';
    }
  });
  return lines.join('\n').replace(/\n+/g, '\n');
};

const renderPlainDiff = (diff) => render(diff);

export default renderPlainDiff;
