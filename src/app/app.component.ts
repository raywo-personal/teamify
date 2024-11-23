import {Component} from '@angular/core';
import {NavigationComponent} from './navigation/components/navigation/navigation.component';
import {TopBarComponent} from './navigation/components/top-bar/top-bar.component';
import {RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [
    NavigationComponent,
    TopBarComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Grouper';
}
