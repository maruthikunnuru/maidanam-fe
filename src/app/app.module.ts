import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocialLoginModule, AuthServiceConfig, LoginOpt, GoogleLoginProvider} from 'angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule, MatSliderModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import { HttpModule } from '@angular/http';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PredictionsComponent } from './matches/predictions/predictions.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from './z-models/dropdown.directive';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RegisterComponent } from './register/register.component';
import { ManageGroupsComponent } from './manage-groups/manage-groups.component';
import { LoginService} from './z-services/login.service';
import { PredictionsService} from './z-services/predictions.service';
import { MatchesComponent } from './matches/matches.component';
import { CurrentViewComponent } from './matches/current-view/current-view.component';
import { ListViewComponent } from './matches/list-view/list-view.component';
import { PlayerHistoryComponent } from './player-history/player-history.component';
import { MatchesService} from './z-services/matches.service';
import { PlayerHistoryService} from './z-services/player-history.service';
import { AlertComponent } from './alert/alert.component';
import {AuthGuard} from './z-services/auth.guard';
import {AppConstants} from './app-constants';
import { FaqComponent } from './faq/faq.component';

const googleLoginOptions: LoginOpt = {
  scope: 'profile email',
};

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(AppConstants.GOOGLE_KEY, googleLoginOptions)
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PredictionsComponent,
    ScoreboardComponent,
    HomeComponent,
    ErrorPageComponent,
    DropdownDirective,
    RegisterComponent,
    ManageGroupsComponent,
    MatchesComponent,
    CurrentViewComponent,
    ListViewComponent,
    PlayerHistoryComponent,
    AlertComponent,
    FaqComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    SocialLoginModule,
    MatSelectModule,
    MatSliderModule,
    MatTableModule,
    HttpModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    LoginService,
    MatchesService,
    PlayerHistoryService,
    PredictionsService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
