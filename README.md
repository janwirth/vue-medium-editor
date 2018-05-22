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

> Full usage example at [github.com/FranzSkuffka/vue-medium-editor/tree/gh-pages](https://github.com/FranzSkuffka/vue-medium-editor/tree/gh-pages)

A list of available options can be found in the [documentation of MediumEditor](https://github.com/yabwe/medium-editor#core-options).
Optionally you may use the standalone builds from `dist` which have medium-editor.js included.

> **Make sure you include the required [CSS](https://github.com/yabwe/medium-editor/tree/master/dist/css).**

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
npm run prepublish
```

## Known Issues
If you encounter issues with the link button and the events it emits, please refer to https://github.com/yabwe/medium-editor/issues/1153.

## Contributors

- [gcoda](https://github.com/gcoda)
- [seguer](https://github.com/seguer)
- [DannyFeliz](https://github.com/DannyFeliz)
- [okneloper](https://github.com/okneloper)
- [dmattia](https://github.com/dmattia)

Anyone else who opened an Issue or PR!

**Thank you!** :tada:
