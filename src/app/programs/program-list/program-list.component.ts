import { Component, OnInit } from '@angular/core';
import { Program } from '../../models/Programs';
import { ProgramService } from '../../services/program.service';

@Component({
  selector: 'app-programs-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.css'],
})
export class ProgramListComponent implements OnInit {
  errorMessage: string = '';
  response: any;

  program: Program = {
    progid: 0,
    progfullname: '',
    progshortname: '',
    progcolldeptid: 0,
    progcollid: 0,
  };

  programList: Array<Program> = [];

  constructor(private programs: ProgramService) {}

  ngOnInit() {
    this.getPrograms();
  }

  public getPrograms() {
    this.programs.getPrograms().subscribe({
      next: (response) => {
        this.response = response;
      },
      error: (error) => {
        this.errorMessage = error;
      },
      complete: () => {
        this.getDataObjects(this.response);
      },
    });
  }

  private getDataObjects(dataSet: any): void {
    for (let index in dataSet) {
      this.programList.push(dataSet[index]);
    }
  }

  public deleteProgram(progid: number) {
    this.programList = [];
    this.programs.deleteProgram(progid).subscribe({
      next: (response) => {
        this.response = response;
      },
      error: (error) => {
        this.errorMessage = error;
      },
      complete: () => {
        this.ngOnInit();
      },
    });
  }
}
