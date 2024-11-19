import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserServiceService } from '../_service/user-service.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const UserAccount = inject(UserServiceService)
  if(UserAccount.currentUser()){
    req = req.clone({
      setHeaders:{
        Authorization:`Bearer ${UserAccount.currentUser()?.token}`
      }
    })
  }
  return next(req);
};

//don't forgot to add the app.config.ts interceptor