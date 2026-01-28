import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RadarComponent } from './radar/radar.component';
const routes: Routes = [
  { path: 'radar', component:RadarComponent },
  {path:'',component:RadarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RadarRoutingModule { }
