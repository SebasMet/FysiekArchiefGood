import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroArrowUpTray } from '@ng-icons/heroicons/outline';



@NgModule({
  declarations: [
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({ heroArrowUpTray}),

  ],
  exports: [
    FileUploadComponent
  ]
})
export class SharedModule { }
