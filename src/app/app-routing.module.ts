import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { TitleComponent } from './title/title.component';


const routes: Routes = [
  { path: 'title', component: TitleComponent },
  { path: 'main', component: MainComponent},
  { path: '**', redirectTo: 'title' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
