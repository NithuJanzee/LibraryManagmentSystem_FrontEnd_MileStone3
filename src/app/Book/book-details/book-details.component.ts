import { Component, OnInit, inject, signal } from '@angular/core';
import { BookService } from '../../_service/book.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../_Inerface/BookInterFace';


@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})

export class BookDetailsComponent implements OnInit {
  ParamBookId: number;
  BookById = signal<Book | null>(null)
  bookDetails: any;

  constructor(private route: ActivatedRoute) {
    const BookID = this.route.snapshot.paramMap.get('id');
    this.ParamBookId = Number(BookID)
  }
  Bookservice = inject(BookService)

  ngOnInit(): void {
    if(this.BookById()?.bookId != this.ParamBookId)
    this.Bookservice.getBookById(this.ParamBookId).subscribe({
      next: res => this.BookById.set(res)
    })
  }

  get roundedAverageRating(): number {
    return Math.round(this.bookDetails?.averageRating || 0);
  }
}
