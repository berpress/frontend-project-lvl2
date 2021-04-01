import _ from 'lodash';

const keyTypes = [
  {
    type: 'change',
    check: (first, second, key) => (_.isObject(first[key]) && _.isObject(second[key])),
    process: (first, second, fn) => ({ children: fn(first, second) }),
  },
  {
    type: 'same',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] === second[key])),
    process: (first) => ({ before: first }),
  },
  {
    type: 'changeChild',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] !== second[key])),
    process: (first, second) => ({ after: first, before: second }),
  },
  {
    type: 'del',
    check: (first, second, key) => (_.has(first, key) && !_.has(second, key)),
    process: (first) => ({ before: first }),
  },
  {
    type: 'add',
    check: (first, second, key) => (!_.has(first, key) && _.has(second, key)),
    process: (first, second) => ({ after: second }),
  },
];

const buildAst = (objFirst, objSecond) => {
  const configsKeys = _.sortBy(_.union(_.keys(objFirst), _.keys(objSecond)));
  return configsKeys.map((key) => {
    const { type, process } = keyTypes.find(
      (item) => item.check(objFirst, objSecond, key),
    );
    const { after, before, children } = process(objFirst[key], objSecond[key], buildAst);
    return {
      name: key, type, after, before, children,
    };
  });
};

export default buildAst;
