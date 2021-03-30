const stringify = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const render = (diff, path = []) => {
  const lines = diff.map((value) => {
    const { status, children, name } = value;
    const newPath = [...path, name];
    switch (status) {
      case 'add':
        return `Property '${newPath.join('.')}' was added with value: ${stringify(children)}\n`;
      case 'del':
        return `Property '${newPath.join('.')}' was removed\n`;
      case 'changeChild':
        return `Property '${newPath.join('.')}' was updated. From ${stringify(children.after)} to ${stringify(children.before)}\n`;
      case 'same':
        return null;
      default:
        return render(children, newPath);
    }
  });
  return lines.join('');
};

const renderPlainDiff = (diff) => render(diff).slice(0, -1);

export default renderPlainDiff;
