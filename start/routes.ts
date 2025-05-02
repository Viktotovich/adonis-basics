/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
//Lazy import, forced by the eslint
const MoviesController = () => import('#controllers/movies_controller')
const RedisController = () => import('#controllers/redis_controller')
const DirectorsController = () => import('#controllers/directors_controller')
const WritersController = () => import('#controllers/writers_controller')
const RegisterController = () => import('#controllers/auth/register_controller')
const LoginController = () => import('#controllers/auth/login_controller')

router.get('/', [MoviesController, 'index']).as('home')

router
  .get('/movies/:slug', [MoviesController, 'show'])
  .as('movies.show')
  .where('slug', router.matchers.slug())

//DirectorsRouter
router.get('/directors', [DirectorsController, 'index']).as('directors.index')
router.get('/directors/:id', [DirectorsController, 'show']).as('directors.show')

//WritersRouter
router.get('/writers', [WritersController, 'index']).as('writers.index')
router.get('/writers/:id', [WritersController, 'show']).as('writers.show')

//We spoof a delete call thanks to Adonis, app.ts line 20 true
//action="{{ route('redis.flush', {//route params}, { qs: {_method: 'DELETE'}}) }}"
// qs >> sets the method, qs = QueryString
//POST http://127.0.0.1:3333/redis/flush?_method=DELETE
router.delete('/redis/flush', [RedisController, 'flush']).as('redis.flush')
router.delete('/redis/:slug', [RedisController, 'destroy']).as('redis.destroy')

//AuthRouter
router
  .group(() => {
    //RegisterRouter
    router
      .get('/register', [RegisterController, 'show'])
      .as('register.show')
      .use(middleware.guest())

    router
      .post('/register', [RegisterController, 'store'])
      .as('register.store')
      .use(middleware.guest())

    //LoginRouter
    router.get('/login', [LoginController, 'show']).as('login.show').use(middleware.guest())

    router.post('/login', [LoginController, 'store']).as('login.store').use(middleware.guest())
  })
  .prefix('/auth')
  .as('auth')
