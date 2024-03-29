import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeeListComponent} from "./employee/employee-list/employee-list.component";
import {CreateEmployeeComponent} from "./employee/create-employee/create-employee.component";
import {UpdateEmployeeComponent} from "./employee/update-employee/update-employee.component";
import {EmployeeDetailsComponent} from "./employee/employee-details/employee-details.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {ProfileComponent} from "./auth/profile/profile.component";
import {BoardUserComponent} from "./auth/board-user/board-user.component";
import {BoardModeratorComponent} from "./auth/board-moderator/board-moderator.component";
import {BoardAdminComponent} from "./auth/board-admin/board-admin.component";
import {UpdateUserComponent} from "./auth/update-user/update-user.component";
import {InvoiceListComponent} from "./invoice/invoice-list/invoice-list.component";
import {CreateInvoiceComponent} from "./invoice/create-invoice/create-invoice.component";
import {UpdateInvoiceComponent} from "./invoice/update-invoice/update-invoice.component";
import {InvoiceDetailsComponent} from "./invoice/invoice-details/invoice-details.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'user', component: BoardUserComponent},
  {path: 'mod', component: BoardModeratorComponent},
  {path: 'admin', component: BoardAdminComponent},
  {path: 'update-user/:id', component: UpdateUserComponent},

  {path: 'employees', component: EmployeeListComponent},
  {path: 'create-employee', component: CreateEmployeeComponent},
  {path: 'update-employee/:id', component: UpdateEmployeeComponent},
  {path: 'employee-details/:id', component: EmployeeDetailsComponent},

  {path: 'invoices', component: InvoiceListComponent},
  {path: 'create-invoice', component: CreateInvoiceComponent},
  {path: 'update-invoice/:id', component: UpdateInvoiceComponent},
  {path: 'invoice-details/:id', component: InvoiceDetailsComponent},

  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
