import { AdminService } from './../../../_service/admin.service';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lending-requests',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './lending-requests.component.html',
  styleUrl: './lending-requests.component.css'
})
export class LendingRequestsComponent implements OnInit{
   AdminService = inject(AdminService)

  ngOnInit(): void {
    if(this.AdminService.LendingRequestSignal().length == 0){
      this.loadAllLendingRequest()
    }
  }

  loadAllLendingRequest(){
    this.AdminService.AllLendingRequest()
  }
}
