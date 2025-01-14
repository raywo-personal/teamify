import {Directive, ElementRef, inject, OnDestroy, OnInit} from '@angular/core';
import {filter, Subscription} from 'rxjs';
import {NgControl} from '@angular/forms';


@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[setCustomValidity]'
})
export class SetCustomValidityDirective implements OnInit, OnDestroy {

  private elem = inject(ElementRef);
  private control = inject(NgControl);

  private subscription?: Subscription;


  public ngOnInit(): void {
    this.subscription = this.control.statusChanges?.subscribe(status => {
      this.setCustomValidity(status);
    });

    this.control.control!.events
      .pipe(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        filter((event: any) => event['touched'] !== undefined)
      )
      .subscribe(() => {
        this.setCustomValidity(this.control.status);
      });

    this.setCustomValidity(this.control.status);
  }


  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }


  private setCustomValidity(status: string | null) {
    const errors = JSON.stringify(this.control.errors);
    const nativeElement: HTMLInputElement = this.elem.nativeElement;
    nativeElement.setCustomValidity(status === 'INVALID' ? errors : '');
  }
}
