import {TestBed} from '@angular/core/testing';

import {TeamAssemblyService} from './team-assembly.service';


describe('TeamAssemblyService', () => {
  let service: TeamAssemblyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamAssemblyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
