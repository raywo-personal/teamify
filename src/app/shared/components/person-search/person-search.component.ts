import {Component, effect, input, model, output, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, map, merge, Observable, OperatorFunction, Subject, switchMap} from 'rxjs';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Person} from '../../../persons/models/person.model';


@Component({
  selector: 'app-person-search',
  imports: [
    FormsModule,
    NgbTypeahead
  ],
  templateUrl: './person-search.component.html',
  styleUrl: './person-search.component.scss'
})
export class PersonSearchComponent {

  private focus$ = new Subject<string>();
  private click$ = new Subject<string>();

  @ViewChild('instance', {static: true})
  private instance!: NgbTypeahead;

  // TODO: Make this an Observable<string[]>!
  public persons = input.required<Observable<Person[]>>();
  public termUpdated = output<string>();

  protected searchTerm = model<string>("");

  protected search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopups$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;
    const persons$ = this.persons().pipe(map((persons) => persons.map((p) => p.name)));

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopups$).pipe(
      switchMap(term => {
        return persons$.pipe(
          map((persons) => {
            if (term === '') {
              return persons.slice(0, 10)
            } else {
              return persons
                .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
                .slice(0, 10)
            }
          })
        );
      })
    );
  };


  constructor() {
    effect(() => {
      const term = this.searchTerm();
      this.termUpdated.emit(term);
    })
  }


  protected onFocus(event: any) {
    this.focus$.next(event.target.value);
  }


  protected onClick(event: MouseEvent) {
    const target = event.target as HTMLInputElement;
    this.click$.next(target.value)
  }
}
