import { Routes } from '@angular/router';
import { anyLoggedGuard } from './guards/any-logged.guard';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InformationComponent } from './components/information/information.component';
import { PrivacyComponent } from './components/legal/privacy/privacy.component';
import { TermsOfServiceComponent } from './components/legal/terms-of-service/terms-of-service.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'information', component: InformationComponent},
    {path: 'privacy', component: PrivacyComponent},
    {path: 'terms-of-service', component: TermsOfServiceComponent},
    {path: 'home', component: DashboardComponent, canActivate:[anyLoggedGuard] },
];
