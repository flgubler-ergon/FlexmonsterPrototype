import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexmonsterPivotModule } from 'ngx-flexmonster';
import { SideMenuComponent } from './common/side-menu/side-menu.component';
import { ToggleButtonComponent } from './common/toggle-button/toggle-button.component';
import { ToggleSwitchComponent } from './common/toggle-switch/toggle-switch.component';
import { TopMenuComponent } from './common/top-menu/top-menu.component';
import { HandlingEventsComponent } from './examples/handling-events/handling-events.component';
import { CustomizingGridComponent } from './examples/customizing-grid/customizing-grid.component';
import { CustomizingToolbarComponent } from './examples/customizing-toolbar/customizing-toolbar.component';
import { PivotTableDemoComponent } from './examples/pivot-table-demo/pivot-table-demo.component';
import { UpdatingDataComponent } from './examples/updating-data/updating-data.component';
import { UsingApiCallsComponent } from './examples/using-api-calls/using-api-calls.component';
import { FormsModule } from '@angular/forms';
import {CustomPivotTableDemoComponent} from './examples/custom-pivot-table-demo/custom-pivot-table-demo.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    SideMenuComponent,
    PivotTableDemoComponent,
    CustomPivotTableDemoComponent,
    HandlingEventsComponent,
    UsingApiCallsComponent,
    UpdatingDataComponent,
    CustomizingToolbarComponent,
    CustomizingGridComponent,
    ToggleButtonComponent,
    ToggleSwitchComponent
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
