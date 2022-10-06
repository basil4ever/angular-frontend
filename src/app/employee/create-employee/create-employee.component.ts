import {Component, Inject, OnInit} from '@angular/core';
import {Employee} from "../../employee";
import {EmployeeService} from "../../service/employee.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee = new Employee();

  addEmployeeSuccess = false;
  addEmployeeError = false;
  errorMessage = '';

  constructor(private employeeService: EmployeeService,
              private router: Router,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  saveEmployee(){
    this.employeeService.createEmployee(this.employee).subscribe(data => {
      console.log(data);
      this.data.grid.getEmployees();
      this.addEmployeeSuccess = true;
      this.addEmployeeError = false;
      this.data.modal.closeAll();
    },
      error => {
      this.errorMessage = error.error.message;
      this.addEmployeeError = true;
    }
    );
  }


  onSubmit() {
    this.saveEmployee();
  }

}
