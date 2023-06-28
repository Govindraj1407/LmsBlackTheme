import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs-compat';
import { AppConstants } from 'src/app/shared/constansts';
import { CourseService } from 'src/lib/services/course-service';
import { HttpServiceMock } from 'src/lib/test-mocks/http.service';
import { RouterMock } from 'src/lib/test-mocks/routerMock';

import { CourseEditorComponent } from './course-editor.component';

describe('CourseEditorComponent', () => {
  let component: CourseEditorComponent;
  let fixture: ComponentFixture<CourseEditorComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseEditorComponent ],
      providers:[
        { provide: FormBuilder, useValue: formBuilder },
        { provide: HttpClient, useClass: HttpServiceMock },
        { provide: Router, useClass: RouterMock },
        CourseService,FlashMessagesService, AppConstants,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getCourse on getCourse call', () => {

    const getCourseSpy = spyOn(component, 'getCourse');

     // Act
     component.getCourse("cf28d5ea-1fb7-4b4a-a456-d9e08a4d1302");

      expect(getCourseSpy).toHaveBeenCalled();
  });

  it('should createCourse on onSubmit', () => {
    component.courseForm.controls['courseId'].setValue('test');
    component.courseForm.controls['courseName'].setValue('test');
    component.courseForm.controls['category'].setValue('Devops');
    component.courseForm.controls['status'].setValue('Active');    
    const createCourseSpy = spyOn(component.courseService, 'createCourse').and.returnValue(Observable.of(""));
    component.isEditMode = false;

     // Act
     component.onSubmit();

      expect(createCourseSpy).toHaveBeenCalled();
  });

  it('should updateCourse on onSubmit', () => {
    component.isEditMode = true;
    component.courseForm.controls['courseId'].setValue('1teste');
    component.courseForm.controls['courseName'].setValue('test');
    component.courseForm.controls['category'].setValue('Devops');
    component.courseForm.controls['status'].setValue('Active');
    const updateCourseSpy = spyOn(component.courseService, 'updateCourse').and.returnValue(Observable.of(""));

     // Act
     component.onSubmit();

      expect(updateCourseSpy).toHaveBeenCalled();
  });
});
