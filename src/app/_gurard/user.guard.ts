import { routes } from './../app.routes';
import { inject } from '@angular/core';
import { CanActivateFn, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const userGuard: CanActivateFn = (route, state) => {
  const User = localStorage.getItem('LoggedUser')
  const toster = inject(ToastrService)
  if(User){
    return true;
  }
  else{
    toster.error("Please LogIn")
    return false
  }
};
