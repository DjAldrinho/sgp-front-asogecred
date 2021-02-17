import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../guards/auth.guard';
import {AccountsComponent} from './accounts/accounts.component';
import { ChangeAccountComponent } from './accounts/change-account/change-account.component';
import {ClientsComponent} from './clients/clients.component';
import { CreditsComponent } from './credits/credits.component';
import { NewCreditComponent } from './credits/new-credit/new-credit.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LawyersComponent} from './lawyers/lawyers.component';
import {PagesComponent} from './pages.component';
import {PersonsComponent} from './persons/persons.component';
import {ProfileComponent} from './profile/profile.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { UsersComponent } from './users/users.component';

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
      {path: 'change-account/:id', component: ChangeAccountComponent},
      {path: 'users', component: UsersComponent},
      {path: 'credits', component: CreditsComponent},
      {path: 'new-credit', component: NewCreditComponent},
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
