import MediumEditor from 'medium-editor'

// impure helper function, replaces some element from the dom with a new one of the given tag name
// returns the new one.

function replaceElementWith (element, tagName) {
  let newElement = document.createElement(tagName)
  element.parentNode.replaceChild(newElement, element)
  return newElement
}

// http://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
function generateUIDNotMoreThan1million() {
    return ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4)
}

export default function VueMediumEditor (options) {
  const uniqueKey = generateUIDNotMoreThan1million()
  return {
    name: 'medium-editor',
    props: ['text', 'customTag'],
    template: '<div ref="element" v-html="text"> </div>',

    mounted (evt) {
// Use custom tag or div as editor element.
      this.$refs.element = replaceElementWith(this.$refs.element, this.customTag || 'div')
      this.$refs.element.innerHTML = this.text

// Init module
// Here we store the instances with different configurations
      this.$root.mediumEditor = this.$root.mediumEditor || {}

      console.log(this.$root.mediumEditor[uniqueKey])
// if Medium Editor is not instantiated yet, create a new instance
      if (!this.$root.mediumEditor[uniqueKey]) {
        this.$root.mediumEditor[uniqueKey] = new MediumEditor(this.$refs.element, options)

// otherwise, just add the element
      } else {
        this.$root.mediumEditor[uniqueKey].addElements(this.$refs.element)
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
}
