import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BookUsage } from '../_Inerface/AdminInterFace';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  private http = inject(HttpClient)
  baseUrl = environment.apiUrl

  CountLending(){
   return this.http.get<number>(this.baseUrl + 'BookLending/countLending')
  }

  GetBookUsage(){
   return this.http.get<BookUsage[]>(this.baseUrl + `HistoryContoller/book-usage`)
  }
}
