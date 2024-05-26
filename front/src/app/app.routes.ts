import { Routes } from '@angular/router';
import { anyLoggedGuard } from './guards/any-logged.guard';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InformationComponent } from './components/information/information.component';
import { PrivacyComponent } from './components/legal/privacy/privacy.component';
import { TermsOfServiceComponent } from './components/legal/terms-of-service/terms-of-service.component';
import { EditInformationComponent } from './components/edit/edit-information/edit-information.component';
import { adminGuard } from './guards/admin.guard';
import { EditGuideComponent } from './components/edit/edit-guide/edit-guide.component';
import { RequestResetComponent } from './components/resetPassword/request-reset/request-reset.component';
import { ResetPasswordComponent } from './components/resetPassword/reset-password/reset-password.component';
import { UserManagementComponent } from './components/user/user-management/user-management.component';
import { EditMenuComponent } from './components/edit/edit-menu/edit-menu.component';
import { ChatComponent } from './components/chat/chat.component';
import { EventManagementComponent } from './components/events/event-management/event-management.component';

export const routes: Routes = [
    //cualquier usuario sin registrar
    {path: '', component: HomeComponent},
    {path: 'information', component: InformationComponent},
    {path: 'privacy', component: PrivacyComponent},
    {path: 'terms-of-service', component: TermsOfServiceComponent},
    {path: 'forgot-password', component: RequestResetComponent},
    {path: 'reset/:token', component: ResetPasswordComponent},

    //cualquier usuario registrado
    {path: 'home', component: DashboardComponent, canActivate:[anyLoggedGuard]},
    {path: 'messenger', component: ChatComponent},

    //admin
    {path: 'user-management', component: UserManagementComponent, canActivate:[adminGuard]},
    {path: 'edit-menu', component: EditMenuComponent, canActivate:[adminGuard]},
    {path: 'edit-information', component: EditInformationComponent, canActivate:[adminGuard]},
    {path: 'edit-guide', component: EditGuideComponent, canActivate:[adminGuard]},
    {path: 'events-management', component: EventManagementComponent, canActivate:[adminGuard]},
];