import { Component, OnInit } from '@angular/core';

import { DepartmentService } from '../../services/department.service';
import { Department } from 'src/app/models/Department';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
})
export class DepartmentListComponent implements OnInit {
  errorMessage: string = '';
  response: any;

  department: Department = {
    deptid: 0,
    deptfullname: '',
    deptshortname: '',
    deptcollid: 0,
  };

  deptartmentList: Array<Department> = [];

  constructor(private departments: DepartmentService) {}

  ngOnInit() {
    this.getDepartments();
  }

  public getDepartments() {
    this.departments.getDepartments().subscribe({
      next: (response) => {
        console.log(response);
        this.response = response;
      },
      error: (error) => {
        console.log('Response has Failed.');
        this.errorMessage = error;
        console.log(error);
      },
      complete: () => {
        console.log('Response has Completed');
        this.getDataObjects(this.response);
      },
    });
  }

  private getDataObjects(dataSet: any): void {
    console.log('we have reached this part');
    for (let index in dataSet) {
      console.log('Department List: ', dataSet[index]);
      this.deptartmentList.push(dataSet[index]);
    }
    console.log('Dataset: ', this.deptartmentList);
  }
}
