import {Component, OnInit} from '@angular/core';
import {Employee} from "../../employee";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../service/employee.service";
import {Observable, switchMap} from "rxjs";
import {FileService} from "../../service/file.service";
import {BeforeSlideDetail} from 'lightgallery/lg-events';


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {


  // @ts-ignore
  id: number;
  // @ts-ignore
  employee: Employee;
  employeePhotos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private fileService: FileService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.employee = new Employee();
    this.employeeService.getEmployeeBiId(this.id).subscribe(data => {
      this.employee = data;
      this.employee.files.forEach((img: any) => {
        // TODO: Get file from BE by file id
        // this.employeePhotos.push(fileFromBE)
        this.fileService.getImageByEmployeeId(img.id)
          .pipe(switchMap((blob) => this.convertBlobToBase64(blob)))
          .subscribe(base64ImageUrl => {

            this.employeePhotos.push(base64ImageUrl);
          });
        console.log(this.employeePhotos);
      });
    });
  }

  convertBlobToBase64(blob: Blob) {
    return Observable.create((observer: any) => {
      const reader = new FileReader();
      const binaryString = reader.readAsDataURL(blob);
      reader.onload = (event: any) => {
        observer.next(event.target.result);
        observer.complete();
      };

      reader.onerror = (event: any) => {
        console.log('File could not be read: ' + event.target.error.code);
        observer.next(event.target.error.code);
        observer.complete();
      };
    });
  }

  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const {index, prevIndex} = detail;
    console.log(index, prevIndex);
  };

  goToEmployeeList() {
    void this.router.navigate(['/employees']);
  }

}
