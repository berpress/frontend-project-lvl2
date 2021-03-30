import path from 'path';
import { readFileSync } from 'fs';
import yaml from 'js-yaml';

const resolvePath = (fileName) => {
  const currentWorkDir = process.cwd();
  return path.resolve(currentWorkDir, fileName);
};

const getFilePath = (fileName) => {
  if (path.isAbsolute(fileName)) {
    return fileName;
  }
  return resolvePath(fileName);
};

export const readFile = (filePath) => (readFileSync(getFilePath(filePath), 'utf8'));

const parseJson = (content) => (JSON.parse(content));
const parseYml = (content) => (yaml.load(content));

export const getParsedData = (format, content) => {
  if (format === '.json') {
    return parseJson(content);
  } if (format === '.yml') {
    return parseYml(content);
  }
  throw new Error('Error parse file');
};
