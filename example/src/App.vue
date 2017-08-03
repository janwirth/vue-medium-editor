<template>
  <div id="app">
    <input type='checkbox' v-model='show'>
    <input type='text' v-model='text'>
    <div v-html='text'> </div>
    <div> {{text}} </div>
    <medium-editor
      v-if='show'
      :text='text'
      v-on:edit='applyTextEdit'
      custom-tag='h1'/>

    <input type='checkbox' v-model='show'>
    <input type='text' v-model='text'>
    <div v-html='text'> </div>
    <div> {{text}} </div>
    <medium-editor
      v-if='show'
      :text='text'
      v-on:edit='applyTextEdit'
      custom-tag='pre'/>
  </div>
</template>

<script>
import MediumEditor from 'vue2-medium-editor'

const text = 'Hello World'

const show = true
const tag = 'h1'

export default {
  name: 'app',
  data: () => ({text, show, tag}),
  methods: {
    applyTextEdit (ev) {
      console.log(ev)
      console.log(ev.event.target.innerHTML)
      this.text = ev.event.target.innerHTML
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
