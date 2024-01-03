import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CollegeService } from 'src/app/services/college.service';
import { ProgramService } from 'src/app/services/program.service';
import { StudentService } from 'src/app/services/student.service';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
})
export class StudentFormComponent implements OnInit {
  form: FormGroup;
  response: any;
  errorMessage: string = '';
  studentList: any[];
  collegeList: any[];
  // progList: any[];
  // filteredProgList: any[];
  departmentList: any[];
  filteredDeptList: any[];
  isEditMode: boolean = false;
  programId: number;
  studYear: number[] = [1, 2, 3, 4];

  private progListInitialized: Promise<void>;

  constructor(
    private colleges: CollegeService,
    // private programs: ProgramService,
    private students: StudentService,
    private departments: DepartmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      studid: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]\d*$/),
      ]),
      studfirstname: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern(/^[a-zA-Z\s]+$/),
      ]),
      studmidname: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern(/^[a-zA-Z\s]+$/),
      ]),
      studlastname: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern(/^[a-zA-Z\s]+$/),
      ]),
      studcollid: new FormControl(null, Validators.required),
      studprogid: new FormControl(null, Validators.required),
      studyear: new FormControl(null, Validators.required),
    });

    this.progListInitialized = new Promise((resolve) => {
      this.colleges.getColleges().subscribe({
        next: (response) => {
          this.collegeList = response;

          this.departments.getDepartments().subscribe({
            next: (response) => {
              this.departmentList = response;
              resolve();
            },
            error: (error) => {
              this.errorMessage = error;
              resolve();
            },
          });
        },
        error: (error) => {
          this.errorMessage = error;
          resolve();
        },
      });
    });

    this.form.get('studcollid').valueChanges.subscribe({
      next: (response) => {
        this.formFilterInitialized(response);
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });

    const studid = this.route.snapshot.params['id'];
    if (studid) {
      this.isEditMode = true;
      this.loadStudentData(studid);
    }
  }

  async formFilterInitialized(collid: number) {
    await this.progListInitialized;
    this.filterDeptList(collid);
  }

  private filterDeptList(collid: number) {
    if (collid) {
      this.filteredDeptList = this.departmentList.filter(
        (dept) => dept.deptcollid === collid
      );
    } else {
      this.filteredDeptList = this.departmentList;
    }
  }

  onSubmit() {
    const formValue = this.form.value;

    if (this.isEditMode) {
      this.editStudentData(formValue);
    } else {
      this.sendStudentData(formValue);
    }
  }

  private sendStudentData(form: any) {
    this.students.postStudent(form).subscribe({
      next: (response) => {
        this.response = response;

        if (response && response.code !== 200) {
          this.errorMessage = response.status;
        } else {
          this.viewStudentData(form.studid);
        }
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

  private editStudentData(studentData: any) {
    this.students.putStudent(studentData.studid, studentData).subscribe({
      next: (response) => {
        this.response = response;

        if (response && response.code !== 200) {
          this.errorMessage = response.status;
        } else {
          this.viewStudentData(studentData.studid);
        }
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

  private viewStudentData(studid: number) {
    this.router.navigate(['students', studid]);
  }

  private loadStudentData(studid: number) {
    this.students.getStudent(studid).subscribe({
      next: (response) => {
        this.form.patchValue(response);
        this.formFilterInitialized(response.studcollid);
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }
}
