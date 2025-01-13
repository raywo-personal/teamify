import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PreviewPersonListComponent} from './preview-person-list.component';


describe('PreviewPersonListComponent', () => {
  let component: PreviewPersonListComponent;
  let fixture: ComponentFixture<PreviewPersonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewPersonListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewPersonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
