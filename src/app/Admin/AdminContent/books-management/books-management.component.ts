import { Component, OnInit, inject } from '@angular/core';
import { BookService } from '../../../_service/book.service';
import { RouterLink} from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-books-management',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './books-management.component.html',
  styleUrl: './books-management.component.css'
})
export class BooksManagementComponent  implements OnInit{
  BookService = inject(BookService)
  toaster = inject(ToastrService)

  ngOnInit(): void {
    if(this.BookService.Books().length == 0 || this.BookService.NotPublishedBooksSignal().length == 0){
      this.LoadBooks()
      this.getAllNotPublishedBook()
    }
  }

  LoadBooks(){
    this.BookService.getAllBooks('')
  }

  DeleteBook(id:number){
    this.BookService.DeleteBook(id).subscribe({
      next:res=>{
        this.toaster.success("Book Deleted successfully")
        this.LoadBooks()
      },
      error:err => {
        this.toaster.error(err)
      }
    })
  }

  getAllNotPublishedBook(){
    this.BookService.GetAllNotPublishedBook('')
  }
}
