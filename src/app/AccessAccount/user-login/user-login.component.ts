import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../_service/user-service.service';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [RouterLink,FormsModule,ReactiveFormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
private toaster = inject(ToastrService);
private router = inject(Router)
private userAccount = inject(UserServiceService)

  UserLogin:FormGroup
  constructor(private formBuilder:FormBuilder){
    this.UserLogin = this.formBuilder.group({
      nic:['',Validators.required],
      password:['',Validators.required]
    })
  }

  Login(){
    let userData = this.UserLogin.value;
    this.userAccount.UserLogin(userData).subscribe(
      {
        next:response=>{
          this.toaster.success("Login Successful")
          this.router.navigateByUrl('')
        },
        error:error=> this.toaster.error(error.error.Message)
      }
    )
  }
}
