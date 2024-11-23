import {Component} from '@angular/core';
import {NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NavItem} from '../../routes/nav-item.model';
import {navItems} from '../../routes/nav-items';


@Component({
  selector: 'app-navigation',
  imports: [
    NgbNavModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

  protected active = "top";
  protected navItems: NavItem[] = navItems;

}
