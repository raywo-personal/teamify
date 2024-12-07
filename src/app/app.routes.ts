import {Routes} from '@angular/router';
import {TimeSlotListComponent} from './timeslots/components/time-slot-list/time-slot-list.component';
import {StartComponent} from './start/components/start/start.component';
import {PriorKnowledgeListComponent} from './prior-knowledge/components/prior-knowledge-list/prior-knowledge-list.component';
import {PersonListComponent} from './persons/components/person-list/person-list.component';
import {GroupingComponent} from './teams/components/grouping/grouping.component';


export const routes: Routes = [
  {
    path: "",
    redirectTo: "/start",
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
    component: PriorKnowledgeListComponent,
    data: {title: "Prior knowledge", icon: "book"},
    pathMatch: "full"
  },
  {
    path: "persons",
    component: PersonListComponent,
    data: {title: "Persons", icon: "people"},
    pathMatch: "full"
  },
  {
    path: "grouping",
    component: GroupingComponent,
    data: {title: "Grouping", icon: "people-fill"},
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "/start",
  }
];
