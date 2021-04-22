import yaml from 'js-yaml';

const parseObj = { json: JSON.parse, yml: yaml.load };

const parseContent = (format, content) => parseObj[format](content);

export default parseContent;
