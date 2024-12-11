import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Author, Book, BookRatting, comments, Genre, GetBookForEdit, PostBook, postComment } from '../_Inerface/BookInterFace';
import { LendingRequest } from '../_Inerface/BookTransactionInterface';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AddPriceAndDiscounts } from '../_Inerface/AdminInterFace';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private http = inject(HttpClient)
  Books = signal<Book[]>([])
  NotPublishedBooksSignal = signal<Book[]>([])
  baseUrl = environment.apiUrl;
  GenreSignal = signal<Genre[]>([])
  AuthorSignal = signal<Author[]>([])
  toaster = inject(ToastrService)

  getAllBooks(query: string) {
    return this.http.get<Book[]>(this.baseUrl + `Book/all?searchText=${query}`).subscribe({
      next: response => this.Books.set(response)
    })
  }

  GetAllNotPublishedBook(querry:string){
    return this.http.get<Book[]>(this.baseUrl + `Book/GetAllNotPublishedBook?searchText=${querry}`).subscribe({
      next:res=>{
        this.NotPublishedBooksSignal.set(res)
      },
      error:err=>{
        this.toaster.error(err.Message)
      }
    })
  }

  getBookById(BookId: number, UserId: number) {
    return this.http.get<Book>(this.baseUrl + `Book/GetBookByID?bookId=${BookId}&userId=${UserId}`);
  }

  RequestLendingBook(data: LendingRequest) {
    return this.http.post(this.baseUrl + `BookLending/LendingRequest`, data);
  }

  PostNewBook(book: any) {
    return this.http.post(this.baseUrl + `Book/addBook`, book)
  }

  DeleteBook(id: number) {
    return this.http.delete(this.baseUrl + `Book/DeleteBook?BookId=${id}`)
  }

  GetAllGenre() {
    return this.http.get<Genre[]>(this.baseUrl + 'Genre/GetAll').subscribe({
      next: res => {
        this.GenreSignal.set(res)
      }
    })
  }

  GetAllAuthor() {
    return this.http.get<Author[]>(this.baseUrl + 'Author/GetAllAuthor').subscribe({
      next: res => {
        this.AuthorSignal.set(res)
      }
    })
  }

  AddNewAuthor(name: any) {
    return this.http.post(this.baseUrl + `Author/AddNewAuthor`, name)
  }

  AddNewGenre(name: any) {
    return this.http.post(this.baseUrl + `Genre/AddNewGenre`, name)
  }


  updateBook(formData: FormData): Observable<any> {
    return this.http.put(this.baseUrl + 'Book/updateBook', formData);
  }


  Postratting(Ratting: BookRatting) {
    return this.http.post(this.baseUrl + `Ratting/PostRatting`, Ratting)
  }

  PostComment(comment: postComment) {
    return this.http.post(this.baseUrl + `Comment/addComment/`, comment)
  }

  GetBookByIDForAdminEdit(BookId: number) {
    return this.http.get<Book>(this.baseUrl + `Book/GetBookByIdAdmin?bookid=${BookId}`)
  }

  AddBookPriceAndDiscount(data:AddPriceAndDiscounts){
    return this.http.post<AddPriceAndDiscounts>(this.baseUrl + `BookPrice/add-or-update`,data)
  }

  ChangeThePublishData(id:number){
    return this.http.put(this.baseUrl + `Book/change-BookPublish-Status?bookid=${id}`,{})
  }

  ChangeTheBookTitle(bookId:number, newTitle:string){
    return this.http.put(this.baseUrl + `Book/UpdateBookTitle?bookId=${bookId}&newTitle=${newTitle}`,{})
  }

  EditAuthor(bookId:number, authorId:number){
    return this.http.put(this.baseUrl + `Book/update-author?bookId=${bookId}&authorUpdateDTO=${authorId}`,{})
  }

  UpdateGenre(bookId:number, GenreID:number){
    return this.http.put(this.baseUrl + `Book/update-Genre?bookId=${bookId}&Genre=${GenreID}`,{})
  }

  UpdateDescription(bookId:number, NewDescription:string){
  return this.http.put(this.baseUrl +`Book/update-Description?bookId=${bookId}&NewDescription=${NewDescription}`,{})
  }

  UpdateQuantity(bookId:number,Quantity:number){
    return this.http.put(this.baseUrl + `Book/update-Quantity?bookId=${bookId}&Quantity=${Quantity}`,{})
  }
}
