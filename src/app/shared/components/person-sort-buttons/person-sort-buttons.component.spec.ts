import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonSortButtonsComponent} from './person-sort-buttons.component';


describe('PersonSortButtonsComponent', () => {
  let component: PersonSortButtonsComponent;
  let fixture: ComponentFixture<PersonSortButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonSortButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonSortButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
