import { Component, inject, OnInit } from '@angular/core';
import { BookService } from '../../_service/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-body.component.html',
  styleUrl: './user-body.component.css'
})
export class UserBodyComponent implements OnInit{
  BookService = inject(BookService)

  ngOnInit(): void {
    if(this.BookService.Books().length == 0) this.LoadBooks();
  }

  LoadBooks(){
    this.BookService.getAllBooks()
  }

  trackByBookId(index: number, book: any): number {
    return book.bookId; 
  }

  getStarArray(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return [
      ...Array(fullStars).fill('full'),
      ...Array(halfStars).fill('half'),
      ...Array(emptyStars).fill('empty'),
    ];
  }

  Hello(){
    console.log("work")
  }
}
