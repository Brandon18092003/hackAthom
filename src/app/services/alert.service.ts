import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private hasPinnedAlertSubject = new BehaviorSubject<boolean>(false);

  get hasPinnedAlert$(): Observable<boolean> {
    return this.hasPinnedAlertSubject.asObservable();
  }

  setPinnedAlert(status: boolean): void {
    this.hasPinnedAlertSubject.next(status);
  }

}
