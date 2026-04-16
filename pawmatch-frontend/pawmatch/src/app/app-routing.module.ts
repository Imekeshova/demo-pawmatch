import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }     from './pages/auth/login/login.component';
import { RegisterComponent }  from './pages/auth/register/register.component';
import { SwipeComponent }     from './pages/swipe/swipe.component';
import { MatchesComponent }   from './pages/matches/matches.component';
import { PetListComponent }   from './pages/pets/pet-list.component';
import { PetDetailComponent } from './pages/pets/pet-detail.component';
import { ProfileComponent }   from './pages/profile/profile.component';
import { AuthGuard }          from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'login',    component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'swipe',    component: SwipeComponent,     canActivate: [AuthGuard] },
  { path: 'matches',  component: MatchesComponent,   canActivate: [AuthGuard] },
  { path: 'pets',     component: PetListComponent,   canActivate: [AuthGuard] },
  { path: 'pets/:id', component: PetDetailComponent, canActivate: [AuthGuard] },
  { path: 'profile',  component: ProfileComponent,   canActivate: [AuthGuard] },
  { path: '',         redirectTo: '/swipe', pathMatch: 'full' },
  { path: '**',       redirectTo: '/swipe' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
