import { TestBed } from '@angular/core/testing';

import { PriorKnowledgeService } from './prior-knowledge.service';

describe('PriorKnowledgeService', () => {
  let service: PriorKnowledgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriorKnowledgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
