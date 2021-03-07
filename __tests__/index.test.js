import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import { genDiff, textDiff } from '../src/diff';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);

const PLAIN_RESULT = '{\n'
    + '    -  proxy: 123.234.53.22\n'
    + '    -  follow: false\n'
    + '    +  verbose: true\n'
    + '       host: hexlet.io\n'
    + '    +  timeout: 20\n'
    + '    -  timeout: 50\n'
    + '}';

const fixturesPath = `${__dirname}/__fixtures__/`;
const flatFile1 = `${fixturesPath}filepath1.json`;
const flatFile2 = `${fixturesPath}filepath2.json`;

test('get diff flat files', () => {
  expect(textDiff(genDiff(flatFile1, flatFile2))).toEqual(PLAIN_RESULT);
});
