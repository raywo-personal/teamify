import {Component, inject} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {filter, map} from 'rxjs';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-top-bar]',
  imports: [],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {

  private router = inject(Router);

  protected heading = toSignal(
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let route = this.router.routerState.root;
          let title = "";
          let icon = "";

          while (route.firstChild) {
            route = route.firstChild;
            if (route.snapshot.data['title']) {
              title = route.snapshot.data['title'];
              icon = route.snapshot.data['icon'];
            }
          }

          return {title, icon};
        })
      ),
    {initialValue: {title: "", icon: ""}}
  );
}
