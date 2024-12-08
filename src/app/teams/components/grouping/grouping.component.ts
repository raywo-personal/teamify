import {Component, effect, inject, model} from '@angular/core';
import {AsyncPipe, NgTemplateOutlet} from '@angular/common';
import {PersonService} from '../../../persons/services/person.service';
import {TeamViewComponent} from '../team-view/team-view.component';
import {TeamService} from '../../services/team.service';
import {PersonViewComponent} from '../../../persons/components/person-view/person-view.component';
import {CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, CdkDropListGroup} from '@angular/cdk/drag-drop';
import {Person} from '../../../persons/models/person.model';
import {TimeSlotService} from '../../../timeslots/services/time-slot.service';
import {FormsModule} from '@angular/forms';
import {RouterLink} from "@angular/router";
import {DataNotAvailableViewComponent} from '../../../shared/components/data-not-available-view/data-not-available-view.component';
import {DataNotAvailableInfoComponent} from '../../../shared/components/data-not-available-info/data-not-available-info.component';
import {TeamAssemblyService} from '../../services/team-assembly.service';
import {Team} from '../../models/team.model';


@Component({
  selector: 'app-grouping',
  imports: [
    AsyncPipe,
    TeamViewComponent,
    PersonViewComponent,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder,
    FormsModule,
    NgTemplateOutlet,
    RouterLink,
    DataNotAvailableViewComponent,
    DataNotAvailableInfoComponent
  ],
  templateUrl: './grouping.component.html',
  styleUrl: './grouping.component.scss'
})
export class GroupingComponent {

  private timeSlotService = inject(TimeSlotService);
  private personService = inject(PersonService);
  private teamService = inject(TeamService);
  private teamAssemblyService = inject(TeamAssemblyService);

  protected persons$ = this.personService.persons$;
  protected filteredPersons$ = this.personService.filteredPersons$;
  protected teams$ = this.teamService.teams$;
  protected timeSlots$ = this.timeSlotService.slots$;
  protected slotCount$ = this.timeSlotService.slotCount$;

  protected personFilter = model<string>("all");
  protected nameSortOrder = this.personService.nameSortOrder;
  protected slotSortOrder = this.personService.slotSortOrder;


  constructor() {
    effect(() => {
      const filter = this.personFilter();
      this.personService.personFilter.set(filter);
    });
  }


  protected onDrop(dropEvent: CdkDragDrop<string, any>) {
    const originTeam: Team | undefined = dropEvent.item.data["originTeam"];
    const person: Person = dropEvent.item.data["person"];

    if (originTeam && person) {
      this.teamService.removePersonFromTeam(originTeam, person);
      this.personService.addAvailablePerson(person);
    }
  }


  protected onPersonDropped(person: Person) {
    this.removeFromAvailablePersons(person);
  }


  protected onClearTeams() {
    this.teamAssemblyService.resetTeams();
  }


  protected onFillTeams() {
    this.teamAssemblyService.assembleTeams();
  }


  protected onSortByName() {
    switch (this.personService.nameSortOrder()) {
      case "asc":
        this.personService.nameSortOrder.set("desc");
        break;

      case "desc":
        this.personService.nameSortOrder.set("asc");
        break;
    }
  }


  protected onSortByTimeSlot() {
    switch (this.personService.slotSortOrder()) {
      case "asc":
        this.personService.slotSortOrder.set("desc");
        break;

      case "desc":
        this.personService.slotSortOrder.set("asc");
        break;
    }
  }


  private removeFromAvailablePersons(person: Person) {
    this.personService.removeAvailablePerson(person);
  }


  protected onCreateFakeData() {
    this.timeSlotService.createFakeData();
    this.personService.createFakeData();
  }
}
