import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../_service/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [RouterLink,FormsModule,ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  private AdminService = inject(AdminService)
  private toster = inject(ToastrService)
  private route = inject(Router)
  
  AdminLogin:FormGroup
  constructor(private FromBuilder:FormBuilder){
    this.AdminLogin = this.FromBuilder.group({
      id:['',Validators.required],
      password:['',Validators.required]
    })
  }

  Login(){
    let adminData = this.AdminLogin.value;
    this.AdminService.AdminLogin(adminData).subscribe({
      next: response =>{
        this.toster.success("WelCome Admin")
        this.route.navigateByUrl('admin/DashBoard')
      },
      error:error => this.toster.error(error.error)
    })
  }
}
