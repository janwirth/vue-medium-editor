<template>
  <div id="app">
    <h1>Instance 1</h1>
    <medium-editor
      v-if='show'
      :text='text'
      :options='options'
      v-on:edit='applyTextEdit'
      @editorCreated="handleEditorCreated"
      custom-tag='pre'/>

    <h2>Result</h2>
    <div v-html='text'> </div>
    <h2>Raw Result</h2>
    <div> {{text}} </div>

    <h2>Options</h2>
    <textarea
      :value='JSON.stringify(options, null, 2)'
      v-on:keyup='applyOptions'
    ></textarea>
    <pre v-if='!optionsValid'> Options don't parse! </pre>
    <h2> Visibility</h2>
    <input type='checkbox' v-model='show'>
    <h2>As Text input</h2>
    <input type='text' v-model='text'>
    <br/>
  </div>
</template>

<script>
import MediumEditor from '../../index.js'

const text = 'hello world'

const optionsValid = true
const show = true
const tag = 'h1'
const options = {
    toolbar: {
        buttons: ['bold', 'italic', 'underline', 'anchor']
    },
    anchor: {
        /* These are the default options for anchor form,
           if nothing is passed this is what it used */
        customClassOption: 'alink',
        customClassOptionText: 'Button',
        linkValidation: false,
        placeholderText: 'YOYOYO',
        targetCheckbox: false,
        targetCheckboxText: 'Open in new window'
    }
}

export default {
  name: 'app',
  data: () => ({text, show, tag, options, optionsValid}),
  methods: {
    applyOptions (ev) {
      console.log(ev)
      try {
        this.options = JSON.parse(ev.target.value)
        this.optionsValid = true
      } catch (e) {
        this.optionsValid = false
      }
    },
    applyTextEdit (ev) {
      console.log(ev)
      if (ev.event.target) {
        console.log(ev.event.target.innerHTML)
        this.text = ev.event.target.innerHTML
      }
    },
    handleEditorCreated(editor) {
      /**
       * write what you want here after the editor has been initalised but don't update the options here
       * without an if condition as it'll cause an infinite loop because the watcher will recreate
       * medium editor instane
       */
    }
  },
  components: {MediumEditor}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
textarea {
  width: 600px;
  height: 500px;
}
</style>

