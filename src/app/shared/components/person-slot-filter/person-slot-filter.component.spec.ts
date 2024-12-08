import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonSlotFilterComponent} from './person-slot-filter.component';


describe('PersonSlotFilterComponent', () => {
  let component: PersonSlotFilterComponent;
  let fixture: ComponentFixture<PersonSlotFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonSlotFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonSlotFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
