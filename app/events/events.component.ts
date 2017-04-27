

import { Component, OnInit,ElementRef } from '@angular/core';
import {RouterLink,RouterLinkActive} from '@angular/router';
import {DataServiceService} from '../data-service.service';
import {Response}  from "@angular/http";
import {Pipe} from '@angular/core';
// import {RouterLink} from '@angular/router'

// import {FormBuilder,Validators,FormGroup,FormControl} from '@angular/forms'


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

 public profile;
 public clubs;
 public eventform;
 public currentTime=" ";
 
 public isowner=false;
 public eventflag=false;
 public allEvents:any[];
 public events;
 public r;
 public status:boolean=false;
 public ownevents;
//  @viewChild('event.id') k;
  constructor(private _dataservice:DataServiceService, private eref:ElementRef) {
                     this.eref.nativeElement             
           
   }


  ngOnInit() {
        // this.currentTime=new Date();
        this.currentTime=" "
        this.clubs=new Promise((resolve,reject)=>{
          this.profile=JSON.parse(localStorage.getItem('profile'));
      //user3=this.profile.email
       this._dataservice.getData("http://localhost:3000/events"+"/henok2000@gmail.com").subscribe(function(res:Response){             
             resolve(res);     
             
            });
    
  });

      console.log(this.clubs);
  }

  getevents(){
     
     this.clubs=new Promise((resolve,reject)=>{
       this._dataservice.getData("http://localhost:3000/events").subscribe(function(res:Response){
           resolve(res);
            // console.log(this.clubs);         
              });    
  });
}

 ownEvent(eid, status){                         
                var bodyR={
                    'eid':eid,
                    'status':status
                    };  
this.ownevents=new Promise((resolve,reject)=>{
       this._dataservice.postData("http://localhost:3000/events/status",bodyR).subscribe(function(res:Response){
             
            console.log(""+res);  
               resolve(res);       
              });   
               });  


        }

goForJoin(eventid){
   var bodyR={
   eid:eventid,
   uid:this.profile.email
  };  

   this.r=new Promise((resolve,reject)=>{
       this._dataservice.postData("http://localhost:3000/events/join",bodyR).subscribe(function(res:Response){
             resolve(res);
          console.log("I got the response from the server...."+JSON.stringify(res));  
                 console.log("Status:"+res.statusText);
                     
                     if(res.statusText=="ok"){
                       this.status=true;
                     }
                 
              });    
  });


  //  console.log("trying to join from goForJoin()"+JSON.stringify(bodyR));
}


join(clubid){   
       
 this.events=new Promise((resolve,reject)=>{
          this.profile=JSON.parse(localStorage.getItem('profile'));
    // let postBody={
          var cid=clubid;
          //  var eid=eventid;
          var  uid=this.profile.email; 
          console.log(cid);     
            //  console.log(eid);      
                console.log(uid);          
    // };
        this._dataservice.addDataTwo("http://localhost:3000/events/"+cid+"/"+uid).subscribe(function(res:Response){
             
             resolve(res);
        
             console.log("responsd from server successful"+JSON.stringify(res));
             
    });
    
  });

  

}


// addEvents(id){
//   this._dataservice. addData(url,value).subscribe(function(res:Response){
//           // this.isclubmember=res.ok;
          
//             console.log(res);
//     });
    

// }


}