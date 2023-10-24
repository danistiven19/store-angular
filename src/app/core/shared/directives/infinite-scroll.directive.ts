import { AfterViewChecked, Directive, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]',
  host: {'(window:scroll)': 'track($event)'}
})
export class InfiniteScrollDirective {
  @Output() onScroll: EventEmitter<boolean> = new EventEmitter<boolean>();

  track($event: any) {
    if (!$event || !$event.srcElement) {
      return;
    }

    const baseElement = $event.srcElement.scrollingElement;
    const currentPosition = baseElement.scrollTop;
    const maxScrollHeight = baseElement.scrollHeight - baseElement.clientHeight;

    if (currentPosition >= maxScrollHeight) {
      this.onScroll.emit(true);
    }
  }
}
