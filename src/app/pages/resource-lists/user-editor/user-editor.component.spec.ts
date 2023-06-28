import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs-compat';
import { AppConstants } from 'src/app/shared/constansts';
import { CourseService } from 'src/lib/services/course-service';
import { UserService } from 'src/lib/services/user-service';
import { HttpServiceMock } from 'src/lib/test-mocks/http.service';
import { RouterMock } from 'src/lib/test-mocks/routerMock';

import { UserEditorComponent } from './user-editor.component';

describe('UserEditorComponent', () => {
  let component: UserEditorComponent;
  let fixture: ComponentFixture<UserEditorComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEditorComponent ],
      providers:[
        { provide: HttpClient, useClass: HttpServiceMock },
        { provide: Router, useClass: RouterMock },
        { provide: FormBuilder, useValue: formBuilder },
        AppConstants, UserService, FlashMessagesService, CourseService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should createUser on onSubmit', () => {
    component.userForm.controls['name'].setValue('test');
    component.userForm.controls['role'].setValue('test');
    component.userForm.controls['phone'].setValue('9972728683');
    component.userForm.controls['email'].setValue('test@email.com');    
    const createUserSpy = spyOn(component.userService, 'createUser').and.returnValue(Observable.of(""));
    component.isEditMode = false;

     // Act
     component.onSubmit();

      expect(createUserSpy).toHaveBeenCalled();
  });

  it('should updateCourse on onSubmit', () => {
    component.isEditMode = true;
    component.userForm.controls['name'].setValue('test');
    component.userForm.controls['role'].setValue('test');
    component.userForm.controls['phone'].setValue('9972728683');
    component.userForm.controls['email'].setValue('test@email.com');    
    const updateUserSpy = spyOn(component.userService, 'updateUser').and.returnValue(Observable.of(""));

     // Act
     component.onSubmit();

      expect(updateUserSpy).toHaveBeenCalled();
  });
});
