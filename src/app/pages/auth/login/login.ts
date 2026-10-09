import { Component, inject } from '@angular/core';
import { userLoginModel } from '../../../core/models/classes/user.model';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/user-service';
import { API_Response } from '../../../core/models/interfaces/common.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { GLOBAL_CONSTANT } from '../../../core/constant/global.constant';


@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

 loginObj: userLoginModel = new userLoginModel();
 userService= inject(UserService);
 router = inject(Router);

 onLogin() {
  this.userService.loginUser(this.loginObj).subscribe({
    next:(res:API_Response)=>{
      if(res.result){
        localStorage.setItem(GLOBAL_CONSTANT.LOCAL_LOGIN_KEY,JSON.stringify(res.data)) // convert obj into the string
        this.router.navigate(['admin/client-list'])
      }
      else{
        alert(res.message)
      }
    },
    error:(err:HttpErrorResponse)=>{

    }
  })
 }

}
