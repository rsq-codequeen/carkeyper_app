import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from "ng-apexcharts";
import { SharedModule } from '../../shared/shared.module';
@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, SharedModule],
  templateUrl: './analytics.component.html'
})
export class AnalyticsComponent implements OnInit {
  // Chart 1: Fleet Distribution (Radial Bar)
  public radialChart: any = {
    series: [75, 40, 25], // Vehicles, Users, Checklists (Percentages)
    chart: { height: 350, type: "radialBar" },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: { fontSize: "22px" },
          value: { fontSize: "16px" },
          total: {
            show: true,
            label: "Total Fleet",
            formatter: function (w: any) { return "120"; }
          }
        }
      }
    },
    labels: ["Vehicles", "Users", "Checklists"],
    colors: ["#22d3ee", "#057B99", "#ef4444"]
  };

  // Chart 2: Intake Trends (Area Chart)
  public areaChart: any = {
    series: [{ name: "Intakes", data: [31, 40, 28, 51, 42, 109, 100] }],
    chart: { height: 350, type: "area", toolbar: { show: false }, background: 'transparent' },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", colors: ["#22d3ee"] },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: { style: { colors: "#94a3b8" } }
    },
    grid: { borderColor: "#1e293b" },
    theme: { mode: 'dark' }
  };

  ngOnInit() {}

  
}