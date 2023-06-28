import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs-compat';
import { AppConstants } from 'src/app/shared/constansts';
import { User } from 'src/lib/models/user';
import { CourseService } from 'src/lib/services/course-service';
import { UserService } from 'src/lib/services/user-service';
import { HttpServiceMock } from 'src/lib/test-mocks/http.service';
import { RouterMock } from 'src/lib/test-mocks/routerMock';

import { ResourceListsComponent } from './resource-lists.component';

describe('ResourceListsComponent', () => {
  let component: ResourceListsComponent;
  let fixture: ComponentFixture<ResourceListsComponent>;
  let users: User[] = [{
    userId: "1", name: "Govind", email: "govind.profile@gmail.com",
    phone: "602026", pin: "", state: "", city: "", role: "Student"
  }];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceListsComponent ],
      providers:[
        { provide: HttpClient, useClass: HttpServiceMock },
        { provide: Router, useClass: RouterMock },
        AppConstants, UserService, FlashMessagesService, CourseService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should call getUsers() when user is admin`, () => {
    // Arrange
    const userSpy = spyOn(component.userService, 'getUsers').and.returnValue(Observable.of(users));
    const store = {
      "user-session" : JSON.stringify({userId: "cf28d5ea-1fb7-4b4a-a456-d9e08a4d1302", role:"Admin"})
    };
    spyOn(sessionStorage, 'getItem').and.callFake((key) => {
      return store[key];
    });

    // Act
    component.ngOnInit();

    // Assert
    expect(userSpy).toHaveBeenCalled();
  });
});
