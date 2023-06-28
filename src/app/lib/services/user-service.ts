import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AppConstants } from 'src/app/shared/constansts';
import { User } from '../models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private appConstants: AppConstants) { }

  /**
   * Functionality to make an api call to get all users
   * @returns - users
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.appConstants.API_BASE_URL + `User`)
      .pipe(map(users => {
        // here return your pattern
        return users;
      }));
  }

  /**
   * Functionality to make an api call to get user by user id
   * @returns - users
   */
   getUser(userId): Observable<User> {
    return this.http.get<User>(this.appConstants.API_BASE_URL + `User/${userId}/`)
    .pipe(map(user => {
      return user;
    }));
 }

  /**
   * Functionality to verify user
   * @returns - users
   */
   verifyUser(userName: string, password: string): Observable<any> {
     return this.http.get<User>(this.appConstants.API_BASE_URL + `User/Verify?username=${userName}&password=${password}`)
       .pipe(map(user => {
         return user;
       }));
  }

  /**
   * Functionality to make an api call to assign users
   * @returns - users
   */
   createUser(payload: User): Observable<string> {
    return this.http.post<string>(this.appConstants.API_BASE_URL + `User`, payload);
 }

 /**
   * Functionality to make an api call to assign users
   * @returns - users
   */
  updateUser(payload: User): Observable<string> {
    return this.http.put<string>(this.appConstants.API_BASE_URL + `User`, payload);
 }

 /**
   * Functionality to make an api call to delete user
   * @returns - users
   */
  deleteUser(UserId: string): Observable<string> {
    return this.http.delete<string>(this.appConstants.API_BASE_URL + `User/`+UserId);
 }
}
