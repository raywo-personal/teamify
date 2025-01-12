import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ImportService} from '../../services/import.service';


@Component({
  selector: 'app-import',
  imports: [
    FormsModule
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

  protected fileName: string = "";
  protected file: File | null = null;
  protected fileType: "json" | "txt" | null = null;
  protected dropError: "unsupported" | null = null;
  protected contentToImport: any[] = [];


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


  private reset() {
    this.file = null;
    this.fileType = null;
    this.fileInput.nativeElement.value = null;
    this.contentToImport = [];
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
    if (!data) return; // TODO Maybe better throw an error?

    if (this.fileType === "txt") {
      this.contentToImport = this.importService.namesToImport(data as string);
      return;
    }

    if (this.fileType === "json") {
      try {
        const json = JSON.parse(data as string);
        const importType = this.importService.determineImportType(json);
        this.contentToImport = json.persons;
        console.log(importType, json);
      } catch (e) {
        console.error("Error while parsing the file: ", e);
      }
    }
  }

}
