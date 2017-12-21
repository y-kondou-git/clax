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
}