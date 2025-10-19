import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [QuillModule.forRoot()],
  exports: [QuillModule] // Export the module so other modules/components can use it
})
export class QuillWrapperModule { }