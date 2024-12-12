import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserServiceService } from '../../_service/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../../_Inerface/UserInterface';

@Component({
  selector: 'app-user-subscriptions',
  standalone: true,
  imports: [],
  templateUrl: './user-subscriptions.component.html',
  styleUrl: './user-subscriptions.component.css'
})
export class UserSubscriptionsComponent implements OnInit {

  userService = inject(UserServiceService)
  toaster = inject(ToastrService)
  DecodedToken = signal<DecodedToken | null>(null)

  ngOnInit(): void {
    this.loadCurrentUser()
  }

  loadCurrentUser() {
    const User = localStorage.getItem('LoggedUser')
    if (!User) return
    const UserToken = JSON.parse(User);
    const decoded: any = jwtDecode(UserToken.token);
    this.DecodedToken.set(decoded)

  }

  RequestForSubscription() {

    let userId = this.DecodedToken()?.nameid
    let ID = Number(userId)
    let response = {
      userId: ID
    }

    this.userService.RequestForSubscriptions(response).subscribe({
      next: res => {
        this.toaster.success("Request Successfully")
      },
      error: err => {
        this.toaster.error(err.error)
      }
    })
  }
}
