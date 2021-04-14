import yaml from 'js-yaml';

const parseJson = (content) => (JSON.parse(content));
const parseYml = (content) => (yaml.load(content));

const parseContent = (format, content) => {
  if (format === 'json') {
    return parseJson(content);
  } if (format === 'yml') {
    return parseYml(content);
  }
  throw new Error('Data parsing error');
};

export default parseContent;
