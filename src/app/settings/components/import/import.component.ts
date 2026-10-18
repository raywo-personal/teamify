import {Component, ElementRef, inject, signal, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ImportService} from '../../services/import.service';
import {Observable, of} from 'rxjs';
import {PreviewTimeSlotListComponent} from '../preview-time-slot-list/preview-time-slot-list.component';
import {AllData, ExportImportDataType, ExportImportType} from '../../models/export-import.model';
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

  protected importType = signal<ExportImportType>(null);
  protected file = signal<File | null>(null);
  protected fileType = signal<"json" | "txt" | null>(null);
  protected dropError = signal<"unsupported" | "invalidJSON" | "invalidFormat" | "empty" | null>(null);
  protected contentToImport: ExportImportDataType = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected contentToImport$ = signal<Observable<any[]>>(of([]));
  protected importStatus = signal<"none" | "complete">("none");


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


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onDragLeave(_: DragEvent) {
    this.dropZone.nativeElement.classList.remove("drag-over");
  }


  protected onDrop(dragEvent: DragEvent) {
    dragEvent.preventDefault();
    this.dropZone.nativeElement.classList.remove("drag-over");

    const types = dragEvent.dataTransfer?.types;
    const files = dragEvent.dataTransfer?.files;

    if (!types || !types.includes("Files") || !files || files.length != 1) {
      this.reset();
      this.dropError.set("unsupported");
      return;
    }

    this.handleFile(files[0])
  }


  protected onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.handleFile(target.files![0]);
  }


  protected onImport() {
    this.importService.importContent(this.importType(), this.contentToImport);
    this.reset();
    this.importStatus.set("complete");
    setTimeout(() => this.importStatus.set("none"), 5000);
  }


  protected reset() {
    this.file.set(null);
    this.fileType.set(null);
    this.importType.set(null);
    this.fileInput.nativeElement.value = null;
    this.contentToImport = [];
    this.dropError.set(null);
    this.importStatus.set("none");
  }


  private handleFile(file: File) {
    this.reset();

    if (file.type && !this.allowedFileTypes.includes(file.type)) {
      this.dropError.set("unsupported");
      return;
    }

    this.setFileTypeFromFile(file);
    this.file.set(file);

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    this.fileInput.nativeElement.files = dataTransfer.files;

    const reader = this.getFileReader();
    reader.readAsText(file);
  }


  private setFileTypeFromFile(file: File) {
    switch (file.type) {
      case "application/json":
        this.fileType.set("json");
        break;
      case "text/plain":
        this.fileType.set("txt");
        break;
      default:
        this.fileType.set(null);
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
      this.dropError.set("empty");
      return;
    }

    if (this.fileType() === "txt") {
      this.importType.set("persons");
      this.contentToImport$.set(of(this.importService.personsToImportFromTxt(data as string)));
      return;
    }

    if (this.fileType() === "json") {
      try {
        const json = JSON.parse(data as string);
        this.importType.set(this.importService.determineImportType(json));
        this.contentToImport = this.importService.contentToImportFromJson(json);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.contentToImport$.set(of(this.importType() === "all" ? (this.contentToImport as AllData).teams : (this.contentToImport as any[])));
      } catch (e) {
        if (e instanceof DataFormatError) {
          this.dropError.set("invalidFormat");
        } else {
          this.dropError.set("invalidJSON");
        }
      }
    }
  }


  protected readonly Observable = Observable;
}
