import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomPivotTableDemoComponent} from './examples/custom-pivot-table-demo/custom-pivot-table-demo.component';

const routes: Routes = [
  { path: '**', component: CustomPivotTableDemoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
