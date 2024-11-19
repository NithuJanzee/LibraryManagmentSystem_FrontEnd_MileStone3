import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const adminGuard: CanActivateFn = (route, state) => {
  const admin = localStorage.getItem('Admin')
  const toster = inject(ToastrService)
  if(admin){
    return true
  }
  else{
    toster.error("You are not logged in as an admin")
    return false
  }
  
};
