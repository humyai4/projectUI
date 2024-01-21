import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactToMeComponent } from './contact-to-me.component';

describe('ContactToMeComponent', () => {
  let component: ContactToMeComponent;
  let fixture: ComponentFixture<ContactToMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactToMeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactToMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
