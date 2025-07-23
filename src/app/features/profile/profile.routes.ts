import { Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { AuthGuard } from '../../core/auth/auth.guard';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
];
