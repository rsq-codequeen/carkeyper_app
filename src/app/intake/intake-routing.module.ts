import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntakeVehicleComponent } from './intake-vehicle/intake-vehicle.component';
const routes: Routes = [
  { path: 'intake', component:IntakeVehicleComponent },
  {path:'',component:IntakeVehicleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntakeRoutingModule { }
