import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { API_Response, IUser } from '../../../core/models/interfaces/common.model';
import { GLOBAL_CONSTANT } from '../../../core/constant/global.constant';
import { ClientService } from '../../../core/services/client-service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-client-form',
  styleUrl: './client-form.css',
  templateUrl: './client-form.html',
})
export class ClientForm implements OnInit, OnDestroy {

  customerForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  clientSrvice = inject(ClientService)
  router = inject(Router);
  loggedInUser!: IUser;
  activatedRoute= inject(ActivatedRoute);
  currentEditId : number = 0;
  subscription! : Subscription

  constructor(){}

  ngOnInit(): void {
   const localUserData =  localStorage.getItem(GLOBAL_CONSTANT.LOCAL_LOGIN_KEY)
    if(localUserData){
      this.loggedInUser = JSON.parse(localUserData);
    }
    this.initializeForm();

    this.activatedRoute.params.subscribe({
      next:(res:any)=>{
        if(Number(res.id) > 0){
          this.currentEditId = res.id;
          this.getClientById();
        }
      }
    })
  }

  initializeForm(){
    this.customerForm = this.formBuilder.group({
      customerId: [0],
      customerName:['',Validators.required],
      customerAddress:['', Validators.required],
      customerMobile:['', Validators.required],
      customerEmail:['', Validators.required],
      customerGstNo:['', Validators.required],
      createdAt:[new Date()],
      createdBy:[this.loggedInUser.userId],
      updatedBy:[this.loggedInUser.userId],
      updatedAt:[new Date()],        
    })
  }

  saveCustomer(){    
      // get all form value --> const formValue = this.customerForm.value;
      //get only specific control value -->
    const formValue = {    
      name: this.customerForm.get('customerName')?.value,
      address:this.customerForm.get('customerAddress')?.value,
      mobile: this.customerForm.get('customerMobile')?.value,
      email: this.customerForm.get('customerEmail')?.value,
      gstNo: this.customerForm.get('customerGstNo')?.value,
      id:this.customerForm.get('customerId')?.value,
      createdBy:this.loggedInUser.userId,
      createdAt:new Date()
    };

    //if you want to update value before api call --> 
    // formValue.isActive = formValue.isActive == "true" ? true : false;

   this.subscription = this.clientSrvice.saveClient(formValue).subscribe({
      next:(res:API_Response) =>{
        if(res.result){
          alert('customer created success');
          this.router.navigateByUrl('/admin/client-list')
        }
        else{
          alert(res.message)
        }
      },
      error:(err:HttpErrorResponse) =>{
        alert(err.error.message);
      }
    })
  }

  getClientById() {
   this.subscription = this.clientSrvice.getClientById(this.currentEditId).subscribe({
      next: (res: API_Response) => {


        // set all value --> this.customerForm.setValue(res.data);

        // set specific control values 
        this.customerForm.patchValue({
          customerName: res.data.name,
          customerAddress: res.data.address,
          customerMobile: res.data.mobile,
          customerEmail: res.data.email,
          customerGstNo: res.data.gstNo,
          customerId: res.data.id
        })
      },
      error: (err: HttpErrorResponse) => {
        alert(err.error.message);
      }
    })
  }


  updateCustomer(){
     const formValue = {    
      name: this.customerForm.get('customerName')?.value,
      address:this.customerForm.get('customerAddress')?.value,
      mobile: this.customerForm.get('customerMobile')?.value,
      email: this.customerForm.get('customerEmail')?.value,
      gstNo: this.customerForm.get('customerGstNo')?.value,
      id:this.customerForm.get('customerId')?.value,
      updatedBy:this.loggedInUser.userId,
      updatedAt:new Date()
    };
    
   this.subscription = this.clientSrvice.updateClient(this.currentEditId, formValue).subscribe({
      next:(res:API_Response)=>{
        if(res.result){
           alert('Customer updated Success');
           this.router.navigateByUrl('/admin/client-list')
        }
        else{
          alert(res.message)
        }
       
      },
      error:(err:HttpErrorResponse)=>{
        alert(err.error.message);
      }
    })
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



}
