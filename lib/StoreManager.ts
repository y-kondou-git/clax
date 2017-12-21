import MagicalStore from './MagicalStore'


export default new class StoreManager {
  private instances = new Map<any, MagicalStore>()

  makeStoreFrom(storeSourceClass: any): MagicalStore {
    let magicalStore = this.instances.get(storeSourceClass)
    if (magicalStore !== undefined) {
      return magicalStore
    }

    magicalStore = new MagicalStore(new storeSourceClass)
    this.instances.set(storeSourceClass, magicalStore)
    return magicalStore
  }

  getWholeState(): Map<any, any> {
    return new Map(Array.from(this.instances).map(([storeSourceClass, magicalStore]: [any, MagicalStore]): [any, any] => {
      return [storeSourceClass.name, magicalStore.getState()]
    }))
  }
}