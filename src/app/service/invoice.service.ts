import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Invoice} from "../models/invoice";
import {InvoiceReportDTO} from "../dto/InvoiceReportDTO";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private baseURL="/api/v1/invoices";

  constructor(private httpClient: HttpClient) { }

  getInvoiceList(): Observable<Invoice[]>{
    return this.httpClient.get<Invoice[]>(`${this.baseURL}`);
  }

  getInvoiceById(id: number): Observable<Invoice>{
    return this.httpClient.get<Invoice>(`${this.baseURL}/${id}`);
  }

  createInvoice(invoice: Invoice): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, invoice);
  }

  updateInvoice(id: number, invoice: Invoice): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, invoice);
  }

  deleteInvoice(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  getDataForPieChart(): Observable<InvoiceReportDTO[]>{
    return this.httpClient.get<InvoiceReportDTO[]>(`${this.baseURL}/pie-chart-data`)
  }
}
