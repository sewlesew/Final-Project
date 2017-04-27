import { Component, OnInit } from '@angular/core';
import {RouterLink,RouterLinkActive} from '@angular/router';
import {DataServiceService} from '../data-service.service';
import {Response}  from "@angular/http";
import {Pipe} from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
 public chatmembers;
  public chatemail;
    public message;
    public chatmessages;
      public sendmessages;
    
      public messages: any[]=['chat start'];
  public userId;
  public timestamp;

  constructor(private _dataservice:DataServiceService, ) {
    this.userId=JSON.parse(localStorage.getItem('profile')).email;
    console.log(this.userId);
   
   }

   ngOnInit() {

        this.chatmembers=new Promise((resolve,reject)=>{
       this._dataservice.getData("http://localhost:3000/users").subscribe(function(res:Response){
           resolve(res);
            console.log(this.chatmembers);
             
             
    });
    
  });
// this.chatmessages=new Promise((resolve,reject)=>{
// this._dataservice.getData("http://localhost:3000/users/chatmessages/abebe2/abebe1").subscribe(function(res:Response){
//  resolve(res);
//             console.log(this.chatmessages);
             
// 	});

// 	});
}
getmessage(val){
this.chatmessages=new Promise((resolve,reject)=>{
this._dataservice.getData("http://localhost:3000/users/chatmessages/"+this.userId+"/"+val).subscribe(function(res:Response){
 resolve(res);
            console.log(this.chatmessages);
             
	});

});
}

chatonline(email){
this.chatemail=email;
this.getmessage(email);}

sendMessage(event){


	if(event.keyCode === 13) {
		if(this.message === '' || this.message === null) {
			alert(`Message can't be empty.`);
		}else{
        if(this.chatemail === ''){
				alert(`Select a user to chat.`);
		   	}else{
          this.timestamp=new Date(new Date().getTime()).toLocaleTimeString();
				var data = {
					'fromuserid' : this.userId,
					'message' : (this.message).trim(),
					'touserid' : this.chatemail,
          'timestamp': this.timestamp,
			
				};
          console.log(this.timestamp);
				this.messages.push(data);
      
			
				/* 
				* calling method to send the messages
				*/
				this.message = null;
				// this.socketService.sendMessage(data);
// geting the new message
// this.chatmessages=new Promise((resolve,reject)=>{
// this._dataservice.getData("http://localhost:3000/users/chatmessages/"+this.userId+"/"+this.chatemail).subscribe(function(res:Response){
//  resolve(res);
//             console.log(this.chatmessages);
             
// 	});

// 	});


this.sendmessages=new Promise((resolve,reject)=>{
this._dataservice.addData("http://localhost:3000/users/add",data).subscribe(function(res:Response){
 resolve(res);
 
            console.log(this.chatmessages);
             
	});

});

this.sendmessages.then(()=>{
  this.getmessage(this.chatemail);
});


			}
		}
	}
}



}


//Message interface
  // interface message{
  //  timestamp?:string;
  //   lat: string;
  //   lng: string;
  //   draggable:string;
  // }
