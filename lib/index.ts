import * as React from 'react'
import * as _ from 'lodash'
import MagicalStore from './MagicalStore'
import StoreManager from './StoreManager'


export function connect(component: React.ComponentClass, storeSourceClasses: any[]): React.ComponentClass {
  const magicalStores = storeSourceClasses.map(storeSourceClass => StoreManager.makeStoreFrom(storeSourceClass))

  const storeProps: {[key: string]: MagicalStore} = {}
  for (let [storeSourceClass, magicalStore] of _.zip(storeSourceClasses, magicalStores)) {
    storeProps[
      storeSourceClass.name[0].toLowerCase() + storeSourceClass.name.substring(1)
    ] = magicalStore
  }

  return class extends React.Component {
    constructor(props: any) {
      super(props)

      this.onStoreUpdate = this.onStoreUpdate.bind(this)
    }

    componentDidMount() {
      for (let magicalStore of magicalStores) {
        magicalStore.notifier.addListener(this.onStoreUpdate)
      }
    }

    componentWillUnmount() {
      for (let magicalStore of magicalStores) {
        magicalStore.notifier.removeListener(this.onStoreUpdate)
      }
    }

    render() {
      return React.createElement(component, {...storeProps, ..._.omit(this.props, 'children')}, this.props.children)
    }

    onStoreUpdate() {
      this.forceUpdate()
    }
  }
}
