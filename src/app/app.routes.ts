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
    data: {title: "Start", icon: "house-door"},
    pathMatch: "full"
  },
  {
    path: "time-slots",
    component: TimeSlotListComponent,
    data: {title: "Time slots", icon: "clock"},
    pathMatch: "full"
  },
  {
    path: "prior-knowledge",
    component: TimeSlotListComponent,
    data: {title: "Prior knowledge", icon: "book"},
    pathMatch: "full"
  },
  {
    path: "persons",
    component: TimeSlotListComponent,
    data: {title: "Persons", icon: "people"},
    pathMatch: "full"
  },
  {
    path: "grouping",
    component: TimeSlotListComponent,
    data: {title: "Grouping", icon: "people-fill"},
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "/time-slots",
  }
];
