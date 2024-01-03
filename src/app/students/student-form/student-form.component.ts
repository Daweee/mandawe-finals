import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CollegeService } from 'src/app/services/college.service';
import { ProgramService } from 'src/app/services/program.service';
import { StudentService } from 'src/app/services/student.service';

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
  progList: any[];
  filteredProgList: any[];
  isEditMode: boolean = false;
  programId: number;
  studYear: number[] = [1, 2, 3, 4];

  private progListInitialized: Promise<void>;

  constructor(
    private colleges: CollegeService,
    private programs: ProgramService,
    private students: StudentService,
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
          this.programs.getPrograms().subscribe({
            next: (response) => {
              this.progList = response;
              resolve();
            },
            error: (error) => {
              this.errorMessage = error;
            },
          });
        },
        error: (error) => {
          this.errorMessage = error;
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
      this.getStudentData(studid);
    } else {
      this.enableFormControls();
    }
  }

  async formFilterInitialized(collid: number) {
    await this.progListInitialized;
    this.filterProgList(collid);
  }

  private filterProgList(collid: number) {
    if (collid) {
      this.filteredProgList = this.progList.filter(
        (prog) => prog.progcollid === collid
      );
    } else {
      this.filteredProgList = this.progList;
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

  private enableFormControls() {
    this.form.enable();
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

  private getStudentData(studid: number) {
    this.students.getStudent(studid).subscribe({
      next: (response) => {
        this.form.patchValue(response);
        this.enableFormControls();
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }
}
