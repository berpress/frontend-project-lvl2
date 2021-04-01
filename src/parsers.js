import yaml from 'js-yaml';

const parseJson = (content) => (JSON.parse(content));
const parseYml = (content) => (yaml.load(content));

const getParsedData = (format, content) => {
  if (format === 'json') {
    return parseJson(content);
  } if (format === 'yml') {
    return parseYml(content);
  }
  throw new Error('Error parse file');
};

const parsedFile = (format, content) => (getParsedData(format, content));

export default parsedFile;
