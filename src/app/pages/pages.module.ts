import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from '../app-routing.module';
import { PersonsComponent } from './persons/persons.component';
import { ProfileComponent } from './profile/profile.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../interceptors/interceptor.service';
import { ClientsComponent } from './clients/clients.component';
import { RouterModule } from '@angular/router';
import { AddEditClientComponent } from './clients/add-edit-client/add-edit-client.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { AccountsComponent } from './accounts/accounts.component';
import { AddEditAccountComponent } from './accounts/add-edit-account/add-edit-account.component';
import { LawyersComponent } from './lawyers/lawyers.component';
import { AddEditLawyerComponent } from './lawyers/add-edit-lawyer/add-edit-lawyer.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { AddEditSupplierComponent } from './suppliers/add-edit-supplier/add-edit-supplier.component';
import { ChangeAccountComponent } from './accounts/change-account/change-account.component';
import { UsersComponent } from './users/users.component';
import { AddEditUserComponent } from './users/add-edit-user/add-edit-user.component';
import { CreditsComponent } from './credits/credits.component';
import { NewCreditComponent } from './credits/new-credit/new-credit.component';
import {PayrollsComponent} from './payrolls/payrolls.component';
import {CreditTypesComponent} from './credit-types/credit-types.component';
import { AddEditPayrollsComponent } from './payrolls/add-edit-payrolls/add-edit-payrolls.component';
import { AdvisersComponent } from './advisers/advisers.component';
import { TransactionTypesComponent } from './transaction-types/transaction-types.component';
import { AddEditTransactionTypesComponent } from './transaction-types/add-edit-transaction-types/add-edit-transaction-types.component';
import {AddEditCreditTypesComponent} from './credit-types/add-edit-credit-types/add-edit-credit-types.component';
import {AddEditAdvisersComponent} from './advisers/add-edit-advisers/add-edit-advisers.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ModalChangeAccountComponent} from './accounts/change-account/modal-change-account/modal-change-account.component';
import {DetailCreditComponent} from './credits/detail-credit/detail-credit.component';
import {ModalApproveCreditComponent} from './credits/modal-approve-credit/modal-approve-credit.component';
import {DepositCreditComponent} from './credits/deposit-credit/deposit-credit.component';
import {NgxMaskModule} from 'ngx-mask';
import {TableTransactionsComponent} from '../components/table-transactions/table-transactions.component';
import {CardIconComponent} from '../components/card-icon/card-icon.component';
import {TableCreditsComponent} from '../components/table-credits/table-credits.component';
import {CardDetailComponent} from '../components/card-detail/card-detail.component';
import { ModalMassiveLoadComponent } from './clients/modal-massive-load/modal-massive-load.component';
import { ClientDetailComponent } from './clients/client-detail/client-detail.component';
import {CardClientDetailComponent} from '../components/card-client-detail/card-client-detail.component';
import { RefinanceCreditComponent } from './credits/refinance-credit/refinance-credit.component';
import { DetailAdviserComponent } from './advisers/detail-adviser/detail-adviser.component';
import { ProcessesComponent } from './processes/processes.component';
import { NewProcessComponent } from './processes/new-process/new-process.component';
import { DetailProcessComponent } from './processes/detail-process/detail-process.component';
import { DepositProcessComponent } from './processes/deposit-process/deposit-process.component';
import { DetailLawyerComponent } from './lawyers/detail-lawyer/detail-lawyer.component';
import {TableProcessesComponent} from '../components/table-processes/table-processes.component';
import {TableAdvisersComponent} from '../components/table-advisers/table-advisers.component';
import {CardLawyerDetailComponent} from '../components/card-lawyer-detail/card-lawyer-detail.component';
import {CardAdviserDetailComponent} from '../components/card-adviser-detail/card-adviser-detail.component';
import { TransactionsComponent } from './transactions/transactions.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PersonsComponent,
    ProfileComponent,
    ClientsComponent,
    AddEditClientComponent,
    AccountsComponent,
    AddEditAccountComponent,
    LawyersComponent,
    AddEditLawyerComponent,
    SuppliersComponent,
    AddEditSupplierComponent,
    ChangeAccountComponent,
    UsersComponent,
    AddEditUserComponent,
    CreditsComponent,
    NewCreditComponent,
    PayrollsComponent,
    CreditTypesComponent,
    AddEditPayrollsComponent,
    AdvisersComponent,
    TransactionTypesComponent,
    AddEditTransactionTypesComponent,
    AddEditCreditTypesComponent,
    AddEditAdvisersComponent,
    ModalChangeAccountComponent,
    DetailCreditComponent,
    ModalApproveCreditComponent,
    DepositCreditComponent,
    TableTransactionsComponent,
    CardIconComponent,
    TableCreditsComponent,
    CardDetailComponent,
    ModalMassiveLoadComponent,
    ClientDetailComponent,
    CardClientDetailComponent,
    RefinanceCreditComponent,
    DetailAdviserComponent,
    ProcessesComponent,
    NewProcessComponent,
    DetailProcessComponent,
    DepositProcessComponent,
    DetailLawyerComponent,
    TableProcessesComponent,
    TableAdvisersComponent,
    CardLawyerDetailComponent,
    CardAdviserDetailComponent,
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule,
    NgxPaginationModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    MatAutocompleteModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    ClientsComponent,
    CardIconComponent,
    TableTransactionsComponent,
    TableCreditsComponent,
    CardDetailComponent,
    CardClientDetailComponent,
    TableProcessesComponent,
    TableAdvisersComponent,
    CardLawyerDetailComponent,
    CardAdviserDetailComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ]
})
export class PagesModule {
}
