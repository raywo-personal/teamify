import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddHeaderBarComponent} from './add-header-bar.component';
import {ComponentRef} from '@angular/core';


describe('AddHeaderBarComponent', () => {
  let component: AddHeaderBarComponent;
  let componentRef: ComponentRef<AddHeaderBarComponent>;
  let fixture: ComponentFixture<AddHeaderBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHeaderBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHeaderBarComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput("caption", "Test");
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
