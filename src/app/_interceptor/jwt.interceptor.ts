// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { AccountsService } from '../_services/accounts.service';

// export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
//   const accounService = inject(AccountsService)
//   if(accounService.currentUser()){
//     req = req.clone({
//       setHeaders:{
//         Authorization:`Bearer ${accounService.currentUser()?.token}`
//       }
//     })
//   }
//   return next(req);
// };

//dont forgot to add the app.config.ts interceptor