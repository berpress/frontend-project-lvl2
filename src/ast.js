import _ from 'lodash';
import path from 'path';
// eslint-disable-next-line import/extensions
import { jsonParser, yamlParser } from './parsers.js';

const ADDED = 'add';
const DELETED = 'del';
const SAME = 'same';
const CHANGE = 'change';
const CHANGE_CHILD = 'changeChild';

function getChangedObject(keys, obj, type) {
  const resObj = {};
  keys.forEach((key) => {
    resObj[key] = { children: obj[key], status: type };
  });
  return resObj;
}

export function genDiffFile(objFirst, objSecond) {
  const diff = {};
  const keys1 = Object.keys(objFirst);
  const keys2 = Object.keys(objSecond);
  const intersectionKeys = _.intersection(keys1, keys2);
  const removedKeys = _.difference(keys1, keys2);
  const addKeys = _.difference(keys2, keys1);
  const intersectObj = intersectionKeys.reduce((acc, key) => {
    const changedFieldFirst = [objFirst[key]];
    const changedFieldSecond = [objSecond[key]];
    acc[key] = [...changedFieldFirst, ...changedFieldSecond];
    return acc;
  }, []);
  const addObj = getChangedObject(addKeys, objSecond, ADDED);
  const deleteObj = getChangedObject(removedKeys, objFirst, DELETED);
  intersectionKeys.forEach((key) => {
    const [change1, change2] = intersectObj[key];
    if (_.isObject(change1) && _.isObject(change2)) {
      diff[key] = { children: genDiffFile(change1, change2), status: CHANGE };
    } else if (change1 !== change2) {
      diff[key] = { children: { after: change1, before: change2 }, status: CHANGE_CHILD };
    } else {
      diff[key] = { children: change1, status: SAME };
    }
  });
  return Object.fromEntries(Object.entries({ ...addObj, ...deleteObj, ...diff }).sort());
}

function getFileData(file) {
  const extname = path.extname(file);
  if (extname === '.yaml' || extname === '.yml') {
    return yamlParser(file);
  } if (extname === '.json') {
    return jsonParser(file);
  }
  return false;
}

export function buildAst(file1, file2) {
  const fileData1 = getFileData(file1);
  const fileData2 = getFileData(file2);
  return genDiffFile(fileData1, fileData2);
}
