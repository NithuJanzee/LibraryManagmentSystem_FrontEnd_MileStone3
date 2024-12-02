import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  otp: string[] = ['', '', '', '', '', ''];

  moveFocus(event: any, index: number): void {
    if (event.target.value.length === 1 && index < 3) {
      const nextInput = document.getElementById(`otpInput${index + 1}`) as HTMLInputElement;
      nextInput.focus();
    }

    if (event.key === 'Backspace' && index > 0) {
      const prevInput = document.getElementById(`otpInput${index - 1}`) as HTMLInputElement;
      prevInput.focus();
    }
  }

  validateOTP(): void {
    const otpCode = this.otp.join('');
    console.log('OTP Code:', otpCode);
    if (otpCode.length === 4) {
      alert(otpCode);
    } else {
      alert('Please enter a complete OTP');
    }
  }
}
