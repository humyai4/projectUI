import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FineBandComponent } from './fine-band.component';

describe('FineBandComponent', () => {
  let component: FineBandComponent;
  let fixture: ComponentFixture<FineBandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FineBandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FineBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
