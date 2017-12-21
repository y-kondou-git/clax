import {diff} from 'deep-diff'
import * as _ from 'lodash'
import Notifier from './Notifier'
import StoreManager from './StoreManager'


export default class MagicalStore {
  private state: {[key: string]: any} = {}
  private actionCallDepth = 0
  public notifier = new Notifier

  constructor(private source: {[key: string]: any}) {
    this.configureState()
    this.configureAction()
  }

  getState() {
    return this.state
  }

  private configureState() {
    const stateKeys = Object.keys(this.source)
    for (let stateKey of stateKeys) {
      this.state[stateKey] = _.cloneDeep(this.source[stateKey])

      Object.defineProperty(this, stateKey, {
        get: () => this.state[stateKey],
        set: (value: any) => {
          this.state[stateKey] = value
        }
      })
    }
  }

  private configureAction() {
    const actionNames = Object.getOwnPropertyNames(Object.getPrototypeOf(this.source))
    for (let actionName of actionNames) {
      const action = this.source[actionName].bind(this)
      const isSync = action.constructor.name !== 'AsyncFunction';

      (this as any)[actionName] = function(...args: any[]) {
        if (!isSync || 0 >= this.actionCallDepth) {
          console.debug(
            'clax:',
            `${isSync ? 'Sync' : 'Async'}ActionInvoked:`,
            `${this.source.constructor.name}#${actionName}`,
            args
          )
        }

        let oldState
        if (isSync) {
          if (0 >= this.actionCallDepth) {
            oldState = _.cloneDeep(this.state)
          }

          this.actionCallDepth += 1
        }

        try {
          action(...args)
        } finally {
          if (isSync) {
            this.actionCallDepth -= 1
          }
        }

        if (isSync && 0 >= this.actionCallDepth) {
          const changes = diff(oldState, this.state)
          console.debug('clax:', 'StateChanged:', this.source.constructor.name, changes, StoreManager.getWholeState())

          this.notifier.notify()
        }
      }.bind(this)
    }
  }
}