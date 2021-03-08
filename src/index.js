import path from 'path';
import _ from 'lodash';
import { jsonParser, yamlParser } from './parsers';

const ADDED = 'add';
const DELETED = 'del';
const NOT_CHANGE = 'notChange';

function getFileData(file) {
  const extname = path.extname(file);
  if (extname === '.yaml' || extname === '.yml') {
    return yamlParser(file);
  } if (extname === '.json') {
    return jsonParser(file);
  }
  return false;
}

export function genDiff(file1, file2) {
  const jsonFile1 = getFileData(file1);
  const jsonFile2 = getFileData(file2);
  const keys1 = Object.keys(jsonFile1);
  const keys2 = Object.keys(jsonFile2);
  const intersectionKeys = keys1.filter((x) => keys2.includes(x));
  const removedKeys = _.difference(keys1, keys2);
  const addKeys = _.difference(keys2, keys1);
  const remObj = removedKeys.reduce((acc, item) => {
    const obj = {};
    const key = jsonFile1[item];
    obj[key] = DELETED;
    acc[item] = obj;
    return acc;
  }, {});
  const addObj = addKeys.reduce((acc, item) => {
    const obj = {};
    const key = jsonFile2[item];
    obj[key] = ADDED;
    acc[item] = obj;
    return acc;
  }, {});
  const intersectionObj = intersectionKeys.reduce((acc, item) => {
    const obj = {};
    if (_.isEqual(jsonFile1[item], jsonFile2[item])) {
      const key = jsonFile1[item];
      obj[key] = NOT_CHANGE;
      acc[item] = obj;
    } else {
      const keyOne = jsonFile1[item];
      obj[keyOne] = DELETED;
      const keyTwo = jsonFile2[item];
      obj[keyTwo] = ADDED;
      acc[item] = obj;
    }
    return acc;
  }, {});
  return { ...remObj, ...addObj, ...intersectionObj };
}

export function textDiff(diff, space = 4) {
  const keys = Object.keys(diff);
  const resArray = keys.reduce((acc, item) => {
    const itemKeys = Object.keys(diff[item]);
    const keysText = itemKeys.reduce((accumulator, key) => {
      let mark;
      switch (diff[item][key]) {
        case ADDED:
          mark = `${' '.repeat(space)}+ `;
          break;
        case DELETED:
          mark = `${' '.repeat(space)}- `;
          break;
        default:
          mark = `${' '.repeat(space)}  `;
      }
      accumulator.push(`${mark} ${item}: ${key}`);
      return accumulator;
    }, []);
    acc.push(keysText);
    return acc;
  }, []);
  const flattenArr = _.flatten(resArray);
  return `{\n${flattenArr.join('\n')}\n}`;
}
