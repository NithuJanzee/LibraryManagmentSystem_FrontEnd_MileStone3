import { Component, OnInit, inject } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation.component";
import { UserHeadComponent } from "../user-head/user-head.component";
import { UserBodyComponent } from "../user-body/user-body.component";


@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [NavigationComponent, UserHeadComponent, UserBodyComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent{
 
}
