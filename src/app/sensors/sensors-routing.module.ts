import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SensorDashboardComponent } from './sensor-dashboard/sensor-dashboard.component';
import { SensorHistoryComponent } from './sensor-history/sensor-history.component';

const sensorRoutes: Routes = [
  {
    path: '',
    redirectTo: '/sensors',
    pathMatch: 'full'
  },
  {
    path: 'sensors',
    component: SensorDashboardComponent
  },
  {
    path: 'sensors/:id',
    component: SensorHistoryComponent
  }
];

export const SensorRouting = RouterModule.forChild(sensorRoutes);
