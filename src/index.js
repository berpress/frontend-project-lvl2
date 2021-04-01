import renderTextDiff from './formatters/stylish.js';
import renderPlainDiff from './formatters/plain.js';
import renderJsonDiff from './formatters/json.js';
import parsedFile from './parsers.js';
import { getType, readFile } from './files.js';
import buildAst from './ast.js';

const genDiff = (firstFilePath, secondFilePath, format = 'stylish') => {
  const firstParsedData = parsedFile(getType(firstFilePath), readFile(firstFilePath));
  const secondParsedData = parsedFile(getType(secondFilePath), readFile(secondFilePath));
  const ast = buildAst(firstParsedData, secondParsedData);
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

export default genDiff;
