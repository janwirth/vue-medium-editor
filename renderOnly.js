export default {
  name: 'medium-editor-nuxt',
  props: {
    text: [String],
    customTag: {
      type: [String],
      default: () => 'div'
    }
  },
  render (h) {
    return h(this.customTag, { ref: 'element' })
  },
}
