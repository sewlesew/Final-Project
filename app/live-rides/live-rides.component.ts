import { Component, OnInit } from '@angular/core';
import {RouterLink,RouterLinkActive} from '@angular/router';
import {DataServiceService} from '../data-service.service';
import {Response}  from "@angular/http";
import {Pipe} from '@angular/core';
// import {FormBuilder,Validators,FormGroup,FormControl} from '@angular/forms'
@Component({
  selector: 'app-live-rides',
  templateUrl: './live-rides.component.html',
  styleUrls: ['./live-rides.component.css']
})
export class LiveRidesComponent implements OnInit {
 // Zoom level
  zoom: number = 10;
  // Start Position
public currentlat;
public currentlon;
  markers: marker[] = [
    {
        name:'DC',
        lat:this.currentlat,
        lng:this.currentlon,
        draggable: false
    },
    {
        name: 'Fairfield',
        lat: 41.0044375661952,
        lng: -91.96428775787354,
        draggable: false
    },
    {
        name: 'DC ',
        lat: 41.006915082338516,
        lng: -91.98280572891235,
        draggable: false
    }
  ];
  
 clickedMarker(marker:marker, index:number){
    console.log('Clicked Marker: '+marker.name+' at index '+index);
  }
 public livevents;
 public eventform;

public position;

//  public bnum;

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


 
 public isowner=false;
 public eventflag=false;
  constructor(private _dataservice:DataServiceService) { }

  ngOnInit() {
this.getLocation();

        this.livevents=new Promise((resolve,reject)=>{
       this._dataservice.getData("http://localhost:3000/events/status/start").subscribe(function(res:Response){
           resolve(res);
            // console.log(this.clubs);
             
             
    });
    
  });
  }
// ----------------

// ---------------------

}
// Marker Type
  interface marker{
    name?:string;
    lat: number;
    lng: number;
    draggable:boolean;
  }
