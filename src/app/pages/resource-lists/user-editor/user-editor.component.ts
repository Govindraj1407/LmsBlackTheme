import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { User } from 'src/app/lib/models/user';
import { UserService } from 'src/app/lib/services/user-service';

@Component({
  selector: 'usereditor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {
  user: User;
  title = "Add User";
  isEditMode = false;
  isSubmitted = false;
  roles = ['Admin', 'Instructor', 'Student'];
  userForm = this.formBuilder.group({
    userId: '',
    name: ['', Validators.required],
    role: ['', Validators.required],
    city: '',
    state: '',
    pin: '',
    phone: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
    email: ['', [Validators.required, Validators.email]],
    password: 'test@123'  
  });
  constructor(private formBuilder: FormBuilder, public userService: UserService,
    private flashMessage: FlashMessagesService, private router: Router) {
      if(this.router.getCurrentNavigation()?.extras?.state?.userId){
        this.isEditMode = true;
        this.title = "Edit User";
        this.getUser(this.router.getCurrentNavigation()?.extras?.state?.userId);
        this.router.getCurrentNavigation().extras = null;
      }
     }

  ngOnInit(): void {
  }

  getUser(userId:string){
    this.userService.getUser(userId).subscribe((user: User) => {
      this.user = user;
      this.userForm.setValue({
        userId: this.user.userId,
        name: this.user.name,
        role: this.user.role,
        city: this.user.city,
        state: this.user.state,
        pin: this.user.pin,
        phone: this.user.phone,
        email: this.user.email,
        password: 'test@123' 
      })
    });
  }


  onSubmit() { 
    this.isSubmitted = true;
    if(this.userForm.valid){     
      if(this.isEditMode){
        this.userService.updateUser(this.userForm.getRawValue()).subscribe(() =>{
          this.router.navigate(["/resourcelists"]);
        }, (error: HttpErrorResponse) => {
          this.flashMessage.show(error.message, {cssClass: 'alert-danger', timeout: 5000});
        });
  
      }
      else{
        this.userService.createUser(this.userForm.getRawValue()).subscribe(() =>{
          this.router.navigate(["/resourcelists"]);
        }, (error: HttpErrorResponse) => {
          this.flashMessage.show(error.message, {cssClass: 'alert-danger', timeout: 5000});
        });
      }   
    }     
  }

}
