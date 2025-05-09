import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from '@home/home.module';
import { CoreModule } from '@core/core.module';
import { ReportModule } from './report/report.module';
import { ProjectsModule } from './projects/projects.module';

import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { BrnSeparatorComponent } from '@spartan-ng/brain/separator';
import { NgIconsModule } from '@ng-icons/core';
import { heroDocumentArrowUp, heroHome, heroSquare2Stack, heroUsers } from '@ng-icons/heroicons/outline';




@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    CoreModule,
    ReportModule,
    ProjectsModule,
    HlmSeparatorDirective,
    BrnSeparatorComponent,
    NgIconsModule.withIcons({ heroHome, heroUsers, heroDocumentArrowUp, heroSquare2Stack }),

  ],
  providers: [

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
