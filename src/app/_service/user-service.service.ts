import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DecodedToken, LoggedUsers, UserAccount, UserLogin } from '../_Inerface/UserInterface';
import { environment } from '../../environments/environment.development';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private http = inject(HttpClient)
  baseUrl = environment.apiUrl;
  toster = inject(ToastrService)
  currentUser = signal<LoggedUsers | null>(null)
  //Decoded Token data
  LoggedUser = signal<DecodedToken | null>(null)

  userCreation(user: UserAccount) {
    return this.http.post(this.baseUrl + "User/PostNewUser", user)
  }

  UserLogin(user: UserLogin) {
    return this.http.post(this.baseUrl + "User/UserLogin", user).pipe(
      map((user: any) => {
        if (user) {
          localStorage.setItem('LoggedUser', JSON.stringify(user))
          this.currentUser.set(user)
        }
      })
    )
  }

  Logout() {
    localStorage.removeItem('LoggedUser');
    this.currentUser.set(null);
    this.LoggedUser.set(null);
  }
}
