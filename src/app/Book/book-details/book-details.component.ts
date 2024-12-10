import { Component, OnInit, inject, signal } from '@angular/core';
import { BookService } from '../../_service/book.service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Book } from '../../_Inerface/BookInterFace';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { UserServiceService } from '../../_service/user-service.service';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { LendingRequest } from '../../_Inerface/BookTransactionInterface';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [NgFor, FormsModule, CommonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})

export class BookDetailsComponent implements OnInit {
  ParamBookId: number;
  BookById = signal<Book | null>(null)
  bookDetails: any;
  requestDay: number = 3;
  private toster = inject(ToastrService)
  private navigator = inject(Router)
  Rattings: string = '';
  Comment: string = '';

  UserService = inject(UserServiceService)

  constructor(private route: ActivatedRoute) {
    const BookID = this.route.snapshot.paramMap.get('id');
    this.ParamBookId = Number(BookID)
  }
  Bookservice = inject(BookService)

  ngOnInit(): void {
    this.UserData()
    const user = Number(this.UserService.LoggedUser()?.nameid)
    if (this.BookById()?.bookId != this.ParamBookId)
      this.Bookservice.getBookById(this.ParamBookId, user).subscribe({
        next: res => {
          this.BookById.set(res);
          this.getValue()
        }

      })
  }
  get roundedAverageRating(): number {
    return Math.round(this.bookDetails?.averageRating || 0);
  }

  book: {
    lendingprice3Days: number;
    lendingprice7Days: number;
    lendingprice10Days: number;
    lendingprice15Days: number;
    lendingprice30Days: number;
  } = {
      lendingprice3Days: 0,
      lendingprice7Days: 0,
      lendingprice10Days: 0,
      lendingprice15Days: 0,
      lendingprice30Days: 0
    };


  getValue() {
    const bookById = this.BookById();
    if (bookById) {
      this.book.lendingprice3Days = bookById.lendingprice3Days;
      this.book.lendingprice7Days = bookById.lendingprice7Days;
      this.book.lendingprice10Days = bookById.lendingprice10Days;
      this.book.lendingprice15Days = bookById.lendingprice15Days;
      this.book.lendingprice30Days = bookById.lendingprice30Days;
    }
  }

    getPrice() {
      switch (this.requestDay) {
        case 3:
          return this.book.lendingprice3Days;
        case 7:
          return this.book.lendingprice7Days;
        case 10:
          return this.book.lendingprice10Days;
        case 15:
          return this.book.lendingprice15Days;
        case 30:
          return this.book.lendingprice30Days;
        default:
          return this.book.lendingprice3Days;
      }
    }






    LendingRequest(): void {

      const user = Number(this.UserService.LoggedUser()?.nameid)
    const book = this.ParamBookId
    const Day = this.requestDay
    const Price = this.getPrice()

    const Data: LendingRequest = {
        userID: user,
        bookID: book,
        amount:Price,
        requestDay: Day
      }

    this.Bookservice.RequestLendingBook(Data).subscribe({
        next: res => {
          this.toster.success("Lending request successful")
          setTimeout(() => {
            this.navigator.navigateByUrl('/transactions')
            setTimeout(() => {
              window.location.reload()
            }, 100);
          }, 500);
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



    AddReview() {
      const user = Number(this.UserService.LoggedUser()?.nameid)
      const book = this.ParamBookId
      const ratevalue = Number(this.Rattings)

      let Reviewdata = {
        userId: user,
        bookId: book,
        value: ratevalue
      }

      this.Bookservice.Postratting(Reviewdata).subscribe({
        next: res => {
          this.toster.success("ratting Added succesfully")
          setTimeout(() => {
            window.location.reload()
          }, 300);
        }

      })
    }


    AddComment() {
      const user = Number(this.UserService.LoggedUser()?.nameid)
      const book = this.ParamBookId
      //  const ratevalue = Number(this.Rattings)
      const com = this.Comment

      let commentData = {
        bookId: book,
        userId: user,
        comment: com
      }
      if (com.length >= 1) {
        // console.log(commentData)
        this.Bookservice.PostComment(commentData).subscribe({
          next: res => {
            this.toster.success("Comment added succesfully")
            setTimeout(() => {
              window.location.reload()
            }, 300);
          }
        })
      } else {
        this.toster.error("Please leave your comments")
      }
    }
  }
