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



@NgModule({
  declarations: [
    DashboardComponent,
    PersonsComponent,
    ProfileComponent,
    ClientsComponent,
    AddEditClientComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule,
    NgxPaginationModule,
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
