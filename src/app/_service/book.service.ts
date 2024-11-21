import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Book } from '../_Inerface/BookInterFace';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private http = inject(HttpClient)
  Books = signal<Book[]>([])
  baseUrl = environment.apiUrl;

  getAllBooks(){
   return this.http.get<Book[]>(this.baseUrl + "Book/all").subscribe({
    next: response => this.Books.set(response)
   })
  }

  getBookById(id:number){
    return this.http.get<Book>(this.baseUrl + `Book/GetBookByID?id=${id}`);
  }
}
