define ['jquery'], ($) ->
    class moduleOne
        privateVar = 'Bob'
        constructor: ->
            dog = privateVar
            console.log dog
        publicMethod: ->
            console.log 1