import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CollegeService {
  baseURL: string = 'http://localhost:8080/usjr-app/api/';

  constructor(private http: HttpClient) {}

  getColleges(): Observable<any> {
    const url = `${this.baseURL}getcolleges.php`;
    return this.http.get(url);
  }

  getCollege(collid: number): Observable<any> {
    const url = `${this.baseURL}getcollegeinfo.php?collid=${collid}`;
    return this.http.get(url);
  }

  postCollege(collegeData: {
    collid: number;
    firstName: string;
    shortName: string;
  }): Observable<any> {
    const url = `${this.baseURL}savecollege.php`;
    return this.http.post(url, collegeData);
  }

  putCollege(
    collid: number,
    collegeData: { collid: number; firstName: string; shortName: string }
  ): Observable<any> {
    const url = `${this.baseURL}postcollegeupdates.php`;
    return this.http.put(`${url}?collid=${collid}`, collegeData);
  }

  deleteCollege(collid: number): Observable<any> {
    const url = `${this.baseURL}removecollege.php`;
    const body = { collid: collid };
    return this.http.delete(url, { body: body });
  }
}
