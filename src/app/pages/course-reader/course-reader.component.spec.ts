import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CourseService } from 'src/lib/services/course-service';
import { HttpServiceMock } from 'src/lib/test-mocks/http.service';
import { RouterMock } from 'src/lib/test-mocks/routerMock';
import { AppConstants } from '../shared/constansts';

import { CourseReaderComponent } from './course-reader.component';

describe('CourseReaderComponent', () => {
  let component: CourseReaderComponent;
  let fixture: ComponentFixture<CourseReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseReaderComponent ],
      providers: [{ provide: HttpClient, useClass: HttpServiceMock },
        { provide: Router, useClass: RouterMock },
        CourseService,FlashMessagesService, AppConstants,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseReaderComponent);
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
});
