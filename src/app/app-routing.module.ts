import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/containers/home-page/home-page.component';
import { ReportViewComponent } from './report/containers/report-view/report-view.component';
import { ReportOptionsComponent } from './report/containers/report-options/report-options.component';
import { ProjectConfigComponent } from './projects/containers/project-config/project-config.component';
import { TeamsOverviewComponent } from './teams/containers/teams-overview/teams-overview.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'options/:uuid', component: ReportOptionsComponent },
  { path: 'report/:uuid', component: ReportViewComponent },
  { path: 'teams', component: TeamsOverviewComponent },
  //{ path: 'project/:uuid/config', component: ProjectConfigComponent }, // Placeholder for project config
  { path: 'config', component: ProjectConfigComponent }, // Placeholder for project config

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
