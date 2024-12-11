import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookService } from '../../../../_service/book.service';
import { Book, GetBookForEdit } from '../../../../_Inerface/BookInterFace';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,DatePipe],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent implements OnInit {
  bookService = inject(BookService);
  bookId: number;
  selectedFile: File | null = null;
  EditBookForAdminSignal = signal<Book | null>(null);
  toaster = inject(ToastrService)
  router = inject(Router)

  constructor(private formBuider: FormBuilder, private rout: ActivatedRoute) {
    const BookId = this.rout.snapshot.paramMap.get('id');
    this.bookId = Number(BookId);
  }

  ngOnInit(): void {
    this.GetBookByID()
  }

  GetBookByID() {
    this.bookService.GetBookByIDForAdminEdit(this.bookId).subscribe({
      next: res => {
        this.EditBookForAdminSignal.set(res)
        console.log(this.EditBookForAdminSignal())
      },
      error: err => {
        this.toaster.error(err.message)
      }
    })
  }
}

