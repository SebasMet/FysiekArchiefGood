import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeBase64ImagePipe } from './pipes/safe-base64-image.pipe';





@NgModule({
  declarations: [
    SafeBase64ImagePipe
  ],

  imports: [
    CommonModule,
  ]
})
export class CoreModule { }
