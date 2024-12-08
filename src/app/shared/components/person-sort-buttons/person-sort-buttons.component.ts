import {Component, inject} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import {PersonService} from '../../../persons/services/person.service';


@Component({
  selector: 'app-person-sort-buttons',
  imports: [
    NgTemplateOutlet
  ],
  templateUrl: './person-sort-buttons.component.html',
  styleUrl: './person-sort-buttons.component.scss'
})
export class PersonSortButtonsComponent {

  private personService = inject(PersonService);

  protected nameSortOrder = this.personService.nameSortOrder;
  protected slotSortOrder = this.personService.slotSortOrder;


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

}
