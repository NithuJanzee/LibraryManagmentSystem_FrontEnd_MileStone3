import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookService } from '../../../../_service/book.service';
import { Book, GetBookForEdit } from '../../../../_Inerface/BookInterFace';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, DatePipe } from '@angular/common';


import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddPriceAndDiscounts } from '../../../../_Inerface/AdminInterFace';



@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, DatePipe, CommonModule, MatFormFieldModule, MatInputModule],
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

  price: number = 0;
  minimumLendingPrice: number = 0;
  individualBookPriceDiscount: number = 0;
  individualLendingPriceDiscount: number = 0;

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form submitted', form.value);

      let formData: AddPriceAndDiscounts = {
        bookId: this.bookId,
        price: this.price,
        minimumLendingPrice: this.minimumLendingPrice,
        individualBookPriceDiscount: this.individualBookPriceDiscount,
        individualLendingPriceDiscount: this.individualLendingPriceDiscount
      };

      this.bookService.AddBookPriceAndDiscount(formData).subscribe({
        next: (response) => {
          this.toaster.success('Price and discounts added successfully')
          this.GetBookByID()
        },
        error: (err) => {
          this.toaster.error('Price and discounts added successfully')
        }
      });
    } else {
      this.toaster.error('Form is invalid')
    }
  }

  UpdatePublishStatus() {
    this.bookService.ChangeThePublishData(this.bookId).subscribe({
      next: res => {
        this.toaster.success("Status Updated Successfully")
        this.GetBookByID()
      },
      error: err => {
        this.toaster.error(err.Message)
      }
    })
  }

  NewbookTitle: string = '';
  changeBookTile() {
    this.bookService.ChangeTheBookTitle(this.bookId, this.NewbookTitle).subscribe({
      next: res => {
        this.toaster.success('Title updated Successfully')
        this.GetBookByID()
      },
      error: err => {
        this.toaster.error(err.Message)
      }
    })
  }

  GetAllAuthorAndGenre() {
    if (this.bookService.AuthorSignal().length == 0 || this.bookService.GenreSignal().length ==0) {
      this.bookService.GetAllAuthor()
      this.bookService.GetAllGenre()
    }
  }

  NewAuthor:number = 0
  UpdateNewAuthor(){
    this.bookService.EditAuthor(this.bookId ,this.NewAuthor).subscribe({
      next:res=>{
        this.toaster.success("Author Updated Successfully")
        this.GetBookByID()
      },
      error:err=>{
        this.toaster.error(err.Message)
      }
    })
  }

  NewGenre:number = 0
  UpdateGenre(){
    this.bookService.UpdateGenre(this.bookId, this.NewGenre).subscribe({
      next:res=>{
        this.toaster.success("Genre UpdatedSuccessfully")
        this.GetBookByID()
      },
      error:err=>{
        this.toaster.error(err.Message)
      }
    })
  }

  NewDescription:string=''
  NewQuantity:number = 0
  UpdateTheQuantity(){
    this.bookService.UpdateQuantity(this.bookId,this.NewQuantity).subscribe({
      next:res=>{
        this.toaster.success("Quantity Updated Successfully")
        this.GetBookByID()
      },
      error:err=>{
        this.toaster.error(err.Message)
      }
    })
  }

  UpdateTheDescription(){
    this.bookService.UpdateDescription(this.bookId,this.NewDescription).subscribe({
      next:res=>{
        this.toaster.success("Description Updated successfully")
        this.GetBookByID()
      },
      error:err=>{
        this.toaster.error(err.Message)
      }
    })
  }
}

