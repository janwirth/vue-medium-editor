<template>
  <div id="app">
    <input type='checkbox' v-model='show'>
    <div v-html='text'> </div>
    <div> {{text}} </div>
    <medium-editor
      v-if='show'
      :text='text'
      v-on:edit='applyTextEdit'
      custom-tag='h1'/>
  </div>
</template>

<script>
import MediumEditor from 'babel-loader!../../vue-medium-editor/vue-medium-editor.js'
import Hello from './components/Hello'

const text = 'Hello World'

const show = true
const tag = 'h1'

export default {
  name: 'app',
  data: () => ({text, show, tag}),
  methods: {
    applyTextEdit (text) {
      console.log(text)
      this.text = text
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
</style>
