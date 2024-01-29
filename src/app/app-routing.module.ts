import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthGuard } from './services/authGuard/auth.guard';

const routes: Routes = [ 
  {
  path: 'account',
  loadChildren: () => import('./account/account.module').then((m) => m.AccountModule),
},
{
  path:'dashboard',
  loadChildren:() => import('./dashboard/dashboard.module').then((m)=>m.DashboardModule), canActivate: [AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
