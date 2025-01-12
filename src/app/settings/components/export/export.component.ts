import {Component, inject} from '@angular/core';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';
import {TeamService} from '../../../teams/services/team.service';
import {AsyncPipe} from '@angular/common';
import {Team} from '../../../teams/models/team.model';
import {ExportService} from "../../services/export.service";


@Component({
  selector: 'app-export',
  imports: [
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgbDropdownItem,
    AsyncPipe
  ],
  templateUrl: './export.component.html',
  styleUrl: './export.component.scss'
})
export class ExportComponent {

  private exportService = inject(ExportService);
  private teamService = inject(TeamService);

  protected teams$ = this.teamService.teams$;


  protected exportAllData() {
    const url = this.exportService.allDataExportURL();
    this.startDownload(url, "all-data.json");
  }


  protected exportTimeSlotData() {
    const url = this.exportService.slotsExportURL();
    this.startDownload(url, "timeslots.json");
  }


  protected exportKnowledgeData() {
    const url = this.exportService.knowledgeExportURL();
    this.startDownload(url, "knowledge.json");
  }


  protected exportAllPersonData() {
    const url = this.exportService.personsExportURL();
    this.startDownload(url, "all-persons.json");
  }


  protected exportTeamPersonData(team: Team) {
    const url = this.exportService.personsOfTeamExportURL(team);
    this.startDownload(url, `${this.nameForTeam(team)}-persons.json`);
  }


  protected nameForTeam(team: Team) {
    return team.name || team.timeSlot.description;
  }


  private startDownload(url: string, filename: string) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  }
}
