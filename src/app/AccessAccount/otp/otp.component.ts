import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../_service/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OTPComponent {
  otp: string[] = ['', '', '', ''];
  toaster = inject(ToastrService)
  userService = inject(UserServiceService)
  router =  inject(Router)

  moveFocus(event: any, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value) {
      this.otp[index] = value; // Store as a string
      if (index < 3) {
        const nextInput = document.getElementById(`otpInput${index + 2}`);
        if (nextInput) {
          (nextInput as HTMLInputElement).focus();
        }
      }
    }
  }

  validateOTP() {
    if (this.otp.includes('')) {
      this.toaster.error('Please fill all OTP fields.')
      return;
    }
    const otpValue = this.otp.map(Number).join('');
    const OTP = Number(otpValue)
    this.userService.CheckUserOTPforChangePassword(OTP).subscribe({
      next:res=>{
        localStorage.setItem('verify',otpValue)
        this.toaster.success("verification successful")
        this.router.navigateByUrl('/forgot-password')

      },
      error: err => {
        this.toaster.error(err.error)
      }
    })
  }

}
