import program from 'commander';
import { genDiff, textDiff } from '../diff';

program.version('0.0.2');

program
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstFile> <secondFile>')
// eslint-disable-next-line no-console
  .action((firstFile, secondFile) => (console.log(textDiff(genDiff(firstFile, secondFile)))));

program.parse(process.argv);
