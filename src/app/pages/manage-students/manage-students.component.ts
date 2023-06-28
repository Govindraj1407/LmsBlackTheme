import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AssignCourse, Course } from 'src/app/lib/models/course';
import { User } from 'src/app/lib/models/user';
import { CourseService } from 'src/app/lib/services/course-service';
import { UserService } from 'src/app/lib/services/user-service';

@Component({
  selector: 'managestudents',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.scss']
})
export class ManageStudentsComponent implements OnInit {
  users: User[] = [];
  students: User[] = [];
  studentId = "";
  dropdownList = [];
  dropdownSettings: IDropdownSettings = {};
  showAssignCourse = false;
  currentStudent: User;
  selectedCourse = [];

  constructor(public userService: UserService, public courseService: CourseService,
    private flashMessage: FlashMessagesService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      this.students = users.filter(x => x.role === "Student");
    });

    this.courseService.getCourses().subscribe((courses: Course[]) => {
      var courseList = []
      courses.forEach((course: Course) => {
        courseList.push({ item_id: course.courseId, item_text: course.courseName });
      });
      this.dropdownList = courseList;
      this.dropdownSettings = {
        idField: 'item_id',
        textField: 'item_text',
      };
    });
  }

  expandStudentDashboard(studentId: string) {
    this.studentId = studentId;
  }

  assignCourse(student: User) {
    this.currentStudent = student;
    this.showAssignCourse = true;
  }

  assignCourseToStudent() {
    this.courseService.getUserCourses(this.currentStudent.userId).subscribe((userCourses: Course[]) => {
      let alreadyAssignedCourse = "";
      this.selectedCourse.forEach((course) => {
        if (userCourses.filter(x => x.courseId === course.item_id).length > 0) {
          alreadyAssignedCourse = alreadyAssignedCourse === "" ? course.item_text :
            alreadyAssignedCourse + " ," + course.item_text;
        }
      })
      if (alreadyAssignedCourse.length > 0) {
        this.flashMessage.show(alreadyAssignedCourse + " are assigned already", { cssClass: 'alert-warning', timeout: 5000 });
      }
      else{
        this.assignCourseApiCall();
      }

    });

  }

  assignCourseApiCall() {
    let payload: AssignCourse[] = [];
    this.selectedCourse.forEach((course) => {
      payload.push({ courseId: course.item_id, userId: this.currentStudent.userId });
    });
    this.courseService.assignCourses(payload).subscribe(() => {
      this.flashMessage.show("Course assigned successfully", { cssClass: 'alert-success', timeout: 5000 });
      this.showAssignCourse = false;
      this.userService.getUsers().subscribe((users: User[]) => {
        this.users = users;
        this.students = users.filter(x => x.role === "Student");
      });
    }, (error: HttpErrorResponse) => {
      this.flashMessage.show(error.message, { cssClass: 'alert-danger', timeout: 5000 });
    });
  }

  open(course: Course) {
    this.router.navigate(["/courseeditor"], { state: { courseId: course.courseId } });
  }

}
