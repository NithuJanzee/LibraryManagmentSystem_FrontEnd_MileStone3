import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserAccount, UserLogin } from '../_Inerface/UserInterface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private http = inject(HttpClient)
  baseUrl = environment.apiUrl;
  toster = inject(ToastrService)


  userCreation(user:UserAccount){
    return this.http.post(this.baseUrl +"User/PostNewUser",user)
  }

  UserLogin(user:UserLogin){
    return this.http.post(this.baseUrl + "User/UserLogin",user)
  }
}
