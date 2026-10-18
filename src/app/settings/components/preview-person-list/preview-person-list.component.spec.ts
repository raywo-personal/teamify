import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PreviewPersonListComponent} from './preview-person-list.component';
import {of} from 'rxjs';


describe('PreviewPersonListComponent', () => {
  let component: PreviewPersonListComponent;
  let fixture: ComponentFixture<PreviewPersonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewPersonListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewPersonListComponent);
    fixture.componentRef.setInput('persons$', of([]));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
