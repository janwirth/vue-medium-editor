import MediumEditor from 'medium-editor'

export default {
  name: 'medium-editor',
  props: {
    value: [String],
    customTag: {
      type: [String],
      default: () => 'div'
    },
    options: {
      type: [Object],
      default: () => {}
    }
  },
  render (h) {
    return h(this.customTag, { ref: 'element' })
  },

  mounted (evt) {
    this.createAndSubscribe()
  },

  beforeDestroy (evt) {
    this.tearDown()
  },
  methods: {
    tearDown () {
      this.api.unsubscribe('editableInput', this.emit)
      this.api.destroy()
    },
    createAndSubscribe () {
      this.$refs.element.innerHTML = this.text

      this.api = new MediumEditor(this.$refs.element, this.options)

      // bind edit operations to model
      // we need to store the handler in order to later on detach it again
      this.emit = (event) => {
        // Enable full access to medium api.
        this.$emit('edit', {event, api: this.api})
        // Enables v-model ability
        this.$emit('value', this.api.origElements.innerHTML)
      }
      //subscribe to editable input event.
      this.api.subscribe('editableInput', this.emit)

      // emit event to give parent access to MediumEditor instance
      this.$emit('editorCreated', this.api);
    }
  },
  watch: {
    value (newValue) {
      // innerHTML MUST not be performed if the text did not actually change.
      // otherwise, the caret position will be reset.
      if (newValue !== this.$refs.element.innerHTML) {
        this.api.setContent(this.value, 0)
        this.$refs.element.innerHTML = this.value
      }
    },
    /**
     * There is currently no way to change the options of a medium editor
     * without destroying and re-setting up the MediumEditor object.
     * We only tear down the editor, if the options actually changed.
     * See: https://github.com/yabwe/medium-editor/issues/1129
     */
    options: {
      handler(newOptions) {
        this.tearDown()
        this.createAndSubscribe()
      },
      deep: true
    }
  },
  MediumEditor
}
