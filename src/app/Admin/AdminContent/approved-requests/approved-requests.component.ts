 import { Component, OnInit, inject } from '@angular/core';
import { AdminService } from '../../../_service/admin.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { BookId } from '../../../_Inerface/BookInterFace';

@Component({
  selector: 'app-approved-requests',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './approved-requests.component.html',
  styleUrl: './approved-requests.component.css'
})
export class ApprovedRequestsComponent implements OnInit {
  AdminService = inject(AdminService)
  toster = inject(ToastrService)
  searchText:string=''

  ngOnInit(): void {
    if (this.AdminService.ApprovedBookSignal().length == 0) {
      this.LoadAllApprovedBooks('')
    }
  }

  LoadAllApprovedBooks(text:string) {
    this.AdminService.GetAllApprove(text)
  }

  conform:any=null;
  conformRequest(request:any){
    this.conform = request
    console.log(this.conform)
  }

  AcceptLending(bookId:number){
    let postId:BookId = {
      id: bookId
    }

    this.AdminService.UpdateToLending(postId).subscribe({
      next:res=>{
        this.toster.success("Book Landed Successfully")
        // setTimeout(() => {
        //   window.location.reload()
        // }, 1500);
        this.LoadAllApprovedBooks('')
      },
      error:err =>{
        this.toster.error(err.error)
      }
    })
  }
}
