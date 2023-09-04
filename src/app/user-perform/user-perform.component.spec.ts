import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPerformComponent } from './user-perform.component';

describe('UserPerformComponent', () => {
  let component: UserPerformComponent;
  let fixture: ComponentFixture<UserPerformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPerformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPerformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
