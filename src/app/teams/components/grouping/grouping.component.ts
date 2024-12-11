import {Component, inject} from '@angular/core';
import {AsyncPipe} from '@angular/common';
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
import {PersonSortButtonsComponent} from '../../../shared/components/person-sort-buttons/person-sort-buttons.component';
import {PersonSlotFilterComponent} from '../../../shared/components/person-slot-filter/person-slot-filter.component';
import {SearchFieldComponent} from '../../../shared/components/search-field/search-field.component';
import {map} from 'rxjs';


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
    RouterLink,
    DataNotAvailableViewComponent,
    DataNotAvailableInfoComponent,
    PersonSortButtonsComponent,
    PersonSlotFilterComponent,
    SearchFieldComponent
  ],
  templateUrl: './grouping.component.html',
  styleUrl: './grouping.component.scss'
})
export class GroupingComponent {

  private timeSlotService = inject(TimeSlotService);
  private personService = inject(PersonService);
  private teamService = inject(TeamService);
  private teamAssemblyService = inject(TeamAssemblyService);

  protected personsCount$ = this.personService.personCount$;
  protected filteredPersons$ = this.personService.filteredAvailablePersons$;
  protected filterSource$ = this.filteredPersons$
    .pipe(map(persons => persons.map(p => p.name)));
  protected teams$ = this.teamService.teams$;
  protected slotCount$ = this.timeSlotService.slotCount$;

  protected personFilter = this.personService.nameFilter;


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


  private removeFromAvailablePersons(person: Person) {
    this.personService.removeAvailablePerson(person);
  }


  protected onCreateFakeData() {
    this.timeSlotService.createFakeData();
    this.personService.createFakeData();
  }
}
