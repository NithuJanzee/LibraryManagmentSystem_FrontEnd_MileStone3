import { Routes } from '@angular/router';
import { UserHomeComponent } from './User/user-home/user-home.component';
import { UserCreationComponent } from './AccessAccount/user-creation/user-creation.component';

export const routes: Routes = [
    {path:'',component:UserCreationComponent}
];
