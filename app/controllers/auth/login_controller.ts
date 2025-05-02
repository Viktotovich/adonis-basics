import User from '#models/user'
import { loginValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  async show({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  async store({ request, response, auth }: HttpContext) {
    //1. grab validated data
    const { email, password } = await request.validateUsing(loginValidator)

    //2. Verify the credentials
    const user = await User.verifyCredentials(email, password) //auto throws

    //3. login the user
    await auth.use('web').login(user)

    //4. Return our user back to the homepage
    return response.redirect().toRoute('home')
  }
}
