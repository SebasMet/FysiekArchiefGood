import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/containers/home-page/home-page.component';
import { ReportViewComponent } from './report/containers/report-view/report-view.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'report/:uuid', component: ReportViewComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
