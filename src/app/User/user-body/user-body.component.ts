import { Component, inject, OnInit } from '@angular/core';
import { BookService } from '../../_service/book.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserServiceService } from '../../_service/user-service.service';

@Component({
  selector: 'app-user-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-body.component.html',
  styleUrl: './user-body.component.css'
})
export class UserBodyComponent implements OnInit {
  BookService = inject(BookService)
  private router = inject(Router)
  UserService = inject(UserServiceService)
  showModal: boolean = false;

  ngOnInit(): void {
    if (this.BookService.Books().length == 0) this.LoadBooks();
  }

  LoadBooks() {
    this.BookService.getAllBooks()
  }

  trackByBookId(index: number, book: any): number {
    return book.bookId;
  }

  NonLoggedUser() {
    console.log('Non Logged user show Modal window');
    this.showModal = true; 
  }

  closeModal() {
    this.showModal = false;
  }
  LoginNavigation(){
    this.router.navigateByUrl('User-Login')
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

  BookDetails() {
    this.router.navigateByUrl('BookDetails')
  }
}
