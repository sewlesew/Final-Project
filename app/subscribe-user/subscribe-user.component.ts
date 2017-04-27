import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup,FormGroupName,Validators,FormControl,NgForm,NgModel} from '@angular/forms';
import {DataServiceService} from '../data-service.service'
import {Response} from "@angular/http"

@Component({
  selector: 'app-subscribe-user',
  templateUrl: './subscribe-user.component.html',
  styleUrls: ['./subscribe-user.component.css']
})
export class SubscribeUserComponent implements OnInit {
     private profile;
     private mygroup:FormGroup;
     private isSubscribed=false;
   private respond;
    
  constructor(private _formBuilder:FormBuilder,private _dataservice:DataServiceService) {

    this.profile=JSON.parse(localStorage.getItem('profile'));
    console.log("from subscribe: "+JSON.parse(localStorage.getItem('profile')));

     this.mygroup=_formBuilder.group({
       "email":[this.profile.email],
       "name":[this.profile.name],
        "status":[]
       
     });
   }

  ngOnInit() {
    this.profile=JSON.parse(localStorage.getItem('profile'));
  }

onSubmit(){

let url="http://localhost:3000/users";
console.log("name"+JSON.stringify(this.mygroup.value));

this.respond=new Promise((resolve,reject)=>{
       this._dataservice.postData(url,this.mygroup.value).subscribe(function(res:Response){
           
            console.log("sewlesew"+res);
    
    });
    
  });
 
  }

}
