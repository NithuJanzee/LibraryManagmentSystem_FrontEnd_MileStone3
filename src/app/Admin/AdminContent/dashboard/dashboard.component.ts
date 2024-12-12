
import { AdminService } from './../../../_service/admin.service';
import { Component, inject, Injector, OnInit, signal, ɵUSE_RUNTIME_DEPS_TRACKER_FOR_JIT } from '@angular/core';
import { AdminDashboardService } from '../../../_service/admin-dashboard.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AllSubscription, BookUsage } from '../../../_Inerface/AdminInterFace';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgxChartsModule,DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private DashboardService = inject(AdminDashboardService);
  toaster = inject(ToastrService)
  private AdminService = inject(AdminService)
  SubscriptionRequestSignal = signal<AllSubscription[]|null>(null)
  AllUserCount = signal<number|null>(null)
  AllBookCount = signal<number|null>(null)
  AllApprovedBookCount = signal<number|null>(null)
  TotalLendingrequest = signal<number|null>(null)

  data: BookUsage[] = [
  ];
  view: [number, number] = [window.innerWidth * 0.8, 300];
  colorScheme = 'vivid';

  ngOnInit(): void {
    this.loadBookUsage();
    this.GetAllUserCount()
    this.GetAllBookCount()
    this.GetAllApprovedCount()
    this.LoadTotalLendingRequest();
    this.GetAllSubscriptionRequest();
  }

  loadBookUsage() {
    this.DashboardService.GetBookUsage().subscribe({
      next: (res: BookUsage[]) => {

        this.data = [...this.data, ...res];
      },
      error: (err) => {
        console.error('Error loading book usage data', err);
      }
    });
  }

  LoadTotalLendingRequest(){
    this.DashboardService.CountLending().subscribe({
      next:res=>{
        this.TotalLendingrequest.set(res)

      },
      error:err=>{
        this.toaster.error(err.Message)
      }
    })
  }

  GetAllSubscriptionRequest(){
    this.AdminService.GetAllSubscriptionRequest().subscribe({
      next:res=>{
        this.SubscriptionRequestSignal.set(res)
        console.log(this.SubscriptionRequestSignal())

      }
    })
  }
  GetAllUserCount(){
    this.AdminService.GetAllUserCount().subscribe({
      next:res=>{
        this.AllUserCount.set(res)
      }
    })
  }

  GetAllBookCount(){
    this.AdminService.GetAllBookCount().subscribe({
      next:res=>{
        this.AllBookCount.set(res)
      }
    })
  }

  GetAllApprovedCount(){
    this.AdminService.GetAllApprovedBookCount().subscribe({
      next:res=>{
        this.AllApprovedBookCount.set(res)
      }
    })
  }

  UserBill:any = '';
  Accept(data:any){
    this.UserBill = data
    console.log(this.UserBill)
  }

  ApproveSubscription(){
    let UserIdNumber  = Number(this.UserBill.userID)
    let data = {
      userId:UserIdNumber
    }
    this.AdminService.ApproveSubscription(data).subscribe({
      next:res=>{
        this.toaster.success("Subscription Successfully")
        this.GetAllSubscriptionRequest()
      },
      error:err=>[
        this.toaster.error(err.Message)
      ]
    })
  }
}
