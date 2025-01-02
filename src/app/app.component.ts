import {Component, inject, OnInit} from '@angular/core';
import {NavigationComponent} from './navigation/components/navigation/navigation.component';
import {TopBarComponent} from './navigation/components/top-bar/top-bar.component';
import {RouterOutlet} from '@angular/router';
import {DomainLogicService} from './shared/services/domain-logic.service';


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

  private domainLogic = inject(DomainLogicService);

  protected title = 'Teamify';


  public ngOnInit() {
    this.domainLogic.loadData();
  }
}
