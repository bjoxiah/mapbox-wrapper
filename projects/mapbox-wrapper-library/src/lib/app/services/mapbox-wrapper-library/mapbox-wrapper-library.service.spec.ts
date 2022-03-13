import { TestBed } from '@angular/core/testing';

import { MapboxWrapperLibraryService } from './mapbox-wrapper-library.service';

describe('MapboxWrapperLibraryService', () => {
  let service: MapboxWrapperLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapboxWrapperLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
