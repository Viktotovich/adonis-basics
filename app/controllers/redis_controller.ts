import cache from '#services/cache_service'
import type { HttpContext } from '@adonisjs/core/http'

//sudo systemctl start redis-server << for every cold start

export default class RedisController {
  //super weird, but it HAS to be explicitly public, no implicit
  public async destroy({ response, params }: HttpContext) {
    await cache.delete(params.slug)
    return response.redirect().back()
  }

  public async flush({ response }: HttpContext) {
    console.log('Flushing Redis Database')
    await cache.flushDb()
    return response.redirect().back()
  }
}
