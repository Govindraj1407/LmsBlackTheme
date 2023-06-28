import { Injectable } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class RouterMock {

  public routerState = {
    snapshot: {
      url: 'error=access_denied',
    },
  };
  public ne = new NavigationEnd(0, '/products/product-family', '/products/product-family');
  events = new Observable((observer) => {
    observer.next(this.ne);
    observer.complete();
  });
  navigate(value) {
  }

  getCurrentNavigation(value) {
    return {extras : {state : {courseId: "test"}}};
  }

}
