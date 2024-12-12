import { Component, inject, OnInit, signal } from '@angular/core';
import { BookService } from '../../_service/book.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserServiceService } from '../../_service/user-service.service';
import { jwtDecode } from 'jwt-decode';
import { NavigationComponent } from "../navigation/navigation.component";
import { FormsModule } from '@angular/forms';
import { Book } from '../../_Inerface/BookInterFace';


@Component({
  selector: 'app-user-body',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './user-body.component.html',
  styleUrl: './user-body.component.css'
})
export class UserBodyComponent implements OnInit {
  BookService = inject(BookService)
  private router = inject(Router)
  UserService = inject(UserServiceService)
  showModal: boolean = false;
  searchQuery: string = '';

  SortedBookByRatting = signal<Book[] | null>(null);

  ngOnInit(): void {
    if (this.BookService.Books().length == 0) this.LoadBooks('');
    this.sortBookByAverageRatting();
    this.UserData()
  }

  LoadBooks(search: string) {
    this.BookService.getAllBooks(search)
  }

  sortBookByAverageRatting():void{
    const sort = this.BookService.Books().sort((a,b)=> b.averageRating - a.averageRating);
    this.SortedBookByRatting.set(sort)
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
  LoginNavigation() {
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

  BookDetails(bookId: number) {
    this.router.navigateByUrl(`/BookDetails/${bookId}`)
  }

  UserData() {
    const User = localStorage.getItem('LoggedUser')
    if (!User) return
    const UserToken = JSON.parse(User);
    const decoded: any = jwtDecode(UserToken.token);
    this.UserService.LoggedUser.set(decoded)
  }

}
