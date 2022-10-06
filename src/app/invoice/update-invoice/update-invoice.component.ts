import { Component, OnInit } from '@angular/core';
import {Invoice} from "../../models/invoice";
import {Employee} from "../../employee";
import {InvoiceService} from "../../service/invoice.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../service/employee.service";

@Component({
  selector: 'app-update-invoice',
  templateUrl: './update-invoice.component.html',
  styleUrls: ['./update-invoice.component.scss']
})
export class UpdateInvoiceComponent implements OnInit {

  id: number;
  invoice: Invoice;
  employees: Employee[];

  constructor(
    private invoiceService: InvoiceService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.invoiceService.getInvoiceById(this.id).subscribe(data => {
      this.invoice = data;
    }, error => console.log(error));
    this.getEmployees();
  }

  onSubmit() {
    this.invoiceService.updateInvoice(this.id, this.invoice).subscribe(data => {
      this.goToInvoiceList();
    }, error => console.log(error));
  }

  goToInvoiceList(){
    void this.router.navigate(['/invoices'])
  }

  private getEmployees(){
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
    })
  }

  public objectComparisonFunction ( option: any, value: any ) : boolean {
    return option.id === value.id;
  }

}
