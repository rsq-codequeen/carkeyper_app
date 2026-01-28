import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-radar',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.css']
})
export class RadarComponent implements OnInit, OnDestroy {
  activePings: any[] = [];
  hasBreach: boolean = false;
  private simulationTimer: any;

  ngOnInit() {
    this.startSimulation();
  }

  startSimulation() {
    this.simulationTimer = setInterval(() => {
      this.generateVehiclePing();
    }, 2000);
  }

  generateVehiclePing() {
    const id = Math.floor(Math.random() * 899) + 100;
    // Random position between 15% and 85% to keep dots inside circle
    const topVal = Math.floor(Math.random() * 70) + 15;
    const leftVal = Math.floor(Math.random() * 70) + 15;

    // SECURITY BREACH LOGIC:
    // If vehicle is in the "Danger Zone" (Top-Left quadrant), mark as breach
    const isBreach = topVal < 40 && leftVal < 40;

    const newPing = {
      id,
      top: topVal + '%',
      left: leftVal + '%',
      isBreach: isBreach,
      timestamp: Date.now()
    };

    this.activePings = [...this.activePings, newPing];
    this.checkBreachStatus();

    // Fade out after 5 seconds
    setTimeout(() => {
      this.activePings = this.activePings.filter(p => p.timestamp !== newPing.timestamp);
      this.checkBreachStatus();
    }, 5000);
  }

  checkBreachStatus() {
    this.hasBreach = this.activePings.some(p => p.isBreach);
  }

  ngOnDestroy() {
    if (this.simulationTimer) clearInterval(this.simulationTimer);
  }
}