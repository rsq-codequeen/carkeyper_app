import { Component } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { Route, RouterModule } from '@angular/router';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [SharedModule,RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
