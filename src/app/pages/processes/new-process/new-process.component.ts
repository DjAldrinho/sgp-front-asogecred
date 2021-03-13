import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Client} from 'src/app/models/client.model';
import {Credit} from 'src/app/models/credit.model';
import {Lawyer} from 'src/app/models/lawyer.model';
import {ClientsService} from 'src/app/services/clients.service';
import {CreditsService} from 'src/app/services/credits.service';
import {LawyersService} from 'src/app/services/lawyers.service';
import {ProcessesService} from 'src/app/services/processes.service';
import {SwalTool} from 'src/app/tools/swal.tool';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-process',
  templateUrl: './new-process.component.html',
  styleUrls: ['./new-process.component.css']
})
export class NewProcessComponent implements OnInit {

  public addNewProcessForm: FormGroup;
  public loading = false;
  public debtors: Client[] = [];
  public credits: Credit[] = [];
  public selectedCredit: Credit;
  public lawyers: Lawyer[] = [];

  constructor(private processesService: ProcessesService,
              private fb: FormBuilder,
              private router: Router,
              private clientsService: ClientsService,
              private creditsService: CreditsService,
              private lawyersService: LawyersService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.addNewProcessForm = this.fb.group({
      lawyer_id: ['', [Validators.required]],
      credit_id: ['', [Validators.required]],
      court: ['', [Validators.required]],
      demand_value: ['', [Validators.required]],
      fees_value: ['', [Validators.required]],
      debtor_id: ['']
    });

    this.getFormField('debtor_id').valueChanges.subscribe(value => {
      if (!this.getFormField('debtor_id').errors?.required) {
        this.getDebtors(value);
      }
    });

    this.getFormField('lawyer_id').valueChanges.subscribe(value => {
      if (!this.getFormField('lawyer_id').errors?.required) {
        this.getLawyers(value);
      }
    });

    this.getFormField('credit_id').valueChanges.subscribe(value => {
      this.selectedCredit = this.credits.find(credit => credit.id.toString() === value);
      console.log(this.selectedCredit);
    });
  }

  getFormField(field: string): AbstractControl {
    return this.addNewProcessForm.get(field);
  }

  showDebtorCodebtors(debtor: Client): string | Client {
    return debtor ? `${debtor.document_number} ${debtor.name}`.toUpperCase() : debtor;
  }

  showLawyers(lawyer: Lawyer): string | Lawyer {
    return lawyer ? `${lawyer.document_number} ${lawyer.name}`.toUpperCase() : lawyer;
  }

  selectDebtor(debtor: Client): void {
    this.getCreditsByDebtor(debtor.id);
  }

  selectLawyer(lawyer: Lawyer): void {
    console.log(lawyer);
  }

  getDebtors(query: string): void {
    this.clientsService.getClients(1, 20, query, true)
      .subscribe((data) => {
        this.debtors = data.clients;
      }, () => {
        Swal.fire('Error', 'Error buscando clientes', 'error');
      });
  }

  getLawyers(query: string): void {
    this.lawyersService.getLawyers(1, 20, query, true)
      .subscribe((data) => {
        this.lawyers = data.lawyers;
      }, () => {
        Swal.fire('Error', 'Error buscando abogados', 'error');
      });
  }

  getCreditsByDebtor(debtorId: number): void {
    this.getFormField('credit_id').disable();
    this.credits = [];
    this.creditsService.getCredits(0, 0, null, debtorId, null, null, null, true, 'A')
      .subscribe((data) => {
        this.getFormField('credit_id').enable();
        this.credits = data.credits;
      }, () => {
        this.credits = [];
        Swal.fire('Error', 'Error cargando los creditos del cliente', 'error');
      });
  }

  addNewProcess(): void {
    if (this.addNewProcessForm.valid) {
      this.loading = true;
      // tslint:disable-next-line:variable-name
      const lawyer_id = this.getFormField('lawyer_id').value;
      // tslint:disable-next-line:variable-name
      const credit_id = this.getFormField('credit_id').value;
      const court = this.getFormField('court').value;
      // tslint:disable-next-line:variable-name
      const demand_value = this.getFormField('demand_value').value;
      // tslint:disable-next-line:variable-name
      const fees_value = this.getFormField('fees_value').value;

      const process = {
        lawyer_id: lawyer_id.id,
        credit_id,
        court,
        demand_value,
        fees_value
      };

      this.processesService.createProcess(process)
        .subscribe(() => {
          this.loading = false;
          this.router.navigateByUrl(`/processes`);
          SwalTool.onMessage('Proceso creado', `El proceso fue creado correctamente`);
        }, err => {
          this.loading = false;
          Swal.fire('Error', err.error.message, 'error');
        });
    }
  }

}
