import { Component, OnInit, inject } from '@angular/core';
import { NavigationComponent } from "../../User/navigation/navigation.component";
import { AdminNavComponent } from "../admin-nav/admin-nav.component";
import { AdminBodyComponent } from "../admin-body/admin-body.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { AdminService } from '../../_service/admin.service';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [NavigationComponent, AdminNavComponent, AdminBodyComponent,RouterOutlet,RouterLink],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit{
  adminService = inject(AdminService)
  ngOnInit(): void {
    
  }

  LoadAdminData(){
    
  }

}
