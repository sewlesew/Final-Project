import { Component } from '@angular/core';
import { AuthService } from "app/auth.service";
import {HeaderComponent} from './header/header.component';
import {RouterLink,RouterLinkActive} from '@angular/router';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ['.loginstyle{color:Red; position:fixed;}','{.description{color:red;font-size:25px;}']

})
export class AppComponent {
  title = 'app works!';
    
   constructor(private auth:AuthService){
console.log(localStorage.getItem('profile'))
   }

}
