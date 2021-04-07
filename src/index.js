import renderTextDiff from './formatters/stylish.js';
import renderPlainDiff from './formatters/plain.js';
import renderJsonDiff from './formatters/json.js';
import parseFile from './parsers.js';
import { getType, readFile } from './files.js';
import buildAst from './ast.js';

const renderDiff = (ast, format) => {
  switch (format) {
    case 'plain':
      return renderPlainDiff(ast);
    case 'json':
      return renderJsonDiff(ast);
    case 'stylish':
      return renderTextDiff(ast);
    default:
      throw new Error('Check file format');
  }
};

const genDiff = (firstFilePath, secondFilePath, format = 'stylish') => {
  const firstParsedData = parseFile(getType(firstFilePath), readFile(firstFilePath));
  const secondParsedData = parseFile(getType(secondFilePath), readFile(secondFilePath));
  const ast = buildAst(firstParsedData, secondParsedData);
  return renderDiff(ast, format);
};

export default genDiff;
