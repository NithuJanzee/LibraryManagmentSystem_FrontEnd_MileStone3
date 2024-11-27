import { Component, OnInit, inject } from '@angular/core';
import { UserServiceService } from '../../_service/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [DatePipe,FormsModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent implements OnInit {
  userService = inject(UserServiceService)
  Toaster = inject(ToastrService)
  searchText: string = ''

  ngOnInit(): void {
    this.DecodedData()
    this.loadUserLendingBooks('')
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
  }
}
