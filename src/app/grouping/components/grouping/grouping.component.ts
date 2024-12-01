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


type SortOrder = "asc" | "desc" | "none";

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
    NgTemplateOutlet
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
      const aSlotDescription = a.timeSlots
        .filter(s => s.priority === 1)
        .map(s => s.timeSlot.description)
        .reduce((smallest, current) => {
          return smallest.localeCompare(current) < 0 ? smallest : current
        });

      const bSlotDescription = b.timeSlots
        .filter(s => s.priority === 1)
        .map(s => s.timeSlot.description)
        .reduce((smallest, current) => {
          return smallest.localeCompare(current) < 0 ? smallest : current
        });

      let slotComparison = 0;

      if (slotSortOrder === "asc") {
        slotComparison = aSlotDescription.localeCompare(bSlotDescription);
      } else if (slotSortOrder === "desc") {
        slotComparison = bSlotDescription.localeCompare(aSlotDescription);
      }

      if (slotComparison === 0) {
        if (nameSortOrder === "asc") {
          slotComparison = a.name.localeCompare(b.name);
        } else if (nameSortOrder === "desc") {
          slotComparison = b.name.localeCompare(a.name);
        }
      }

      return slotComparison;
    });
  }


  private filterPersons(filter: string) {
    if (filter === "all") {
      this.filteredPersons = [...this.availablePersons];
    } else {
      this.filteredPersons = this.availablePersons.filter(p => p.timeSlots.some(t => t.timeSlot.id === filter));
    }
  }
}
