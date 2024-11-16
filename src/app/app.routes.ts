import { Routes } from '@angular/router';
import { UserHomeComponent } from './User/user-home/user-home.component';
import { UserCreationComponent } from './AccessAccount/user-creation/user-creation.component';
import { UserLoginComponent } from './AccessAccount/user-login/user-login.component';

export const routes: Routes = [
    {path:'User-Login',component:UserLoginComponent},
    {path:'User-SignUp',component:UserCreationComponent},
    {path:'',component:UserHomeComponent}
];
