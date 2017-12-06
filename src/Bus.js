'use strict'
export class Bus {
  constructor (context) {
    this.events = new Map()
    this.context = context
    cbusLog('Context created', context)
  }

  _createEvent (name) {
    if (this.events.has(name)) {
      return false
    }
    this.events.set(name, new Map())
    cbusLog(`Event ${name} created`, this.context)
    return true
  }

  _register (name, callback, once) {
    this._createEvent(name)
    cbusLog(`Callback registered for event ${name} (once: ${once})`, this.context)
    this.events.get(name).set(callback, once)
  }

  once (name, callback) {
    this._register(name, callback, true)
  }

  on (name, callback) {
    this._register(name, callback, false)
  }

  off (name, callback) {
    if (name && callback && this.events.has(name)) {
      if (this.events.get(name).delete(callback)) {
        cbusLog(`Clearing callback ${callback} from event ${name}`, this.context)
        return true
      }
      cbusLog(`Callback ${callback} not found in event ${name}`, this.context)
      return false
    }
    if (name && !callback && this.events.has(name)) {
      cbusLog(`Clearing all callbacks from event ${name}`, this.context)
      return this.events.delete(name)
    }
    if (!name && !callback) {
      cbusLog(`Clearing all events`, this.context)
      return this.events.clear()
    }
    cbusLog(`Event ${name} not founded (off)`, this.context)
    return false
  }

  emit (name, payload) {
    if (this.events.has(name)) {
      this.events.get(name).forEach((once, fcn) => {
        cbusLog(`Emitting ${fcn} from event ${name}`, this.context)
        fcn.call(payload)
        if (once) this.off(name, fcn)
      })
    }
    cbusLog(`Event ${name} not found`, this.context)
  }
}

export const enableDebugMode = (value) => {
  options.debugMode = true
}

export const createContext = (contexts) => (name) => {
  if (contexts.has(name)) {
    return null
  }
  contexts.set(name, new Bus(name))
  return contexts.get(name)
}

export const deleteContext = (contexts) => (name) => {
  cbusLog('Context deleted', name)
  return contexts.delete(name)
}

export const clearContexts = (contexts) => () => {
  cbusLog('All contexts cleared', 'LOCALS')
  return contexts.clear()
}

export const getContext = (contexts) => (name) => {
  let context = contexts.get(name)
  return context || createContext(contexts)(name)
}

const options = {
  debugMode: false
}

const cbusLog = (msg, context) => {
  if (options.debugMode) {
    console.log(`CBUS:${context}: ${msg}`)
  }
}

export default {
  Bus,
  enableDebugMode,
  createContext,
  deleteContext,
  clearContexts,
  getContext
}
