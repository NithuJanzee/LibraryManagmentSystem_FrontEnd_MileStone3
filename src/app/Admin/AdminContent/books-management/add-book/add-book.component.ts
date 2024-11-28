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
      cover: [null],  // Will hold images in the form
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const formData = new FormData();

      // Append book details
      formData.append('title', this.bookForm.get('title')?.value);
      formData.append('authorId', this.bookForm.get('author')?.value); // Assuming you have an authorId
      formData.append('publishDate', this.bookForm.get('publishDate')?.value);
      formData.append('quantity', this.bookForm.get('quantity')?.value);
      formData.append('genreId', this.bookForm.get('genre')?.value); // Assuming you have genreId
      formData.append('description', this.bookForm.get('description')?.value);

      // Append images
      this.images.forEach((image, index) => {
        formData.append('photos', image, image.name); // 'photos' is the key used in the backend
      });

      // Call the API
      this.bookService.PostNewBook(formData).subscribe({
        next: (response) => {
          alert('Book added successfully!');
          console.log(response);
        },
        error: (error) => {
          alert('An error occurred while adding the book.');
          console.error(error);
        }
      });
    }
  }

  previewImages(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.imagePreviews = [];
      this.images = []; // Clear the current images array

      Array.from(files).forEach((file) => {
        this.images.push(file);  // Add the file to the images array

        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews.push(reader.result as string); // For previewing
        };
        reader.readAsDataURL(file);
      });

      // Update cover form control with the selected images
      this.bookForm.patchValue({
        cover: this.images,  // Update cover control with the selected files
      });
    }
  }
}
