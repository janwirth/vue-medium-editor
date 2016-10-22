# Contenteditable directive
This directive is used in the editor to enable inline editing.

![Rave!](https://media.giphy.com/media/11ezB6LVNvB2U/giphy.gif)

    MediumEditor = require 'medium-editor'

    module.exports =
      twoWay: true


Initialize the directive with our model value.
The newValue is passed also on initialisation of the directive as well as when the model updates.
So we could also call this firstValue here.

      update: (newValue, oldValue) ->
        @el.innerHTML = newValue
        if !(newValue[0 .. 2] == '<br')
          @el.classList.remove 'medium-editor-placeholder'

We only want one instance of the medium editor per app, which is why we add it to our $root component.
If we already have an instance, just add the directed element to our existing medium-editor instance.

      bind: ->
        if @vm.$root.mediumEditor?
          @vm.$root.mediumEditor.addElements @el

Initialize the toolbar with the buttons our end-user needs.

[Available button options](https://github.com/yabwe/medium-editor#button-options)

        else
          @vm.$root.mediumEditor = new MediumEditor @el,
            buttonLabels: 'fontawesome'
            placeholder:
              text: 'Text eingeben...'
            toolbar:
              buttons: [
                  'h1'
                  'h2'
                  'bold'
                  'italic'
                  'underline'
                  'justifyLeft'
                  'justifyCenter'
                  'justifyRight'
                  'justifyFull'
                  'anchor'
                  'quote'
                  'orderedlist'
                  'unorderedlist'
                  'indent'
                  'outdent'
                ]

Whenever the DOM subtree, the 'model' of the contenteditable element is modified, we pass the changes to our model.

        @el.addEventListener 'DOMSubtreeModified', =>
          @set @el.innerHTML if @el.childNodes[0]?

Clean up.

      unbind: ->
          @vm.$root.mediumEditor.removeElements @el
