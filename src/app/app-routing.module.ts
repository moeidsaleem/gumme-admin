import { UsersComponent } from './pages/dashboard/users/users.component';
import { DealsComponent } from './pages/dashboard/deals/deals.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";

import { Full_ROUTES } from "./shared/routes/full-layout.routes";
import { CONTENT_ROUTES } from "./shared/routes/content-layout.routes";

import { AuthGuard } from './shared/auth/auth-guard.service';
import { ApprovalsComponent } from './pages/dashboard/approvals/approvals.component';
import { CategoriesComponent } from './pages/dashboard/categories/categories.component';
import { AddDealsComponent } from './pages/dashboard/add-deals/add-deals.component';
import { InvitesComponent } from './pages/dashboard/invites/invites.component';
import { AddInvitesComponent } from './pages/dashboard/add-invites/add-invites.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path:'login', component:LoginComponent, pathMatch:'full'},
  { path:'dashboard', component:DashboardComponent, children:[
    {path:'', redirectTo:'home',pathMatch:'full'},
    { path:'home', component:HomeComponent},
    { path:'deals', component:DealsComponent},
    { path:'approvals', component:ApprovalsComponent},
    { path:'invites', component:InvitesComponent},
    { path:'users', component:UsersComponent},
    { path:'categories', component:CategoriesComponent},
    { path:'add-deal', component:AddDealsComponent},
    { path:'add-invites', component:AddInvitesComponent},
  ]
},
  { path: '', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES, canActivate: [AuthGuard] },
  { path: '', component: ContentLayoutComponent, data: { title: 'content Views' }, children: CONTENT_ROUTES, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
