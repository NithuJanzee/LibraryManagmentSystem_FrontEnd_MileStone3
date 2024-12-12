import { Component, OnInit, inject, signal } from '@angular/core';
import { UserServiceService } from '../../_service/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserHistory } from '../../_Inerface/UserInterface';


@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [DatePipe,FormsModule,DatePipe],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent implements OnInit {
  userService = inject(UserServiceService)
  Toaster = inject(ToastrService)
  router = inject(Router)
  searchText: string = ''
  userHistorySignal = signal<UserHistory[]|null>(null)

  ngOnInit(): void {
    this.DecodedData()
    this.loadUserLendingBooks('')
    this.GetUserHistory();
  }

  DecodedData() {
    const User = localStorage.getItem('LoggedUser')
    if (!User) return
    const UserToken = JSON.parse(User);
    const decoded: any = jwtDecode(UserToken.token);
    this.userService.LoggedUser.set(decoded)
  }

  loadUserLendingBooks(searchText:string) {
    var userId = Number(this.userService.LoggedUser()?.nameid)
    this.userService.GetAllTransactionWithUserId(userId,searchText)
    //window.location.reload();
  }


  NavigateToBookDetails(bookId:number){
    this.router.navigateByUrl(`/BookDetails/${bookId}`)
  }

  GetUserHistory(){
    var userId = Number(this.userService.LoggedUser()?.nameid)
    this.userService.GetUserHistory(userId).subscribe({
      next:res=>{
        this.userHistorySignal.set(res)
        console.log(this.userHistorySignal())
      }
    })
  }
}
