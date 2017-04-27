

import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { AuthService } from "app/auth.service";

@Injectable()
export class DataServiceService {

  constructor(private _http:Http,private _auth:AuthService) {

   }

   getData(url){
     //return this._http.get('http://localhost:3000/clubs').map(x=>x.json());
     return this._http.get(url).map(x=>x.json());
    
   }

   addData(url, data){
    // return this._http.post('http://localhost:3000/clubs',data).map(x=>x.json());
     return this._http.post(url,data).map(x=>x.json());
 
   }




 addDataTwo(url){
     console.log("test ttttttttttttttttfor post data"+url);
     return this._http.get(url).map((res)=>res.json());
   }



  postData(url,body){
     console.log("from dataService"+body);
     console.log("from dataService"+url);     
      return this._http.post(url,body);

   }


   updateData(url,data){
     return this._http.post(url,data).map(x=>x.json());
    
   }
    updateDataUsingUrl(url){
     return this._http.post(url,{}).map(x=>x.json());
    
   }


 deleteData(url){
     return this._http.delete(url);
   }

/* henoks
  deleteData(url,data){
     return this._http.delete(url,data).map(x=>x.json());
    
   }
*/
   joinClub(value){
     return this._http.post('http://localhost:3000/clubs/subscribeclub/'+value+"/"+"user10",JSON.stringify({})).map(x=>x.json());
    
   }
   
   
  //  isClubMember(){
  //    return this._http.
  //  }

}
