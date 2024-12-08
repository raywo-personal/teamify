import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DataNotAvailableViewComponent} from './data-not-available-view.component';
import {ComponentRef} from '@angular/core';


describe('DataNotAvailableViewComponent', () => {
  let component: DataNotAvailableViewComponent;
  let componentRef: ComponentRef<DataNotAvailableViewComponent>;
  let fixture: ComponentFixture<DataNotAvailableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataNotAvailableViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataNotAvailableViewComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput("title", "test title");
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
