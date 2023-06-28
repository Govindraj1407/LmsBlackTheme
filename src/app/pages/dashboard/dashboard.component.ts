import { DatePipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { Course } from "src/app/lib/models/course";
import { User } from "src/app/lib/models/user";
import { CourseService } from "src/app/lib/services/course-service";

@Component({
  selector: "dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  courses: Course[] = []
  isStudent = false;
  isAdmin = false;
  title = "Instructor Dashboard";
  currentUser: User;
  @Input() showStudentDashboard = false;
  @Input() studentId;

  constructor(public courseService: CourseService, private router: Router, private flashMessage: FlashMessagesService) {}

  ngOnInit() {
   
    if(this.showStudentDashboard){
      this.isStudent = true;
      this.courseService.getUserCourses(this.studentId).subscribe((userCourses: Course[]) => {
        this.courses = userCourses;
      });
    }
    else{
      const user = JSON.parse(sessionStorage.getItem("user-session"));      
      if (user?.role === "Student") {
        this.currentUser = user;
        this.isStudent = true;
        this.getUserCourses(user.userId);
        this.title = "Student Dashboard";
      }
      else{
        if(user?.role === "Admin"){
          this.title = "Admin Dashboard";
        }
        this.getCourse();
      }
    }
  }
  getCourse(){
    this.courseService.getCourses().subscribe((userCourses: Course[]) => {
      this.courses = userCourses;
    });
  }

  getUserCourses(userId: string){
    this.courseService.getUserCourses(userId).subscribe((userCourses: Course[]) => {
      this.courses = userCourses;
    });
  }

  onDelete(courseId : string){
    this.courseService.deleteCourse(courseId).subscribe(() =>{
      this.flashMessage.show("Course deleted successfully", {cssClass: 'alert-success', timeout: 5000});
      this.ngOnInit();
    }, (error: HttpErrorResponse) => {
      this.flashMessage.show(error.message, {cssClass: 'alert-danger', timeout: 5000});
    });
  }

  onEdit(course : Course){
    this.router.navigate(["/courseeditor"], { state : {courseId: course.courseId}});
  }

  onOpen(course : Course){
    this.router.navigate(["/coursereader"], { state : {courseId: course.courseId, 
      userId: course.userId, userCourseId: course.userCourseId}});
  }
}
