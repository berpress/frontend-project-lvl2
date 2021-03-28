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

const parseJson = (filePath) => (JSON.parse(readFileSync(getFilePath(filePath), 'utf8')));
const parseYml = (filePath) => (yaml.load(readFileSync(getFilePath(filePath), 'utf8')));

const parseFile = (filePath) => {
  const extname = path.extname(filePath);
  if (extname === '.json') {
    return parseJson(filePath);
  } if (extname === '.yml') {
    return parseYml(filePath);
  }
  throw new Error('Error reading file');
};

export default parseFile;
