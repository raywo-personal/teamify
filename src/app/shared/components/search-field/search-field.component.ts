import {Component, effect, input, model, output, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, map, merge, Observable, OperatorFunction, Subject, switchMap} from 'rxjs';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-person-search',
  imports: [
    FormsModule,
    NgbTypeahead
  ],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.scss'
})
export class SearchFieldComponent {

  private focus$ = new Subject<string>();
  private click$ = new Subject<string>();

  @ViewChild('instance', {static: true})
  private instance!: NgbTypeahead;

  public source = input.required<Observable<string[]>>();
  public termUpdated = output<string>();

  protected searchTerm = model<string>("");

  protected search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopups$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;
    const persons$ = this.source();

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
