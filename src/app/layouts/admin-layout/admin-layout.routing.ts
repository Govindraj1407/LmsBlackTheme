import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { CourseEditorComponent } from "src/app/pages/course-editor/course-editor.component";
import { UserEditorComponent } from "src/app/pages/resource-lists/user-editor/user-editor.component";
import { ResourceListsComponent } from "src/app/pages/resource-lists/resource-lists.component";
import { ManageStudentsComponent } from "src/app/pages/manage-students/manage-students.component";
import { CourseReaderComponent } from "src/app/pages/course-reader/course-reader.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  // { path: "login", component: LoginComponent },
  {
    path: "courseeditor",
    component: CourseEditorComponent
  },
  {
    path: "usereditor",
    component: UserEditorComponent
  },
  {
    path: "resourcelists",
    component: ResourceListsComponent
  },
  {
    path: "managestudents",
    component: ManageStudentsComponent
  },
  { path: "coursereader", component: CourseReaderComponent },
  // { path: "rtl", component: RtlComponent }
];
