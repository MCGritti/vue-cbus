# Table of contents
1. [Introduction](#intro)
2. [Installation](#install)
3. [Pluggin it into your app](#plugin)
4. [Usage](#usage)
5. [Documentation](#doc)

## <a name="intro">Introduction</a>
This plugin provides a easy way to handle events in VueJS (V.2) using contexts.  

## Installation <a name="install"></a>
You can install this plugin using npm
```sh
npm i --save vue-cbus
```

## <a name="plugin">Pluggin it into your app</a>
To use vue-cbus in your VueJS app, you just need to tell VueJS to use it.
```js
import Vue from 'vue'
import CBus from 'vue-cbus'

Vue.use(CBus, {
  debugMode: false
})

// ...
```
The *debugMode* option controls if **vue-cbus** will log debug messages.

## <a name="usage">Usage</a>
**vue-cbus** automatically creates a global context when the applcation starts.
You can access it in your component using *this.$gbus*, like shown in the example
below

```js
// component1.vue
export default {
  methods: {
    onSomeEvent () {
      console.log('Some event ocurred')
    }
  },
  mounted () {
    this.$gbus.on('someEvent', this.onSomeEvent)
  }
}

// component2.vue
export default {
  methods: {
    emitSomeEvent () {
      this.$gbus.emit('someEvent')
    }
  }
}
```

You can also use local contexts

```js
// component1.vue
export default {
  methods: {
    someEventHandler () {
      console.log('Some event ocurred')
    },
    anotherEventHandler () {
      console.log('Another event ocurred')
    }
  },
  mounted () {
    this.$lbus('MyLocal').on('someEvent', this.someEventHandler)
    this.$lbus('Another').on('someEvent', this.anotherEventHandler)
  }
}

// component2.vue
export default {
  methods: {
    emitSomeEvent () {
      this.$lbus('MyLocal').emit('someEvent')
    }
  }
}

// component3.vue
export default {
  methods: {
    emitAnotherEvent () {
      this.$lbus('Another').emit('someEvent')
    }
  }
}
```

## <a name="doc">Documentation</a>

This plugin inject 3 prototypes into the Vue instance:
1. Vue.prototype.$gbus // Access to the global bus
2. Vue.prototype.$lbus // Gets/Creates a local bus
3. Vue.prototype.$cbus // Controls the local buses


