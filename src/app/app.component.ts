import {Component, inject, OnInit} from '@angular/core';
import {NavigationComponent} from './navigation/components/navigation/navigation.component';
import {TopBarComponent} from './navigation/components/top-bar/top-bar.component';
import {RouterOutlet} from '@angular/router';
import {PersistenceService} from './shared/services/persistence.service';


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
export class AppComponent implements OnInit {

  private persistenceService = inject(PersistenceService);

  protected title = 'Teamify';


  public ngOnInit() {
    this.persistenceService.readAllData();
  }
}
