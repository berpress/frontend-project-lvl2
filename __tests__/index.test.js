import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import { genDiff, textDiff } from '../src';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);

const PLAIN_RESULT = '{\n'
    + '  + verbose: true\n'
    + '  - proxy: 123.234.53.22\n'
    + '  - follow: false\n'
    + '    host: hexlet.io\n'
    + '  + timeout: 20\n'
    + '  - timeout: 50\n'
    + '}';

const fixturesPath = `${__dirname}/__fixtures__/`;
const flatJson1 = `${fixturesPath}/json/flat1.json`;
const flatJson2 = `${fixturesPath}/json/flat2.json`;
const flatYML1 = `${fixturesPath}/yaml/flat1.yml`;
const flatYML2 = `${fixturesPath}/yaml/flat2.yml`;

test('get diff flat json', () => {
  expect(textDiff(genDiff(flatJson1, flatJson2))).toEqual(PLAIN_RESULT);
});

test('get diff flat yml', () => {
  expect(textDiff(genDiff(flatYML1, flatYML2))).toEqual(PLAIN_RESULT);
});
//
// test('get diff flat yml', () => {
//   expect(textDiff(genDiff(flatYML1, flatYML2))).toEqual(PLAIN_RESULT);
// });
//
// test('get diff flat yml', () => {
//   expect(textDiff(genDiff(flatYML1, flatYML2))).toEqual(PLAIN_RESULT);
// });
