import { Component, OnInit } from '@angular/core';
import {Employee} from "../../employee";
import {EmployeeService} from "../../service/employee.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../service/token-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateEmployeeComponent} from "../create-employee/create-employee.component";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string = '';

  employees: Employee[] = [];
  constructor(private employeeService: EmployeeService,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private dialogRef: MatDialog) { }

  createEmployee(){
    this.dialogRef.open(CreateEmployeeComponent, {data:{modal: this.dialogRef,grid: this}});
  }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }

    this.getEmployees();
  }

  private getEmployees(){
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
    });
  }

  updateEmployee(id: number){
    this.router.navigate([`update-employee`, id]);
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(data => {
      this.getEmployees();
    })
  }

  employeeDetails(id: number) {
    this.router.navigate([`employee-details`, id]);
  }
}
