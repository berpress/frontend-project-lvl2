import path from 'path';
import { readFileSync } from 'fs';

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

export const readFile = (filePath) => readFileSync(getFilePath(filePath), 'utf8');

export const getType = (data) => {
  const extname = path.extname(data);
  if (extname === '.yml' || extname === '.yaml') {
    return 'yml';
  }
  if (extname === '.json') {
    return 'json';
  }
  throw new Error(`Unknown file type ${extname}`);
};
