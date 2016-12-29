'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mediumEditor = require('medium-editor');

var _mediumEditor2 = _interopRequireDefault(_mediumEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function replaceElementWith(element, tagName) {
  var newElement = document.createElement(tagName);
  element.parentNode.replaceChild(newElement, element);
  return newElement;
}

exports.default = {
  name: 'medium-editor',
  props: ['text', 'customTag'],
  template: '<div ref="element" v-html="text"> </div>',

  mounted: function mounted(evt) {
    var _this = this;

    if (this.customTag) {
      this.$refs.element = replaceElementWith(this.$refs.element, this.customTag);
      this.$refs.element.innerHTML = this.text;
    }

    if (!this.$root.mediumEditor) {
      this.$root.mediumEditor = new _mediumEditor2.default(this.$refs.element);
    } else {
      this.$root.mediumEditor.addElements(this.$refs.element);
    }

    this.$refs.element.addEventListener('DOMSubtreeModified', function () {
      if (_this.$refs.element.childNodes[0]) _this.$emit('edit', _this.$refs.element.innerHTML);
    });
  },
  beforeDestroy: function beforeDestroy(evt) {
    this.$root.mediumEditor.removeElements(this.$refs.element);
  }
};