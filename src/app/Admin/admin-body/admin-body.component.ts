import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-body',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './admin-body.component.html',
  styleUrl: './admin-body.component.css'
})
export class AdminBodyComponent {

}
