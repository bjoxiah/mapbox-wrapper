import {ModuleWithProviders, NgModule} from '@angular/core';
import { MapboxWrapperLibraryComponent } from './mapbox-wrapper-library.component';
import {RouterModule, Routes} from "@angular/router";
import {DataEffects} from "./app/store/effects";
import {ItemComponent} from "./app/components/item/item.component";
import {ListComponent} from "./app/components/list/list.component";
import {MapComponent} from "./app/components/map/map.component";
import {SidebarComponent} from "./app/components/sidebar/sidebar.component";
import {HeaderComponent} from "./app/components/header/header.component";
import {RouterSerializer} from "./app/store/serializers";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {DetailsComponent} from "./app/components/details/details.component";
import {SearchComponent} from "./app/components/search/search.component";
import {reducers} from "./app/store/reducers";
import {HttpClientModule} from "@angular/common/http";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {NgProgressHttpModule} from "ngx-progressbar/http";
import {EffectsModule} from "@ngrx/effects";
import {MdbTabsModule} from "mdb-angular-ui-kit/tabs";
import {MatIconModule} from "@angular/material/icon";
import {StoreModule} from "@ngrx/store";
import {MdbCarouselModule} from "mdb-angular-ui-kit/carousel";
import {MatInputModule} from "@angular/material/input";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {MatTableModule} from "@angular/material/table";
import {NgProgressModule} from "ngx-progressbar";
import {MdbCheckboxModule} from "mdb-angular-ui-kit/checkbox";
import {MatCardModule} from "@angular/material/card";
import {Configurations} from "./app/model/configurations";

const appRoutes: Routes = [
  { path: '', component: SidebarComponent },
  { path: 'details/:id', component: DetailsComponent },
];


@NgModule({
  declarations: [
    MapboxWrapperLibraryComponent,
    ItemComponent,
    ListComponent,
    MapComponent,
    SearchComponent,
    DetailsComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSidenavModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([DataEffects]),
    BrowserAnimationsModule,
    MatToolbarModule,
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false, // <-- debugging purposes only
        useHash: true
      }
    ),
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    StoreRouterConnectingModule.forRoot({
      serializer: RouterSerializer,
    }),
    NgProgressModule.withConfig({
      trickleSpeed: 200,
      min: 20,
      meteor: false
    }),
    NgProgressHttpModule,
    MdbCheckboxModule,
    MdbCarouselModule,
    MdbTabsModule
  ],
  exports: [
    MapboxWrapperLibraryComponent
  ]
})
export class MapboxWrapperLibraryModule {

  public static forRoot(config: Configurations): ModuleWithProviders<MapboxWrapperLibraryModule> {

    return {
      ngModule: MapboxWrapperLibraryModule,
      providers: [
        {provide: Configurations, useValue: config}
      ]
    };
  }

}
