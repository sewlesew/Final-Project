import { Component, OnInit,OnChanges } from '@angular/core';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

   public profile;
  private usersflag:boolean=true;
  constructor() { 

  this.profile=JSON.parse(localStorage.getItem('profile'));
  console.log(this.profile);

  }

  ngOnInit() {

  }

 ngOnChanges(){
  this.usersflag=true;
}

subscribe(){

this.usersflag=false;
}  
unsubscribe(){
  this.usersflag=false;
}
update(){
   this.usersflag=false;

}


}
