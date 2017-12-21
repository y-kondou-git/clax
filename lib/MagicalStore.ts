import {diff} from 'deep-diff'
import * as _ from 'lodash'
import Notifier from './Notifier'


export default class MagicalStore {
  private state: {[key: string]: any} = {}
  public notifier = new Notifier

  protected configure() {
    this.configureState()
    this.configureAction()
  }

  private configureState() {
    const stateKeys = _.difference(Object.getOwnPropertyNames(this), Object.getOwnPropertyNames(new MagicalStore))
    for (let stateKey of stateKeys) {
      this.state[stateKey] = _.cloneDeep((this as any)[stateKey])

      Object.defineProperty(this, stateKey, {
        get: () => this.state[stateKey],
        set: (value: any) => {
          this.state[stateKey] = value
        }
      })
    }
  }

  private configureAction() {
    const actionNames = _.difference(
      Object.getOwnPropertyNames(Object.getPrototypeOf(this)),
      Object.getOwnPropertyNames(Object.getPrototypeOf({}))
    )
    for (let actionName of actionNames) {
      const action = (this as any)[actionName]
      const isSync = action.constructor.name !== 'AsyncFunction'
      const clonedAction = action.bind(this)

      (this as any)[actionName] = function(...args: any[]) {
        console.log(
          'clax',
          `${isSync ? 'sync' : 'async'} action invoked`,
          `${this.constructor.name}#${actionName}(${args.join(', ')})`
        )

        let oldState
        if (isSync) {
          oldState = _.cloneDeep(this.state)
        }

        clonedAction(...args)

        if (isSync) {
          const changes = diff(oldState, this.state)
          console.log('clax', 'state changed', changes)
        }

        this.notifier.notify()
      }
    }
  }
}