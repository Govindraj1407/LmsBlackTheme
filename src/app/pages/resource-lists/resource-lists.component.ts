import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { User } from 'src/app/lib/models/user';
import { UserService } from 'src/app/lib/services/user-service';

@Component({
  selector: 'resourcelists',
  templateUrl: './resource-lists.component.html',
  styleUrls: ['./resource-lists.component.scss']
})
export class ResourceListsComponent implements OnInit {
  users: User[] = []

  constructor(public userService: UserService,
     private flashMessage: FlashMessagesService, private router: Router) { }

  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem("user-session"));
      if (user?.role === "Admin") {
        this.userService.getUsers().subscribe((users: User[]) => {
          this.users = users;
        });
      }    
  }

  onEdit(user : User){
    this.router.navigate(["/usereditor"], { state : {userId: user.userId}});
  }

  onDelete(userId : string){
    this.userService.deleteUser(userId).subscribe(() =>{
      this.flashMessage.show("User deleted successfully", {cssClass: 'alert-success', timeout: 5000});
      this.ngOnInit();
    }, (error: HttpErrorResponse) => {
      this.flashMessage.show(error.message, {cssClass: 'alert-danger', timeout: 5000});
    });
  }
}
