import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CollegeListComponent } from './colleges/college-list/college-list.component';
import { CollegeDetailComponent } from './colleges/college-detail/college-detail.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DepartmentListComponent } from './departments/department-list/department-list.component';
import { DepartmentDetailComponent } from './departments/department-detail/department-detail.component';
import { ProgramListComponent } from './programs/program-list/program-list.component';
import { ProgramDetailComponent } from './programs/program-detail/program-detail.component';
import { CollegeFormComponent } from './colleges/college-form/college-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgramFormComponent } from './programs/program-form/program-form.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentDetailComponent } from './students/student-detail/student-detail.component';
import { StudentFormComponent } from './students/student-form/student-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CollegeListComponent,
    CollegeDetailComponent,
    HomeComponent,
    DepartmentListComponent,
    DepartmentDetailComponent,
    ProgramListComponent,
    ProgramDetailComponent,
    CollegeFormComponent,
    ProgramFormComponent,
    StudentListComponent,
    StudentDetailComponent,
    StudentFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
