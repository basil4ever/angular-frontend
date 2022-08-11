import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = '/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private htth: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.htth.get(API_URL + 'all', { responseType: 'text'});
  }

  getUserBoard(): Observable<any> {
    return this.htth.get(API_URL + 'user', {responseType: 'text'});
  }

  getModeratorBoard(): Observable<any> {
    return this.htth.get(API_URL + 'mod', {responseType: 'text'});
  }

  getAdminBoard(): Observable<any> {
    return this.htth.get(API_URL + 'admin', {responseType: 'text'});
  }

}
