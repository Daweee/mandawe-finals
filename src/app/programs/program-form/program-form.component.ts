import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CollegeService } from 'src/app/services/college.service';
import { DepartmentService } from 'src/app/services/department.service';
import { ProgramService } from 'src/app/services/program.service';

@Component({
  selector: 'app-program-form',
  templateUrl: './program-form.component.html',
  styleUrls: ['./program-form.component.css'],
})
export class ProgramFormComponent implements OnInit {
  form: FormGroup;
  response: any;
  errorMessage: string = '';
  collegeList: any[];
  departmentList: any[];
  filteredDeptList: any[];
  isEditMode: boolean = false;
  programId: number;

  private deptListInitialized: Promise<void>;

  constructor(
    private colleges: CollegeService,
    private programs: ProgramService,
    private departments: DepartmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      progid: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]\d*$/),
      ]),
      progfullname: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern(/^[a-zA-Z\s]+$/),
      ]),
      progshortname: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z]+$/),
      ]),
      progcollid: new FormControl(null, Validators.required),
      progcolldeptid: new FormControl(null, Validators.required),
    });

    this.deptListInitialized = new Promise((resolve) => {
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

    this.route.params.subscribe((params) => {
      this.programId = +params['id'];

      if (this.programId) {
        this.isEditMode = true;
        this.loadProgData(this.programId);
      } else {
        this.isEditMode = false;
      }
    });

    this.form.get('progcollid').valueChanges.subscribe({
      next: (response) => {
        this.formFilterInitialized(response);
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

  async formFilterInitialized(collid: number) {
    await this.deptListInitialized;
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
      this.editProgramData(formValue);
    } else {
      this.sendProgramData(formValue);
    }
  }

  private sendProgramData(form: any) {
    this.programs.postProgram(form).subscribe({
      next: (response) => {
        this.response = response;

        if (response && response.code !== 200) {
          this.errorMessage = response.status;
        } else {
          this.viewProgramData(form.progid);
        }
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

  private editProgramData(programData: any) {
    this.programs.putProgram(programData.progid, programData).subscribe({
      next: (response) => {
        this.response = response;

        if (response && response.code !== 200) {
          this.errorMessage = response.status;
        } else {
          this.viewProgramData(programData.progid);
        }
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

  private viewProgramData(progid: number) {
    this.router.navigate(['programs', progid]);
  }

  private loadProgData(progId: number) {
    this.programs.getProgram(progId).subscribe({
      next: (response) => {
        this.form.patchValue(response);
        this.formFilterInitialized(response.progcollid);
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }
}
