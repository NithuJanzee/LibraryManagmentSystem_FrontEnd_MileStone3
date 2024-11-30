import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../../../_service/book.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor,FormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent implements OnInit {
  bookForm!: FormGroup;
  imagePreviews: string[] = [];
  images: File[] = [];
  private toaster = inject(ToastrService)
  private route = inject(Router)
  bookService = inject(BookService)
  NewAuthor:string = '';
  NewGenre:string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publishDate: ['', Validators.required],
      Price:['',Validators.required],
      IsPremium:['',Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      genre: ['', Validators.required],
      description: [''],
      cover: [null],
    });

    if(this.bookService.GenreSignal(),length == 0 || this.bookService.AuthorSignal().length == 0){
      this.loadDropDowns()
    }
  }

  loadDropDowns(){
    this.bookService.GetAllGenre()
    this.bookService.GetAllAuthor()
  }
  onSubmit() {
    if (this.bookForm.valid) {
      const formData = new FormData();

      formData.append('title', this.bookForm.get('title')?.value);
      formData.append('authorId', this.bookForm.get('author')?.value);
      formData.append('publishDate', this.bookForm.get('publishDate')?.value);
      formData.append('quantity', this.bookForm.get('quantity')?.value);
      formData.append('genreId', this.bookForm.get('genre')?.value);
      formData.append('description', this.bookForm.get('description')?.value);
      formData.append('Price',this.bookForm.get('Price')?.value)
      formData.append('IsPremium',this.bookForm.get('IsPremium')?.value)

      this.images.forEach((image, index) => {
        formData.append('photos', image, image.name);
      });

      this.bookService.PostNewBook(formData).subscribe({
        next: (response) => {
          console.log(response);
          this.toaster.success('Book added successfully!')
          this.bookForm.reset()
        },
        error: (error) => {
          this.toaster.error('An error while adding the book.')
          console.log(error)
        }
      });
    }
  }

  previewImages(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.imagePreviews = [];
      this.images = [];

      Array.from(files).forEach((file) => {
        this.images.push(file);

        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      });

      this.bookForm.patchValue({
        cover: this.images,
      });
    }
  }

  cancel(){
    this.bookForm.reset()
  }

  AddAuthor(){
    let author = {
      authorName : this.NewAuthor
    }
    this.bookService.AddNewAuthor(author).subscribe({
      next:res=>{
        this.toaster.success('Author Added Successful')
        this.bookService.GetAllAuthor()
      }
    })
  }

  AddGenre(){
    let Genre = {
      genreName:this.NewGenre
    }
    this.bookService.AddNewGenre(Genre).subscribe({
      next:res=>{
        this.toaster.success('Genre Added succesful')
        this.bookService.GetAllGenre()
      }
    })

  }
}
