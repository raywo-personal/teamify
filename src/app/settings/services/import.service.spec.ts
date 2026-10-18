import {TestBed} from '@angular/core/testing';

import {ImportService} from './import.service';


describe('ImportService', () => {
  let service: ImportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should skip blank lines and trim names when reading a txt file', () => {
    const persons = service.personsToImportFromTxt("Ada\r\n\r\n  Grace  \n   \nLinus\n");

    expect(persons.map(person => person.name)).toEqual(["Ada", "Grace", "Linus"]);
  });
});
