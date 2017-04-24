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
    options: {
      type: [Object],
      default: function () {
        return {}
      }
    },
    reuseMediumEditorInstance: {
      type: [Boolean],
      default: function () {
        return true
      }
    }
  },
  data: function () {
    return {
      editor: null
    }
  },
  template: '<div ref="element" v-html="text"> </div>',

  mounted (evt) {
    // Use custom tag or div as editor element.
    this.$refs.element = replaceElementWith(this.$refs.element, this.customTag || 'div')
    this.$refs.element.innerHTML = this.text

    // If we want to reuse a single MediumEditor instance.
    if (this.reuseMediumEditorInstance) {
      // if Medium Editor is not instantiated yet, create a new instance
      if (!this.$root.mediumEditor) {
        this.$root.mediumEditor = new MediumEditor(this.$refs.element, this.options)

      // otherwise, just add the element
      } else {
        this.$root.mediumEditor.addElements(this.$refs.element)
      }
    // Otherwise create a new instance of MediumEditor to use.
    } else {
      this.editor = new MediumEditor(this.$refs.element, this.options)
    }

    // bind edit operations to model
    this.$refs.element.addEventListener('DOMSubtreeModified', () => {
      if (this.$refs.element.childNodes[0]) {
        this.$emit('edit', this.$refs.element.innerHTML)
      }
    })
  },

  beforeDestroy (evt) {
    // Only try to remove our element from a shared MediumEditor instance if
    // we are using the shared instance.
    if (this.reuseMediumEditorInstance) {
      this.$root.mediumEditor.removeElements(this.$refs.element)
    } else {
      this.editor.destroy()
      this.$refs.element.parentNode.removeChild(this.$refs.element)
    }
  },

  watch: {
    text() {
      if (this.text === this.$refs.element.innerHTML) {
        // if the change is done by this same component, do not update the contents to prevent
        // caret from resetting to the beginning of the editor
        return;
      }
      this.$refs.element.innerHTML = this.text
    }
  },

  MediumEditor
}
