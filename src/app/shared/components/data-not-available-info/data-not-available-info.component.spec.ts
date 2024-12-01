import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DataNotAvailableInfoComponent} from './data-not-available-info.component';


describe('DataNotAvailableInfoComponent', () => {
  let component: DataNotAvailableInfoComponent;
  let fixture: ComponentFixture<DataNotAvailableInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataNotAvailableInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataNotAvailableInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
