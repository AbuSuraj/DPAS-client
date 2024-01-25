import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';

const routes: Routes = [ 
  {
  path: 'account',
  loadChildren: () => import('./account/account.module').then((m) => m.AccountModule),
},
{
  path:'dashoard',
  loadChildren:() => import('./dashboard/dashboard.module').then((m)=>m.DashboardModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
