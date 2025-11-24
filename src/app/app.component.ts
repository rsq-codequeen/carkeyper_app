import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PreLoaderComponent } from './shared/pre-loader/pre-loader.component';
import 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,PreLoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'greenkeyper_app';

   
}
