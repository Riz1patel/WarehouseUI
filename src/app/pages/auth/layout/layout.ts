import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IUser } from '../../../core/models/interfaces/common.model';
import { GLOBAL_CONSTANT } from '../../../core/constant/global.constant';

@Component({
  imports: [RouterOutlet,RouterLink],
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
export class Layout {

  loggedUser !: IUser
  router = inject(Router)

  constructor() {
    const localStorageData = localStorage.getItem(GLOBAL_CONSTANT.LOCAL_LOGIN_KEY);

    if (localStorageData != null) {
      this.loggedUser = JSON.parse(localStorageData); // convert string data into obj
    }
  }

  onLogOut(){
    localStorage.removeItem(GLOBAL_CONSTANT.LOCAL_LOGIN_KEY);
    this.router.navigateByUrl('/login');
  }

}
