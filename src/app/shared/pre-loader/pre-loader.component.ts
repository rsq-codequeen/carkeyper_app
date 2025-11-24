import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreLoaderService } from '../../services/pre-loader.service';
@Component({
  selector: 'app-pre-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pre-loader.component.html',
  styleUrl: './pre-loader.component.css'
})
export class PreLoaderComponent {
  isLoading$ = this.loadingService.loading$;
  constructor(private loadingService: PreLoaderService) { }
}
