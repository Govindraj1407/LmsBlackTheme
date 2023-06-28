import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/lib/models/user';
import { UserService } from 'src/app/lib/services/user-service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  userData: User;
  showInvalidPasswordOrUsername = false;

  constructor(
    private flashMessage: FlashMessagesService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    // const user = {
    //   username: this.username,
    //   password: this.password
    // }
    // this.userService.verifyUser(this.username, this.password).subscribe(userData => {
    //   this.userData = userData;
    // });
  }
  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }
    this.userService.verifyUser(this.username, this.password).subscribe((userData: User) => {
      if (userData.userId !== null) {
        sessionStorage.setItem("user-session", JSON.stringify(userData));
        this.router.navigate(["/dashboard"]);
      }
      else{
        this.password = "";
      }      
    }, (error: HttpErrorResponse) => {
      this.password = "";
      if(error.error === "Login Failed"){
        this.showInvalidPasswordOrUsername = true;
      }
      
    });


  }


}
