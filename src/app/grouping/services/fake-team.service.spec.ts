import {TestBed} from '@angular/core/testing';

import {FakeTeamService} from './fake-team.service';


describe('FakeTeamService', () => {
  let service: FakeTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
