import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { userLoginModel } from '../models/classes/user.model';
import { environment } from '../../../environments/environment.development';
import { GLOBAL_CONSTANT } from '../constant/global.constant';
import { Observable } from 'rxjs';
import { API_Response } from '../models/interfaces/common.model';

@Service()
export class UserService {

    http = inject(HttpClient);
    api_url = environment.API_URL;

    loginUser(obj: userLoginModel): Observable<API_Response> {
        return this.http.post<API_Response>(this.api_url + GLOBAL_CONSTANT.API_METHODS.LOGIN , obj)
    }
           
}
