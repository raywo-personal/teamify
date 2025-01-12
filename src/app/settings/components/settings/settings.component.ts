import {Component} from '@angular/core';
import {ExportComponent} from '../export/export.component';
import {ImportComponent} from "../import/import.component";


@Component({
  selector: 'app-settings',
  imports: [
    ExportComponent,
    ImportComponent
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

}
