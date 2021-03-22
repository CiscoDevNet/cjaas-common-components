# cjaas/common-components

**`CJaaS Common Components`** is a resuable, component based, flexible Web Component library available as
npm module.

## Get Started: Start up sandbox
1. Install Dependencies
    >`yarn`
2. Start Sandbox Locally
    >`yarn start`

## How to Use
1. Install Cjaas web components and Momentum web components
```
yarn add "@cjaas/common-components"
yarn add "@momentum-ui/web-components"
```
2. Import Momentum components
```js
import "@momentum-ui/web-components";
```

3. Import Cjaas common components (entire library or each individual component)
```js
import '@cjaas/common-components';
```
or
```js
import '@cjaas/common-components/dist/comp/cjaas-timeline';
import '@cjaas/common-components/dist/comp/cjaas-timeline-item';
```

## Component Specific Documentation
-  [Webex Walkin Documentation](src/components/webexWalkin/WEBEX_WALKIN.md)

## Goals
* **Independent** — pick and use only the components you need.
* **Customizable** — properties allow many different config options to suit your app.
* **Performant** - high performance guaranteed with use of CSS3 Flexbox and non-bloated architecture.
* **Reliable** — each component is rigorously tested.

### Package manager

* [yarn](https://github.com/yarnpkg/yarn) - BSD-2-Clause

### Base framework

* [lit-element](https://github.com/Polymer/lit-element) - MIT

* [lit-html](https://github.com/Polymer/lit-html) - MIT

### Momentum Design System Look & Feel

* [@momentum-ui/core](https://github.com/momentum-design/momentum-ui-core) - MIT
* [@momentum-ui/icons](https://github.com/momentum-design/momentum-ui-icons) - MIT

### ES6 Minifier

* [babili](https://github.com/babel/babili) - MIT

### ES6 Lint

* [eslint](https://github.com/eslint/eslint) - MIT

### CSS/SCSS Lint

* [stylelint](https://github.com/stylelint/stylelint) - MIT

### CSS Utility Tool

* [normalize](https://github.com/necolas/normalize.css) - MIT

* [postcss](https://github.com/postcss/postcss) - MIT

### JsUnit Testing framework

* [karma](https://github.com/karma-runner/karma) - MIT

* [mocha](https://github.com/mochajs/mocha) - MIT

* [chai](https://github.com/chaijs/chai) - MIT

## Copyright

Copyright (c) 2021 Cisco Systems
