import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from '@home/home.module';
import { CoreModule } from '@core/core.module';
import { ReportModule } from './report/report.module';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    CoreModule,
    ReportModule,

  ],
  providers: [

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
