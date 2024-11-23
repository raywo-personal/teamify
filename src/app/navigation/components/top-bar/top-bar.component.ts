import {Component, inject, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs';
import {navItems} from '../../routes/nav-items';


@Component({
  selector: 'app-top-bar',
  imports: [],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent implements OnInit {

  protected currentTitle: string = "";
  protected icon?: string;

  private router = inject(Router);
  private navItems = navItems;


  public ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let route = this.router.routerState.root;
          let title = "";

          while (route.firstChild) {
            route = route.firstChild;
            if (route.snapshot.data['title']) {
              title = route.snapshot.data['title'];
            }
          }

          return title;
        })
      )
      .subscribe(title => {
        this.currentTitle = title;
        const navItem = this.navItems.find(item => item.title === title);
        this.icon = navItem ? navItem.icon : undefined;
      });
  }
}
