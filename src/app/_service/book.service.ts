import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Author, Book, Genre, PostBook } from '../_Inerface/BookInterFace';
import { LendingRequest } from '../_Inerface/BookTransactionInterface';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private http = inject(HttpClient)
  Books = signal<Book[]>([])
  baseUrl = environment.apiUrl;
  GenreSignal = signal<Genre[]>([])
  AuthorSignal = signal<Author[]>([])

  getAllBooks(query:string){
   return this.http.get<Book[]>(this.baseUrl + `Book/all?searchText=${query}`).subscribe({
    next: response => this.Books.set(response)
   })
  }

  getBookById(BookId:number,UserId:number){
    return this.http.get<Book>(this.baseUrl + `Book/GetBookByID?bookId=${BookId}&userId=${UserId}`);
  }

  RequestLendingBook(data:LendingRequest){
    return this.http.post(this.baseUrl + `BookLending/LendingRequest`,data);
  }

 PostNewBook(book:any){
  return this.http.post(this.baseUrl + `Book/addBook`,book)
 }

 DeleteBook(id:number){
  return this.http.delete(this.baseUrl + `Book/DeleteBook?BookId=${id}`)
 }

 GetAllGenre(){
  return this.http.get<Genre[]>(this.baseUrl + 'Genre/GetAll').subscribe({
    next:res=>{
      this.GenreSignal.set(res)
    }
  })
 }

 GetAllAuthor(){
  return this.http.get<Author[]>(this.baseUrl + 'Author/GetAllAuthor').subscribe({
    next:res=>{
      this.AuthorSignal.set(res)
    }
  })
 }

 AddNewAuthor(name:string){
  return this.http.post(this.baseUrl +'Author/AddNewAuthor',name)
 }
}
