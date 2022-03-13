import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapboxWrapperLibraryComponent } from './mapbox-wrapper-library.component';

describe('MapboxWrapperLibraryComponent', () => {
  let component: MapboxWrapperLibraryComponent;
  let fixture: ComponentFixture<MapboxWrapperLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapboxWrapperLibraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapboxWrapperLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
