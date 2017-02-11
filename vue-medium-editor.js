import MediumEditor from 'medium-editor'

// impure helper function, replaces some element from the dom with a new one of the given tag name
// returns the new one.

function replaceElementWith (element, tagName) {
  let newElement = document.createElement(tagName)
  element.parentNode.replaceChild(newElement, element)
  return newElement
}

export default {
  name: 'medium-editor',
  props: {
    text: [String],
    customTag: [String],
    settings: {
      type: [Object],
      default: function () {
        return {}
      }
    }
  },
  template: '<div ref="element" v-html="text"> </div>',

  mounted (evt) {
// Use custom tag or div as editor element.
    this.$refs.element = replaceElementWith(this.$refs.element, this.customTag || 'div')
    this.$refs.element.innerHTML = this.text

// if Medium Editor is not instantiated yet, create a new instance
    if (!this.$root.mediumEditor) {
      this.$root.mediumEditor = new MediumEditor(this.$refs.element, this.settings)

// otherwise, just add the element
    } else {
      this.$root.mediumEditor.addElements(this.$refs.element)
    }

// bind edit operations to model
    this.$refs.element.addEventListener('DOMSubtreeModified', () => {
      if (this.$refs.element.childNodes[0]) {
        this.$emit('edit', this.$refs.element.innerHTML)
      }
    })
  },

  beforeDestroy (evt) {
    this.$root.mediumEditor.removeElements(this.$refs.element)
  }

}
