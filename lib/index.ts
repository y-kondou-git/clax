import * as React from 'react'
import * as h from 'react-hyperscript'
import MagicalStore from './MagicalStore'


export function listen(component: React.ComponentClass, magicalStores: any[]): React.ComponentClass {
  for (let magicalStore of magicalStores) {
    Object.setPrototypeOf(magicalStore, new MagicalStore)
    magicalStore.configure()
  }

  return class extends React.Component {
    componentDidMount() {
      for (let magicalStore of magicalStores) {
        magicalStore.notifier.addListener(this.onStoreUpdate.bind(this))
      }
    }

    componentWillUnmount() {
      for (let magicalStore of magicalStores) {
        magicalStore.notifier.removeListener(this.onStoreUpdate.bind(this))
      }
    }

    render() {
      return h(component, this.props)
    }

    onStoreUpdate() {
      this.forceUpdate()
    }
  }
}