import { Component, OnInit } from '@angular/core';

import { Program } from '../../models/Programs';
import { ProgramService } from '../../services/program.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.css'],
})
export class ProgramDetailComponent implements OnInit {
  errorMessage: string = '';
  response: any;

  program: Program = {
    progid: 0,
    progfullname: '',
    progshortname: '',
    progcolldeptid: 0,
    progcollid: 0,
  };

  constructor(
    private programs: ProgramService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      let progid = Number(params.get('progid'));
      this.getProgram(progid);
    });
  }

  public getProgram(progid: number) {
    this.programs.getProgram(progid).subscribe({
      next: (response) => {
        this.response = response;
        this.setProgramData(this.response);
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = error;
      },
      complete: () => {
        this.setProgramData(this.response);
      },
    });
  }

  private setProgramData(response: any) {
    this.program = response;
  }
}
