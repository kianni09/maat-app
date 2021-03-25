import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourtSearchComponent } from './court-search/court-search.component';
import { CourtTotalSearchComponent } from './court-total-search/court-total-search.component';
import { DebtMonitoringComponent } from './debt-monitoring/debt-monitoring.component';
import { DebtSearchComponent } from './debt-search/debt-search.component';
import { CourtMonitoringComponent } from './main/main.component';
import { TitleComponent } from './title/title.component';

const routes: Routes = [
  { path: 'start/title', component: TitleComponent },
  { path: 'court/search', component: CourtTotalSearchComponent},
  { path: 'court-status/search', component: CourtSearchComponent},
  { path: 'court-status/monitoring', component: CourtMonitoringComponent},
  { path: 'debt/search', component: DebtSearchComponent},
  { path: 'debt/monitoring', component: DebtMonitoringComponent},
  { path: '**', redirectTo: 'start/title' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
