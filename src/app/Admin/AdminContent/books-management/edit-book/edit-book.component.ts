import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../../../_service/book.service';
import { GetBookForEdit } from '../../../../_Inerface/BookInterFace';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent implements OnInit {
  bookService = inject(BookService);
  EditForm: FormGroup;
  bookId: number;
  selectedFile: File | null = null;
  ExitingBook = signal<GetBookForEdit | null>(null);
  toaster = inject(ToastrService)

  constructor(private formBuider: FormBuilder, private rout: ActivatedRoute) {
    const BookId = this.rout.snapshot.paramMap.get('id');
    this.bookId = Number(BookId);

    this.EditForm = this.formBuider.group({
      bookTitle: [''],
      publishDate: [''],
      quantity: [''],
      author: [''],
      genre: [''],
      description: [''],
    });
  }

  ngOnInit(): void {
    const BookID = this.bookId;
    this.bookService.GetBookByIDForEdit(BookID).subscribe({
      next: (res) => {
        this.EditForm.setValue(res);
        this.ExitingBook.set(res);
      },
    });

    if (
      this.bookService.GenreSignal().length === 0 ||
      this.bookService.AuthorSignal().length === 0
    ) {
      this.loadResource();
    }
  }

  loadResource() {
    this.bookService.GetAllAuthor();
    this.bookService.GetAllGenre();
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  onSubmit(): void {
    const formData = new FormData();

    formData.append('Id', this.bookId.toString());
    formData.append('Title', this.EditForm.value.bookTitle);
    formData.append('PublishDate', this.EditForm.value.publishDate);
    formData.append('Quantity', this.EditForm.value.quantity);
    formData.append('AuthorId', this.EditForm.value.author);
    formData.append('GenreId', this.EditForm.value.genre);
    formData.append('Description', this.EditForm.value.description);

    if (this.selectedFile) {
      formData.append('Photos', this.selectedFile, this.selectedFile.name);
    } else {
      console.warn('No file to upload');
    }

    this.bookService.updateBook(formData).subscribe({
      next: (response) => {
        this.toaster.success("Book Updated succesfully")
      },
      error: (err) => {
       this.toaster.error(err);
      },
    });
  }

}

