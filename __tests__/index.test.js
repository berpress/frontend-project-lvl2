import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { genDiff } from '../src/formatters/index';

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
  expect(genDiff(firstFile, secondFile, 'stylish')).toEqual(result);
});

test('get diff nested yaml', () => {
  const result = readFile('nested_result_yaml.txt');
  const firstFile = getFixturePath('nested1.yml');
  const secondFile = getFixturePath('nested2.yml');
  expect(genDiff(firstFile, secondFile, 'stylish')).toEqual(result);
});

test('get diff nested json (plain format)', () => {
  const result = readFile('nested_plain_result_json');
  const firstFile = getFixturePath('nested1.json');
  const secondFile = getFixturePath('nested2.json');
  expect(genDiff(firstFile, secondFile, 'plain')).toEqual(result);
});

test('get diff nested yaml (plain format)', () => {
  const result = readFile('nested_plain_result_yml');
  const firstFile = getFixturePath('nested1.yml');
  const secondFile = getFixturePath('nested2.yml');
  expect(genDiff(firstFile, secondFile, 'plain')).toEqual(result);
});

test('get diff nested json (json format)', () => {
  const result = readFile('nested_json_result_json_format');
  const firstFile = getFixturePath('nested1.json');
  const secondFile = getFixturePath('nested2.json');
  expect(genDiff(firstFile, secondFile, 'json')).toEqual(result);
});

test('get diff nested yml (json format)', () => {
  const result = readFile('nested_json_result_yml_format');
  const firstFile = getFixturePath('nested1.yml');
  const secondFile = getFixturePath('nested2.yml');
  expect(genDiff(firstFile, secondFile, 'json')).toEqual(result);
});
