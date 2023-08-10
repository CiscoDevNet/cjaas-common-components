# How to Publish Commmon Components Library

1. In `root` bump version with `npm version <major || minor || patch>`
2. Run `npm login` to ensure you have credentials to publish on NPMjs
3. Run `yarn npm:publish`
4. Copy README.md into `publish` dir: `cp README.md publish`
5. CD into `publish` directory
6. Update `publish/package.json` file, change `registry` property to "https://registry.npmjs.org/"
7. Run `npm publish` (if making a dev release add `--tag dev`)
