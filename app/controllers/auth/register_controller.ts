import User from '#models/user'
import { registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  async show({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }

  async store({ request, response, auth }: HttpContext) {
    //VineJS knows exactly what to return and validate
    // 1. Grab our request and validate it
    const data = await request.validateUsing(registerValidator)

    // 2. Create our user
    // Adonis will handle validation errors automatically
    const user = await User.create(data)

    /* 3. Login that user >> Adonis's built in hasher hashes the password with scrypt 
    pre-set. All we need to do is use the auth.use() method available to us, chained 
    with .login() method */
    await auth.use('web').login(user)

    // 4. Return the user back to home

    return response.redirect().toRoute('home')
  }
}
