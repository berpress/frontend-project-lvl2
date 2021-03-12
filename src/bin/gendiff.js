import program from 'commander';
// eslint-disable-next-line import/named,import/extensions
import { textDiff } from '../index.js';
// eslint-disable-next-line import/extensions
import { genDiff } from '../ast.js';

// eslint-disable-next-line import/extensions

program.version('0.0.2');

program
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'stylish')
  .arguments('<firstFile> <secondFile>')
  .action((firstFile, secondFile) => (console.log(textDiff(genDiff(firstFile, secondFile),
    program.opts().format))));

program.parse(process.argv);
