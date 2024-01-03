import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CollegeService } from 'src/app/services/college.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-college-form',
  templateUrl: './college-form.component.html',
  styleUrls: ['./college-form.component.css'],
})
export class CollegeFormComponent implements OnInit {
  form: FormGroup;
  response: any;
  errorMessage: string = '';
  isEditMode: boolean = false;

  constructor(
    private colleges: CollegeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      collid: new FormControl({ value: null, disabled: this.isEditMode }, [
        Validators.required,
        Validators.pattern(/^[1-9]\d*$/),
      ]),
      collfullname: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern(/^[a-zA-Z\s]+$/),
      ]),
      collshortname: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z]+$/),
      ]),
    });

    const collid = this.route.snapshot.params['id'];
    if (collid) {
      this.isEditMode = true;
      this.getCollegeData(collid);
    } else {
      this.enableFormControls();
    }
  }

  onSubmit() {
    const formValue = this.form.value;

    if (this.isEditMode) {
      this.editCollegeData(formValue);
    } else {
      this.sendCollegeData(formValue);
    }
  }

  private sendCollegeData(form: any) {
    this.colleges.postCollege(form).subscribe({
      next: (response) => {
        this.response = response;

        if (response && response.code !== 200) {
          this.errorMessage = response.status;
        } else {
          this.viewCollegeData(form.collid);
        }
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

  private getCollegeData(collid: number) {
    this.colleges.getCollege(collid).subscribe({
      next: (response) => {
        this.form.patchValue(response);
        this.enableFormControls();
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

  private enableFormControls() {
    this.form.enable();
  }

  private editCollegeData(collegeData: any) {
    this.colleges.putCollege(collegeData.collid, collegeData).subscribe({
      next: (response) => {
        this.response = response;

        if (response && response.code !== 200) {
          this.errorMessage = response.status;
        } else {
          this.viewCollegeData(collegeData.collid);
        }
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

  private viewCollegeData(collid: number) {
    this.router.navigate(['colleges', collid]);
  }
}
