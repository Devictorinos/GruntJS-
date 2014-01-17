define ['jquery'], ($) ->
    class moduleOne
        privateVar = 'Jack'
        constructor: ->
            cat = privateVar
            console.log cat
        publicMethod: ->
            console.log 1 