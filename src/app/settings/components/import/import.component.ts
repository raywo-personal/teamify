import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ImportService} from '../../services/import.service';
import {Observable, of} from 'rxjs';
import {PreviewTimeSlotListComponent} from '../preview-time-slot-list/preview-time-slot-list.component';
import {ExportImportType} from '../../models/export-import.model';
import {DataFormatError} from '../../../shared/helper/DataFormatError';
import {PreviewPersonListComponent} from '../preview-person-list/preview-person-list.component';
import {PreviewPriorKnowledgeListComponent} from '../preview-prior-knowledge-list/preview-prior-knowledge-list.component';
import {PreviewTeamListComponent} from '../preview-team-list/preview-team-list.component';


@Component({
  selector: 'app-import',
  imports: [
    FormsModule,
    PreviewTimeSlotListComponent,
    PreviewPersonListComponent,
    PreviewPriorKnowledgeListComponent,
    PreviewTeamListComponent
  ],
  templateUrl: './import.component.html',
  styleUrl: './import.component.scss'
})
export class ImportComponent {

  private importService = inject(ImportService);

  @ViewChild("dropZone")
  private readonly dropZone!: ElementRef;
  @ViewChild("fileInput")
  private readonly fileInput!: ElementRef;

  protected readonly allowedFileTypes = ["application/json", "text/plain"];

  protected importType: ExportImportType = null;
  protected file: File | null = null;
  protected fileType: "json" | "txt" | null = null;
  protected dropError: "unsupported" | "invalidJSON" | "invalidFormat" | "empty" | null = null;
  protected contentToImport: any[] = [];
  protected contentToImport$: Observable<any[]> = of([]);


  protected get importTypeName(): string {
    switch (this.importType) {
      case "all":
        return "complete data set";
      case "timeslots":
        return "time slots";
      case "prior-knowledge":
        return "prior knowledge";
      case "persons":
        return "persons";
      default:
        return "";
    }
  }


  protected onDragOver(dragEvent: DragEvent) {
    dragEvent.preventDefault();

    const dataTransfer = dragEvent.dataTransfer;

    if (!dataTransfer) return;

    const types = dataTransfer?.types;

    if (types && types.includes("Files")) {
      dataTransfer.dropEffect = "copy";
      this.dropZone.nativeElement.classList.add("drag-over");
    } else {
      dataTransfer.dropEffect = "none";
      this.dropZone.nativeElement.classList.remove("drag-over");
    }
  }


  protected onDragLeave(dragEvent: DragEvent) {
    this.dropZone.nativeElement.classList.remove("drag-over");
  }


  protected onDrop(dragEvent: DragEvent) {
    dragEvent.preventDefault();
    this.dropZone.nativeElement.classList.remove("drag-over");

    const types = dragEvent.dataTransfer?.types;
    const files = dragEvent.dataTransfer?.files;

    if (!types || !types.includes("Files") || !files || files.length != 1) {
      this.reset();
      this.dropError = "unsupported";
      return;
    }

    this.handleFile(files[0])
  }


  protected onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.handleFile(target.files![0]);
  }


  protected reset() {
    this.file = null;
    this.fileType = null;
    this.importType = null;
    this.fileInput.nativeElement.value = null;
    this.contentToImport = [];
    this.dropError = null;
  }


  private handleFile(file: File) {
    this.reset();

    if (file.type && !this.allowedFileTypes.includes(file.type)) {
      this.dropError = "unsupported";
      return;
    }

    this.setFileTypeFromFile(file);
    this.file = file;

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    this.fileInput.nativeElement.files = dataTransfer.files;

    const reader = this.getFileReader();
    reader.readAsText(this.file);
  }


  private setFileTypeFromFile(file: File) {
    switch (file.type) {
      case "application/json":
        this.fileType = "json";
        break;
      case "text/plain":
        this.fileType = "txt";
        break;
      default:
        this.fileType = null;
    }
  }


  private getFileReader(): FileReader {
    const reader = new FileReader();

    reader.onload = () => {
      const data = reader.result;
      this.handleReadData(data as string | undefined);
    };

    return reader;
  }


  private handleReadData(data: string | undefined) {
    if (!data) {
      this.dropError = "empty";
      return;
    }

    if (this.fileType === "txt") {
      this.importType = "persons";
      this.contentToImport$ = of(this.importService.personsToImportFromTxt(data as string));
      return;
    }

    if (this.fileType === "json") {
      try {
        const json = JSON.parse(data as string);
        this.importType = this.importService.determineImportType(json);
        this.contentToImport = this.importService.contentToImportFromJson(json);
        this.contentToImport$ = of(this.contentToImport);
        console.log(this.importType, json);
      } catch (e) {
        console.error(e);
        if (e instanceof DataFormatError) {
          this.dropError = "invalidFormat";
        } else {
          this.dropError = "invalidJSON";
        }
      }
    }
  }

}
