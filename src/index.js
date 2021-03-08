import path from 'path';
import _ from 'lodash';
// eslint-disable-next-line import/extensions
import { jsonParser, yamlParser } from './parsers.js';

const ADDED = 'add';
const DELETED = 'del';
const SAME = 'same';
const CHANGE = 'change';
const CHANGE_CHILD = 'changeChild';

function getFileData(file) {
  const extname = path.extname(file);
  if (extname === '.yaml' || extname === '.yml') {
    return yamlParser(file);
  } if (extname === '.json') {
    return jsonParser(file);
  }
  return false;
}

const stringify = (value, replacer = ' ', spacesCount = 1, depthLine = 2) => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      if (currentValue === null) {
        return currentValue;
      }
      return currentValue.toString();
    }
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, depthLine);
};

function getAddObj(keys, obj) {
  const resObj = {};
  keys.forEach((key) => {
    resObj[key] = { children: obj[key], status: ADDED };
  });
  return resObj;
}

function getRemoveObj(keys, obj) {
  const resObj = {};
  keys.forEach((key) => {
    resObj[key] = { children: obj[key], status: DELETED };
  });
  return resObj;
}

function genDiffFile(objFirst, objSecond) {
  const diff = {};
  // Получаем необходимые ключи: Общие, удаленные, добавленные
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
  // Получение объектов
  const addObj = getAddObj(addKeys, objSecond);
  const deleteObj = getRemoveObj(removedKeys, objFirst);
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
  return { ...addObj, ...deleteObj, ...diff };
}

export function textDiff(diff, depth = 1, countSpace = 2) {
  const indentSize = depth * countSpace;
  const currentIndent = ' '.repeat(indentSize);
  const bracketIndent = ' '.repeat(indentSize - countSpace);
  const line = [];
  // eslint-disable-next-line array-callback-return
  Object.keys(diff).map(((key) => {
    const obj = diff[key];
    const [status, value] = [obj.status, obj.children];
    let mark;
    switch (status) {
      case ADDED:
        mark = `${currentIndent}+`;
        line.push(`${mark} ${key}: ${stringify(value, ' ', countSpace)}`);
        break;
      case DELETED:
        mark = `${currentIndent}-`;
        line.push(`${mark} ${key}: ${stringify(value, ' ', countSpace)}`);
        break;
      case CHANGE:
        mark = `${currentIndent} `;
        line.push(`${mark} ${key}: ${textDiff(value, depth + 2, countSpace)}`);
        break;
      case CHANGE_CHILD:
        mark = `${currentIndent}+`;
        line.push(`${mark} ${key}: ${stringify(value.before, ' ', countSpace, depth + 2)}`);
        mark = `${currentIndent}-`;
        line.push(`${mark} ${key}: ${stringify(value.after, ' ', countSpace, depth + 2)}`);
        break;
      default:
        mark = `${currentIndent} `;
        line.push(`${mark} ${key}: ${stringify(value, ' ', countSpace)}`);
    }
  }));
  const flattenArr = _.flatten(line);
  return [
    '{',
    ...flattenArr,
    `${bracketIndent}}`,
  ].join('\n');
}

export function genDiff(file1, file2) {
  const fileData1 = getFileData(file1);
  const fileData2 = getFileData(file2);
  const diffs = genDiffFile(fileData1, fileData2);
  // const textD = textDiff(diffs);
  return diffs;
}
