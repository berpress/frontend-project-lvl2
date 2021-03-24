import path from 'path';
import { buildAst } from './ast.js';
import textDiff from './formatters/stylish.js';
import plainDiff from './formatters/plain.js';
import jsonFormat from './formatters/json.js';
import { jsonParser, yamlParser } from './parsers.js';

const getFileData = (file) => {
  const extname = path.extname(file);
  if (extname === '.yaml' || extname === '.yml') {
    return yamlParser(file);
  } if (extname === '.json') {
    return jsonParser(file);
  }
  throw new Error('Error reading file');
};

const genDiff = (fileFirst, fileSecond, format = 'stylish') => {
  const diff = buildAst(getFileData(fileFirst), getFileData(fileSecond));
  if (format === 'stylish') {
    return textDiff(diff);
  } if (format === 'plain') {
    return plainDiff(diff);
  } if (format === 'json') {
    return jsonFormat(diff);
  }
  throw new Error('Check file format');
};

export default genDiff;
