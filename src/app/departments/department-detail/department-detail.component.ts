import { Component, OnInit } from '@angular/core';

import { Department } from 'src/app/models/Department';
import { DepartmentService } from '../../services/department.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.css'],
})
export class DepartmentDetailComponent implements OnInit {
  errorMessage: string = '';
  response: any;

  department: Department = {
    deptid: 0,
    deptfullname: '',
    deptshortname: '',
    deptcollid: 0,
  };

  constructor(
    private departments: DepartmentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      let deptid = Number(params.get('deptid'));
      this.getDepartment(deptid);
    });
  }

  public getDepartment(deptid: number) {
    console.log('CHECKKK');
    console.log(deptid);
    this.departments.getDepartment(deptid).subscribe({
      next: (response) => {
        console.log(response);
        this.response = response;
        this.setDepartmentData(this.response);
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = error;
      },
      complete: () => {
        console.log('Response has completed');
        this.setDepartmentData(this.response);
      },
    });
  }

  private setDepartmentData(response: any) {
    this.department = response;
    console.log(this.department);
  }
}
