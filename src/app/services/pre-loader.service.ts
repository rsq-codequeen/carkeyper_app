import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreLoaderService {
private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() { }
  show(): void {
    this.loadingSubject.next(true);
  }

  /** Hides the loading screen */
  hide(): void {
    this.loadingSubject.next(false);
  }
}
