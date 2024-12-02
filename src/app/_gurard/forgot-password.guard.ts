import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const forgotPasswordGuard: CanActivateFn = (route, state) => {
  const Verify = localStorage.getItem('NIC')
  const toster = inject(ToastrService)
  if(Verify){
    return true;
  }else{
    toster.error("You are not verified")
    return false
  }
};
