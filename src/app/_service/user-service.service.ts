import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DecodedToken, LoggedUsers, password, UserAccount, UserID, UserLogin, UserTransactionById } from '../_Inerface/UserInterface';
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

  UserTransactionSignal = signal<UserTransactionById[]>([])
 // UserTransactionRequested = signal<UserTransactionById[]>([])

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

  GetAllTransactionWithUserId(userID:number, search?:string){
    return this.http.get<UserTransactionById[]>(`${this.baseUrl}BookLending/LendingByUserId?userID=${userID}${search ? `&search=${search}` : ''}`).subscribe({
      next:res=> this.UserTransactionSignal.set(res)
    })
  }

  UpdateUserToPremium(id:number){
    return this.http.post(this.baseUrl + `User/UpdateToPremium?UserId=`,id)
  }

  CheckUserNicForChangePassword(NIC:string){
    return this.http.post(this.baseUrl + `User/CheckNICSentOTP?NIC=${NIC}`,{})
  }

  CheckUserOTPforChangePassword(OTP:number)
  {
    return this.http.post(this.baseUrl + `User/CheckOTP?otp=${OTP}`,{})
  }

  ChangePassword(password:password){
    return this.http.post(this.baseUrl + `User/changePassword`,password)
  }


  RequestForSubscriptions(UserID:UserID){
    return this.http.post(this.baseUrl + `Payment/Request`, UserID)
  }
}
