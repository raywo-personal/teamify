import {Component} from '@angular/core';
import {TimeSlotListComponent} from './timeslots/components/time-slot-list/time-slot-list.component';


@Component({
  selector: 'app-root',
  imports: [
    TimeSlotListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Grouper';
}
