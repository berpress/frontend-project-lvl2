import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { genDiff } from '../src/formatters/index';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const testData = [
  { format: 'stylish', type: 'json', result: 'nested_result' },
  { format: 'stylish', type: 'yml', result: 'nested_result_yaml.txt' },
  { format: 'plain', type: 'json', result: 'nested_plain_result_json' },
  { format: 'plain', type: 'yml', result: 'nested_plain_result_yml' },
  { format: 'json', type: 'json', result: 'nested_json_result_json_format' },
  { format: 'json', type: 'yml', result: 'nested_json_result_yml_format' },
];

testData.forEach((data) => {
  test(`get diff ${data.format} ${data.type}`, () => {
    const result = readFile(data.result);
    const firstFile = getFixturePath(`nested1.${data.type}`);
    const secondFile = getFixturePath(`nested2.${data.type}`);
    expect(genDiff(firstFile, secondFile, data.format)).toEqual(result);
  });
});
