import MagicalStore from './MagicalStore'


class StoreFactory {
  private instances = new Map<any, MagicalStore>()

  castSpell(storeSource: any): MagicalStore {
    let magicalStore = this.instances.get(storeSource)
    if (magicalStore !== undefined) {
      return magicalStore
    }

    magicalStore = new MagicalStore(storeSource)
    this.instances.set(storeSource, magicalStore)
    return magicalStore
  }
}

export default new StoreFactory