import { Component, OnInit, inject, numberAttribute } from '@angular/core';
import { RouterLink, TitleStrategy } from '@angular/router';
import { AdminService } from '../../../_service/admin.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GetAllReturn } from '../../../_Inerface/AdminInterFace';

@Component({
  selector: 'app-return-management',
  standalone: true,
  imports: [RouterLink, DatePipe, FormsModule],
  templateUrl: './return-management.component.html',
  styleUrl: './return-management.component.css'
})
export class ReturnManagementComponent implements OnInit {
  AdminService = inject(AdminService)
  toster = inject(ToastrService)
  searchText: string = '';

  ngOnInit(): void {
    if (this.AdminService.BookReturnSignal().length == 0) {
      this.GetAllReturnBooks('')
    }
  }

  GetAllReturnBooks(search: string) {
    this.AdminService.GetAllReturn(search)
  }

  GetBookReturn(lendId: number) {
    this.AdminService.GetBookReturn(lendId).subscribe({
      next: res => {
        this.toster.success("Book Returned")
      },
      error: err => {
        this.toster.error(err.error.error)
        this.GetAllReturnBooks('')
      }
    })
  }

  ReturnRequest: GetAllReturn = {} as GetAllReturn;
  ReturnBooks(data: GetAllReturn) {
    this.ReturnRequest = data;
   // console.log(this.ReturnRequest)
  }

  AcceptReturn(id:any){
    let lendID = Number(id)
   // console.log(lendID)
    this.AdminService.AcceptReturn(lendID).subscribe({
      next:res=>{
        this.toster.success("Return Complete")
        this.GetAllReturnBooks('')
      },
      error:err=>{
        this.toster.error(err.error)
      }
    })
  }
}
