import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { CourseService } from "./lib/services/course-service";
import { AppConstants } from "./shared/constansts";
import { FlashMessagesModule, FlashMessagesService } from "angular2-flash-messages";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { DatepickerModule } from "ng2-datepicker";
import { CourseEditorComponent } from "./pages/course-editor/course-editor.component";
import { ManageStudentsComponent } from "./pages/manage-students/manage-students.component";
import { UserEditorComponent } from "./pages/resource-lists/user-editor/user-editor.component";
import { LoginComponent } from "./pages/login/login.component";
import { ResourceListsComponent } from "./pages/resource-lists/resource-lists.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { CourseReaderComponent } from "./pages/course-reader/course-reader.component";
import { LoadingInterceptor } from "./pages/loading.interceptor";
import { SpinnerComponent } from "./pages/spinner/spinner.component";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    FlashMessagesModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    DatepickerModule,
    FontAwesomeModule
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, CourseEditorComponent,
  ManageStudentsComponent, UserEditorComponent, LoginComponent, CourseEditorComponent,
  ResourceListsComponent, DashboardComponent, CourseReaderComponent, SpinnerComponent ],
  providers: [CourseService, AppConstants, FlashMessagesService, , {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {}
