import {Component, effect, inject, model} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {PersonService} from '../../../persons/services/person.service';
import {TeamViewComponent} from '../team-view/team-view.component';
import {TeamService} from '../../services/team.service';
import {PersonViewComponent} from '../../../persons/components/person-view/person-view.component';
import {CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Person} from '../../../persons/models/person.model';
import {TimeSlotService} from '../../../timeslots/services/time-slot.service';
import {FormsModule} from '@angular/forms';


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
    FormsModule
  ],
  templateUrl: './grouping.component.html',
  styleUrl: './grouping.component.scss'
})
export class GroupingComponent {

  private timeSlotService = inject(TimeSlotService);
  private personService = inject(PersonService);
  private teamService = inject(TeamService);

  protected persons$ = this.personService.persons$;
  protected teams$ = this.teamService.teams$;
  protected timeSlots$ = this.timeSlotService.slots$;

  protected availablePersons: Person[] = [];
  protected filteredPersons: Person[] = [];
  protected personFilter = model<string>("all");


  constructor() {
    this.persons$.subscribe(persons => {
      this.availablePersons = persons;
    });

    effect(() => {
      this.filterPersons(this.personFilter());
    });
  }


  protected onDrop(dropEvent: CdkDragDrop<Person[], any>) {
    if (dropEvent.previousContainer === dropEvent.container) {
      moveItemInArray(dropEvent.container.data, dropEvent.previousIndex, dropEvent.currentIndex);
    } else {
      transferArrayItem(dropEvent.previousContainer.data,
        dropEvent.container.data,
        dropEvent.previousIndex,
        dropEvent.currentIndex);
    }

    this.filterPersons(this.personFilter());
  }


  protected onClearTeams() {
    this.teamService.clearAllPersonsInTeams();
    this.availablePersons = [...this.personService.persons];
  }


  protected onFillTeams() {

  }


  protected onPersonDropped() {
    this.filterPersons(this.personFilter());
  }


  private filterPersons(filter: string) {
    if (filter === "all") {
      this.filteredPersons = [...this.availablePersons];
    } else {
      this.filteredPersons = this.availablePersons.filter(p => p.timeSlots.some(t => t.timeSlot.id === filter));
    }
  }
}
