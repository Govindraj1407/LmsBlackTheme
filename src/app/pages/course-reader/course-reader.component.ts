import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Course, UserCourse } from 'src/app/lib/models/course';
import { CourseService } from 'src/app/lib/services/course-service';

@Component({
  selector: 'coursereader',
  templateUrl: './course-reader.component.html',
  styleUrls: ['./course-reader.component.scss']
})
export class CourseReaderComponent implements OnInit {
  course: Course;
  title = 'Course Reader';
  userId: string;
  userCourseId: string;
  safeSrc: SafeResourceUrl;
  constructor(private courseService: CourseService, private router: Router,
    private sanitizer: DomSanitizer, private flashMessage: FlashMessagesService) {
    if (this.router.getCurrentNavigation()?.extras?.state?.courseId) {
      this.getCourse(this.router.getCurrentNavigation()?.extras?.state?.courseId);
      this.userCourseId = this.router.getCurrentNavigation()?.extras?.state?.userCourseId;
      this.userId = this.router.getCurrentNavigation()?.extras?.state?.userId;
      this.router.getCurrentNavigation().extras = null;
    }

  }

  ngOnInit(): void {
  }

  getCourse(courseId: string) {
    this.courseService.getCourse(courseId).subscribe((course: Course) => {
      this.course = course;
      this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.course.link);
    });
  }

  oncomplete() {
    let course: UserCourse = {
      userId: this.userId,
      userCourseId: this.userCourseId, courseId: this.course.courseId, progress: 100, credits: 5, status: "Completed"
    };
    this.courseService.updateUserCourse(course).subscribe(() => {
      this.flashMessage.show("Course completed successfully", { cssClass: 'alert-success', timeout: 5000 });
      this.router.navigate(["/dashboard"]);
    }, (error: HttpErrorResponse) => {
      this.flashMessage.show(error.message, { cssClass: 'alert-danger', timeout: 5000 });
    });
  }

}
