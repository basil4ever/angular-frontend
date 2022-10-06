import {Component, Inject, OnInit} from '@angular/core';
import {Invoice} from "../../models/invoice";
import {InvoiceService} from "../../service/invoice.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Employee} from "../../employee";
import {EmployeeService} from "../../service/employee.service";

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {

  invoice: Invoice = new Invoice();
  addInvoiceSuccess = false;
  addInvoiceError = false;
  errorMessage = '';

  employee: Employee;
  employees: Employee[];


  constructor(private invoiceService: InvoiceService,
              private employeeService: EmployeeService,
              private router: Router, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.formInit();
    this.getEmployees();
  }

  private formInit(): void {

    this.invoice = {
      employee: {
        firstName: '',
        lastName: '',
        emailId: ''
      },
      amount: '',
      currency: 'USD',
      description: '',
      created: '',
      invoiceData: ''
    }
  }

  saveInvoice() {
    this.invoiceService.createInvoice(this.invoice).subscribe(data => {
        console.log(data);
      this.data.grid.getInvoices();
        this.addInvoiceSuccess = true;
        this.addInvoiceError = false;
        this.data.modal.closeAll();
      },
      error => {
        this.errorMessage = error.error.message;
        this.addInvoiceError = true;
      }
    );
  }

  onSubmit() {
    this.saveInvoice();
  }

  public objectComparisonFunction ( option: any, value: any ) : boolean {
    return option.id === value.id;
  }

  private getEmployees(){
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
    })
  }




}
