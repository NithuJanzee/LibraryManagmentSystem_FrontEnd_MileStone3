import { Component, OnInit, inject } from '@angular/core';
import { BookService } from '../../../_service/book.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-books-management',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './books-management.component.html',
  styleUrl: './books-management.component.css'
})
export class BooksManagementComponent  implements OnInit{
  BookService = inject(BookService)

  ngOnInit(): void {
    if(this.BookService.Books().length == 0){
      this.LoadBooks()
    }
  }

  LoadBooks(){
    this.BookService.getAllBooks('')
  }
}
