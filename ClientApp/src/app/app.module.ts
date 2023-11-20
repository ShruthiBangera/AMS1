import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AddTimesheetComponent } from './add-timesheet/add-timesheet.component';
/*import { NavbarComponent } from './navbar/navbar.component';*/
import { NavMenuComponent } from './nav-menu/nav-menu.component';
/*import { SidebarComponent } from './sidebar/sidebar.component';*/
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddTimesheetComponent,
/*    NavbarComponent,*/
    NavMenuComponent,
/*    SidebarComponent,*/
    HomeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full' },
      {
        path: '', component: NavMenuComponent, children: [
          { path: 'home', component: HomeComponent },
          { path: 'add-timesheet', component: AddTimesheetComponent },
        ]
      },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
