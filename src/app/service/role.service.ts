import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Role} from "../models/role";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseURL="/api/users/roles";


  constructor(private httpClient: HttpClient) { }

  getRolesList(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(`${this.baseURL}`);
  }
}
