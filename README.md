# vue2-medium-editor
A [medium-editor](https://github.com/yabwe/medium-editor) component for Vue2. For Vue1 checkout branch 1.0.

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Installation & usage

```
# bash
npm i --save vue2-medium-editor


# app.js
import editor from 'vue2-medium-editor'
import Vue from 'vue'

new Vue {
  ...
  components: {
    'medium-editor': editor
  }
}

# index.html
<medium-editor :text='myText' :options='options' custom-tag='h2' v-on:edit='applyTextEdit'>
```

> Full usage example at [github.com/FranzSkuffka/vue-medium-editor/tree/gh-pages](https://github.com/FranzSkuffka/vue-medium-editor/tree/gh-pages)

A list of available options can be found in the [documentation of MediumEditor](https://github.com/yabwe/medium-editor#core-options).
Optionally you may use the standalone builds from `dist` which have medium-editor.js included.

Make sure you include the required [CSS](https://github.com/yabwe/medium-editor/tree/master/dist/css).

## Bundling & Minification

To generate the standalone bundle
```
npm i --save-dev
npm run build
```

## Contributors
- [franzskuffka](https://github.com/FranzSkuffka)
- [gcoda](https://github.com/gcoda)
