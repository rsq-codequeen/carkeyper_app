import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddchecklistComponent } from './addchecklist/addchecklist.component';
import { AllchecklistComponent } from './allchecklist/allchecklist.component';

const routes: Routes = [
  {path:'add-checklist', component:AddchecklistComponent},
  {path:'All-checklist',component:AllchecklistComponent},
  {path:'', component:AddchecklistComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChecklistRoutingModule { }
