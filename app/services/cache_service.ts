/* 
I was wondering why it's #store and not _store
That has to do with # (hash) being a true private field syntax that will make
the field accessible only within the class, not even in subclassess
Whereas _store is a JS convention, vs having the utility to make it private

To understand the # syntax better
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties
*/

class CacheService {
  #store: Record<string, any> = {}

  has(key: string) {
    return key in this.#store
  }

  get(key: string) {
    return this.#store[key]
  }

  set(key: string, value: any) {
    this.#store[key] = value
  }

  delete(key: string) {
    delete this.#store[key]
  }
}

//singleton pattern
const cache = new CacheService()
//First import instanciates, further imports use that very same instance
export default cache
