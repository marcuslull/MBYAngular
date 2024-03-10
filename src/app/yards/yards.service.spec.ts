import {TestBed} from '@angular/core/testing';

import {YardsService} from './yards.service';

describe('YardsService', () => {
  let service: YardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
