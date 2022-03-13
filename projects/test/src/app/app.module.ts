import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MapboxWrapperLibraryModule} from "mapbox-wrapper-library";
import {environment} from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MapboxWrapperLibraryModule.forRoot({
      token: environment.token,
      maptiler_key: environment.maptiler_key
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
