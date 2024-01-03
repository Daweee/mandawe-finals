import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CollegeDetailComponent } from './colleges/college-detail/college-detail.component';
import { HomeComponent } from './home/home.component';
// import { DepartmentDetailComponent } from './departments/department-detail/department-detail.component';
import { ProgramDetailComponent } from './programs/program-detail/program-detail.component';
import { CollegeFormComponent } from './colleges/college-form/college-form.component';
import { ProgramFormComponent } from './programs/program-form/program-form.component';
import { StudentFormComponent } from './students/student-form/student-form.component';
import { StudentDetailComponent } from './students/student-detail/student-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'colleges/:collid', component: CollegeDetailComponent },
  { path: 'create-college', component: CollegeFormComponent },
  { path: 'edit-college/:id', component: CollegeFormComponent },

  { path: 'programs/:progid', component: ProgramDetailComponent },
  { path: 'create-program', component: ProgramFormComponent },
  { path: 'edit-program/:id', component: ProgramFormComponent },

  // { path: 'departments/:deptid', component: DepartmentDetailComponent },

  { path: 'students/:studid', component: StudentDetailComponent },
  { path: 'create-student', component: StudentFormComponent },
  { path: 'edit-student/:id', component: StudentFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
