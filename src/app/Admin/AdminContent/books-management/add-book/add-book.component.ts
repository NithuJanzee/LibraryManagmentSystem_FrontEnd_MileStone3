import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../../../_service/book.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent implements OnInit {
  bookForm!: FormGroup;
  imagePreviews: string[] = [];
  images: File[] = [];

  constructor(private fb: FormBuilder, private bookService: BookService, private http: HttpClient) { }

  ngOnInit() {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publishDate: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      genre: ['', Validators.required],
      description: [''],
      cover: [null],
    });
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

      this.images.forEach((image, index) => {
        formData.append('photos', image, image.name);
      });

      this.bookService.PostNewBook(formData).subscribe({
        next: (response) => {
          alert('Book added successfully!');
          console.log(response);
        },
        error: (error) => {
          alert('An error while adding the book.');
          console.error(error);
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
}
