### Hexlet tests and linter status:
[![Actions Status](https://github.com/berpress/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/berpress/frontend-project-lvl2/actions)
### Project status:
[![Node CI](https://github.com/berpress/frontend-project-lvl2/actions/workflows/test.yaml/badge.svg)](https://github.com/berpress/frontend-project-lvl2/actions/workflows/test.yaml)
[![Maintainability](https://api.codeclimate.com/v1/badges/fde77850cac27b62164b/maintainability)](https://codeclimate.com/github/berpress/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/fde77850cac27b62164b/test_coverage)](https://codeclimate.com/github/berpress/frontend-project-lvl2/test_coverage)

## Difference calculator

### How to use
The utility accepts two required parameters as input - paths to files (first_file, second_file). The file comparison result can be output in different formats: for example, plain ("flat"), json ("JSON-like format") or json (raw data). Json and yaml files are accepted as input.
     By default, the file difference is output to a JSON-like format, for example
``` sh
    gendiff first.json second.json
```
Result
``` sh
    {
        host: hexlet.io
        + timeout: 20
        - timeout: 50
        - proxy: 123.234.53.22
        + verbose: true
    }
```
For flat format output, you need to specify the --format plain parameter
``` sh
    gendiff --format plain before.json after.json
```
Result
``` sh
    Property 'common.setting2' was removed
    Property 'common.setting6' was removed
    Property 'common.setting4' was added with value: 'blah blah'
    Property 'common.setting5' was added with value: 'complex value'
    Property 'group1.baz' was changed. From 'bas' to 'bars'
    Property 'group2' was removed
    Property 'group3' was added with value: 'complex value'
 ```
To output to json format, you must specify the --format json parameter

 ``` sh
    gendiff --format json before.json after.json
 ```
Result
``` sh
    ('{"host": ["same", "hexlet.io"], "proxy": ["remove", "123.234.53.22"], '
    '"timeout": ["modified", 50, 20], "verbose": ["add", true]}')
```

Example 

[![asciicast](https://asciinema.org/a/Pe6QypnLEmFWssNAjCOJN1iii.svg)](https://asciinema.org/a/Pe6QypnLEmFWssNAjCOJN1iii)