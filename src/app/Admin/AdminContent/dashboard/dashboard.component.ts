import { Component, inject } from '@angular/core';
import { AdminDashboardService } from '../../../_service/admin-dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
 private DashboardService = inject(AdminDashboardService)
}
