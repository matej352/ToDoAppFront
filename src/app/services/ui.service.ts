import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showTaskAdd: boolean = false; //inicijalno je false
  private subject = new Subject<any>();

  constructor() { }

  changeShowTaskAdd(): void {
    this.showTaskAdd = !this.showTaskAdd;
    this.subject.next(this.showTaskAdd);
  }

  onChange(): Observable<any> {
    return this.subject.asObservable();
  }
}
