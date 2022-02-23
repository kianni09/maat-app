import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }   from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule }   from '@angular/forms';
import { ClickOutsideModule } from 'ng-click-outside';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TitleComponent } from './title/title.component';
import { CourtMonitoringComponent } from './main/main.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DocumentsComponent } from './documents/documents.component';
import { CourtReportComponent } from './court-report/court-report.component';
import { CourtSearchComponent } from './court-search/court-search.component';
import { DebtSearchComponent } from './debt-search/debt-search.component';
import { DebtMonitoringComponent } from './debt-monitoring/debt-monitoring.component';
import { DebtMonitoringAddComponent } from './debt-monitoring-add/debt-monitoring-add.component';
import { CourtTotalSearchComponent } from './court-total-search/court-total-search.component';
import { UserCabinetComponent } from './user-cabinet/user-cabinet.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CompanySearchComponent } from './company-search/company-search.component';
import { CompanyDocumentComponent } from './company-document/company-document.component';
import { CompanyMonitoringComponent } from './company-monitoring/company-monitoring.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TitleComponent,
    CourtMonitoringComponent,
    SubscriptionComponent,
    LoginComponent,
    RegistrationComponent,
    DocumentsComponent,
    CourtReportComponent,
    CourtSearchComponent,
    DebtSearchComponent,
    DebtMonitoringComponent,
    DebtMonitoringAddComponent,
    CourtTotalSearchComponent,
    UserCabinetComponent,
    ChangePasswordComponent,
    CompanySearchComponent,
    CompanyDocumentComponent,
    CompanyMonitoringComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ClickOutsideModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
