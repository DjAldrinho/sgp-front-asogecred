import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Lawyer} from 'src/app/models/lawyer.model';
import {Process} from 'src/app/models/process.model';
import {LawyersService} from 'src/app/services/lawyers.service';
import {ProcessesService} from 'src/app/services/processes.service';
import {SwalTool} from 'src/app/tools/swal.tool';

@Component({
  selector: 'app-detail-lawyer',
  templateUrl: './detail-lawyer.component.html',
  styleUrls: ['./detail-lawyer.component.css']
})
export class DetailLawyerComponent implements OnInit {

  public lawyer: Lawyer;
  private idLawyer: number;
  public loading = false;
  public max: number;

  public processes: Process[] = [];
  public pageProcesses: number;
  public totalProcesses: number;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private processesService: ProcessesService,
              private lawyersService: LawyersService,) {
    this.pageProcesses = 1;
    this.totalProcesses = 0;
    this.max = 5;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      this.idLawyer = id;
      this.getLawyer(id);
    });
  }

  getLawyer(id: number): void {
    this.loading = true;
    this.lawyersService.getLawyerById(id)
      .subscribe(resp => {
        this.lawyer = resp;
        this.loading = false;
        console.log(this.lawyer);
        this.getProcesses(this.pageProcesses);
      }, err => {
        this.loading = false;
        this.router.navigateByUrl(`/dashboard`);
      });
  }

  getProcesses(page?: number): void {
    this.pageProcesses = page;
    if (page == null) {
      this.pageProcesses = 1;
    }
    this.processesService.getProcesses(this.pageProcesses, this.max, this.idLawyer)
      .subscribe(resp => {
        this.processes = resp.processes;
        this.totalProcesses = resp.total;
        console.log(this.processes);
      }, err => {
        SwalTool.onError('Error al cargar los procesos');
      });
  }

  onPageChange(page): void {
    this.getProcesses(page);
  }

}
