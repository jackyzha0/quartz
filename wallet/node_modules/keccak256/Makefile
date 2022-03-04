all: build

.PHONY: build
build:
	@npm run build

.PHONY: test
test:
	@npm test

.PHONY: lint
lint:
	@standard index.js
	@standard test/index.js
	@standard example/example.js

.PHONY: lint-fix
lint-fix:
	@standard --fix index.js
	@standard --fix test/index.js
	@standard --fix example/example.js
