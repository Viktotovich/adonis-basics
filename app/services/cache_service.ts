/* 
I was wondering why it's #store and not _store
That has to do with # (hash) being a true private field syntax that will make
the field accessible only within the class, not even in subclassess
Whereas _store is a JS convention, vs having the utility to make it private

To understand the # syntax better
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties
*/

import redis from '@adonisjs/redis/services/main'

class CacheService {
  async has(...keys: string[]) {
    return await redis.exists(keys)
  }

  async get(key: string) {
    //redis stores everything as a string, even objs
    const value = await redis.get(key)
    //return null, or parse. TS barks otherwise
    return value && JSON.parse(value)
  }

  async set(key: string, value: any) {
    return await redis.set(key, JSON.stringify(value))
  }

  async delete(...keys: string[]) {
    return await redis.del(keys)
  }

  async flushDb() {
    return await redis.flushdb()
  }
}

//singleton pattern
const cache = new CacheService()
//First import instanciates, further imports use that very same instance
export default cache
