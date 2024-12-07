import { AdminService } from './../../../_service/admin.service';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookId } from '../../../_Inerface/BookInterFace';

@Component({
  selector: 'app-lending-requests',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './lending-requests.component.html',
  styleUrl: './lending-requests.component.css'
})
export class LendingRequestsComponent implements OnInit{
   AdminService = inject(AdminService)
   toster = inject(ToastrService)
   searchText:string = ''

  ngOnInit(): void {
    if(this.AdminService.LendingRequestSignal().length == 0){
      this.loadAllLendingRequest('')
    }
  }

  loadAllLendingRequest(search:string){
    this.AdminService.AllLendingRequest(search)
  }

  AcceptRequest(Bookid:number){
    let postId = {
      id:Bookid
    }

    this.AdminService.ApproveLending(postId).subscribe({
      next:res=>{
        this.toster.success("lending Accepted Succesfuly")
      },
      error:err=>{
        this.toster.error(err.message)
        console.log(err.message)
      }
    })
  }
}
