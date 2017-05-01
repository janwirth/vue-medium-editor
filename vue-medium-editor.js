import MediumEditor from 'medium-editor'

export default {
  name: 'medium-editor',
  props: {
    text: [String],
    customTag: [String],
    options: {
      type: [Object],
      default: () => {}
    },
    reuseMediumEditorInstance: {
      type: [Boolean],
      default: () => true
    }
  },
  data: function () {
    return {
      editor: null
    }
  },
  render (h) {
    return h( this.customTag || 'div', { ref: 'element' })
  },

  mounted (evt) {
    this.$refs.element.innerHTML = this.text

    // If we want to reuse a single MediumEditor instance.
    if (this.reuseMediumEditorInstance) {
      // if Medium Editor is not instantiated yet, create a new instance
      if (!this.$root.mediumEditor) {
        this.api = this.$root.mediumEditor = new MediumEditor(this.$refs.element, this.options)

      // otherwise, just add the element
      } else {
        this.api = this.$root.mediumEditor
        this.api.addElements(this.$refs.element)
      }
    // Otherwise create a new instance of MediumEditor to use.
    } else {
      this.api = new MediumEditor(this.$refs.element, this.options)
    }

    // bind edit operations to model
    // we need to store the handler in order to later on detach it again
    this.emit = event => this.$emit('edit', {event, api: this.api})
    this.api.subscribe('editableInput', this.emit)
  },

  beforeDestroy (evt) {
    // Only try to remove our element from a shared MediumEditor instance if
    // we are using the shared instance.
    this.api.unsubscribe('editableInput', this.emit)
    if (this.reuseMediumEditorInstance) {
      this.api.removeElements(this.$refs.element)
    } else {
      this.api.destroy()
    }
  },
  watch: {
    text( newText ) {
      // innerHTML MUST not be performed if the text did not actually change.
      // otherwise, the caret position will be reset.
      if (newText !== this.$refs.element.innerHTML) {
        this.$refs.element.innerHTML = this.text
      }
    }
  },
  MediumEditor
}
