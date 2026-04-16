import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Pages
import { LoginComponent }     from './pages/auth/login/login.component';
import { RegisterComponent }  from './pages/auth/register/register.component';
import { SwipeComponent }     from './pages/swipe/swipe.component';
import { MatchesComponent }   from './pages/matches/matches.component';
import { PetListComponent }   from './pages/pets/pet-list.component';
import { PetDetailComponent } from './pages/pets/pet-detail.component';
import { ProfileComponent }   from './pages/profile/profile.component';

// Core
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SwipeComponent,
    MatchesComponent,
    PetListComponent,
    PetDetailComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
