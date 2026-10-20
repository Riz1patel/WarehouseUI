import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ClientModel } from '../../../core/models/classes/client.model';
import { ClientService } from '../../../core/services/client-service';
import { Subscription } from 'rxjs';
import { API_Response } from '../../../core/models/interfaces/common.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass, NgForOf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  imports: [NgClass, RouterLink],
  selector: 'app-client-list',
  styleUrl: './client-list.css',
  templateUrl: './client-list.html',
})
export class ClientList implements OnInit, OnDestroy {

  clientList:WritableSignal<ClientModel[]> = signal<ClientModel[]>([]);
  clientSrv = inject(ClientService);
  subscription!: Subscription;
  isCardView: boolean = false;
  activatedRoute = inject(ActivatedRoute);

  constructor(){}

  ngOnInit(): void {
    this.getAllClient();    
  }

  getAllClient(){
   this.subscription = this.clientSrv.getAllClients().subscribe({
      next:(res:API_Response)=>{
        this.clientList.set(res.data);
      },
      error:(err:HttpErrorResponse)=>{
         alert(err.error.message);
      }
    })
  }

  deleteCustomer(id:number){

    const isDelete = confirm('Are you sure want to delete?');
    if(isDelete){
    this.subscription = this.clientSrv.deleteClient(id).subscribe({
      next:(res:API_Response)=>{
        if(res.result){
          alert('customer deleted');
          this.getAllClient();
        }
        else{
          alert(res.message);
        }
      },
      error:(err:HttpErrorResponse)=>{
        alert(err.error.message);
      }
    })
    }

    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
