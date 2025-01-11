import {Component, inject} from '@angular/core';
import {PersistenceService} from '../../../shared/services/persistence.service';


@Component({
  selector: 'app-export',
  imports: [],
  templateUrl: './export.component.html',
  styleUrl: './export.component.scss'
})
export class ExportComponent {

  private persistenceService = inject(PersistenceService);


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


  private startDownload(url: string, filename: string) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  }
}
