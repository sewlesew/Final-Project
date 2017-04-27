
import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup,FormGroupName,Validators,FormControl,NgForm,NgModel} from '@angular/forms';
import {DataServiceService} from '../data-service.service'
import {Response} from "@angular/http"

@Component({
  selector: 'app-unsubscribe-user',
  templateUrl: './unsubscribe-user.component.html',
  styleUrls: ['./unsubscribe-user.component.css']
})
export class UnsubscribeUserComponent implements OnInit {
     private profile;
     private mygroup:FormGroup;
     private isSubscribed=false;
   private respond;
    
  constructor( private _formBuilder:FormBuilder,private _dataservice:DataServiceService) {

    this.profile=JSON.parse(localStorage.getItem('profile'));
    console.log("from subscribe: "+JSON.parse(localStorage.getItem('profile')));

     this.mygroup=_formBuilder.group({
       "email":[this.profile.email]
      //  "name":[this.profile.name],
       
     });
   }

  ngOnInit() {
    this.profile=JSON.parse(localStorage.getItem('profile'));
  }

onSubmit(){

var url="http://localhost:3000/users/"+this.profile.email;
console.log("thissssssssssssssssssssssssssssssssssssssssssssssssss"+url);

this.respond=new Promise((resolve,reject)=>{
       this._dataservice.deleteData(url).subscribe(function(res:Response){           
            console.log("hiiiiiiiiiiiiiiiiiiiiiii"+res);
                              
    });
    
  });
 

  //  console.log("output>>>>>>>>>>>"+this.mygroup.value.name);
  //  console.log("output>>>>>>>>>>>"+this.mygroup.value.email);
  //  console.log("output>>>>>>>>>>>"+this.mygroup.value.gender);
  //  console.log("output>>>>>>>>>>>"+this.mygroup.value.city);
  //  console.log("output>>>>>>>>>>>"+this.mygroup.value.state);
  //     console.log("output>>>>>>>>>>>"+this.mygroup.value.status);
  }

}

