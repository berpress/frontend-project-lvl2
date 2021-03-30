import { getParsedData } from './files.js';

const parseFile = (format, content) => (getParsedData(format, content));

export default parseFile;
