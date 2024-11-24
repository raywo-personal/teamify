import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHeaderBarComponent } from './add-header-bar.component';

describe('AddHeaderBarComponent', () => {
  let component: AddHeaderBarComponent;
  let fixture: ComponentFixture<AddHeaderBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHeaderBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHeaderBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
