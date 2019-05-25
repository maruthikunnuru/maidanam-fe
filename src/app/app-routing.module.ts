import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PredictionsComponent} from './matches/predictions/predictions.component';
import {HomeComponent} from './home/home.component';
import {MatchesComponent} from './matches/matches.component';
import {ScoreboardComponent} from './scoreboard/scoreboard.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {RegisterComponent} from './register/register.component';
import {ManageGroupsComponent} from './manage-groups/manage-groups.component';
import {PlayerHistoryComponent} from './player-history/player-history.component';
import {AuthGuard} from './z-services/auth.guard';
import {FaqComponent} from './faq/faq.component';
import {AdminComponent} from './admin/admin.component';
import {TournamentsComponent} from './tournaments/tournaments.component';
import {ApComponent} from './elections/ap/ap.component';
import {IndiaComponent} from './elections/india/india.component';
import {ElectionScoresComponent} from './election-scores/election-scores.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' , canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent },
  { path: 'matches', component: MatchesComponent},
  // { path: 'elections/ap', pathMatch: 'full', component: ApComponent},
  // { path: 'elections/scores', pathMatch: 'full', component: ElectionScoresComponent},
  // { path: 'elections/india', pathMatch: 'full', component: IndiaComponent},
  { path: 'matches/:id/predictions', pathMatch: 'full', component: PredictionsComponent },
  { path: 'scoreboard', component: ScoreboardComponent},
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  { path: 'error', component: ErrorPageComponent},
  { path: 'groups', component: ManageGroupsComponent, canActivate: [AuthGuard]},
  { path: 'history', component: PlayerHistoryComponent},
  { path: 'faq', pathMatch: 'full', component: FaqComponent },
  { path: 'tournaments', pathMatch: 'full', component: TournamentsComponent },
  { path: 'admin', pathMatch: 'full', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
