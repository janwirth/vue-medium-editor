export default {
  name: 'medium-editor-ssr',
  props: {
    value: [String],
    customTag: {
      type: [String],
      default: () => 'div'
    }
  },
  render (h) {
    return h(this.customTag, { ref: 'element' })
  },
}
