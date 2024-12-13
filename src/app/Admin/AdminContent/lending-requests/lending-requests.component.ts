import { AdminService } from './../../../_service/admin.service';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookId } from '../../../_Inerface/BookInterFace';
import { UserServiceService } from '../../../_service/user-service.service';

@Component({
  selector: 'app-lending-requests',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './lending-requests.component.html',
  styleUrl: './lending-requests.component.css'
})
export class LendingRequestsComponent implements OnInit {
  AdminService = inject(AdminService)
  UserService = inject(UserServiceService)
  toster = inject(ToastrService)
  searchText: string = ''
  router = inject(Router)

  ngOnInit(): void {
    if (this.AdminService.LendingRequestSignal().length == 0) {
      this.loadAllLendingRequest('')
    }
  }

  loadAllLendingRequest(search: string) {
    this.AdminService.AllLendingRequest(search)
  }

  AcceptRequest(Bookid: number) {
    let postId = {
      id: Bookid
    }

    this.AdminService.ApproveLending(postId).subscribe({
      next: res => {
        this.toster.success("lending Accepted Succesfuly")
        this.loadAllLendingRequest('')
      },
      error: err => {
        this.toster.error(err.message)
        console.log(err.message)
      }
    })
  }

  selectedRequest: any = null;

  setSelectedRequest(request: any) {
    this.selectedRequest = request;
  }

  CancelLendingrequest(id:number){
    this.UserService.RemoveLendingRequest(id).subscribe({
      next:res=>{
        this.toster.success("Lending request Removed")
        this.loadAllLendingRequest('');
      },
      error:err=>{
        this.toster.error(err)
      }
    })
  }

}
