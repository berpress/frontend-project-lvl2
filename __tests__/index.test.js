import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { textDiff } from '../src';
import { genDiff } from '../src/ast';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('get diff flat json', () => {
  const firstFile = getFixturePath('flat1.json');
  const secondFile = getFixturePath('flat2.json');
  const result = readFile('flat_result.txt');
  expect(textDiff(genDiff(firstFile, secondFile), 'stylish')).toEqual(result);
});

test('get diff flat yml', () => {
  const result = readFile('flat_result.txt');
  const firstFile = getFixturePath('flat1.yml');
  const secondFile = getFixturePath('flat2.yml');
  expect(textDiff(genDiff(firstFile, secondFile), 'stylish')).toEqual(result);
});

test('get diff nested json', () => {
  const result = readFile('nested_result');
  const firstFile = getFixturePath('nested1.json');
  const secondFile = getFixturePath('nested2.json');
  expect(textDiff(genDiff(firstFile, secondFile), 'stylish')).toEqual(result);
});

test('get diff nested yaml', () => {
  const result = readFile('nested_result_yaml.txt');
  const firstFile = getFixturePath('nested1.yml');
  const secondFile = getFixturePath('nested2.yml');
  expect(textDiff(genDiff(firstFile, secondFile), 'stylish')).toEqual(result);
});
