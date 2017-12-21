import MagicalStore from './MagicalStore'


export default new class StoreManager {
  private instances = new Map<any, MagicalStore>()

  makeStoreFrom(storeSource: any): MagicalStore {
    let magicalStore = this.instances.get(storeSource)
    if (magicalStore !== undefined) {
      return magicalStore
    }

    magicalStore = new MagicalStore(storeSource)
    this.instances.set(storeSource, magicalStore)
    return magicalStore
  }
}