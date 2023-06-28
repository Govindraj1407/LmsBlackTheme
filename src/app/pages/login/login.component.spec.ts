import { HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from 'src/lib/services/user-service';
import { HttpServiceMock } from 'src/lib/test-mocks/http.service';
import { RouterMock } from 'src/lib/test-mocks/routerMock';
import { AppConstants } from '../../shared/constansts';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers:[
        { provide: HttpClient, useClass: HttpServiceMock },
        { provide: Router, useClass: RouterMock },
        AppConstants, UserService, FlashMessagesService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
