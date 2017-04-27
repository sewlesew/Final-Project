import { BrowserModule } from '@angular/platform-browser';
import {appRouter} from './routes.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {ReactiveFormsModule} from "@angular/forms";

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import  {MaterialModule} from '@angular/material'
import {MdButtonModule, MdCheckboxModule} from '@angular/material';
import 'hammerjs';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
// import {RouterModule} from '@angular/router';
// import {AUTH_PROVIDERS} from 'angular2-jwt';
import { AuthService } from "app/auth.service";
import {  Auth } from "app/sewauto/auth.service";
import { HomeComponent } from './home/home.component';
import { ClubsComponent } from './clubs/clubs.component';
import { LiveRidesComponent } from './live-rides/live-rides.component';
import { EventsComponent } from './events/events.component';
import { ProfileComponent } from './profile/profile.component';
import {DataServiceService} from './data-service.service';
import { AnnouncementComponent } from './announcement/announcement.component';
import { ClubComponent } from './club/club.component';
 
 import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
 import { AgmCoreModule } from 'angular2-google-maps/core';
 import { UpdateUserComponent } from "app/update-user/update-user.component";
 import { UnsubscribeUserComponent } from "app/unsubscribe-user/unsubscribe-user.component";
 import { SubscribeUserComponent } from "app/subscribe-user/subscribe-user.component";
 import { ChatComponent } from "app/chat/chat.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    HomeComponent,
    ClubsComponent,
    LiveRidesComponent,
   
    EventsComponent,
    ProfileComponent,
       AnnouncementComponent,
    ClubComponent,
ChatComponent,
   ProfileComponent,
    SubscribeUserComponent,
    UnsubscribeUserComponent,
    UpdateUserComponent
    
  ],
  imports: [
    BrowserModule,
   
    appRouter,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule,
     MdCheckboxModule,
     ReactiveFormsModule,
     NguiDatetimePickerModule,
     MaterialModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDDh6f_W6xEVVC_eFgZNyzcuqfQBfDLCI0'})

      ],
      
  providers: [Auth, AuthService, DataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
