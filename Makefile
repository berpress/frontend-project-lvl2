install:
	npm install

lint:
	npx eslint .

lint_fix:
	npx eslint . --fix

test:
	@ npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8