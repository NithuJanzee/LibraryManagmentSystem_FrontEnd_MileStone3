import { Component, OnInit, inject, signal } from '@angular/core';
import { BookService } from '../../_service/book.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../_Inerface/BookInterFace';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { UserServiceService } from '../../_service/user-service.service';
import { FormsModule } from '@angular/forms';
import { LendingRequest } from '../../_Inerface/BookTransactionInterface';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [NgFor, FormsModule,CommonModule,DatePipe],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})

export class BookDetailsComponent implements OnInit {
  ParamBookId: number;
  BookById = signal<Book | null>(null)
  bookDetails: any;
  requestDay: number = 1;
  private toster = inject(ToastrService)

  UserService = inject(UserServiceService)

  constructor(private route: ActivatedRoute) {
    const BookID = this.route.snapshot.paramMap.get('id');
    this.ParamBookId = Number(BookID)
  }
  Bookservice = inject(BookService)

  ngOnInit(): void {
    this.UserData()
    if (this.BookById()?.bookId != this.ParamBookId)
      this.Bookservice.getBookById(this.ParamBookId).subscribe({
        next: res => this.BookById.set(res)
      })
    console.log(this.UserService.LoggedUser())
  }
  get roundedAverageRating(): number {
    return Math.round(this.bookDetails?.averageRating || 0);
  }

  LendingRequest(): void {

    const user = Number(this.UserService.LoggedUser()?.nameid)
    const book = this.ParamBookId
    const Day = this.requestDay

    const Data: LendingRequest = {
      userID: user,
      bookID: book,
      requestDay: Day
    }

    this.Bookservice.RequestLendingBook(Data).subscribe({
      next: res => {
        this.toster.success("Lending request successful")
      },
      error: err => this.toster.error("You already lent this book")
    })
  }

  UserData() {
    const User = localStorage.getItem('LoggedUser')
    if (!User) return
    const UserToken = JSON.parse(User);
    const decoded: any = jwtDecode(UserToken.token);
    this.UserService.LoggedUser.set(decoded)
  }

}
