import {Directive, effect, ElementRef, inject, input, OnInit, Renderer2} from '@angular/core';
import {NgModel} from '@angular/forms';


@Directive({
  selector: '[listMustNotBeEmpty]'
})
export class ListMustNotBeEmptyDirective implements OnInit {

  private element = inject(ElementRef);
  private renderer = inject(Renderer2);

  public listMustNotBeEmpty = input.required<any[]>();
  public referenceControl = input.required<NgModel>();
  public apply = input.required<boolean>();


  constructor() {
    effect(() => {
      const list = this.listMustNotBeEmpty();
      this.validate(list);
    });
  }


  public ngOnInit(): void {
    this.validate(this.listMustNotBeEmpty());
  }


  private validate(list: any[]) {
    if (!this.apply()) return;

    if (list.length === 0) {
      this.renderer.addClass(this.element.nativeElement, "border-danger");
      this.renderer.addClass(this.element.nativeElement, "invalid-list");
      this.referenceControl().control.setValue("");
      this.referenceControl().control.updateValueAndValidity();
    } else {
      this.renderer.removeClass(this.element.nativeElement, "border-danger");
      this.renderer.removeClass(this.element.nativeElement, "invalid-list");
      this.referenceControl().control.setValue("not empty");
      this.referenceControl().control.updateValueAndValidity();
    }
  }
}
