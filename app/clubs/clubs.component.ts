import { Component, OnInit } from '@angular/core';
import { DataServiceService } from "app/data-service.service";
import {FormBuilder, FormGroup,FormGroupName,Validators,FormControl,NgForm,NgModel} from '@angular/forms';
@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
   styleUrls: ['./clubs.component.css']

})
export class ClubsComponent implements OnInit {
    
  title: string = 'My first angular2-google-maps project';
 
   public currentlat;
 // public currentlat2=20;
  public position;
  public currentlon;
 //public currentlon2=20;
  public clubs;
  public myForm:FormGroup;
  public joindclubs;
  public inputvale;
  public loginuser=JSON.parse(localStorage.getItem('profile')).email;
  constructor(private _formBuilder:FormBuilder, private _dataservice: DataServiceService) {
    this.getLocation()
     this.myForm=_formBuilder.group({
       "name":[''],
       "location":[[this.currentlat,this.currentlon]],
      "numberofmember":[1],
       "members":[[this.loginuser]],
      "state":[''],
       "city": [''],
      "description": [''],
       "events":[''],

       "owner":[this.loginuser],  
        "announcement":['']  
     });

    }

getLocation() {
    if (navigator.geolocation) {
    var that=this;
       this.position= navigator.geolocation.getCurrentPosition(function(position){
      that.currentlon= position.coords.longitude;
      that.currentlat= position.coords.latitude;
   console.log(that.currentlon);
   
       });
    
    } 
}

addClub()
{
console.log("hhhhhhhhhhhhhhhhhhhhhhhhhh");
this.myForm.value.location=[this.currentlat,this.currentlon];
this.myForm.value.announcement=[];
this.myForm.value.events=[];

 this._dataservice.addData('http://localhost:3000/clubs',this.myForm.value).subscribe((res)=>{
 console.log(this.myForm.value);
});
console.log(this.myForm.value);
  
}

  ngOnInit() {

      this.clubs = new Promise((resolve, reject) => {
      this._dataservice.getData("http://localhost:3000/clubs/bymember/"+this.loginuser).subscribe(function (res: Response) {
        resolve(res);
       


      });

    });
    this.joindclubs=this.clubs;
 
  }
 
searchByname(){
  console.log(" this.inputvale"+ this.inputvale)
    this.clubs = new Promise((resolve, reject) => {
      this._dataservice.getData("http://localhost:3000/clubs/clubbyname/"+this.loginuser+"/"+this.inputvale).subscribe(function (res: Response) {
        resolve(res);
       


      });

    });
}

searchAll(){
  
  this.clubs=this.joindclubs;
}

searchByNoMember()
{
   console.log(" this.inputvale"+ this.inputvale)
      this.clubs = new Promise((resolve, reject) => {
      this._dataservice.getData("http://localhost:3000/clubs/clubnumbermember/"+this.loginuser+"/"+this.inputvale+"/").subscribe(function (res: Response) {
        resolve(res);
       


      });

    });
}

}