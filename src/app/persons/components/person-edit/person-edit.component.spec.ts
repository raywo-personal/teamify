import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonEditComponent } from './person-edit.component';
import {provideRouter} from '@angular/router';

describe('PersonEditComponent', () => {
  let component: PersonEditComponent;
  let fixture: ComponentFixture<PersonEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonEditComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
