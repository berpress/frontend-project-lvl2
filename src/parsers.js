import path from 'path';
import { readFileSync } from 'fs';
import pkg from 'js-yaml/lib/js-yaml.js';

const { load } = pkg;

const getFilePath = (fileName) => {
  if (path.isAbsolute(fileName)) {
    return fileName;
  }
  const currentWorkDir = process.cwd();
  return path.resolve(currentWorkDir, fileName);
};

export const jsonParser = (file) => JSON.parse(readFileSync(getFilePath(file), 'utf8'));
export const yamlParser = (file) => load(readFileSync(getFilePath(file), 'utf8'));
