import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Book } from '../_Inerface/BookInterFace';
import { LendingRequest } from '../_Inerface/BookTransactionInterface';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private http = inject(HttpClient)
  Books = signal<Book[]>([])
  baseUrl = environment.apiUrl;

  getAllBooks(query:string){
   return this.http.get<Book[]>(this.baseUrl + `Book/all?searchText=${query}`).subscribe({
    next: response => this.Books.set(response)
   })
  }

  getBookById(id:number){
    return this.http.get<Book>(this.baseUrl + `Book/GetBookByID?id=${id}`);
  }

  RequestLendingBook(data:LendingRequest){
    return this.http.post(this.baseUrl + `BookLending/LendingRequest`,data);
  }

 
}
