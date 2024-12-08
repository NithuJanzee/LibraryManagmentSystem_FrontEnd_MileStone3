import { Routes } from '@angular/router';
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
import { userGuard } from './_gurard/user.guard';
import { NavigationComponent } from './User/navigation/navigation.component';
import { TransactionComponent } from './User-Content/transaction/transaction.component';
import { UserBodyComponent } from './User/user-body/user-body.component';
import { AddBookComponent } from './Admin/AdminContent/books-management/add-book/add-book.component';
import { EditBookComponent } from './Admin/AdminContent/books-management/edit-book/edit-book.component';
import { UserSubscriptionsComponent } from './User-Content/user-subscriptions/user-subscriptions.component';
import { PaymentComponent } from './User-Content/payment/payment.component';
import { ForgotPasswordComponent } from './AccessAccount/forgot-password/forgot-password.component';
import { OTPComponent } from './AccessAccount/otp/otp.component';
import { forgotPasswordGuard } from './_gurard/forgot-password.guard';
import { ApprovedRequestsComponent } from './Admin/AdminContent/approved-requests/approved-requests.component';

export const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      { path: '', redirectTo: 'userBody', pathMatch: 'full' },
      { path: 'userBody', component: UserBodyComponent },
      { path: 'transactions', component: TransactionComponent },
      { path: 'Subscriptions', component: UserSubscriptionsComponent },
      {path:'payment',component:PaymentComponent}
    ]
  }
  ,

    {path:'admin-login',component:AdminLoginComponent},
    {path:'User-Login',component:UserLoginComponent},
    {path:'User-SignUp',component:UserCreationComponent},
    {path:'forgot-password',component:ForgotPasswordComponent},
    {path:'otp-verification',component:OTPComponent,canActivate:[forgotPasswordGuard]},
    {path:'BookDetails/:id',component:BookDetailsComponent,canActivate:[userGuard]},


    {
        path:'admin',
        component:AdminHomeComponent,
        canActivate:[adminGuard],
        children:[
            {path:'DashBoard',component:DashboardComponent},
            {path:'BookManageMent',component:BooksManagementComponent},
            {path:'LendingRequest',component:LendingRequestsComponent},
            {path:'ApprovedRequests',component:ApprovedRequestsComponent},
            {path:'ReturnManagement',component:ReturnManagementComponent},
            {path:'Subscriptions',component:SubscriptionsComponent},
            {path:'PurchaseHistory',component:PurchaseHistoryComponent},
            {path:'UserMessage',component:UserMessagingComponent},
            {path:'add-book', component:AddBookComponent},
            {path:'edit-book/:id',component:EditBookComponent}
        ]
    }
];
