import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { UpdateInvoiceComponent } from './update-invoice/update-invoice.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {NgChartsModule} from "ng2-charts";



@NgModule({
  declarations: [
    CreateInvoiceComponent,
    UpdateInvoiceComponent,
    InvoiceListComponent,
    InvoiceDetailsComponent
  ],
    imports: [
        CommonModule,
        MatSelectModule,
        FormsModule,
        NgChartsModule
    ]
})
export class InvoiceModule { }
