import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';


@Injectable()
export class HttpServiceMock {

  constructor() { }

  getCall(url: string) {
    return Observable.of('ddd');
  }

  postCall(url: string, data: any): Observable<any> {
    return Observable.of('jwt');
  }

  get(url: string) {
    return Observable.of([1, 2, 3]);
  }

  post(url: string, data: any): Observable<any> {
    return Observable.of([1, 2, 3]);
  }
  put(url: string, data: any): Observable<any> {
    return Observable.of([1, 2, 3]);
  }

  delete(url: string, data: any): Observable<any> {
    return Observable.of(['success']);
  }

  patch(url: string, data: any): Observable<any> {
    return Observable.of(true);
  }
}
