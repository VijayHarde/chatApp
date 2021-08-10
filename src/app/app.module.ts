import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { SQLite } from "@ionic-native/sqlite/ngx";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  AngularFireModule.initializeApp(environment.firebaseConfig),
AngularFireAuthModule,
AngularFirestoreModule,
HttpClientModule
],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy},SQLite],
  bootstrap: [AppComponent],
})
export class AppModule {}
