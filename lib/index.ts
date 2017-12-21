import * as React from 'react'
import * as h from 'react-hyperscript'
import * as _ from 'lodash'
import MagicalStore from './MagicalStore'
import storeFactory from './StoreFactory'


export function connect(component: React.ComponentClass, storeSources: any[]): React.ComponentClass {
  const magicalStores = storeSources.map(storeSource => storeFactory.castSpell(storeSource))

  const storeProps: {[key: string]: MagicalStore} = {}
  for (let [storeSource, magicalStore] of _.zip(storeSources, magicalStores)) {
    storeProps[
      storeSource.constructor.name[0].toLowerCase() + storeSource.constructor.name.substring(1)
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
      return h(component, {...storeProps, ...this.props})
    }

    onStoreUpdate() {
      this.forceUpdate()
    }
  }
}
