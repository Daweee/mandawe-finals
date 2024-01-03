import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {
  baseURL: string = 'http://localhost:8080/usjr-app/api/';

  constructor(private http: HttpClient) {}

  getPrograms(): Observable<any> {
    const url = `${this.baseURL}getprograms.php`;
    return this.http.get(url);
  }

  getProgram(progid: number): Observable<any> {
    const url = `${this.baseURL}getprograminfo.php?progid=${progid}`;
    return this.http.get(url);
  }

  postProgram(programData: {
    progid: number;
    progfullname: string;
    progshortname: string;
    progcollid: number;
    progcolldeptid: number;
  }): Observable<any> {
    const url = `${this.baseURL}saveprogram.php`;
    return this.http.post(url, programData);
  }

  putProgram(
    progid: number,
    progData: {
      progid: number;
      progfullname: string;
      progshortname: string;
      progcolldeptid: number;
      progcollid: number;
    }
  ): Observable<any> {
    console.log(progData);
    const url = `${this.baseURL}postprogramupdates.php`;
    return this.http.put(`${url}?progid=${progid}`, progData);
  }

  deleteProgram(progid: number): Observable<any> {
    const url = `${this.baseURL}removeprogram.php`;
    const body = { progid: progid };
    return this.http.delete(url, { body: body });
  }
}
