import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddButtonComponent} from './add-button.component';


describe('AddButtonComponent', () => {
  let component: AddButtonComponent;
  let fixture: ComponentFixture<AddButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddButtonComponent);
    fixture.componentRef.setInput('caption', 'Add');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
