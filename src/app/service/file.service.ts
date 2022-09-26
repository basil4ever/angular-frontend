import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../employee";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseURL="api/v1/file";


  constructor(private http: HttpClient) {}

  upload(formData: FormData, employee: Employee): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`${this.baseURL}/upload/employee/${employee.id}`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  download(filename: string): Observable<HttpEvent<Blob>> {
    return this.http.get(`${this.baseURL}/download/${filename}/`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }


  getImageByEmployeeId(id: number): Observable<Blob> {
    let url = `${this.baseURL}/download/` + id;
    return this.http.get(url, { responseType: 'blob' });
  }

}
