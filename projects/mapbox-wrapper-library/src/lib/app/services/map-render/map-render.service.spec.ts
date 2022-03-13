import { TestBed } from '@angular/core/testing';

import { MapRenderService } from './map-render.service';
import {from} from "rxjs";

describe('MapRenderService', () => {
  let service: MapRenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapRenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
