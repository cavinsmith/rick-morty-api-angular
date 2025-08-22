import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Toolbar } from './components/toolbar/toolbar';
import { selectLastError } from './store/selectors/error.selectors';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toolbar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  private snackBar = inject(MatSnackBar);
  private store = inject(Store);
  private destroy$ = new Subject<void>();
  lastError$ = this.store.select(selectLastError);

  ngOnInit(): void {
    this.lastError$.pipe(takeUntil(this.destroy$)).subscribe((error) => {
      if (error) {
        this.openSnackBar(error, 'Close');
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
