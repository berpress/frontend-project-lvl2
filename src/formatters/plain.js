const getValueType = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const render = (diff, path = []) => {
  const lines = diff.map((value) => {
    const { status, children, name } = value;
    const newPath = [...path, name];
    if (status !== 'same') {
      switch (status) {
        case 'add':
          return `Property '${newPath.join('.')}' was added with value: ${getValueType(children)}\n`;
        case 'del':
          return `Property '${newPath.join('.')}' was removed\n`;
        case 'changeChild':
          return `Property '${newPath.join('.')}' was updated. From ${getValueType(children.after)} to ${getValueType(children.before)}\n`;
        default:
          return render(children, newPath);
      }
    }
    return null;
  });
  return lines.join('');
};

const plainDiff = (diff) => render(diff).slice(0, -1);

export default plainDiff;
