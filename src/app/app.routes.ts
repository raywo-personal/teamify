import {Routes} from '@angular/router';
import {TimeSlotListComponent} from './timeslots/components/time-slot-list/time-slot-list.component';
import {StartComponent} from './start/components/start/start.component';


export const routes: Routes = [
  {
    path: "",
    redirectTo: "/time-slots",
    pathMatch: "full"
  },
  {
    path: "start",
    component: StartComponent,
    data: {title: "Start"},
    pathMatch: "full"
  },
  {
    path: "time-slots",
    component: TimeSlotListComponent,
    data: {title: "Time slots"},
    pathMatch: "full"
  }
];
