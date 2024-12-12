import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AllUsers } from '../_Inerface/MannualLending';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MannualLendingService {
  private http = inject(HttpClient)
  toaster = inject(ToastrService)
  baseUrl = environment.apiUrl;
 

  GetAllUsers(text:string){
    return this.http.get<AllUsers[]>(this.baseUrl + `User/GetAllUsers?searchText=${text}`)
  }

  AddNewUser(input:any){
    return this.http.post<any>(this.baseUrl+ `User/PostNewUser`,input)
  }
  LendBookByAdmin(userId:number,BookId:number,lendingDays:number,Amount:number){
    return this.http.post(this.baseUrl + `BookLending/AddLendingByAdmin?userId=${userId}&bookId=${BookId}&lendingDays=${lendingDays}&amount=${Amount}`,{})
  }
}
