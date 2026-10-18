import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchFieldComponent} from './search-field.component';
import {of} from 'rxjs';


describe('PersonSearchComponent', () => {
  let component: SearchFieldComponent;
  let fixture: ComponentFixture<SearchFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFieldComponent);
    fixture.componentRef.setInput('source', of([]));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
