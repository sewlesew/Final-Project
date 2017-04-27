import { Component, OnInit } from '@angular/core';
import {RouterLink,RouterLinkActive} from '@angular/router';
import {DataServiceService} from '../data-service.service';
import {Response}  from "@angular/http";
import { Pipe } from '@angular/core';
import { AuthService } from "app/auth.service";
// import {FormBuilder,Validators,FormGroup,FormControl} from '@angular/forms'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  //styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 public clubs;
 public clubform;
 public userEmail;
 public isclubmember;
 public clubflag=false;
  constructor(private auth:AuthService, private _dataservice:DataServiceService) { 
    console.log( auth.userProfile)

this.userEmail=JSON.parse(localStorage.getItem('profile')).email;


  //       ,private _formbuilder:FormBuilder
  // this.clubform=this._formbuilder.group(
  //   { 'name':['name', Validators.required],
  //     'description':['description', Validators.required],
  //     'city':['city', Validators.required],
  //     'state':['state', Validators.required]  
  //   }
                
  // );

  }

  ngOnInit() {
    console.log("Emaillllllll",this.userEmail);
          this.clubs = new Promise((resolve, reject) => {
      this._dataservice.getData("http://localhost:3000/clubs").subscribe(function (res: Response) {
        resolve(res);
      });
    });
      console.log("this.clubs",this.clubs);


  }

  noClubs(){
    this.clubflag=true;
  }

/*
  getClub(){
     
     this.clubs=new Promise((resolve,reject)=>{
       this._dataservice.getData("http://localhost:3000/clubs").subscribe(function(res:Response){
           resolve(res);
            // console.log(this.clubs);
             
             
    });
    
  });
}
*/
createClub(){
          
   
}
joinClub(dcId){
  this._dataservice.updateData('http://localhost:3000/clubs/subscribeclub/'+dcId+"/"+this.userEmail,{}).subscribe(function(res:Response){
          this.isclubmember=res.ok;
          
            console.log(res);
    });
    

}

checkmember(club){
   var members=club.members
   
  //var members=club.members
  var index=0;
 for(var member of members)
 {
 
    console.log(" mv m m m ", member)

    if(member===this.userEmail)
    {
      console.log("equallllllllllls")
         return false;
       }
       
      

 }
  return true;
}
 
 
}

