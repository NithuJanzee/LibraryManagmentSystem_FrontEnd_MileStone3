import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Admin, AdminLogin } from '../_Inerface/AdminInterFace';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient)
  baseUrl = environment.apiUrl;

  Admin = signal<Admin|null>(null)

  AdminLogin(admin:AdminLogin){
    return this.http.post(this.baseUrl + "Admin/authenticate", admin).pipe(
      map((admin:any)=>{
        if(admin){
          localStorage.setItem('Admin',JSON.stringify(admin))
          this.Admin.set(admin)
        }
      })
    )
  }
}
