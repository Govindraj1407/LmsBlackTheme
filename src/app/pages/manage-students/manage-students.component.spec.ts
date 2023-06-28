import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs-compat';
import { AppConstants } from 'src/app/shared/constansts';
import { Course } from 'src/lib/models/course';
import { User } from 'src/lib/models/user';
import { CourseService } from 'src/lib/services/course-service';
import { UserService } from 'src/lib/services/user-service';
import { HttpServiceMock } from 'src/lib/test-mocks/http.service';
import { RouterMock } from 'src/lib/test-mocks/routerMock';

import { ManageStudentsComponent } from './manage-students.component';

describe('ManageStudentsComponent', () => {
  let component: ManageStudentsComponent;
  let fixture: ComponentFixture<ManageStudentsComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let users: User[] = [{
    userId: "1", name: "Govind", email: "govind.profile@gmail.com",
    phone: "602026", pin: "", state: "", city: "", role: "Student"
  }];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageStudentsComponent],
      providers: [
        { provide: HttpClient, useClass: HttpServiceMock },
        { provide: Router, useClass: RouterMock },
        { provide: FormBuilder, useValue: formBuilder },
        AppConstants, UserService, FlashMessagesService, CourseService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should getUsers and getCourses on onngInit()', () => {
    
    let courses: Course[] = [{
      courseId: "1", userCourseId: "2", courseName: "AWS", category: "", courseContent: "",
      subTopics: "", link: "", userId: "", userName: "", credits: 0, progress: 0,
      status: "", dueDate: "", studentCount: 0,
    }];
    const getUsersSpy = spyOn(component.userService, 'getUsers').and.returnValue(Observable.of(users));
    const getCoursesSpy = spyOn(component.courseService, 'getCourses').and.returnValue(Observable.of(courses));

    // Act
    component.ngOnInit();

    expect(getCoursesSpy).toHaveBeenCalled();
    expect(getUsersSpy).toHaveBeenCalled();
    expect(component.users.length).toBe(1);
    expect(component.students.length).toBe(1);
    expect(component.dropdownList.length).toBe(1);
  });

  // it('should getUserCourses on assignCourseToStudent()', () => {
  //   component.currentStudent = users[0];
  //   const getUserCoursesSpy = spyOn(component.courseService, 'getUserCourses').and.returnValue(Observable.of([]));
  //   const assignCoursesSpy = spyOn(component.courseService, 'assignCourses').and.returnValue(Observable.of(""));

  //   // Act
  //   component.assignCourseToStudent();

  //   expect(getUserCoursesSpy).toHaveBeenCalled();
  //   expect(assignCoursesSpy).toHaveBeenCalled();
  // });
});
