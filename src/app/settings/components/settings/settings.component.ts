import {Component} from '@angular/core';
import {ExportComponent} from '../export/export.component';


@Component({
  selector: 'app-settings',
  imports: [
    ExportComponent
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

}
