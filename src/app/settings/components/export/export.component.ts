import {Component, inject} from '@angular/core';
import {PersistenceService} from '../../../shared/services/persistence.service';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';
import {TeamService} from '../../../teams/services/team.service';
import {AsyncPipe} from '@angular/common';
import {Team} from '../../../teams/models/team.model';


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

  private persistenceService = inject(PersistenceService);
  private teamService = inject(TeamService);

  protected teams$ = this.teamService.teams$;


  protected exportAllData() {
    const url = this.persistenceService.allDataExportURL();
    this.startDownload(url, "all-data.json");
  }


  protected exportTimeSlotData() {
    const url = this.persistenceService.slotsExportURL();
    this.startDownload(url, "timeslots.json");
  }


  protected exportKnowledgeData() {
    const url = this.persistenceService.knowledgeExportURL();
    this.startDownload(url, "knowledge.json");
  }


  protected exportAllPersonData() {
    const url = this.persistenceService.personsExportURL();
    this.startDownload(url, "all-persons.json");
  }


  protected exportTeamPersonData(team: Team) {
    const url = this.persistenceService.personsOfTeamExportURL(team);
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
