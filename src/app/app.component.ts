import { Component } from '@angular/core';


interface NavItem {
  name: string;
  icon: string;
  route: string | string[];
  exact: boolean;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FysiekArchief';

  public navItems: NavItem[] = [
    { name: 'Home', icon: 'heroHome', route: '/', exact: true },
    { name: 'Projecten', icon: 'heroSquare2Stack', route: '/projects/overview', exact: false },
    { name: 'Teams', icon: 'heroUsers', route: '/teams', exact: true },
  ]
}
