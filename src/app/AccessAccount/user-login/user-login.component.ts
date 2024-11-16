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

  }
}
