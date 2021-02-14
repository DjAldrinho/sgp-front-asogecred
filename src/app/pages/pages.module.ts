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
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule,
    NgxPaginationModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports: [
    ClientsComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ]
})
export class PagesModule { }
