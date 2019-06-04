import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocialLoginModule, AuthServiceConfig, LoginOpt, GoogleLoginProvider} from 'angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSelectModule, MatSliderModule, MatSortModule} from '@angular/material';
import { MatTableModule} from '@angular/material/table';
import { HttpModule } from '@angular/http';
import { MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule, MatInputModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { MatButtonModule} from '@angular/material/button';


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
import { AuthGuard } from './z-services/auth.guard';
import { AppConstants } from './app-constants';
import { FaqComponent } from './faq/faq.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { AdminComponent } from './admin/admin.component';
import { AdminService } from './z-services/admin.service';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { ElectionsComponent } from './elections/elections.component';
import { ApComponent } from './elections/ap/ap.component';
import { IndiaComponent } from './elections/india/india.component';
import { ElectionsService } from './z-services/elections.service';
import { ElectionScoresComponent } from './election-scores/election-scores.component';
import { MatDialogModule} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './components/shared/confirmation-dialog/confirmation-dialog.component';
import { SidnavListComponent } from './navigation/sidnav-list/sidnav-list.component';
import { NavHeaderComponent } from './navigation/nav-header/nav-header.component';
import { LoanComponent } from './loan/loan.component';


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
    FaqComponent,
    AdminComponent,
    TournamentsComponent,
    ElectionsComponent,
    ApComponent,
    IndiaComponent,
    ElectionScoresComponent,
    ConfirmationDialogComponent,
    SidnavListComponent,
    NavHeaderComponent,
    LoanComponent

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
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  entryComponents: [
    ConfirmationDialogComponent
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
    AdminService,
    ElectionsService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
