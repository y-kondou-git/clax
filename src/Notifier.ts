import * as _ from 'lodash'


export default class Notifier {
  private listeners: (() => void)[] = []

  addListener(listener: () => void) {
    this.listeners.push(listener)
  }

  removeListener(listener: () => void) {
    _.pull(this.listeners, listener)
  }

  notify() {
    for (let listener of this.listeners) {
      listener()
    }
  }
}