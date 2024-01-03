import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  baseURL: string = 'http://localhost:8080/usjr-app/api/';

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<any> {
    return this.http.get(this.baseURL + 'getdepartments.php');
  }

  getDepartment(deptid: number): Observable<any> {
    const url = `${this.baseURL}getdepartmentinfo.php?deptid=${deptid}`;
    return this.http.get(url);
  }
}
