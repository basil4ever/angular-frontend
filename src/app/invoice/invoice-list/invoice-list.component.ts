import { Component, OnInit } from '@angular/core';
import {Invoice} from "../../models/invoice";
import {InvoiceService} from "../../service/invoice.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../service/token-storage.service";
import * as moment from "moment";
import {MatDialog} from "@angular/material/dialog";
import {CreateInvoiceComponent} from "../create-invoice/create-invoice.component";
import { ChartOptions } from 'chart.js';


@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {


  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  data  = {
    labels: ['Red', 'Blue', 'Green'],
    datasets: [{
      data: [10, 20, 30]
    }]
  };

  public pieChartLegend = false;
  public pieChartPlugins = [];


  invoices: Invoice[];
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private dialogRef: MatDialog) { }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }

    this.getInvoices();
  }

  private getInvoices(){
    this.invoiceService.getInvoiceList().subscribe(data => {
      this.invoices = data;
    });
  }

  invoiceDetails(id: number) {
    this.router.navigate([`invoice-details`, id]);
  }

  createInvoice() {
    this.dialogRef.open(CreateInvoiceComponent, {data: {modal: this.dialogRef,grid: this}});
  }

  updateInvoice(id: number) {
    this.router.navigate([`update-invoice`, id]);
  }

  deleteInvoice(id: number) {
    this.invoiceService.deleteInvoice(id).subscribe(data => {
      this.getInvoices();
    });
  }

  formatDate(dbDate: string) {
    return moment(dbDate).format('MMM Do YYYY, HH:mm:ss');
  }

  formatData(dbDate: string) {
    return moment(dbDate).format('MMM Do YYYY');
  }


}
