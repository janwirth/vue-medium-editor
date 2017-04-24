# vue2-medium-editor
A [medium-editor](https://github.com/yabwe/medium-editor) component for Vue2. For Vue1 checkout branch 1.0.

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Installation

```bash
#bash
npm i --save vue2-medium-editor
```

## Usage
```javascript
//app.js
import editor from 'vue2-medium-editor'
import Vue from 'vue'

new Vue {
  ...
  components: {
    'medium-editor': editor
  }
}
```
```vue
<!-- index.html -->
<medium-editor :text='myText' :options='options' custom-tag='h2' v-on:edit='applyTextEdit'>
```

### Reusing the MediumEditor instance

By default the component will reuse a single MediumEditor instance within the same instance of Vue.

The configuration options for the editor are then set by the first component instance and shared across any subsequent instances.

If you need to have multiple instances of the editor with different configuration options, you can use the `reuse-medium-editor-instance` prop:

```vue
<!-- index.html -->
<medium-editor :text='myText' :options='options' :reuse-medium-editor-instance="false">
<medium-editor :text='myOtherText' :options='differentOptions' :reuse-medium-editor-instance="false">
```

> Full usage example at [github.com/FranzSkuffka/vue-medium-editor/tree/gh-pages](https://github.com/FranzSkuffka/vue-medium-editor/tree/gh-pages)

A list of available options can be found in the [documentation of MediumEditor](https://github.com/yabwe/medium-editor#core-options).
Optionally you may use the standalone builds from `dist` which have medium-editor.js included.

Make sure you include the required [CSS](https://github.com/yabwe/medium-editor/tree/master/dist/css).

### Custom buttons and extensions
To create extensions for the MediumEditor you will need the original MediumEditor object, which
you can get like this:

```javascript
var HighlightButton = VueMediumEditor.MediumEditor.Extension.extend({
    // ...
});
```

See [Extensions](https://github.com/yabwe/medium-editor/tree/master/src/js/extensions)
section of the MediumEditor's wiki for details.

## Bundling & Minification

To generate the standalone bundle
```bash
npm i --save-dev
npm run build
```

### Note on uglify
[Uglify does not support ES6 Harmony](https://github.com/mishoo/UglifyJS2/issues/448).
As VueMediumEditor uses some ES6 features,
**we recommend using [babili](https://github.com/babel/babili) instead of uglify**.

## Contributors
This project is made possible thanks to:
- [franzskuffka](https://github.com/FranzSkuffka)
- [gcoda](https://github.com/gcoda)
- [seguer](https://github.com/seguer)
- [DannyFeliz](https://github.com/DannyFeliz)
- [okneloper](https://github.com/okneloper)

Anyone else who opened an Issue or PR!

**Thank you!** :tada:
