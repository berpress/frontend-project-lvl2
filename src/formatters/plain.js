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
      type, children, name, value1, value2,
    } = value;
    const newPath = [...path, name];
    switch (type) {
      case 'add':
        return `Property '${newPath.join('.')}' was added with value: ${stringify(value2)}`;
      case 'del':
        return `Property '${newPath.join('.')}' was removed`;
      case 'changeChild':
        return `Property '${newPath.join('.')}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
      case 'change':
        return render(children, newPath);
      case 'same':
        return null;
      default:
        throw new Error(`Unknown type ${type} in ast`);
    }
  });
  return lines.filter((item) => item !== null).join('\n');
};

const renderPlainDiff = (diff) => render(diff);

export default renderPlainDiff;
