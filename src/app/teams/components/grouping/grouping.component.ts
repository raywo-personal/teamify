import {Component, effect, inject, model, signal} from '@angular/core';
import {AsyncPipe, NgTemplateOutlet} from '@angular/common';
import {PersonService} from '../../../persons/services/person.service';
import {TeamViewComponent} from '../team-view/team-view.component';
import {TeamService} from '../../services/team.service';
import {PersonViewComponent} from '../../../persons/components/person-view/person-view.component';
import {CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Person} from '../../../persons/models/person.model';
import {TimeSlotService} from '../../../timeslots/services/time-slot.service';
import {FormsModule} from '@angular/forms';
import {SortOrder, stringCompare, timeCompare} from '../../../shared/helper/comparison';
import {RouterLink} from "@angular/router";
import {DataNotAvailableViewComponent} from '../../../shared/components/data-not-available-view/data-not-available-view.component';
import {DataNotAvailableInfoComponent} from '../../../shared/components/data-not-available-info/data-not-available-info.component';
import {TeamAssemblyService} from '../../services/team-assembly.service';


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
  protected teams$ = this.teamService.teams$;
  protected timeSlots$ = this.timeSlotService.slots$;
  protected slotCount$ = this.timeSlotService.slotCount$;

  // TODO: Move to persons service.
  protected availablePersons: Person[] = [];
  protected filteredPersons: Person[] = [];
  protected personFilter = model<string>("all");
  protected nameSortOrder = signal<SortOrder>("asc");
  protected slotSortOrder = signal<SortOrder>("asc");


  constructor() {
    this.persons$.subscribe(persons => {
      this.availablePersons = persons;
      this.sortAvailablePersons(this.nameSortOrder(), this.slotSortOrder());
      this.filterPersons(this.personFilter());
    });

    effect(() => {
      const filter = this.personFilter();
      this.filterPersons(filter);
    });

    effect(() => {
      const nameSortOrder = this.nameSortOrder();
      const slotSortOrder = this.slotSortOrder();
      this.sortAvailablePersons(nameSortOrder, slotSortOrder);
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

      const person = dropEvent.item.data;
      this.availablePersons.push(person);
      this.sortAvailablePersons(this.nameSortOrder(), this.slotSortOrder());
    }

    this.filterPersons(this.personFilter());
  }


  protected onPersonDropped(person: Person) {
    this.removeFromAvailablePersons(person);
    this.sortAvailablePersons(this.nameSortOrder(), this.slotSortOrder());
    this.filterPersons(this.personFilter());
  }


  protected onClearTeams() {
    this.teamService.clearAllPersonsInTeams();
    this.availablePersons = [...this.personService.persons];
  }


  protected onFillTeams() {
    this.teamAssemblyService.assembleTeams();
  }


  protected onSortByName() {
    switch (this.nameSortOrder()) {
      case "asc":
        this.nameSortOrder.set("desc");
        break;

      case "desc":
        this.nameSortOrder.set("asc");
        break;
    }
  }


  protected onSortByTimeSlot() {
    switch (this.slotSortOrder()) {
      case "asc":
        this.slotSortOrder.set("desc");
        break;

      case "desc":
        this.slotSortOrder.set("asc");
        break;
    }
  }


  private removeFromAvailablePersons(person: Person) {
    this.availablePersons = this.availablePersons.filter(p => p.id !== person.id);
  }


  private sortAvailablePersons(nameSortOrder: SortOrder,
                               slotSortOrder: SortOrder) {
    this.availablePersons.sort((a, b) => {
      const aEarliestStart = this.personService.earliestStartTime(a);
      const bEarliestStart = this.personService.earliestStartTime(b);

      let slotComparison = timeCompare(
        aEarliestStart,
        bEarliestStart,
        slotSortOrder
      );

      if (slotComparison !== 0) {
        return slotComparison;
      }

      return stringCompare(a.name, b.name, nameSortOrder);
    });

    this.filterPersons(this.personFilter());
  }


  private filterPersons(filter: string) {
    if (filter === "all") {
      this.filteredPersons = [...this.availablePersons];
    } else {
      this.filteredPersons = this.availablePersons.filter(p => p.timeSlots.some(t => t.timeSlot.id === filter));
    }
  }


  protected onCreateFakeData() {
    this.timeSlotService.createFakeData();
    this.personService.createFakeData();
    // this.availablePersons = [...this.personService.persons];
    // this.filterPersons(this.personFilter());
  }
}
