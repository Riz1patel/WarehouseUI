import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ApiService } from './api-service';
import { Observable, Subscription } from 'rxjs';
import { API_Response } from '../models/interfaces/common.model';
import { GLOBAL_CONSTANT } from '../constant/global.constant';
import { ClientModel } from '../models/classes/client.model';

@Service()
export class ClientService {

    api_url = environment.API_URL;

    apiService = inject(ApiService)

    
  getAllClients(): Observable<API_Response> {
    return this.apiService.get(this.api_url + GLOBAL_CONSTANT.API_METHODS.GET_ALL_CLIENT)
  }

  getClientById(id: number): Observable<API_Response> {
    return this.apiService.get(this.api_url + GLOBAL_CONSTANT.API_METHODS.GET_CLIENT_BY_ID + id)
  }
  

  // saveClientOld(obj: ClientModel) :  Observable<API_Response>{
  //   return this.http.post<API_Response>(this.api_url + GLOBAL_CONSTANT.API_METHODS.SAVE_CLIENT,obj)
  // }

   saveClient(obj: ClientModel) :  Observable<API_Response>{
    return this.apiService.post<API_Response>(this.api_url + GLOBAL_CONSTANT.API_METHODS.SAVE_CLIENT,obj)
  }

  updateClient(id:number,obj: ClientModel) :  Observable<API_Response>{
    return this.apiService.put<API_Response>(this.api_url + GLOBAL_CONSTANT.API_METHODS.UPDATE_CLIENT + id,obj)
  }

  deleteClient(id: number) :  Observable<API_Response>{
    return this.apiService.delete<API_Response>(this.api_url + GLOBAL_CONSTANT.API_METHODS.DELETE_CLEINT  + "/"+ id)
  }

   
   


}
