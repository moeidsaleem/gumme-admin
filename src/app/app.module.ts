import { environment } from './../environments/environment';

import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "./shared/shared.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";

import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './shared/auth/auth-guard.service';

import * as $ from 'jquery';
import { FilterPipeModule } from 'ngx-filter-pipe';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { DealsComponent } from './pages/dashboard/deals/deals.component';
import { CategoriesComponent } from './pages/dashboard/categories/categories.component';
import { UsersComponent } from './pages/dashboard/users/users.component';
import { ApprovalsComponent } from './pages/dashboard/approvals/approvals.component';
import { AddDealsComponent } from './pages/dashboard/add-deals/add-deals.component';
import { InvitesComponent } from './pages/dashboard/invites/invites.component';
import { AddInvitesComponent } from './pages/dashboard/add-invites/add-invites.component';




@NgModule({
    declarations: [
        AppComponent,
        FullLayoutComponent,
        ContentLayoutComponent,
        LoginComponent,
        DashboardComponent,
        HomeComponent,
        DealsComponent,
        CategoriesComponent,
        UsersComponent,
        ApprovalsComponent,
        AddDealsComponent,
        InvitesComponent,
        AddInvitesComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        FilterPipeModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        AppRoutingModule,
        SharedModule,
        NgbModule.forRoot(),

    ],
    providers: [
        AuthService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
