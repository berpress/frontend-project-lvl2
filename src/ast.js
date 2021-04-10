import _ from 'lodash';

const buildAst = (objFirst, objSecond) => {
  const keys = _.sortBy(_.union(_.keys(objFirst), _.keys(objSecond)));
  return keys.map((key) => {
    if (_.has(objFirst, key) && !_.has(objSecond, key)) {
      return { name: key, type: 'del', value1: objFirst[key] };
    }
    if (!_.has(objFirst, key) && _.has(objSecond, key)) {
      return { name: key, type: 'add', value2: objSecond[key] };
    }
    if (_.isEqual(objFirst[key], objSecond[key])) {
      return { name: key, type: 'same', value1: objFirst[key] };
    }
    if (_.isObject(objFirst[key]) && _.isObject(objSecond[key])) {
      return { name: key, type: 'change', children: buildAst(objFirst[key], objSecond[key]) };
    }
    return {
      name: key, type: 'changeChild', value2: objFirst[key], value1: objSecond[key],
    };
  });
};

export default buildAst;
