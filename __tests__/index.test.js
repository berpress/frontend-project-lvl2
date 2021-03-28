import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const testData = [
  ['stylish', 'json'],
  ['plain', 'json'],
  ['json', 'json'],
  ['stylish', 'yml'],
  ['plain', 'yml'],
  ['json', 'yml'],
];
test.each(testData)('test diff for format %s and type %s', (format, fileType) => {
  const firstFilePath = getFixturePath(`before.${fileType}`);
  const secondFilePath = getFixturePath(`after.${fileType}`);
  const result = readFile(`format_${format}_diff_${fileType}`);
  expect(genDiff(firstFilePath, secondFilePath, format)).toEqual(result);
});

test('check default format', () => {
  const firstFilePath = getFixturePath('before.json');
  const secondFilePath = getFixturePath('after.json');
  const result = readFile('format_stylish_diff_json');
  expect(genDiff(firstFilePath, secondFilePath)).toEqual(result);
});
