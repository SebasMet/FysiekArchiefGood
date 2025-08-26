import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeBase64Image',
  standalone: true
})
export class SafeBase64ImagePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(base64String: string | null | undefined, imageType: string = 'png'): SafeUrl | null {
    if (!base64String) {
      return null; // Return null if no string is provided
    }

    const imageUrl = `data:image/${imageType};base64,${base64String}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
}
