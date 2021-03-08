import path from 'path';
import { readFileSync } from 'fs';
// eslint-disable-next-line import/extensions
import { load } from 'js-yaml/lib/js-yaml.js';

function getFilePath(fileName) {
  if (path.isAbsolute(fileName)) {
    return fileName;
  }
  const currentWorkDir = process.cwd();
  return path.resolve(currentWorkDir, fileName);
}

export function jsonParser(file) { return JSON.parse(readFileSync(getFilePath(file), 'utf8')); }
export function yamlParser(file) { return load(readFileSync(getFilePath(file), 'utf8')); }
