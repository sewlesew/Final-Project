import { Component, OnInit,Pipe } from '@angular/core';
import { DataServiceService } from "app/data-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import {FormBuilder, FormGroup,FormGroupName,Validators,FormControl,NgForm,NgModel} from '@angular/forms';
@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {
    route2: any;
public club;
public promiseclubres;
public id;
public loginuser;
  private myForm:FormGroup;
    private myFormEvent:FormGroup;
  constructor(private _formBuilder:FormBuilder, private route: ActivatedRoute, private _dataservice: DataServiceService, private router2: Router) { 
    route.params.subscribe((param)=>{this.id=param['id'];})
    this.loginuser=JSON.parse(localStorage.getItem('profile')).email;

 this.myForm=_formBuilder.group({
       "time":[''],
       "titile":[''],
       "description":['',Validators.required],  
        "id":[]  
     });

this.myFormEvent=_formBuilder.group({
       "etime":[''],
       "ename":[''],
      "edescription":['',Validators.required],  
      "estatus":[''],
       "ecid":['Pending'],
       "startlocation":[''],  
     "endlocation":[''],
       "eowner":[],  
        "emembers":[]  
     });


  }
onSubmitEvent(){
  
}

onSubmit(){

}
  ngOnInit() {
   
      this.club = new Promise((resolve, reject) => {
        console.log(this.id)
      this._dataservice.getData("http://localhost:3000/clubs/"+this.id).subscribe(function (res: Response) {
        resolve(res);
        // console.log(this.clubs);
      });

    });
   
console.log(this.club)
console.log("gg");
  }


   unSubscribeClube(clubId){
    var user=JSON.parse(localStorage.getItem('profile')).email;
  this._dataservice.updateDataUsingUrl("http://localhost:3000/clubs/unSubscribeClub/"+clubId+"/"+user).subscribe((res)=>{
 this.route2.navigate(['/clubs'])
 //res.redirect()
 
    });
  
}

addannouncement()
{
 
 this._dataservice.updateData('http://localhost:3000/clubs/announcment/'+this.id,this.myForm.value).subscribe((res)=>{
 

    this.club = new Promise((resolve, reject) => {
        console.log(this.id)
      this._dataservice.getData("http://localhost:3000/clubs/"+this.id).subscribe(function (res: Response) {
        resolve(res);
        // console.log(this.clubs);
      });
    });

    });
   
}


addeventforclub()
{ 
console.log("hhhhhhhhhhhhhhhhhhhhhhhhhh");

this.myFormEvent.value.estatus="Pending";
this.myFormEvent.value.ecid=this.id;
this.myFormEvent.value.startlocation=[20,30]
this.myFormEvent.value.endlocation=[40,20]
this.myFormEvent.value.eowner=this.loginuser
this.myFormEvent.value.emembers=[this.loginuser]


 this._dataservice.addData('http://localhost:3000/events',this.myFormEvent.value).subscribe((res)=>{
 console.log(this.myFormEvent.value);
});
console.log(this.myFormEvent.value);


}

}
