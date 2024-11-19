import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AdminService } from '../_service/admin.service';

export const jwtAdminInterceptor: HttpInterceptorFn = (req, next) => {
  const Admin = inject(AdminService)
  if(Admin.Admin()){
    req = req.clone({
      setHeaders:{
        Authorization:`Bearer ${Admin.Admin()?.token}`
      }
    })
  }
  return next(req);
};
