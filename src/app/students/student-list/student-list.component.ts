import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/Student';

@Component({
  selector: 'app-students-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  errorMessage: string = '';
  response: any = '';

  studentList: Array<Student> = [];

  constructor(private students: StudentService) {}

  ngOnInit() {
    this.getStudents();
  }

  public getStudents() {
    this.students.getStudents().subscribe({
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

  private getDataObjects(dataSet: any) {
    for (let index in dataSet) {
      this.studentList.push(dataSet[index]);
    }
  }

  public deleteStudent(studid: number) {
    this.studentList = [];
    this.students.deleteStudent(studid).subscribe({
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
