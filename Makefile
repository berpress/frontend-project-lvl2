install:
	npm install

lint:
	npx eslint .

lint_fix:
	npx eslint . --fix

test:
	@ npm test -s