import { Routes } from '@angular/router';
import { anyLoggedGuard } from './guards/any-logged.guard';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InformationComponent } from './components/information/information.component';
import { PrivacyComponent } from './components/legal/privacy/privacy.component';
import { TermsOfServiceComponent } from './components/legal/terms-of-service/terms-of-service.component';
import { adminGuard } from './guards/admin.guard';
import { RequestResetComponent } from './components/resetPassword/request-reset/request-reset.component';
import { ResetPasswordComponent } from './components/resetPassword/reset-password/reset-password.component';
import { UserManagementComponent } from './components/user/user-management/user-management.component';
import { ChatComponent } from './components/chat/chat.component';
import { EventManagementComponent } from './components/events/event-management/event-management.component';
import { ListFriendsComponent } from './components/user/list-friends/list-friends.component';
import { MyProfileComponent } from './components/user/my-profile/my-profile.component';
import { SearchComponent } from './components/search/search.component';
import { ShowPreferencesComponent } from './components/preferences/show-preferences/show-preferences.component';
import { ShowEventsComponent } from './components/events/show-events/show-events.component';
import { CreatePreferencesComponent } from './components/preferences/create-preferences/create-preferences.component';

export const routes: Routes = [
    //cualquier usuario sin registrar
    {path: '', component: HomeComponent},
    {path: 'information', component: InformationComponent},
    {path: 'privacy', component: PrivacyComponent},
    {path: 'terms-of-service', component: TermsOfServiceComponent},
    {path: 'forgot-password', component: RequestResetComponent},
    {path: 'reset/:token', component: ResetPasswordComponent},

    //usuarios
    {path: 'home', component: DashboardComponent, canActivate:[anyLoggedGuard]},    
    {path: 'messenger', component: ChatComponent, canActivate:[anyLoggedGuard]},
    {path: 'list-friends', component: ListFriendsComponent, canActivate:[anyLoggedGuard]},
    {path: 'my-profile', component: MyProfileComponent, canActivate:[anyLoggedGuard]},
    {path: 'search', component: SearchComponent, canActivate:[anyLoggedGuard]},
    {path: 'my-preferences', component: ShowPreferencesComponent, canActivate:[anyLoggedGuard]},
    {path: 'show-events', component: ShowEventsComponent, canActivate:[anyLoggedGuard]},
    {path: 'create-preferences', component: CreatePreferencesComponent, canActivate: [anyLoggedGuard]},

    //admin
    {path: 'user-management', component: UserManagementComponent, canActivate:[adminGuard]},
    {path: 'events-management', component: EventManagementComponent, canActivate:[adminGuard]},
];