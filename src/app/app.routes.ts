import {Routes} from '@angular/router';
import {TimeSlotListComponent} from './timeslots/components/time-slot-list/time-slot-list.component';
import {StartComponent} from './start/components/start/start.component';
import {PriorKnowledgeListComponent} from './prior-knowledge/components/prior-knowledge-list/prior-knowledge-list.component';
import {PersonListComponent} from './persons/components/person-list/person-list.component';
import {GroupingComponent} from './teams/components/grouping/grouping.component';
import {SettingsComponent} from './settings/components/settings/settings.component';


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
    data: {title: $localize`:time slots menu title@@t.timeslots-menu:Time slots`, icon: "clock"},
    pathMatch: "full"
  },
  {
    path: "prior-knowledge",
    component: PriorKnowledgeListComponent,
    data: {title: $localize`:prior knowledge menu title@@t.priorKnowledge-menu:Prior knowledge`, icon: "book"},
    pathMatch: "full"
  },
  {
    path: "persons",
    component: PersonListComponent,
    data: {title: $localize`:persons menu title@@t.persons-menu:Persons`, icon: "people"},
    pathMatch: "full"
  },
  {
    path: "build-teams",
    component: GroupingComponent,
    data: {title: $localize`:build teams menu title@@t.buildTeams-menu:Build teams`, icon: "people-fill"},
    pathMatch: "full"
  },
  {
    path: "settings",
    component: SettingsComponent,
    data: {title: $localize`:settings menu title@@t.settings-menu:Settings`, icon: "gear"},
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "/start",
  }
];
