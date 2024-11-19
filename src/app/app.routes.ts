import { Routes } from '@angular/router';
import { UserHomeComponent } from './User/user-home/user-home.component';
import { UserCreationComponent } from './AccessAccount/user-creation/user-creation.component';
import { UserLoginComponent } from './AccessAccount/user-login/user-login.component';
import { AdminHomeComponent } from './Admin/admin-home/admin-home.component';
import { DashboardComponent } from './Admin/AdminContent/dashboard/dashboard.component';
import { BooksManagementComponent } from './Admin/AdminContent/books-management/books-management.component';
import { LendingRequestsComponent } from './Admin/AdminContent/lending-requests/lending-requests.component';
import { ReturnManagementComponent } from './Admin/AdminContent/return-management/return-management.component';
import { SubscriptionsComponent } from './Admin/AdminContent/subscriptions/subscriptions.component';
import { PurchaseHistoryComponent } from './Admin/AdminContent/purchase-history/purchase-history.component';
import { UserMessagingComponent } from './Admin/AdminContent/user-messaging/user-messaging.component';
import { BookDetailsComponent } from './Book/book-details/book-details.component';
import { AdminLoginComponent } from './AccessAccount/admin-login/admin-login.component';
import { adminGuard } from './_gurard/admin.guard';

export const routes: Routes = [
    {path:'User-Login',component:UserLoginComponent},
    {path:'User-SignUp',component:UserCreationComponent},
    {path:'BookDetails/:id',component:BookDetailsComponent},
    {path:'admin-login',component:AdminLoginComponent},
    {path:'',component:UserHomeComponent},
    
    {
        path:'admin',
        component:AdminHomeComponent,
        canActivate:[adminGuard],
        children:[
            {path:'DashBoard',component:DashboardComponent},
            {path:'BookManageMent',component:BooksManagementComponent},
            {path:'LendingRequest',component:LendingRequestsComponent},
            {path:'ReturnManagement',component:ReturnManagementComponent},
            {path:'Subscriptions',component:SubscriptionsComponent},
            {path:'PurchaseHistory',component:PurchaseHistoryComponent},
            {path:'UserMessage',component:UserMessagingComponent}
        ]
    }
];
