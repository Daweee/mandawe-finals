import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  baseURL: string = 'http://localhost:8080/usjr-app/api/';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<any> {
    const url = `${this.baseURL}getstudents.php`;
    return this.http.get(url);
  }

  getStudent(studid: number): Observable<any> {
    const url = `${this.baseURL}getstudentinfo.php?studid=${studid}`;
    return this.http.get(url);
  }

  postStudent(studentData: {
    studid: number;
    studfirstname: string;
    studmidname: string;
    studlastname: string;
    studcollid: number;
    studprogid: number;
    studyear: number;
  }): Observable<any> {
    const url = `${this.baseURL}savestudent.php`;
    return this.http.post(url, studentData);
  }

  putStudent(
    studid: number,
    studentData: {
      studid: number;
      studfirstname: string;
      studmidname: string;
      studlastname: string;
      studcollid: number;
      studprogid: number;
      studyear: number;
    }
  ): Observable<any> {
    console.log(studentData);
    const url = `${this.baseURL}poststudentupdates.php`;
    return this.http.put(`${url}?studid=${studid}`, studentData);
  }

  deleteStudent(studid: number): Observable<any> {
    const url = `${this.baseURL}removestudent.php`;
    const body = { studid: studid };
    return this.http.delete(url, { body: body });
  }
}
