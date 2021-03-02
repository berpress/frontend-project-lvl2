import program from 'commander';

program.version('0.0.1');

program
  .description('Compares two configuration files and shows a difference.')
  .option('-v, --version', 'output the version number');

program.parse(process.argv);
