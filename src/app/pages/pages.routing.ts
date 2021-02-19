import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../guards/auth.guard';
import {AccountsComponent} from './accounts/accounts.component';
import { ChangeAccountComponent } from './accounts/change-account/change-account.component';
import {AdvisersComponent} from './advisers/advisers.component';
import {ClientsComponent} from './clients/clients.component';
import { CreditsComponent } from './credits/credits.component';
import { NewCreditComponent } from './credits/new-credit/new-credit.component';
import {CreditTypesComponent} from './credit-types/credit-types.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LawyersComponent} from './lawyers/lawyers.component';
import {PagesComponent} from './pages.component';
import {PayrollsComponent} from './payrolls/payrolls.component';
import {PersonsComponent} from './persons/persons.component';
import {ProfileComponent} from './profile/profile.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { UsersComponent } from './users/users.component';
import {TransactionTypesComponent} from './transaction-types/transaction-types.component';
import { DetailCreditComponent } from './credits/detail-credit/detail-credit.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    children: [
      {path: '', component: DashboardComponent},
      {path: 'persons', component: PersonsComponent},
      {path: 'lawyers', component: LawyersComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'clients', component: ClientsComponent},
      {path: 'accounts', component: AccountsComponent},
      {path: 'suppliers', component: SuppliersComponent},
      {path: 'detail-account/:id', component: ChangeAccountComponent},
      {path: 'users', component: UsersComponent},
      {path: 'credits', component: CreditsComponent},
      {path: 'new-credit', component: NewCreditComponent},
      {path: 'payrolls', component: PayrollsComponent},
      {path: 'credit-types', component: CreditTypesComponent},
      {path: 'advisers', component: AdvisersComponent},
      {path: 'transaction-types', component: TransactionTypesComponent},
      {path: 'detail-credit/:id', component: DetailCreditComponent},
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule {
}
