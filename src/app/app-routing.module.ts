import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/containers/home-page/home-page.component';
import { ReportViewComponent } from './report/containers/report-view/report-view.component';
import { ReportOptionsComponent } from './report/containers/report-options/report-options.component';
import { ProjectConfigComponent } from './projects/containers/project-config/project-config.component';
import { TeamsOverviewComponent } from './teams/containers/teams-overview/teams-overview.component';
import { ProjectListOverviewComponent } from './projects/containers/project-list-overview/project-list-overview.component';
import { ProjectViewComponent } from './projects/containers/project-view/project-view.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'options/:uuid', component: ReportOptionsComponent },
  { path: 'report/:uuid', component: ReportViewComponent },
  { path: 'projects', component: ProjectListOverviewComponent },
  { path: 'projects/project/:uuid', component: ProjectViewComponent },
  { path: 'projects/create-new', component: ProjectConfigComponent }, 
  { path: 'config', component: ProjectConfigComponent }, 
  { path: 'teams', component: TeamsOverviewComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
