import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {PagesComponent} from './pages/pages.component';
import {PagesModule} from './pages/pages.module';
import {SharedModule} from './shared/shared.module';
import {AuthModule} from './auth/auth.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    SharedModule,
    AuthModule,
    NoopAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
