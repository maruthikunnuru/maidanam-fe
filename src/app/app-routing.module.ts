import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PredictionsComponent} from './predictions/predictions.component';
import {HomeComponent} from './home/home.component';
import {MatchesComponent} from './matches/matches.component';
import {ScoreboardComponent} from './scoreboard/scoreboard.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {RegisterComponent} from './register/register.component';
import {ManageGroupsComponent} from './manage-groups/manage-groups.component';
import {PlayerHistoryComponent} from './player-history/player-history.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'matches',
    component: MatchesComponent,
    children: [
      { path: ':id/predictions', component: PredictionsComponent }
    ]
  },
  { path: 'predictions', component: PredictionsComponent },
  { path: 'scoreboard', component: ScoreboardComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'error', component: ErrorPageComponent},
  { path: 'groups', component: ManageGroupsComponent},
  { path: 'player', component: PlayerHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
