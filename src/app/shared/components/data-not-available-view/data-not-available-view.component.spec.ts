import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DataNotAvailableViewComponent} from './data-not-available-view.component';


describe('DataNotAvailableViewComponent', () => {
  let component: DataNotAvailableViewComponent;
  let fixture: ComponentFixture<DataNotAvailableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataNotAvailableViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataNotAvailableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
