import yaml from 'js-yaml';

const parseJson = (content) => (JSON.parse(content));
const parseYml = (content) => (yaml.load(content));

const parseFile = (format, content) => {
  if (format === 'json') {
    return parseJson(content);
  } if (format === 'yml') {
    return parseYml(content);
  }
  throw new Error('Error parse file');
};

export default parseFile;
