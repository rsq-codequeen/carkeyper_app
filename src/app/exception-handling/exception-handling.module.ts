import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExceptionHandlingRoutingModule } from './exception-handling-routing.module';



import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    PagenotfoundComponent
  ],
  imports: [
    CommonModule,
    ExceptionHandlingRoutingModule
  ]

})
export class ExceptionHandlingModule {}
