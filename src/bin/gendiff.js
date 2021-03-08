import program from 'commander';
// eslint-disable-next-line import/extensions
import { genDiff, textDiff } from '../index.js';

program.version('0.0.2');

program
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstFile> <secondFile>')
  .action((firstFile, secondFile) => (console.log(textDiff(genDiff(firstFile, secondFile)))));

program.parse(process.argv);
