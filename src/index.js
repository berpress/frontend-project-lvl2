import parseContent from './parsers.js';
import { getType, readFile } from './files.js';
import buildAst from './ast.js';
import renderDiff from './formatters/render.js';

const genDiff = (firstFilePath, secondFilePath, format = 'stylish') => {
  const firstParsedData = parseContent(getType(firstFilePath), readFile(firstFilePath));
  const secondParsedData = parseContent(getType(secondFilePath), readFile(secondFilePath));
  const ast = buildAst(firstParsedData, secondParsedData);
  return renderDiff(ast, format);
};

export default genDiff;
