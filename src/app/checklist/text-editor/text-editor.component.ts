import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillWrapperModule } from '../../quill-wrapper/quill-wrapper.module';
import { ButtonComponent } from '../../shared/button/button.component';
import { CancelButtonComponent } from '../../shared/cancel-button/cancel-button.component';

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, QuillWrapperModule, ButtonComponent, CancelButtonComponent],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.css'
})
export class TextEditorComponent implements OnInit {
  content: string = '';

  // 🚨 The event for adding a new item
  @Output() addClick = new EventEmitter<string>();


  constructor() { }
  ngOnInit(): void { }

  onAddClick(): void {
    if (this.content.trim()) {
      this.addClick.emit(this.content);
      this.content = '';
    }
  }


}