import { Component, inject } from '@angular/core';
import { UserServiceService } from '../../_service/user-service.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
   UserService = inject(UserServiceService)
   private router = inject(Router)

   Logout(){
    this.UserService.Logout()
    this.router.navigateByUrl('/')
  }
}
