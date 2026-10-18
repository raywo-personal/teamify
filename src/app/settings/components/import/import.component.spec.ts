import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ImportComponent} from './import.component';
import {PersonService} from '../../../persons/services/person.service';
import {createPerson} from '../../../persons/models/person.model';


describe('ImportComponent', () => {
  let component: ImportComponent;
  let fixture: ComponentFixture<ImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should import the names of a txt file as persons', async () => {
    selectFile(new File(["Ada\nGrace\n"], "names.txt", {type: "text/plain"}));
    await vi.waitFor(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toContain("Grace");
    });

    importButton().click();

    const names = TestBed.inject(PersonService).persons.map(person => person.name);
    expect(names).toEqual(["Ada", "Grace"]);
  });

  it('should keep existing persons when a txt file holds only blank lines', async () => {
    const personService = TestBed.inject(PersonService);
    personService.addPerson(createPerson("Ada"));
    const reader = spyOnNextFileRead();

    selectFile(new File(["\n  \n\n"], "blank.txt", {type: "text/plain"}));
    await reader;
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain("Empty file");
    expect(importButton().disabled).toBe(true);

    importButton().click();

    expect(personService.persons.map(person => person.name)).toEqual(["Ada"]);
  });


  function selectFile(file: File) {
    const fileInput: HTMLInputElement = fixture.nativeElement.querySelector('input[type="file"]');
    Object.defineProperty(fileInput, "files", {value: [file], writable: true});
    fileInput.dispatchEvent(new Event("change"));
  }


  function importButton(): HTMLButtonElement {
    return Array.from<HTMLButtonElement>(fixture.nativeElement.querySelectorAll("button"))
      .find(button => button.textContent?.includes("Import data"))!;
  }


  function spyOnNextFileRead(): Promise<void> {
    return new Promise(resolve => {
      const readAsText = FileReader.prototype.readAsText;
      vi.spyOn(FileReader.prototype, "readAsText").mockImplementationOnce(function (this: FileReader, blob: Blob) {
        this.addEventListener("loadend", () => setTimeout(resolve));
        readAsText.call(this, blob);
      });
    });
  }
});
