import { Component, OnInit, inject } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation.component";
import { UserHeadComponent } from "../user-head/user-head.component";
import { UserBodyComponent } from "../user-body/user-body.component";
import { jwtDecode } from "jwt-decode";
import { UserServiceService } from '../../_service/user-service.service';


@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [NavigationComponent, UserHeadComponent, UserBodyComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit{
 UserService = inject(UserServiceService)

  ngOnInit(): void {
    this.UserData()
  }

  UserData() {
    const User = localStorage.getItem('LoggedUser')
    if (!User) return
    const UserToken = JSON.parse(User);
    const decoded: any = jwtDecode(UserToken.token);
    this.UserService.LoggedUser.set(decoded)
  }
}
