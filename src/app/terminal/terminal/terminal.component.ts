import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for *ngFor and [ngClass]
import { SharedModule } from '../../shared/shared.module';
@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule,SharedModule],
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit, OnDestroy {
  logs: any[] = [];
  private threadInterval: any;

  ngOnInit(): void {
    console.log("🚀 Terminal Standalone Initialized");
    
    // Add initial system logs so it's not blank on start
    this.addLog({ timestamp: new Date().toLocaleTimeString(), type: 'PING', message: 'Initializing Multi-threaded Watchdog...' });
    this.addLog({ timestamp: new Date().toLocaleTimeString(), type: 'PING', message: 'Memory Buffer Synchronized.' });
    
    this.startThreadSimulation();
  }

  startThreadSimulation(): void {
    this.threadInterval = setInterval(() => {
      this.runGeneratorThread();
    }, 1500);
  }

  private runGeneratorThread(): void {
    const zones = ['Zone A', 'Zone B', 'Zone C', 'Zone D'];
    const zone = zones[Math.floor(Math.random() * zones.length)];
    const id = Math.floor(Math.random() * 900) + 100;

    this.addLog({
      timestamp: new Date().toLocaleTimeString(),
      id: id,
      location: zone,
      type: 'PING'
    });

    if (zone === 'Zone D') {
      // Simulate the Analyzer Thread reacting to the Generator's data
      setTimeout(() => {
        this.addLog({
          timestamp: new Date().toLocaleTimeString(),
          type: 'ALERT',
          message: `UNAUTHORIZED ENTRY: Vehicle ${id} detected in Zone D!`
        });
      }, 600);
    }
  }

  private addLog(log: any): void {
    // We use the spread operator to ensure Angular detects the change immediately
    this.logs = [...this.logs, log];
    if (this.logs.length > 15) this.logs.shift();
  }

  ngOnDestroy(): void {
    if (this.threadInterval) clearInterval(this.threadInterval);
  }
}