// import { Controller, Get, Req, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

// @Controller('auth')
// export class AuthController {
//   @Get('google')
//   @UseGuards(AuthGuard('google')) //  Redirects to Google OAuth
//   async googleAuth(@Req() req) {}

//   @Get('google/callback')
//   @UseGuards(AuthGuard('google')) //  Handles Google OAuth callback
//   googleAuthRedirect(@Req() req) {
//     return {
//       message: 'User info from Google',
//       user: req.user, // ✅ Google user profile
//     };
//   }
// }  

import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './google-auth.guard';

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(GoogleAuthGuard) // ✅ Use renamed GoogleAuthGuard
  async googleAuth(@Req() req) {
    console.log("Redirecting to Google oAuth", req.headers)
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Req() req) {
    return {
      message: 'User info from Google',
      user: req.user,
    };
  }
}

