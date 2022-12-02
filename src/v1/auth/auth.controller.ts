import { Controller, Post } from '@nestjs/common';

@Controller({ version: '1', path: 'auth' })
export class AuthController {
  @Post('signup')
  signup() {
    return { message: 'Signup' };
  }

  @Post('signin')
  signin() {}

  @Post('refreshToken')
  refreshToken() {}

  @Post('forget')
  forgetPassword() {}
}
