import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactBandComponent } from './contact-band.component';

describe('ContactBandComponent', () => {
  let component: ContactBandComponent;
  let fixture: ComponentFixture<ContactBandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactBandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
