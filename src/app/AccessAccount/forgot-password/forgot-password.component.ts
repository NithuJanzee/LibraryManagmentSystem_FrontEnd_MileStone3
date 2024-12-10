import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../../_service/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { JsonPipe } from '@angular/common';
import { password } from '../../_Inerface/UserInterface';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  userService = inject(UserServiceService)
  UserNic: string = '';
  NewPassword: string = '';
  toaster = inject(ToastrService)
  router = inject(Router)

  OTPVerification = localStorage.getItem('verify')
  RequestButton() {
    this.userService.CheckUserNicForChangePassword(this.UserNic).subscribe({
      next: res => {
        this.toaster.success("Valid NIC")
        localStorage.setItem('NIC', this.UserNic)
        this.router.navigateByUrl('/otp-verification')
      },
      error: err => {
        console.log(err.error)
      }
    })
  }
  changePassword() {
    if (this.NewPassword.length >= 8) {
      let UserNIC: string | null = localStorage.getItem('NIC');
      let UserID: string = UserNIC ?? ''


      let data: password = {
        nic: UserID,
        newPassword: this.NewPassword
      }

      this.userService.ChangePassword(data).subscribe({
        next: res => {
          this.toaster.success("Password Updated Successful")
          localStorage.removeItem('NIC');
          localStorage.removeItem('verify')
          setTimeout(() => {
            this.router.navigateByUrl('/User-Login')
          }, 300);
        },
        error: err => {
          this.toaster.error(err.error)
        }
      })
    } else {
      this.toaster.error("password must be 8 digits or Above")
    }
  }
}
