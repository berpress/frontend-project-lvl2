import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
// eslint-disable-next-line import/extensions
import { gendiff } from '../src/formatters/index.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('get diff nested json', () => {
  const result = readFile('nested_result');
  const firstFile = getFixturePath('nested1.json');
  const secondFile = getFixturePath('nested2.json');
  expect(gendiff(firstFile, secondFile, 'stylish')).toEqual(result);
});

test('get diff nested yaml', () => {
  const result = readFile('nested_result_yaml.txt');
  const firstFile = getFixturePath('nested1.yml');
  const secondFile = getFixturePath('nested2.yml');
  expect(gendiff(firstFile, secondFile, 'stylish')).toEqual(result);
});

test('get diff nested json (plain format)', () => {
  const result = readFile('nested_plain_result_json');
  const firstFile = getFixturePath('nested1.json');
  const secondFile = getFixturePath('nested2.json');
  expect(gendiff(firstFile, secondFile, 'plain')).toEqual(result);
});

test('get diff nested yaml (plain format)', () => {
  const result = readFile('nested_plain_result_yml');
  const firstFile = getFixturePath('nested1.yml');
  const secondFile = getFixturePath('nested2.yml');
  expect(gendiff(firstFile, secondFile, 'plain')).toEqual(result);
});
