import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServiceService } from '../../_service/user-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-creation',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-creation.component.html',
  styleUrl: './user-creation.component.css'
})
export class UserCreationComponent {
  private userAccount = inject(UserServiceService)
   toaster = inject(ToastrService)

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

  onSubmit(){
    let User = this.UserCreation.value;
    this.userAccount.userCreation(User).subscribe(
      p=>{
        this.toaster.success("Account Created Successfully \n Please Login")
      }
    )
  }
}
