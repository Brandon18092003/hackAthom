import { TestBed } from '@angular/core/testing';

import { MiembroService } from './miembro.service';

describe('MiembroService', () => {
  let service: MiembroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiembroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
