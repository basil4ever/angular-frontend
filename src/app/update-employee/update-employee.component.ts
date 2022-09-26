import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../service/employee.service";
import {Employee} from "../employee";
import {ActivatedRoute, Router} from "@angular/router";
import {FileService} from "../service/file.service";
import {HttpErrorResponse, HttpEvent, HttpEventType} from "@angular/common/http";
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {

  // @ts-ignore
  id: number;
  employee: Employee = new Employee();
  filenames: string[] = [];
  fileStatus = {status: '', requestType: '', percent: 0};
  imagesPreview: any = [];

  constructor(private employeeService: EmployeeService,
              private route: ActivatedRoute,
              private router: Router,
              private fileService: FileService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeBiId(this.id).subscribe(data => {
      this.employee = data;
    }, error => console.log(error));
  }


  onSubmit() {
    this.employeeService.updateEmployee(this.id, this.employee).subscribe(data => {
      this.goToEmployeeList();
    },error => console.log(error));
  }

  goToEmployeeList(){
    void this.router.navigate(['/employees']);
  }

  onUploadFiles(inputEvent: any): void {
    const files = inputEvent.target.files;
    const formData = new FormData();


    for (const file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      formData.append('files', file, file.name);
      reader.onload = () => {
        this.imagesPreview.push(reader.result);
      }
    }
    this.fileService.upload(formData, this.employee).subscribe(
      event => {
        console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );

    console.log('onUploadFiles - files', files);





  }

  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch(httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
        } else {
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
            {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
        }
        this.fileStatus.status = 'done';
        break;
      default:
        console.log(httpEvent);
        break;
    }
  }

  private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }

}
