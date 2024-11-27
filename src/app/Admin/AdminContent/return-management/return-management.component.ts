import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../../_service/admin.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-return-management',
  standalone: true,
  imports: [RouterLink, DatePipe,FormsModule],
  templateUrl: './return-management.component.html',
  styleUrl: './return-management.component.css'
})
export class ReturnManagementComponent implements OnInit {
  AdminService = inject(AdminService)
  toster = inject(ToastrService)
  searchText:string = '';

  ngOnInit(): void {
    if (this.AdminService.BookReturnSignal().length == 0) {
      this.GetAllReturnBooks('')
    }
  }

  GetAllReturnBooks(search: string) {
    this.AdminService.GetAllReturn(search)
  }

  GetBookReturn(lendId:number){
    this.AdminService.GetBookReturn(lendId).subscribe({
      next:res=>{
         this.toster.success("Book Returned")
      },
      error: err=>{
        this.toster.error(err.error.error)
        this.GetAllReturnBooks('')
      }
    })
  }
}
