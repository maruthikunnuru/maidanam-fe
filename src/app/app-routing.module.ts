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

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' , canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent },
  { path: 'matches', component: MatchesComponent},
  { path: 'matches/:id/predictions', pathMatch: 'full', component: PredictionsComponent },
  { path: 'scoreboard', component: ScoreboardComponent},
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  { path: 'error', component: ErrorPageComponent},
  { path: 'groups', component: ManageGroupsComponent, canActivate: [AuthGuard]},
  { path: 'history', component: PlayerHistoryComponent},
  { path: 'history/:id/predictions', pathMatch: 'full', component: PredictionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
