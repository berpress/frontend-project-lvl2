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
  ['stylish', 'before.json', 'after.json', 'format_stylish_diff_json'],
  ['plain', 'before.json', 'after.json', 'format_plain_diff_json'],
  ['json', 'before.json', 'after.json', 'format_json_diff_json'],
  ['stylish', 'before.yml', 'after.yml', 'format_stylish_diff_yml'],
  ['plain', 'before.yml', 'after.yml', 'format_plain_diff_yml'],
  ['json', 'before.yml', 'after.yml', 'format_json_diff_yml'],
];
test.each(testData)('test diff for format %s and files %s / %s', (format, firstFile, secondFile, diffFile) => {
  const firstFilePath = getFixturePath(firstFile);
  const secondFilePath = getFixturePath(secondFile);
  const result = readFile(diffFile);
  expect(genDiff(firstFilePath, secondFilePath, format)).toEqual(result);
});

test('check default format', () => {
  const firstFilePath = getFixturePath('before.json');
  const secondFilePath = getFixturePath('after.json');
  const result = readFile('format_stylish_diff_json');
  expect(genDiff(firstFilePath, secondFilePath)).toEqual(result);
});
