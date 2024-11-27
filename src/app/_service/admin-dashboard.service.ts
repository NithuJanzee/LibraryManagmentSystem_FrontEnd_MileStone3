import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  private http = inject(HttpClient)
  baseUrl = environment.apiUrl

  CountLending(){
    this.http.get(this.baseUrl + 'BookLending/countLending')
  }
}
