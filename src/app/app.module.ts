import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FlexmonsterPivotModule} from 'ngx-flexmonster';
import {SideMenuComponent} from './common/side-menu/side-menu.component';
import {TopMenuComponent} from './common/top-menu/top-menu.component';
import {FormsModule} from '@angular/forms';
import {CustomPivotTableDemoComponent} from './examples/custom-pivot-table-demo/custom-pivot-table-demo.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    SideMenuComponent,
    CustomPivotTableDemoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexmonsterPivotModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
