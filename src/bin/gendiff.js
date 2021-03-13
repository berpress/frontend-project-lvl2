import program from 'commander';

// eslint-disable-next-line import/extensions
import { gendiff } from '../formatters/index.js';

// eslint-disable-next-line import/extensions

program.version('0.0.2');

program
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'stylish')
  .arguments('<firstFile> <secondFile>')
  .action((firstFile, secondFile) => (console.log(gendiff(firstFile, secondFile,
    program.opts().format))));

program.parse(process.argv);
