import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/Student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css'],
})
export class StudentDetailComponent implements OnInit {
  errorMessage: string = '';
  response: any;

  student: Student = {
    studid: 0,
    studfirstname: '',
    studmidname: '',
    studlastname: '',
    studcollid: 0,
    studprogid: 0,
    studyear: 0,
  };

  constructor(
    private students: StudentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (response) => {
        let studid = Number(response.get('studid'));
        console.log(studid);
        this.getStudent(studid);
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

  private getStudent(studid: number) {
    this.students.getStudent(studid).subscribe({
      next: (response) => {
        console.log(response);
        this.response = response;
      },
      error: (error) => {
        this.errorMessage = error;
      },
      complete: () => {
        this.setStudentData(this.response);
      },
    });
  }

  private setStudentData(response: any) {
    this.student = response;
  }
}
