import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor() {}
}