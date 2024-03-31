import { Routes } from '@angular/router';
import { anyLoggedGuard } from './guards/any-logged.guard';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: DashboardComponent, canActivate:[anyLoggedGuard] },
];
