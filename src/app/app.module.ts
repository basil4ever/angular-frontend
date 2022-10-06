import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import {HttpClientModule} from "@angular/common/http";
import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';
import {FormsModule} from "@angular/forms";
import { UpdateEmployeeComponent } from './employee/update-employee/update-employee.component';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { HomeComponent } from './home/home.component';
import {AuthModule} from "./auth/auth.module";
import {authInterceptorProviders} from "./auth/helpers/auth.interceptor";
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LightgalleryModule} from "lightgallery/angular";
import {InvoiceModule} from "./invoice/invoice.module";
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    CreateEmployeeComponent,
    UpdateEmployeeComponent,
    EmployeeDetailsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AuthModule,
    InvoiceModule,
    BrowserAnimationsModule,
    MatDialogModule,
    LightgalleryModule,
    NgChartsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
