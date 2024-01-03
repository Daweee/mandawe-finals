import { Component, OnInit } from '@angular/core';

import { CollegeService } from 'src/app/services/college.service';
import { College } from 'src/app/models/College';
import { Router } from '@angular/router';

@Component({
  selector: 'app-colleges-college-list',
  templateUrl: './college-list.component.html',
  styleUrls: ['./college-list.component.css'],
})
export class CollegeListComponent implements OnInit {
  errorMessage: string = '';
  response: any;

  college: College = {
    collid: 0,
    collfullname: '',
    collshortname: '',
  };

  collegeList: Array<College> = [];

  constructor(private colleges: CollegeService) {}

  ngOnInit() {
    this.getColleges();
  }

  public getColleges() {
    this.colleges.getColleges().subscribe({
      next: (response) => {
        this.response = response;
      },
      error: (error) => {
        this.errorMessage = error;
      },
      complete: () => {
        this.getDataObjects(this.response);
      },
    });
  }

  private getDataObjects(dataSet: any): void {
    for (let index in dataSet) {
      this.collegeList.push(dataSet[index]);
    }
  }

  public deleteCollege(collid: number) {
    this.collegeList = [];
    this.colleges.deleteCollege(collid).subscribe({
      next: (response) => {
        this.response = response;
      },
      error: (error) => {
        this.errorMessage = error;
      },
      complete: () => {
        this.ngOnInit();
      },
    });
  }
}
