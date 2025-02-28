// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

// @Injectable()
// export class GoogleAuthGuard implements CanActivate {
//   canActivate(context: ExecutionContext): boolean {
//     const request = context.switchToHttp().getRequest();
//     return request.isAuthenticated(); // ✅ Checks if user is logged in
//   }
// }


import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {} // ✅ Use GoogleAuthGuard
