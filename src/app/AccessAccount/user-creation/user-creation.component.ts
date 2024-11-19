import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServiceService } from '../../_service/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-creation',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './user-creation.component.html',
  styleUrl: './user-creation.component.css'
})
export class UserCreationComponent {
  private userAccount = inject(UserServiceService)
  private toaster = inject(ToastrService)
  private router = inject(Router)

  UserCreation: FormGroup
  constructor(private FormBuilder: FormBuilder) {
    this.UserCreation = this.FormBuilder.group({
      nic: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
      ]]
    })
  }

  onSubmit() {
    let User = this.UserCreation.value;
    this.userAccount.userCreation(User).subscribe(
     {
      next: response => {
        this.toaster.success("Account Created Successfully \n Please Login")
        this.router.navigate(['User-Login'])
      },
      // error: error => this.toaster.error(error.Message)
     }
    )
  }
}
