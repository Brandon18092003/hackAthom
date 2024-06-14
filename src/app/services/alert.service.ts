import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private hasPinnedAlertSubject = new BehaviorSubject<boolean>(this.getPinnedAlertFromLocalStorage());

  get hasPinnedAlert$(): Observable<boolean> {
    return this.hasPinnedAlertSubject.asObservable();
  }

  setPinnedAlert(status: boolean): void {
    this.hasPinnedAlertSubject.next(status);
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('hasPinnedAlert', JSON.stringify(status));
    }
  }

  private getPinnedAlertFromLocalStorage(): boolean {
    if (this.isLocalStorageAvailable()) {
      const storedStatus = localStorage.getItem('hasPinnedAlert');
      return storedStatus ? JSON.parse(storedStatus) : false;
    }
    return false;
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}