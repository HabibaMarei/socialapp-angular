import { Routes } from '@angular/router';
import { TimelineComponent } from './components/timeline/timeline.component';
import { RegisterationComponent } from './components/registeration/registeration.component';
import { LoginComponent } from './components/login/login.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
export const routes: Routes = [
    {path: '', redirectTo: 'timeline', pathMatch: 'full'},
    {path: 'timeline', component: TimelineComponent, title: 'Timeline'},
    {path: 'signup', component: RegisterationComponent, title: 'Sign Up'},
    {path: 'changepassword', component: ChangepasswordComponent, title: 'Change Password'},
    {path: 'signin', component: LoginComponent, title: 'Sign In'},
];
