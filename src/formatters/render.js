import renderPlainDiff from './plain.js';
import renderJsonDiff from './json.js';
import renderTextDiff from './stylish.js';

const renderDiff = (ast, format) => {
  switch (format) {
    case 'plain':
      return renderPlainDiff(ast);
    case 'json':
      return renderJsonDiff(ast);
    case 'stylish':
      return renderTextDiff(ast);
    default:
      throw new Error(`Check the entered format: ${format}`);
  }
};

export default renderDiff;
