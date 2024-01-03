import { Component, OnInit } from '@angular/core';

import { CollegeService } from 'src/app/services/college.service';
import { College } from 'src/app/models/College';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-college-detail',
  templateUrl: './college-detail.component.html',
  styleUrls: ['./college-detail.component.css'],
})
export class CollegeDetailComponent implements OnInit {
  errorMessage: string = '';
  response: any;

  college: College = {
    collid: 0,
    collfullname: '',
    collshortname: '',
  };

  constructor(
    private colleges: CollegeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (response) => {
        let collid = Number(response.get('collid'));
        this.getCollege(collid);
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

  public getCollege(collid: number) {
    this.colleges.getCollege(collid).subscribe({
      next: (response) => {
        this.response = response;
        this.setCollegeData(this.response);
      },
      error: (error) => {
        this.errorMessage = error;
      },
      complete: () => {
        this.setCollegeData(this.response);
      },
    });
  }

  private setCollegeData(response: any): void {
    this.college = response;
  }
}
