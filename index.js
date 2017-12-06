'use strict'
import { Bus, enableDebugMode, createContext, deleteContext, clearContexts, getContext } from './src/Bus'

const CBusPlugin = {
  install (Vue, options) {
    if (options.enableDebugMode) {
      enableDebugMode()
    }
    Vue.contexts = new Map()
    Vue.prototype.$lbus = getContext(Vue.contexts)
    Vue.prototype.$gbus = new Bus('GLOBAL')
    Vue.prototype.$cbus = {
      create: createContext(Vue.contexts),
      delete: deleteContext(Vue.contexts),
      purge: clearContexts(Vue.contexts),
      get: getContext(Vue.contexts)
    }
  }
}

export default CBusPlugin
