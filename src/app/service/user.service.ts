import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL="/api/users";

  constructor(private httpClient: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}` + '/all', { responseType: 'text'});
  }

  getUserBoard(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}` + '/user', {responseType: 'text'});
  }

  getModeratorBoard(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}` + '/mod', {responseType: 'text'});
  }

  getAdminBoard(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}` + '/admin', {responseType: 'text'});
  }

  getUsersList(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseURL}`);
  }

  updateUser(id: number, user: User): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, user);
  }

  deleteUser(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  getUserBiId(id: number): Observable<User>{
    return this.httpClient.get<User>(`${this.baseURL}/${id}`);
  }

}
