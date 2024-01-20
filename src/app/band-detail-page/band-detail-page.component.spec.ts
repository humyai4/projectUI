import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandDetailPageComponent } from './band-detail-page.component';

describe('BandDetailPageComponent', () => {
  let component: BandDetailPageComponent;
  let fixture: ComponentFixture<BandDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandDetailPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BandDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
