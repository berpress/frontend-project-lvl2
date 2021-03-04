import program from 'commander';

program.version('0.0.2');

program
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstFile> <secondFile>');

program.parse(process.argv);
