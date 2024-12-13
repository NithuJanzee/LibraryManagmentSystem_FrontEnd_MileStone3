import { Component, inject, OnInit, signal } from '@angular/core';
import { BookService } from '../../../../_service/book.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../../../_Inerface/BookInterFace';
import { ToastrService } from 'ngx-toastr';
import { MannualLendingService } from '../../../../_service/mannual-lending.service';

@Component({
  selector: 'app-view-all-book',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './view-all-book.component.html',
  styleUrl: './view-all-book.component.css'
})
export class ViewAllBookComponent implements OnInit {
  bookService = inject(BookService)
  ManualLendingService = inject(MannualLendingService)
  ParamUserId: number;
  bookDetailSignal = signal<Book | null>(null)
  toaster = inject(ToastrService)

  constructor(private route: ActivatedRoute) {
    const BookID = this.route.snapshot.paramMap.get('id');
    this.ParamUserId = Number(BookID)
  }

  ngOnInit(): void {
    this.LoadAllBooks('')
  }

  searchQuery: string = ''
  LoadAllBooks(querry: string) {
    this.bookService.getAllBooks(querry)
  }

  LendBookDetails(BookID: number) {
    this.bookService.getBookById(BookID, this.ParamUserId).subscribe({
      next: res => {
        this.bookDetailSignal.set(res)
        console.log(this.bookDetailSignal())
      },
      error: err => {
        this.toaster.error(err)
      }
    })
  }

  LendingDays: number = 0
  Amount: number = 0
  GiveLendTheBook() {
    let BookID = this.bookDetailSignal()?.bookId ?? 0;
    this.ManualLendingService.LendBookByAdmin(this.ParamUserId, BookID, this.LendingDays, this.Amount).subscribe({
      next: res => {
        this.toaster.success("Book Landed Successful");
        this.LoadAllBooks('')
      },
      error: err => {
        this.toaster.error(err.Message);
      }
    });
  }

}
