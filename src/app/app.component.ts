import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserServiceService } from './_service/user-service.service';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { AdminService } from './_service/admin.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular';
  private UserService = inject(UserServiceService)
  private Admin = inject(AdminService)

  ngOnInit(): void {

    this.LoggedUser()
   // this.LoadAdmin()
  }

  LoggedUser() {
    const User = localStorage.getItem('LoggedUser')
    if (!User) return
    const UserToken = JSON.parse(User);
    this.UserService.currentUser.set(UserToken);
  }
  // LoadAdmin(){
  //   const Admin = localStorage.getItem('Admin')
  //   if(!Admin)return
  //   const AdminToken = JSON.parse(Admin)
  //   this.Admin.Admin.set(AdminToken)
  // }

 
}
