import { Component, inject, OnInit, signal, ɵUSE_RUNTIME_DEPS_TRACKER_FOR_JIT } from '@angular/core';
import { AdminDashboardService } from '../../../_service/admin-dashboard.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BookUsage } from '../../../_Inerface/AdminInterFace';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private DashboardService = inject(AdminDashboardService);
  toaster = inject(ToastrService)

  TotalLendingrequest = signal<number|null>(null)
  data: BookUsage[] = [
  ];
  view: [number, number] = [window.innerWidth * 0.8, 300]; 
  colorScheme = 'vivid'; 

  ngOnInit(): void {
    this.loadBookUsage(); 
    this.LoadTotalLendingRequest();
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
}
