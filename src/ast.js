import _ from 'lodash';
import path from 'path';
// eslint-disable-next-line import/extensions
import { jsonParser, yamlParser } from './parsers.js';

const getChangedObject = (keys, obj, type) => keys.map((key) => ({
  children: obj[key], status: type, name: key,
}));

export const genDiffFile = (objFirst, objSecond) => {
  const keys1 = Object.keys(objFirst);
  const keys2 = Object.keys(objSecond);
  const intersectionKeys = _.intersection(keys1, keys2);
  const addArr = getChangedObject(_.difference(keys2, keys1), objSecond, 'add');
  const deleteArr = getChangedObject(_.difference(keys1, keys2), objFirst, 'del');
  const intersectArr = intersectionKeys.reduce((acc, key) => {
    const change1 = objFirst[key];
    const change2 = objSecond[key];
    if (_.isObject(change1) && _.isObject(change2)) {
      return [...acc, { children: genDiffFile(change1, change2), status: 'change', name: key }];
    } if (change1 !== change2) {
      return [...acc, { children: { after: change1, before: change2 }, status: 'changeChild', name: key }];
    }
    return [...acc, { children: { children: change1, status: 'same' }, status: 'same', name: key }];
  }, []);
  const res = [...deleteArr, ...addArr, ...intersectArr];
  return _.sortBy(res, ['name']);
};

const getFileData = (file) => {
  const extname = path.extname(file);
  if (extname === '.yaml' || extname === '.yml') {
    return yamlParser(file);
  } if (extname === '.json') {
    return jsonParser(file);
  }
  return false;
};

export const buildAst = (file1, file2) => {
  const fileData1 = getFileData(file1);
  const fileData2 = getFileData(file2);
  return genDiffFile(fileData1, fileData2);
};
