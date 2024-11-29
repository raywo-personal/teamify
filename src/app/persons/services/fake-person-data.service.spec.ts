import {TestBed} from '@angular/core/testing';

import {FakePersonDataService} from './fake-person-data.service';


describe('FakePersonDataService', () => {
  let service: FakePersonDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakePersonDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
