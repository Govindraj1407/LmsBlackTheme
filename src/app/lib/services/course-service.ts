import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { AppConstants } from 'src/app/shared/constansts';
import { map } from 'rxjs/operators';
import { AssignCourse, Course, UserCourse } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {  

  constructor(private http: HttpClient,
              private appConstants: AppConstants) { }

  /**
   * Functionality to make an api call to get all courses
   * @returns - users
   */
   getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.appConstants.API_BASE_URL + `CourseWare`)
    .pipe(map(courses => {
      return courses;
    }));
 }

 /**
   * Functionality to make an api call to get course by course id
   * @returns - users
   */
  getCourse(courseId): Observable<Course> {
    return this.http.get<Course>(this.appConstants.API_BASE_URL + `CourseWare/${courseId}/`)
    .pipe(map(course => {
      return course;
    }));
 }

 /**
   * Functionality to make an api call to get user courses
   * @returns - users
   */
  getUserCourses(userId: string): Observable<Course[]> {
    return this.http.get<Course[]>(this.appConstants.API_BASE_URL + `User/${userId}/Courses`)
    .pipe(map(userCourses => {
      return userCourses;
    }));
 }

 /**
   * Functionality to make an api call to assign courses
   * @returns - users
   */
  assignCourses(payload: AssignCourse[]): Observable<string> {
    return this.http.post<string>(this.appConstants.API_BASE_URL + `UserCourse`, payload);
 }

 /**
   * Functionality to make an api call to assign courses
   * @returns - users
   */
  createCourse(payload: Course): Observable<string> {
    return this.http.post<string>(this.appConstants.API_BASE_URL + `CourseWare`, payload);
 }

 /**
   * Functionality to make an api call to assign courses
   * @returns - users
   */
  updateUserCourse(payload: UserCourse): Observable<string> {
    return this.http.put<string>(this.appConstants.API_BASE_URL + `UserCourse`, payload);
 }

 /**
   * Functionality to make an api call to assign courses
   * @returns - users
   */
  updateCourse(payload: Course): Observable<string> {
    return this.http.put<string>(this.appConstants.API_BASE_URL + `CourseWare`, payload);
 }

 /**
   * Functionality to make an api call to delete course
   * @returns - users
   */
  deleteCourse(courseId: string): Observable<string> {
    return this.http.delete<string>(this.appConstants.API_BASE_URL + `CourseWare/`+courseId);
 }
}
