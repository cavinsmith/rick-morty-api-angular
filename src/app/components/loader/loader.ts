import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Portal } from '../portal/portal';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [AsyncPipe, Portal],
  template: `
    @if (waitfor | async; as data) {
      @if (data !== null && data !== undefined) {
        <ng-content></ng-content>
      } @else {
        <app-portal></app-portal>
      }
    } @else {
      <app-portal></app-portal>
    }
  `,
})
export class Loader {
  @Input() waitfor!: Observable<any>;
  @Input() size = 300;
}
