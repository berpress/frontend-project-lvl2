#!/usr/bin/env node
import program from 'commander';
import genDiff from '../src/index.js';

program.version('0.0.2');

program
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'stylish')
  .arguments('<firstFile> <secondFile>')
  .action((firstFile, secondFile) => (console.log(genDiff(firstFile, secondFile,
    program.opts().format))));

program.parse(process.argv);
