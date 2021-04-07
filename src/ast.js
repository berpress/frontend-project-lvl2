import _ from 'lodash';

const buildAst = (objFirst, objSecond) => {
  const keys = _.sortBy(_.union(_.keys(objFirst), _.keys(objSecond)));
  return keys.map((key) => {
    if (_.has(objFirst, key) && _.has(objSecond, key) && (objFirst[key] === objSecond[key])) {
      return { name: key, type: 'same', before: objFirst[key] };
    }

    if (_.has(objFirst, key) && !_.has(objSecond, key)) {
      return { name: key, type: 'del', before: objFirst[key] };
    }

    if (!_.has(objFirst, key) && _.has(objSecond, key)) {
      return { name: key, type: 'add', after: objSecond[key] };
    }

    if (_.isObject(objFirst[key]) && _.isObject(objSecond[key])) {
      return { name: key, type: 'change', children: buildAst(objFirst[key], objSecond[key]) };
    }

    if (_.has(objFirst, key) && _.has(objSecond, key)) {
      return {
        name: key, type: 'changeChild', after: objFirst[key], before: objSecond[key],
      };
    }

    throw new Error('Error build ast');
  });
};

export default buildAst;
