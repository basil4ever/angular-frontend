import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Invoice} from "../../models/invoice";
import {InvoiceService} from "../../service/invoice.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../service/token-storage.service";
import * as moment from "moment";
import {MatDialog} from "@angular/material/dialog";
import {CreateInvoiceComponent} from "../create-invoice/create-invoice.component";
import {ChartOptions} from 'chart.js';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';


@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {


  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  chartData: any;

  public pieChartLegend = false;
  public pieChartPlugins = [];


  invoices: Invoice[];
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  arrayNames = [];
  arraySums = [];

  displayedColumns: string[] = ['employee', 'amount', 'created', 'invoice_data', 'description', 'actions'];
  dataSource: MatTableDataSource<Invoice>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private dialogRef: MatDialog,
    private _liveAnnouncer: LiveAnnouncer) {
  }

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
    this.getDataForPieChart();


    // this.dataSource.paginator = this.paginator;
  }


  private getInvoices() {
    this.invoiceService.getInvoiceList().subscribe(data => {
      this.invoices = data;
      this.dataSource = new MatTableDataSource<Invoice>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  invoiceDetails(id: number) {
    this.router.navigate([`invoice-details`, id]);
  }

  createInvoice() {
    this.dialogRef.open(CreateInvoiceComponent, {data: {modal: this.dialogRef, grid: this}});
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

  private getDataForPieChart() {
    this.invoiceService.getDataForPieChart().subscribe(data => {

      data.forEach(report => {
        this.arrayNames.push(report.employee_name);
        this.arraySums.push(report.invoice_sum)
      });
      this.chartData = {
        labels: this.arrayNames,
        datasets: [{
          data: this.arraySums
        }]
      };
    })
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
