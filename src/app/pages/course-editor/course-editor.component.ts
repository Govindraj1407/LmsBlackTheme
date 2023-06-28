import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Course } from 'src/app/lib/models/course';
import { CourseService } from 'src/app/lib/services/course-service';

@Component({
  selector: 'courseeditor',
  templateUrl: './course-editor.component.html',
  styleUrls: ['./course-editor.component.scss']
})
export class CourseEditorComponent implements OnInit {
  course: Course;
  title = "Add course";
  isEditMode = false;
  isSubmitted = false;
  courseForm = this.formBuilder.group({
    courseId: '',
    courseName: ['', Validators.required],
    category: ['', Validators.required],
    courseContent: '',
    subTopics: '',
    link: '',
    status: ['', Validators.required],
    dueDate: [new Date()]    
  });

  constructor( private formBuilder: FormBuilder, public courseService: CourseService,
    private flashMessage: FlashMessagesService, private router: Router) { 
      if(this.router.getCurrentNavigation()?.extras?.state?.courseId){
        this.isEditMode = true;
        this.title = "Edit course";
        this.getCourse(this.router.getCurrentNavigation()?.extras?.state?.courseId);
        this.router.getCurrentNavigation().extras = null;
      }
    }

  ngOnInit(): void {
  }

  getCourse(courseId:string){
    this.courseService.getCourse(courseId).subscribe((courses: Course) => {
      this.course = courses;
      this.courseForm.setValue({
        courseId : this.course.courseId,
        courseName: this.course.courseName,
        category: this.course.category,
        courseContent: this.course.courseContent,
        subTopics: this.course.subTopics,
        link: this.course.link,
        status: this.course.status,
        dueDate: this.course.dueDate 
      })
    });
  }

  
  categories = ['DevOps', 'DotNet', 'Database', 'FrontEnd'];
  statuses = ['Active', 'Inactive'];

  submitted = false;

  onSubmit() { 
    this.isSubmitted = true;
    if(this.courseForm.valid){     
      if(this.isEditMode){
        this.courseService.updateCourse(this.courseForm.getRawValue()).subscribe(() =>{
          // this.flashMessage.show("Course updated successfully", {cssClass: 'alert-success', timeout: 5000});
          this.router.navigate(["/dashboard"]);
        }, (error: HttpErrorResponse) => {
          this.flashMessage.show(error.message, {cssClass: 'alert-danger', timeout: 5000});
        });
  
      }
      else{
        this.courseService.createCourse(this.courseForm.getRawValue()).subscribe(() =>{
          // this.flashMessage.show("Course created successfully", {cssClass: 'alert-success', timeout: 5000});
          this.router.navigate(["/dashboard"]);
        }, (error: HttpErrorResponse) => {
          this.flashMessage.show(error.message, {cssClass: 'alert-danger', timeout: 5000});
        });
      }   
    }     
  }
}
