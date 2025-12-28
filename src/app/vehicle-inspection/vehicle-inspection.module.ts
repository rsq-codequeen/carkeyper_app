import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VehicleInspectionRoutingModule } from './vehicle-inspection-routing.module';
import { InspectionComponent } from './inspection/inspection.component';

const routes: Routes = [
  { path: 'inspection', component:InspectionComponent },
  {path:'',component:InspectionComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleInspectionModule { }
